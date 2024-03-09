"use client"

import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/id";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function ItemEducation({ department, typeEducation, university, startDate, endDate }: {
    department?: string,
    typeEducation?: string,
    university?: string,
    startDate?: string,
    endDate?: string
}) {

    const param = useParams()

    return (
        <div className="w-full border-b-2 pb-4 pt-2 space-y-2">
            <div className="flex items-center space-x-2 justify-between">
                <div className="font-thin text-lg md:text-xl text-gray-600">
                    {department}
                </div>
                <div className={`px-4 whitespace-nowrap uppercase text-xs font-semibold  rounded-full py-1.5
                    ${typeEducation == "Graduated" && "text-success bg-success-light"}
                    ${typeEducation == "On Progress" && "text-yellow-600 bg-yellow-100"}
                `}>
                    {typeEducation}
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div className="flex items-center space-x-1">
                    <div className="h-6 w-6">
                        <Image alt="university" src={require("@/assets/icons/company.svg")} className="w-full h-full object-contain" />
                    </div>
                    <div className="text-xs text-gray-500">
                        {university}
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="h-6 w-6">
                        <Image width={24} height={24} alt="date" src={require("@/assets/icons/date.svg")} className="w-full h-full" />
                    </div>
                    <div className="text-gray-500 text-xs">
                        {dayjs(startDate).locale(param.locale as string).format("MMMM YYYY")} - {dayjs(endDate).locale(param.locale as string).format("MMMM YYYY")}
                    </div>
                </div>
            </div>
        </div>
    )
}