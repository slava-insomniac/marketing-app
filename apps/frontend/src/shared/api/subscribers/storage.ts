import { SubscribitionIdSchema } from './validations'

const key = 'subscribitionId'

export function getSubscribitionId(): string | null {
  const id = globalThis.localStorage.getItem(key)

  if (id) {
    return SubscribitionIdSchema.parse(id)
  }

  return null
}

export function setSubscribitionId(id: string) {
  SubscribitionIdSchema.parse(id)

  globalThis.localStorage.setItem(key, id)
}

export function deleteSubscribitionId() {
  globalThis.localStorage.removeItem(key)
}
