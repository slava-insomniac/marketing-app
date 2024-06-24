import styles from './header.module.css'

import aviasalesLogo from './assets/aviasales-logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="//aviasales.ru" target="_blank" tabIndex={-1}>
        <img className={styles.image} src={aviasalesLogo} width="140" height="30" alt="Aviasales" />
      </a>
    </header>
  )
}
