import { useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { reflect } from '@effector/reflect'
import { or } from 'patronum'

import { Badge, Text, Button, Input, InputRef, useDetectDevice } from '~/shared/ui'
import { Form } from '~/entities/contest'

import { formSubmitted, $completed, $buttonDisabled, $error, $pending, input } from './model'

export function LeaveEmail() {
  const inputRef = useRef<InputRef>(null)

  const { isMobile } = useDetectDevice()

  const [submitted, completed, buttonDisabled, error, pending] = useUnit([
    formSubmitted,
    $completed,
    $buttonDisabled,
    $error,
    $pending,
  ])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const formDisabled = pending || completed
  const tabIndex = formDisabled ? -1 : 0

  if (isMobile && completed) {
    return null
  }

  return (
    <Form role="form" aria-label="Leave email form" onSubmit={submitted} disabled={formDisabled}>
      <Form.Header>
        <Badge
          role="status"
          aria-label="Leave email form number"
          success={completed}
          disabled={formDisabled}
          count={1}
        />{' '}
        <Text role="contentinfo" aria-label="Leave email form heading" weight="bold">
          Оставь актуальный email
        </Text>
      </Form.Header>
      <Form.Body>
        <EmailInput role="textbox" aria-label="Leave email form input" ref={inputRef} tabIndex={tabIndex} />
        <Form.Error role="alert" aria-label="Leave email form error">
          {error}
        </Form.Error>
        <Button
          role="button"
          type="submit"
          aria-label="Leave email form submit button"
          ghost
          disabled={buttonDisabled}
          tabIndex={tabIndex}
        >
          Я оставил
        </Button>
      </Form.Body>
    </Form>
  )
}

const EmailInput = reflect({
  view: Input,
  bind: {
    name: 'email',
    value: input.$value,
    placeholder: 'Ввести email',
    readOnly: or($completed, $pending),
    onChange: input.changed,
    hasError: input.$hasError,
    disabled: input.$disabled,
  },
})
