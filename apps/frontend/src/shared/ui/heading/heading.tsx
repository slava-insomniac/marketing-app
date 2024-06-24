import clsx from 'clsx'

import styles from './heading.module.css'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}

export function Heading({ as: Element = 'h2', className, ...props }: HeadingProps) {
  return <Element className={clsx(styles.heading, className)} {...props} />
}
