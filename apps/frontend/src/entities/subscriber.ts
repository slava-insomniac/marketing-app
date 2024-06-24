import { sample, createEvent, createStore, createEffect } from 'effector'

import { clientApi, storageApi } from '~/shared/api/subscribers'
import { errorMesage } from '~/shared/lib/shortcuts'

export const $subscriberId = createStore<string | null>(null)

export const createSubscriber = createEvent<string | null>()
export const subscriberCreated = createEvent()
export const storeSubscriberId = createEvent()
export const subscriberStored = createEvent()

export const $subscriberCreateError = createStore<string | null>(null)

export const createSubscriberFx = createEffect(clientApi.createSubscriber)
export const storeSubscriberIdFx = createEffect(storageApi.setSubscribitionId)

export const $subscriberCreating = createSubscriberFx.pending

sample({
  clock: createSubscriber,
  filter: Boolean,
  target: createSubscriberFx,
})

sample({
  clock: createSubscriberFx.doneData,
  fn: ({ id }) => id,
  target: $subscriberId,
})

sample({
  clock: createSubscriberFx.done,
  target: subscriberCreated,
})

sample({
  clock: storeSubscriberId,
  source: $subscriberId,
  filter: Boolean,
  target: storeSubscriberIdFx,
})

sample({
  clock: storeSubscriberIdFx.done,
  target: subscriberStored,
})

$subscriberCreateError.on(createSubscriberFx.failData, errorMesage).reset(createSubscriber)
