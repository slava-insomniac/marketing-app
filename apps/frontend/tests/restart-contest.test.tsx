import { vi, describe, test, expect, beforeEach } from 'vitest'
import { type RenderOptions, render, screen, fireEvent } from '@testing-library/react'
import { type Scope, allSettled, fork } from 'effector'
import { Provider } from 'effector-react'

import { App } from '~/app'
import { appStarted } from '~/shared/app'
import { storageApi } from '~/shared/api/subscribers'
import { $email, $sharedPlatforms, getSubscriberFx } from '~/entities/contest'

let scope: Scope

beforeEach(async () => {
  const subscriberId = crypto.randomUUID()
  const handlers = new Map()

  handlers.set(
    getSubscriberFx,
    vi.fn().mockImplementation(() => ({
      id: subscriberId,
    })),
  )

  scope = fork({
    handlers,
  })

  storageApi.setSubscribitionId(subscriberId)

  await allSettled(appStarted, { scope })
  await allSettled($email, { scope, params: 'email@email.com' })
  await allSettled($sharedPlatforms, { scope, params: new Set(['facebook']) })
})

const options: RenderOptions = {
  wrapper: ({ children }) => <Provider value={scope}>{children}</Provider>,
}

describe('Restart contest', () => {
  test('redirects to participate page after button click', () => {
    render(<App />, options)

    expect(window.location.pathname).toBe('/final')

    fireEvent.click(screen.getByRole('button'))

    expect(storageApi.getSubscribitionId()).toBe(null)
    expect(globalThis.location.pathname).toBe('/participate')
    expect(scope.getState($email)).toBe(null)
    expect(scope.getState($sharedPlatforms).size).toBe(0)
  })
})
