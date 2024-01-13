import { baseURL } from "@/constant/baseUrl"
import { Skill } from "@/types/skillTypes.interface"
import Image from "next/image"

export default function ChipLogo({ data }: {
    data: Array<Skill>
}) {
    return (
        <>
            {
                data.map.length > 0 && (
                    <div className="flex -space-x-2">
                        {
                            data.map((item, i) => {
                                if (i < 3) {
                                    return (
                                        <div key={i} className="w-7 h-7 bg-white drop-shadow-md flex justify-center items-center relative rounded-full">
                                            <Image layout="fill" objectFit="contain" src={baseURL + item.attributes.source.data.attributes.url} alt={item.attributes.source.data.attributes.name} />
                                        </div>
                                    )
                                }
                            })
                        }
                        {
                            data.length > 3 && (
                                <div className="w-7 h-7 p-1 relative rounded-full bg-white drop-shadow-md">
                                    <Image layout="fill" objectFit="cover" src={require("@/assets/icons/plus.svg")} alt="plus" />
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>

    )
}