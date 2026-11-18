"use client";

import { formatMonthYear } from "@/lib/date";
import { ExperiencesTypes } from "@/types/ExperiencesTypes";
import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type Point = { x: number; y: number };
type Rider = { x: number; y: number; angle: number; flip: boolean };

/** Breakpoint where the road turns into a full serpentine (Tailwind `lg`). */
const WIDE_QUERY = "(min-width: 1024px)";
/** Empty space kept under the last milestone so the road can sweep out of frame. */
const BOTTOM_RUNWAY = 150;

function r(value: number) {
    return Math.round(value * 100) / 100;
}

/**
 * Horizontal distance of a milestone from the centre line, in percent.
 * It grows towards the bottom so the road opens up like the poster's perspective.
 */
function amplitudeOf(index: number, total: number) {
    if (total <= 1) return 12;
    return 9 + (index / (total - 1)) * 9;
}

/**
 * Builds a smooth serpentine that passes exactly through every milestone dot.
 * Control points sit on the vertical mid-line between two dots, which gives the
 * curve a vertical tangent at each dot, same silhouette as the reference poster.
 */
function buildRoad(
    points: Point[],
    width: number,
    height: number,
    exitRight: boolean,
    diagonalExit: boolean,
) {
    if (points.length === 0) return "";

    const first = points[0];
    const last = points[points.length - 1];
    const parts = [`M ${r(first.x)} -120`, `L ${r(first.x)} ${r(first.y)}`];

    for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const mid = (a.y + b.y) / 2;
        parts.push(`C ${r(a.x)} ${r(mid)}, ${r(b.x)} ${r(mid)}, ${r(b.x)} ${r(b.y)}`);
    }

    if (diagonalExit) {
        const endX = exitRight ? width + 200 : -200;
        const bend = last.y + (height - last.y) * 0.45;
        parts.push(
            `C ${r(last.x)} ${r(bend)}, ${r(last.x + (endX - last.x) * 0.32)} ${r(height - 20)}, ${r(endX)} ${r(height + 90)}`,
        );
    } else {
        parts.push(`L ${r(last.x)} ${r(height + 90)}`);
    }

    return parts.join(" ");
}

/** Minimal side-view cyclist, drawn centred on the origin. */
function CyclistGlyph() {
    return (
        <g
            transform="translate(-32 -20)"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx={13} cy={31} r={9} />
            <circle cx={51} cy={31} r={9} />
            <path d="M13 31 L31 31 M31 31 L25 16 M31 31 L43 17 M25 16 L43 17 M13 31 L25 16 M43 17 L51 31" />
            <path d="M21 15 L28 15 M43 17 L48 12" />
            <path d="M26 13 L38 6 M38 6 L46 14 M26 13 L31 22 L31 29 M26 13 L22 21 L27 28" />
            <circle cx={43} cy={4} r={3.6} fill="currentColor" stroke="none" />
        </g>
    );
}

export default function Timeline({ timeline }: { timeline: ExperiencesTypes[] }) {
    const items = Array.isArray(timeline) ? timeline : [];

    const containerRef = useRef<HTMLDivElement | null>(null);
    const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
    const pathRef = useRef<SVGPathElement | null>(null);
    const maskId = `road-fade-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
    // IntersectionObserver is unreliable on SVG children, so the road and the
    // riders follow the in-view state of the surrounding HTML container instead.
    const inView = useInView(containerRef, { once: true, margin: "-80px" });

    const [isWide, setIsWide] = useState(false);
    const [geo, setGeo] = useState<{ width: number; height: number; points: Point[] }>({
        width: 0,
        height: 0,
        points: [],
    });
    const [riders, setRiders] = useState<Rider[]>([]);

    const measure = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const box = container.getBoundingClientRect();
        const points: Point[] = [];

        for (let i = 0; i < items.length; i++) {
            const node = nodeRefs.current[i];
            if (!node) continue;
            const rect = node.getBoundingClientRect();
            points.push({
                x: rect.left - box.left + rect.width / 2,
                y: rect.top - box.top + rect.height / 2,
            });
        }

        setGeo({ width: box.width, height: box.height, points });
    }, [items.length]);

    useEffect(() => {
        const media = window.matchMedia(WIDE_QUERY);
        const update = () => setIsWide(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        measure();

        const container = containerRef.current;
        if (!container || typeof ResizeObserver === "undefined") return;

        const observer = new ResizeObserver(() => measure());
        observer.observe(container);
        nodeRefs.current.forEach((node) => node && observer.observe(node));
        window.addEventListener("resize", measure);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [measure, isWide]);

    const roadWidth = isWide ? 34 : 16;
    const diagonalExit = isWide;
    const exitRight = (items.length - 1) % 2 === 0;
    const road = buildRoad(geo.points, geo.width, geo.height, exitRight, diagonalExit);

    // Park the cyclists on the road itself by sampling the rendered path.
    useEffect(() => {
        const path = pathRef.current;
        if (!path || !road || !isWide || geo.height === 0) {
            setRiders([]);
            return;
        }

        const total = path.getTotalLength();
        if (!total) {
            setRiders([]);
            return;
        }

        // The road only ever travels downwards, so y is monotonic along it.
        const lengthAtY = (targetY: number) => {
            let low = 0;
            let high = total;
            for (let i = 0; i < 26; i++) {
                const mid = (low + high) / 2;
                if (path.getPointAtLength(mid).y < targetY) low = mid;
                else high = mid;
            }
            return (low + high) / 2;
        };

        const riderAt = (targetY: number): Rider => {
            const length = lengthAtY(targetY);
            const here = path.getPointAtLength(length);
            const behind = path.getPointAtLength(Math.max(0, length - 2));
            // Riders climb *up* the road, against the direction the path is drawn.
            let angle = (Math.atan2(behind.y - here.y, behind.x - here.x) * 180) / Math.PI;
            let flip = false;
            if (angle > 90) {
                angle -= 180;
                flip = true;
            } else if (angle < -90) {
                angle += 180;
                flip = true;
            }
            return { x: here.x, y: here.y, angle, flip };
        };

        setRiders([riderAt(geo.height - 132), riderAt(geo.height - 66)]);
    }, [road, isWide, geo.height]);

    if (items.length === 0) return null;

    const riderScale = (roadWidth * 1.15) / 44;

    return (
        <div ref={containerRef} className="relative mt-12 md:mt-16" style={{ paddingBottom: BOTTOM_RUNWAY }}>
            {geo.width > 0 && road && (
                <svg
                    className="pointer-events-none absolute inset-0 overflow-visible"
                    width={geo.width}
                    height={geo.height}
                    viewBox={`0 0 ${r(geo.width)} ${r(geo.height)}`}
                    fill="none"
                    aria-hidden="true"
                >
                    <defs>
                        {/* Lets the road dissolve into the distance instead of ending on a hard cap. */}
                        <linearGradient
                            id={`${maskId}-gradient`}
                            gradientUnits="userSpaceOnUse"
                            x1="0"
                            y1={-50}
                            x2="0"
                            y2={80}
                        >
                            <stop offset="0%" stopColor="#000000" />
                            <stop offset="100%" stopColor="#FFFFFF" />
                        </linearGradient>
                        <mask id={maskId} maskUnits="userSpaceOnUse" x={-300} y={-300} width={geo.width + 600} height={geo.height + 600}>
                            <rect
                                x={-300}
                                y={-300}
                                width={geo.width + 600}
                                height={geo.height + 600}
                                fill={`url(#${maskId}-gradient)`}
                            />
                        </mask>
                    </defs>

                    <motion.path
                        ref={pathRef}
                        mask={`url(#${maskId})`}
                        d={road}
                        stroke="#F3F4F4"
                        strokeWidth={roadWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: inView ? 1 : 0 }}
                        transition={{ duration: 2.2, ease: "easeInOut" }}
                        style={{ filter: "drop-shadow(0 22px 34px rgba(19, 6, 16, 0.35))" }}
                    />

                    {riders.map((rider, index) => (
                        <motion.g
                            key={index}
                            className="text-primary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: inView ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 1.5 + index * 0.15 }}
                            transform={`translate(${r(rider.x)} ${r(rider.y)}) rotate(${r(rider.angle)}) scale(${r(rider.flip ? -riderScale : riderScale)} ${r(riderScale)})`}
                        >
                            <CyclistGlyph />
                        </motion.g>
                    ))}
                </svg>
            )}

            <div className="relative space-y-8 lg:space-y-12">
                {items.map((item, index) => {
                    const nodeOnRight = index % 2 === 0;
                    const amplitude = amplitudeOf(index, items.length);
                    const nodeLeft = nodeOnRight
                        ? `calc(50% + ${amplitude}%)`
                        : `calc(50% - ${amplitude}%)`;

                    const from = formatMonthYear(item.from);
                    const to = item.to ? formatMonthYear(item.to) : "Current Job";
                    const period = from === to ? from : `${from} – ${to}`;

                    return (
                        <div
                            key={item.id ?? index}
                            className="relative pl-16 lg:grid lg:grid-cols-2 lg:pl-0"
                        >
                            <div
                                ref={(element) => {
                                    nodeRefs.current[index] = element;
                                }}
                                style={{
                                    ["--node-left" as string]: nodeLeft,
                                    ["--node-left-narrow" as string]: nodeOnRight ? "42px" : "22px",
                                }}
                                className="absolute top-[26px] left-[var(--node-left-narrow)] z-20 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(243,244,244,0.9)] lg:top-1/2 lg:left-[var(--node-left)] lg:h-6 lg:w-6"
                            >
                                {index === 0 && (
                                    <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
                                )}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 26 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-70px" }}
                                transition={{ duration: 0.5, delay: 0.05 }}
                                className={
                                    nodeOnRight
                                        ? "lg:col-start-1 lg:row-start-1 lg:flex lg:justify-end lg:pr-20"
                                        : "lg:col-start-2 lg:row-start-1 lg:pl-20"
                                }
                            >
                                <div className="w-full rounded-2xl border border-white/10 bg-primary/95 px-5 py-4 shadow-[0_18px_38px_rgba(19,6,16,0.38)] lg:max-w-[340px]">
                                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                                        <h3 className="font-dm-sans-bold text-lg leading-snug text-primary-foreground">
                                            {item.company}
                                        </h3>
                                        {item.type && (
                                            <span className="rounded-full bg-accent px-2.5 py-0.5 font-dm-sans-medium text-[10px] tracking-wider text-accent-foreground uppercase">
                                                {item.type}
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-1 font-dm-sans text-xs text-white/55">
                                        {period}
                                        {item.location ? ` · ${item.location}` : ""}
                                    </p>

                                    <p className="mt-3 font-dm-sans-semi-bold text-sm text-accent-light">
                                        {item.title}
                                    </p>

                                    {item.responbilities?.length > 0 && (
                                        <ul className="mt-2 space-y-1.5 font-dm-sans text-[13px] leading-relaxed text-white/70">
                                            {item.responbilities.map((responsibility, idx) => (
                                                <li key={idx} className="flex gap-2.5">
                                                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-light" />
                                                    <span>{responsibility.job_desc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
