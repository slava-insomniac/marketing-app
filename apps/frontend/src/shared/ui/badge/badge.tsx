import clsx from 'clsx'

import styles from './badge.module.css'

export interface BadgeProps extends React.ComponentProps<'span'> {
  count: number | null
  success?: boolean
  disabled?: boolean
}

export function Badge({ className, count = null, success = false, disabled = false, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(styles.badge, { [styles.success]: success, [styles.disabled]: disabled }, className)}
      {...props}
      children={count}
    />
  )
}
