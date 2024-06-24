import { forwardRef, useImperativeHandle, useRef } from 'react'
import clsx from 'clsx'

import styles from './input.module.css'

export interface InputProps extends React.ComponentProps<'input'> {
  hasError?: boolean
}

export interface InputRef {
  focus: () => void
}

export const Input = forwardRef<InputRef, InputProps>(({ hasError = false, className, style, ...props }, ref) => {
  const classNames = clsx(
    styles.input,
    {
      [styles.error]: hasError,
    },
    className,
  )
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({ focus: () => inputRef.current?.focus() }))

  return (
    <div className={classNames} style={style}>
      <input ref={inputRef} {...props} />
    </div>
  )
})

Input.displayName = 'Input'
