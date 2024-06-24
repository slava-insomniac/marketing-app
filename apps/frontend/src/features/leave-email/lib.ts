/* eslint-disable no-useless-escape */

import { sample, createEvent, createStore } from 'effector'
import { debounce } from 'patronum'

import { yes } from '~/shared/lib/shortcuts'

export function createTextInputModel() {
  const changed = createEvent<React.ChangeEvent<HTMLInputElement>>()
  const resetted = createEvent<React.ChangeEvent<HTMLInputElement>>()

  const $value = createStore<string>('')

  const $hasError = createStore(false)
  const $disabled = createStore(false)
  const $dirty = createStore(false)

  sample({
    clock: debounce(changed, 300),
    fn: yes,
    target: $dirty,
  })

  $dirty.reset(resetted)
  $value.reset(resetted)
  $hasError.reset(resetted, changed)

  $value.on(changed, (_, event) => event.currentTarget.value)

  return { changed, resetted, $value, $hasError, $disabled, $dirty }
}

export function validateEmail(email: string) {
  const expression =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return expression.test(email)
}
