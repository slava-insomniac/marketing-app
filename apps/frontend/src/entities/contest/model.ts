import { sample, createStore, createEvent, createEffect } from 'effector'
import { redirect } from 'atomic-router'

import { routes } from '~/shared/routing'
import { storageApi, clientApi } from '~/shared/api/subscribers'
import { $appLoading, $isBrowser, appStarted } from '~/shared/app'
import { $subscriberId } from '~/entities/subscriber'

export const PLATFORMS = {
  facebook: 'https://www.facebook.com/sharer/sharer.php?u={url}&title=Участвуй в конкурсе от Aviasales!',
  vk: 'https://vk.com/share.php?url={url}',
  twitter: 'https://twitter.com/share?text=Участвуй в конкурсе от Aviasales!&url={url}',
  telegram: 'https://telegram.me/share/url?url={url}',
  whatsapp: 'https://api.whatsapp.com/send?text={url}',
}
export const PLATFORMS_LIST = Object.keys(PLATFORMS) as Array<keyof typeof PLATFORMS>

export type Platform = (typeof PLATFORMS_LIST)[number]

const subcribitionFound = createEvent()
const subcribitionNotFound = createEvent()
export const contestFinished = createEvent()

export const $email = createStore<string | null>(null)
export const $shareUrl = createStore<string | null>(null)
export const $sharedPlatforms = createStore<Set<Platform>>(new Set())

export const getSubscriberFx = createEffect(clientApi.getSubscriber)
export const getIdFromStorageFx = createEffect(storageApi.getSubscribitionId)
export const createSubscriberRefFx = createEffect(clientApi.subscriberCreateRef)

export const createContestShareUrlFx = createEffect<string, string, void>((ref) => {
  return `${globalThis.location.origin}?from=${ref}`
})

sample({
  clock: appStarted,
  filter: $isBrowser,
  target: getIdFromStorageFx,
})

sample({
  clock: getIdFromStorageFx.doneData,
  filter: Boolean,
  target: getSubscriberFx,
})

sample({
  clock: getIdFromStorageFx.doneData,
  filter: (id) => id === null,
  target: subcribitionNotFound,
})

sample({
  clock: getSubscriberFx.pending,
  target: $appLoading,
})

sample({
  clock: getSubscriberFx.doneData,
  fn: ({ id }) => id,
  target: [$subscriberId, subcribitionFound],
})

sample({
  clock: getSubscriberFx.fail,
  target: subcribitionNotFound,
})

redirect({
  clock: subcribitionNotFound,
  route: routes.participate,
})

redirect({
  clock: subcribitionFound,
  route: routes.final,
})

redirect({
  clock: contestFinished,
  route: routes.final,
})

sample({
  clock: $email,
  filter: Boolean,
  target: createSubscriberRefFx,
})

sample({
  clock: createSubscriberRefFx.doneData,
  fn: ({ ref }) => encodeURI(ref),
  target: createContestShareUrlFx,
})

$shareUrl.on(createContestShareUrlFx.doneData, (_, url) => url)
