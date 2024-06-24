import { createEffect, createEvent, createStore, sample } from 'effector'
import { interval } from 'patronum'

export function createOpenWindowModel() {
  const openWindow = createEvent<string>()
  const windowClosed = createEvent<number>()

  const $window = createStore<Window | null>(null)
  const $openTime = createStore<number | null>(null)

  const openWindowFx = createEffect<string, Window, void>((url) => globalThis.open(url, '_blank') as Window)

  const checkWindowStatusFx = createEffect<Window, boolean, void>(
    (newWindow) => newWindow.closed && globalThis.document.hasFocus(),
  )

  sample({
    clock: openWindow,
    target: openWindowFx,
  })

  sample({
    clock: openWindowFx.done,
    fn: () => Date.now(),
    target: $openTime,
  })

  sample({
    clock: openWindowFx.doneData,
    target: $window,
  })

  const { tick } = interval({
    timeout: 100,
    start: openWindowFx.done,
    stop: windowClosed,
  })

  sample({
    clock: tick,
    source: $window,
    filter: Boolean,
    target: checkWindowStatusFx,
  })

  sample({
    clock: checkWindowStatusFx.doneData,
    source: $openTime,
    filter: (_, windowClosed) => windowClosed,
    fn: (openTime) => Date.now() - (openTime as number),
    target: windowClosed,
  })

  $window.reset(windowClosed)
  $openTime.reset(windowClosed)

  return { openWindow, windowClosed }
}
