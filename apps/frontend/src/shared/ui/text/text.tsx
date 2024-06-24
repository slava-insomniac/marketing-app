import clsx from 'clsx'

import styles from './text.module.css'

export interface TextProps extends React.ComponentProps<'span'> {
  weight?: 'normal' | 'bold' | 'extrabold'
  size?: 'xl' | 'lg' | 'md' | 'sm'
  color?: 'text' | 'error'
}

export function Text({ className, weight = 'normal', size = 'md', color = 'text', ...props }: TextProps) {
  const classNames = clsx(styles.element, styles[size], styles[color], styles[weight], className)

  return <span className={classNames} {...props} />
}
