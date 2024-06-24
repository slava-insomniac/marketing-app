import clsx from 'clsx'
import styles from './rocket.module.css'

export interface RocketProps {
  animation?: 'bump-up'
}

export function Rocket({ animation }: RocketProps) {
  const classNames = [styles.rocket]

  if (animation) {
    classNames.push(styles[animation])
  }

  return (
    <div className={styles.background}>
      <img
        className={clsx(classNames)}
        src="/img/rocket.webp"
        srcSet="/img/rocket.webp 1x, /img/rocket@2x.webp 2x"
        width={314}
        height={537}
        alt="rocket"
      />
    </div>
  )
}
