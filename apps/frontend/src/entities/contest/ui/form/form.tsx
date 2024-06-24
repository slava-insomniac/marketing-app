import clsx from 'clsx'
import React from 'react'

import { Text } from '~/shared/ui'

import styles from './form.module.css'

export interface FormProps extends React.ComponentProps<'form'> {
  disabled: boolean
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

export function Form({ disabled, onSubmit, children, ...props }: FormProps) {
  return (
    <form
      data-disabled={disabled}
      className={clsx(styles.form, { [styles.disabled]: disabled })}
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </form>
  )
}

Form.Header = function Header({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={clsx(styles.header, className)} {...props}>
      {children}
    </div>
  )
}

Form.Body = function Body({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={clsx(styles.body, className)} {...props}>
      {children}
    </div>
  )
}

Form.Error = function Error({ children, className, ...props }: Omit<React.ComponentProps<'div'>, 'color'>) {
  return (
    <Text className={clsx(styles.error, className)} color="error" size="sm" {...props}>
      {children}
    </Text>
  )
}
