import { createEvent, createStore } from 'effector'

export const appStarted = createEvent()

export const $appLoading = createStore(false)
export const $isBrowser = createStore(typeof document !== 'undefined', {
  serialize: 'ignore',
})
