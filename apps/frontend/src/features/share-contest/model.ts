import { sample, createEvent, createEffect, createStore, restore } from 'effector'
import { not } from 'patronum'

import { errorMesage } from '~/shared/lib/shortcuts'
import { PLATFORMS, Platform, contestFinished, $email, $shareUrl, $sharedPlatforms } from '~/entities/contest'
import { $subscriberId, createSubscriber, storeSubscriberId, $subscriberCreating } from '~/entities/subscriber'

import { createOpenWindowModel } from './lib'

const { openWindow, windowClosed } = createOpenWindowModel()

export const MIN_USER_FOCUS_DURATION = 5000 // 5s

export const formSubmitted = createEvent<React.FormEvent<HTMLFormElement>>()
export const shareContest = createEvent<Platform>()
export const contestShared = createEvent<Platform | null>()

const $platform = restore(shareContest, null)

export const $error = createStore<string | null>(null)
export const $disabled = not($email.map(Boolean))
export const $pending = $subscriberCreating

const checkSharingFx = createEffect<Set<Platform>, void, Error>((shared) => {
  if (shared.size === 0) {
    throw new Error('Надо все же поделиться')
  }
})

sample({
  clock: shareContest,
  source: $shareUrl,
  filter: Boolean,
  fn: (url, platform) => createShareUrl(platform, url),
  target: openWindow,
})

sample({
  clock: windowClosed,
  source: $platform,
  filter: (_, timeMs) => timeMs > MIN_USER_FOCUS_DURATION,
  target: contestShared,
})

sample({
  clock: contestShared,
  source: [$email, $subscriberId],
  filter: ([email, id]) => Boolean(email) && id === null,
  fn: ([email]) => email,
  target: createSubscriber,
})

sample({
  clock: formSubmitted,
  source: $sharedPlatforms,
  target: checkSharingFx,
})

sample({
  clock: checkSharingFx.done,
  target: [storeSubscriberId, contestFinished],
})

$error.on(checkSharingFx.failData, errorMesage)

$sharedPlatforms.on(contestShared, (shared, platform) => {
  if (platform) {
    return new Set(shared).add(platform)
  }
})

$platform.reset(contestShared)
$error.reset(contestShared)

formSubmitted.watch((event) => event.preventDefault())

function createShareUrl(platform: Platform, url: string): string {
  const template = PLATFORMS[platform]

  return template.replace('{url}', encodeURI(url))
}
