import * as React from 'react'
import { cn } from '@/lib/utils'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export default function FormInput({ className, ...props }: FormInputProps) {
  return (
    <input
      className={cn('border rounded-md px-3 py-2 w-full', className)}
      {...props}
    />
  )
}