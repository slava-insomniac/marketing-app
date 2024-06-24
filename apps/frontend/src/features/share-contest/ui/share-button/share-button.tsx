import clsx from 'clsx'
import { useUnit } from 'effector-react'

import { Platform } from '~/entities/contest'
import styles from './share-button.module.css'

import * as shareModel from '../../model'

export interface ShareButtonProps extends Omit<React.ComponentProps<'input'>, 'type' | 'onClick'> {
  platform: Platform
  shared?: boolean
}

export function ShareButton({ className, platform, name = 'share', shared = false }: ShareButtonProps) {
  const [share] = useUnit([shareModel.shareContest])

  const handleChange = () => share(platform)

  return (
    <input
      type="checkbox"
      className={clsx(styles.share, className)}
      name={name}
      value={platform}
      checked={shared}
      disabled={shared}
      onChange={handleChange}
    />
  )
}
