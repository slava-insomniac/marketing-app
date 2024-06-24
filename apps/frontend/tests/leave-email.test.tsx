import { vi, beforeEach, describe, test, expect } from 'vitest'
import { Provider } from 'effector-react'
import { fork, Scope } from 'effector'
import { type RenderOptions, render, screen, waitFor } from '@testing-library/react'
import { type UserEvent, userEvent } from '@testing-library/user-event'

import { Providers as AppProviders } from '~/app/providers'
import { input, subscriberEmailExistsFx } from '~/features/leave-email/model'
import { LeaveEmail } from '~/features/leave-email'
import { $email } from '~/entities/contest'

let scope: Scope
let user: UserEvent

const validEmail = 'valid@email.com'
const invalidEmail = 'invalid#email.com'

const selectors = {
  form: () => screen.getByRole('form'),
  badge: () => screen.getByRole('status'),
  header: () => screen.getByRole('contentinfo'),
  input: () => screen.getByRole('textbox'),
  button: () => screen.getByRole('button'),
  error: () => screen.getByRole('alert'),
}

beforeEach(async () => {
  user = userEvent.setup()
})

const options: RenderOptions = {
  wrapper: ({ children }) => (
    <Provider value={scope}>
      <AppProviders>{children}</AppProviders>
    </Provider>
  ),
}

describe('Leave email', () => {
  test('renders header, input and submit button', async () => {
    scope = fork()

    render(<LeaveEmail />, options)

    expect(selectors.badge()).toHaveTextContent('1')
    expect(selectors.header()).toHaveTextContent('Оставь актуальный email')
    expect(selectors.input().getAttribute('placeholder')).toBe('Ввести email')
    expect(selectors.button()).toHaveTextContent('Я оставил')
    expect(selectors.button()).not.toHaveAttribute('disabled')
    expect(selectors.error()).toHaveTextContent('')
  })

  test('block submit and show error text if email invalid', async () => {
    scope = fork()

    render(<LeaveEmail />, options)

    await user.type(selectors.input(), invalidEmail)

    await waitFor(() => {
      expect(scope.getState(input.$hasError)).toBe(true)
      expect(selectors.error()).toHaveTextContent('Неверный формат почты')
      expect(selectors.button()).toHaveAttribute('disabled')
    })
  })

  test('shows error when saved email already exists', async () => {
    scope = fork({
      handlers: new Map().set(
        subscriberEmailExistsFx,
        vi.fn().mockImplementation(() => ({
          exists: true,
        })),
      ),
    })

    render(<LeaveEmail />, options)

    await user.type(selectors.input(), validEmail)
    await user.click(selectors.button())

    await waitFor(() => {
      expect(scope.getState(input.$hasError)).toBe(false)
      expect(selectors.error()).toHaveTextContent('Пользователь с такой почтой уже участвует')
      expect(selectors.button()).not.toHaveAttribute('disabled')
    })
  })

  test('disable form when email complete', async () => {
    scope = fork({
      handlers: new Map().set(
        subscriberEmailExistsFx,
        vi.fn().mockImplementation(() => ({
          exists: false,
        })),
      ),
    })

    render(<LeaveEmail />, options)

    await user.type(selectors.input(), validEmail)
    await user.click(selectors.button())

    await waitFor(() => {
      expect(selectors.form().getAttribute('data-disabled')).toBe('true')

      expect(scope.getState(input.$hasError)).toBe(false)
      expect(scope.getState($email)).toBe(validEmail)

      expect(selectors.error()).toHaveTextContent('')
      expect(selectors.button()).not.toHaveAttribute('disabled')
    })
  })
})
