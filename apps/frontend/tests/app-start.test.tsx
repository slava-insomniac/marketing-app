import { describe, expect, beforeEach, test, vi } from 'vitest'
import { type Scope, allSettled, fork } from 'effector'
import { Provider } from 'effector-react'
import { type RenderOptions, render, waitFor } from '@testing-library/react'

import { App } from '~/app'
import { appStarted } from '~/shared/app'
import { storageApi } from '~/shared/api/subscribers'

import { getSubscriberFx } from '~/entities/contest'

let scope: Scope

const subscriberId = crypto.randomUUID()

beforeEach(() => {
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
})

const options: RenderOptions = {
  wrapper: ({ children }) => <Provider value={scope}>{children}</Provider>,
}

describe('App initialization', () => {
  test('renders participate-page by default', async () => {
    render(<App />, options)

    await waitFor(async () => {
      await allSettled(appStarted, { scope })
    })

    expect(globalThis.location.pathname).toBe('/participate')
  })

  test('renders final-page if user already participated', async () => {
    storageApi.setSubscribitionId(subscriberId)

    render(<App />, options)

    await waitFor(async () => {
      await allSettled(appStarted, { scope })
    })

    expect(window.location.pathname).toBe('/final')
  })
})
