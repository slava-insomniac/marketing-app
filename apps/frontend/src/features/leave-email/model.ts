import { sample, createEvent, createStore, createEffect, combine } from 'effector'
import { or } from 'patronum'

import { yes, no, errorMesage } from '~/shared/lib/shortcuts'
import { clientApi } from '~/shared/api/subscribers'
import { $email, createSubscriberRefFx } from '~/entities/contest'

import { createTextInputModel, validateEmail } from './lib'

export const input = createTextInputModel()

export const formSubmitted = createEvent<React.FormEvent<HTMLFormElement>>()

const $validationError = createStore<string | null>(null)
const $serverError = createStore<string | null>(null)

export const $buttonDisabled = createStore(false)
export const $error = combine($validationError, $serverError)
export const $completed = $email.map(Boolean)

export const validateEmailFx = createEffect<string, void, Error>((email) => {
  const emailInvalid = !validateEmail(email)

  if (email.length > 0 && emailInvalid) {
    throw new Error('Неверный формат почты')
  }
})

export const subscriberEmailExistsFx = createEffect(clientApi.subscriberEmailExists)

export const $pending = or(subscriberEmailExistsFx.pending, createSubscriberRefFx.pending)

sample({
  clock: input.$value,
  filter: input.$dirty,
  target: validateEmailFx,
})

sample({
  clock: input.$dirty,
  source: input.$value,
  target: validateEmailFx,
})

sample({
  clock: input.$value,
  fn: (email) => email.length === 0,
  target: $buttonDisabled,
})

sample({
  clock: validateEmailFx.done,
  fn: no,
  target: $buttonDisabled,
})

sample({
  clock: validateEmailFx.fail,
  fn: yes,
  target: $buttonDisabled,
})

sample({
  clock: input.$value,
  filter: (email) => email.length === 0,
  fn: yes,
  target: $buttonDisabled,
})

sample({
  clock: formSubmitted,
  source: input.$value,
  filter: Boolean,
  target: subscriberEmailExistsFx,
})

sample({
  clock: subscriberEmailExistsFx.doneData,
  filter: ({ exists }) => exists,
  fn: () => 'Пользователь с такой почтой уже участвует',
  target: [$serverError, input.resetted],
})

sample({
  clock: subscriberEmailExistsFx.doneData,
  source: input.$value,
  filter: (_, { exists }) => exists === false,
  fn: (email) => email,
  target: $email,
})

formSubmitted.watch((event) => event.preventDefault())

input.$hasError.on(validateEmailFx.fail, yes)

$validationError.on(validateEmailFx.failData, errorMesage)
$validationError.reset(input.changed, validateEmailFx.done, $email)

$serverError.on(subscriberEmailExistsFx.failData, errorMesage)
$serverError.reset(input.changed, $email)
