"use client"

import { Responsibilities } from "@/types/experienceTypes.interface";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/id";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function ItemWorkExperiences({ title, company, typeWorking, startDate, endDate, location, responsibilities }: {
    title?: string,
    company?: string,
    typeWorking?: string,
    startDate?: string,
    endDate?: string,
    location?: string,
    responsibilities?: Array<Responsibilities>
}) {

    const param = useParams()

    return (
        <div className="w-full border-b-2 pb-4 pt-2 space-y-2">
            <div className="flex items-center space-x-2 justify-between">
                <div className="font-thin text-lg md:text-xl text-gray-600">
                    {title}
                </div>
                <div className={`px-4 whitespace-nowrap uppercase text-xs font-semibold  rounded-full py-1.5
                    ${typeWorking == "Full Time" && "text-success bg-success-light"}
                    ${typeWorking == "Part Time" && "text-yellow-600 bg-yellow-100"}
                    ${typeWorking == "Internship" && "text-blue-600 bg-blue-100"}
                `}>
                    {typeWorking}
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div className="flex flex-col md:flex-row md:items-center justify-start md:justify-between md:space-x-8">
                    <div className="flex items-start md:items-center space-x-1">
                        <div className="h-6 w-6">
                            <Image alt="company" src={require("@/assets/icons/company.svg")} className="w-full h-full object-contain" />
                        </div>
                        <div className="text-sm text-gray-500">
                            {company}
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="h-6 w-6">
                            <Image alt="location" src={require("@/assets/icons/location.svg")} className="w-full h-full object-contain" />
                        </div>
                        <div className="text-sm text-gray-500">
                            {location}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="h-6 w-6">
                        <Image alt="date" src={require("@/assets/icons/date.svg")} className="w-full h-full" />
                    </div>
                    <div className="text-gray-500 text-sm">
                        {dayjs(startDate).locale(param.locale as string).format("MMMM YYYY")} - {dayjs(endDate).locale(param.locale as string).format("MMMM YYYY")}
                    </div>
                </div>
            </div>
            {
                responsibilities && responsibilities.length > 0 && (
                    <>
                        <div className="px-1 text-gray-500 font-semibold text-sm">
                            {param.locale == "id" ? "Tanggung Jawab" : "Responsibilities"} :
                        </div>
                        <ul className="list-disc px-5 text-gray-500 text-sm">
                            {
                                responsibilities.map((item, i: any) => (
                                    <li key={i}>
                                        {item.job_desc}
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                )
            }
        </div>
    )
}