import styles from './layout.module.css'

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.layout}>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}
