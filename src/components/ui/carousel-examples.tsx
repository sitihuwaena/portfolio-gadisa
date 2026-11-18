"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  AutoCarousel,
} from "./carousel";
import { cn } from "@/lib/utils";

// Example skills carousel
export function SkillsCarousel({ skills }: { skills: Array<{ id: number; title: string; image: string; category: string }> }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {skills.map((skill) => (
            <CarouselItem key={skill.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="p-4">
                <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="aspect-square p-6 flex flex-col items-center justify-center">
                    <img
                      src={skill.image}
                      alt={skill.title}
                      className="w-16 h-16 object-contain mb-4 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h3 className="font-dm-sans-semi-bold text-lg text-center text-secondary">
                      {skill.title}
                    </h3>
                    <span className="text-sm text-texting mt-2 px-2 py-1 bg-gray-100 rounded-full">
                      {skill.category}
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots count={Math.ceil(skills.length / 4)} />
      </Carousel>
    </div>
  );
}

// Example testimonials carousel with autoplay
export function TestimonialsCarousel({ testimonials }: { 
  testimonials: Array<{ 
    id: number; 
    name: string; 
    role: string; 
    company: string; 
    content: string; 
    avatar: string 
  }> 
}) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <AutoCarousel
        autoplayDelay={5000}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id}>
              <div className="p-6">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                    />
                    <blockquote className="text-lg text-gray-700 italic mb-4">
                      "{testimonial.content}"
                    </blockquote>
                    <cite className="not-italic">
                      <div className="font-dm-sans-semi-bold text-secondary">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-texting">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </cite>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots count={testimonials.length} />
      </AutoCarousel>
    </div>
  );
}

// Example projects carousel
export function ProjectsCarousel({ projects }: { 
  projects: Array<{ 
    id: number; 
    title: string; 
    description: string; 
    image: string; 
    technologies: string[];
    link: string;
  }> 
}) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem key={project.id} className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="p-4">
                <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-dm-sans-bold text-xl text-secondary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-texting text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    <a
                      href={project.link}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-dm-sans-semi-bold text-sm"
                    >
                      View Project
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots count={Math.ceil(projects.length / 3)} />
      </Carousel>
    </div>
  );
}

// Simple image carousel
export function ImageCarousel({ images }: { 
  images: Array<{ 
    id: number; 
    src: string; 
    alt: string; 
    caption?: string 
  }> 
}) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <div className="p-4">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full aspect-video object-cover"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                      <p className="text-center">{image.caption}</p>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots count={images.length} />
      </Carousel>
    </div>
  );
}