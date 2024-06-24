import { sample, createEvent, createEffect } from 'effector'
import { redirect } from 'atomic-router'

import { routes } from '~/shared/routing'
import { $isBrowser } from '~/shared/app'
import { storageApi } from '~/shared/api/subscribers'
import { $email, $sharedPlatforms } from '~/entities/contest'

export const contestRestarted = createEvent()

const clearStorageFx = createEffect(storageApi.deleteSubscribitionId)

sample({
  clock: contestRestarted,
  filter: $isBrowser,
  target: clearStorageFx,
})

redirect({
  clock: contestRestarted,
  route: routes.participate,
})

$email.reset(contestRestarted)
$sharedPlatforms.reset(contestRestarted)
