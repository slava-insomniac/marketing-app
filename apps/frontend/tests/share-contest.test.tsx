import { vi, beforeEach, describe, test, expect } from 'vitest'
import { Provider } from 'effector-react'
import { allSettled, fork, Scope } from 'effector'
import { type RenderOptions, render, screen, waitFor } from '@testing-library/react'
import { type UserEvent, userEvent } from '@testing-library/user-event'

import { Providers as AppProviders } from '~/app/providers'

import { $email } from '~/entities/contest'
import { createSubscriberFx } from '~/entities/subscriber'
import { Share } from '~/features/share-contest'
import { contestShared } from '~/features/share-contest/model'

let scope: Scope
let user: UserEvent

const selectors = {
  form: () => screen.getByRole('form'),
  badge: () => screen.getByRole('status'),
  header: () => screen.getByRole('contentinfo'),
  input: () => screen.getByRole('input'),
  button: () => screen.getByRole('button'),
  error: () => screen.getByRole('alert'),
}

beforeEach(() => {
  user = userEvent.setup()
})

const options: RenderOptions = {
  wrapper: ({ children }) => (
    <Provider value={scope}>
      <AppProviders>{children}</AppProviders>
    </Provider>
  ),
}

describe('Share contest', () => {
  test('renders header, share buttons and confirm button', async () => {
    scope = fork()

    render(<Share />, options)

    await waitFor(async () => {
      await allSettled($email, { scope, params: 'email@email.com' })
    })

    expect(selectors.form().getAttribute('data-disabled')).toBe('false')
    expect(selectors.badge()).toHaveTextContent('2')
    expect(selectors.header()).toHaveTextContent('Поделись с друзьями')

    expect(screen.getByDisplayValue('facebook')).toBeInTheDocument()
    expect(screen.getByDisplayValue('vk')).toBeInTheDocument()
    expect(screen.getByDisplayValue('twitter')).toBeInTheDocument()
    expect(screen.getByDisplayValue('telegram')).toBeInTheDocument()
    expect(screen.getByDisplayValue('whatsapp')).toBeInTheDocument()

    expect(selectors.error()).toHaveTextContent('')
    expect(selectors.button()).toHaveTextContent('Я поделился')
  })

  test('shows error if user not shared link', async () => {
    scope = fork()

    render(<Share />, options)

    await waitFor(async () => {
      await allSettled($email, { scope, params: 'email@email.com' })
      await user.click(selectors.button())
    })

    expect(selectors.error()).toHaveTextContent('Надо все же поделиться')
  })

  test('should create subscribition after sharing once', async () => {
    const createSubscriberMock = vi.fn().mockImplementation(() => ({
      id: crypto.randomUUID(),
    }))
    const email = 'email@email.com'

    scope = fork({
      values: new Map().set($email, email),
      handlers: new Map().set(createSubscriberFx, createSubscriberMock),
    })

    render(<Share />, options)

    await waitFor(async () => {
      await allSettled($email, { scope, params: email })
      await allSettled(contestShared, { scope, params: 'facebook' })
      await allSettled(contestShared, { scope, params: 'vk' })
      await allSettled(contestShared, { scope, params: 'twitter' })
    })

    expect(createSubscriberMock).toBeCalledWith(email)
    expect(createSubscriberMock).toBeCalledTimes(1)
  })
})
