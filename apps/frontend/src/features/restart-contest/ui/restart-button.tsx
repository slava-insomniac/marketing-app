import { reflect } from '@effector/reflect'

import { Button } from '~/shared/ui'

import styles from './restart-button.module.css'

import { contestRestarted } from '../model'

export const RestartButton = reflect({
  view: Button,
  bind: {
    className: styles.button,
    children: 'Пройти игру заново',
    onClick: () => contestRestarted(),
  },
})

RestartButton.displayName = 'RestartButton'
