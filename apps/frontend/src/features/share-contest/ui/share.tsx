import { useUnit } from 'effector-react'

import { Badge, Text, Button } from '~/shared/ui'
import { Form } from '~/entities/contest'

import { formSubmitted, $error, $disabled, $pending } from '../model'

import { ButtonsList } from './buttons-list'

const errorStyle = { alignContent: 'end', color: '#F54759' }

export function Share() {
  const [submitted, error, disabled, pending] = useUnit([formSubmitted, $error, $disabled, $pending])
  const formDisabled = disabled || pending

  return (
    <Form role="form" aria-label="Share contest form" onSubmit={submitted} disabled={formDisabled}>
      <Form.Header>
        <Badge role="status" aria-label="Share contest form number" disabled={formDisabled} count={2} />{' '}
        <Text role="contentinfo" aria-label="Share contest form heading" weight="bold">
          Поделись с друзьями
        </Text>
      </Form.Header>
      <Form.Body>
        <ButtonsList />
        <Form.Error role="alert" aria-label="Share contest form error" style={errorStyle}>
          {error}
        </Form.Error>
        <Button type="submit" role="button" aria-label="Share contest form submit" tabIndex={formDisabled ? -1 : 0}>
          Я поделился
        </Button>
      </Form.Body>
    </Form>
  )
}
