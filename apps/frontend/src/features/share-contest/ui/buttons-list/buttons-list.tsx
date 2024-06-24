import { useUnit } from 'effector-react'

import { $sharedPlatforms, PLATFORMS_LIST } from '~/entities/contest'
import { ShareButton } from '../share-button'
import styles from './buttons-list.module.css'

export function ButtonsList() {
  const [sharedPlatforms] = useUnit([$sharedPlatforms])

  return (
    <div className={styles.list}>
      {PLATFORMS_LIST.map((platform) => (
        <ShareButton
          role="checkbox"
          aria-label={`Share contest ${platform}`}
          key={platform}
          platform={platform}
          shared={sharedPlatforms.has(platform)}
        />
      ))}
    </div>
  )
}
