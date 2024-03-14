"use client"

import LoadingSpinner from "../Loading/Spinner"

export default function ButtonSolid({ text, click, className, disable = false, loading = false }: {
    text: string,
    click?: () => void,
    className?: string,
    disable?: boolean,
    loading?: boolean
}) {

    return (
        <button onClick={click} disabled={disable || loading} type="button" className={
            `text-white ${(disable || loading) ? "bg-gray-500" : "bg-secondary-dark hover:bg-gradient-to-br"} transition-colors duration-300 focus:ring-4 focus:outline-none font-medium rounded-full text-md px-5 py-2.5 text-center mr-2 mb-2 ${className}`
        }>
            {
                loading ? (
                    <LoadingSpinner className="fill-secondary !w-6 !h-6" />
                ) : (
                    <>
                        {text}
                    </>
                )
            }

        </button >
    )
}