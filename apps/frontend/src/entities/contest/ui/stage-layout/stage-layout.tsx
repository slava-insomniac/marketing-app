import { Heading, Text, useDetectDevice } from '~/shared/ui'

import styles from './stage-layout.module.css'

export interface StageLayoutProps extends React.PropsWithChildren {
  heading?: string
  text?: string
  sidebar?: React.ReactNode
}

export function StageLayout({ heading, text, children, sidebar = null }: StageLayoutProps) {
  const { isMobile } = useDetectDevice()

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        {!isMobile && heading && (
          <Heading as="h1" className={styles.heading}>
            {heading}
          </Heading>
        )}
        {text && (
          <Text className={styles.text} size="lg" weight="bold">
            {text}
          </Text>
        )}
        <div className={styles.content}>{children}</div>
      </article>
      {sidebar && <aside className={styles.aside}>{sidebar}</aside>}
    </main>
  )
}
