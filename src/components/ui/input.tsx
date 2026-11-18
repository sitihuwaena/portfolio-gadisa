import * as React from "react"

import { cn } from "@/lib/utils"
import { InputNumberFormat, useNumberFormat } from '@react-input/number-format';


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <>
        {
          type === "number" && (
            <InputNumberFormat
              currencyDisplay="symbol"
              locales="id"
              maximumFractionDigits={2}
              className={cn(
                "flex font-open-sans h-[38px] w-full rounded border text-solid border-[#2D3F44]/30 bg-white px-4 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:border-solid focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-solid focus-visible:border-ring-solid disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
              key={props.name}
              {...props}
              ref={ref}
            />
          )
        }
        {
          type !== "number" && (
            <input
              type={type}
              className={cn(
                "flex font-open-sans h-[38px] w-full rounded border text-solid border-[#2D3F44]/30 bg-white px-4 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:border-solid focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-solid focus-visible:border-ring-solid disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
              ref={ref}
              {...props}
            />
          )
        }
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
