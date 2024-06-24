import clsx from 'clsx'

import styles from './button.module.css'

export interface ButtonProps extends React.ComponentProps<'button'> {
  ghost?: boolean
}

export function Button({ className, ghost = false, ...props }: ButtonProps) {
  return <button type="button" className={clsx(styles.button, { [styles.ghost]: ghost }, className)} {...props} />
}
