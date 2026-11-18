import FormatDate from "@/lib/date";
import { EducationTypes } from "@/types/EducationTypes";

export default function FeatureEducationSection({ source }: { source: EducationTypes[] }) {

    return (
        <section className="py-16 bg-white relative">
            <div className="container mx-auto px-6 md:px-16">
                <div className='pb-8 md:pb-16 md:text-center'>
                    <h2 className="font-dm-sans-bold text-2xl lg:text-3xl text-primary mb-2 md:mb-4">
                        Education
                    </h2>
                    <p className='text-texting md:text-center md:mx-auto text-lg md:max-w-xl'>
                        My educational journey has equipped me with a strong foundation in software development that directly translate to real-world development challenges.
                    </p>
                </div>

                <div className="space-y-8">
                    {
                        source.map((data, index) => (
                            <div key={index} className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 bg-background border border-border border-l-4 border-l-accent rounded-[10px] transition-colors hover:border-accent">
                                <div className="lg:w-2/3 mb-4 lg:mb-0">
                                    <h3 className="font-dm-sans-bold text-xl text-primary">
                                        {data.school}
                                    </h3>
                                    <p className="text-texting-muted mt-1">
                                        {data.major}
                                    </p>
                                </div>
                                <div className="lg:w-1/3 text-left lg:text-right">
                                    <p className="font-dm-sans-semi-bold text-accent">
                                        {data.type}
                                    </p>
                                    <p className="text-texting text-sm">{FormatDate(data.from)} - {FormatDate(data.to)}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}