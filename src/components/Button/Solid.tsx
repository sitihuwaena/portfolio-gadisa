"use client"

export default function ButtonSolid({ text, click, className, disable = false }: {
    text: string,
    click?: () => void,
    className?: string,
    disable?: boolean
}) {

    return (
        <button onClick={click} disabled={disable} type="button" className={
            `text-white ${disable ? "bg-gray-500" : "bg-secondary-dark"} transition-colors duration-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-full text-md px-5 py-2.5 text-center mr-2 mb-2 ${className}`
        }>
            {text}
        </button>
    )
}