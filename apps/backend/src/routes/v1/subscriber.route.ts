import express from 'express'

import { validate } from '~/middlewares'
import { subscriberValidation } from '~/validations'
import { subscriberController } from '~/controllers'

const router = express.Router()

router.route('/').post(validate(subscriberValidation.createSubscriber), subscriberController.createSubscriber)

router.route('/:subscriberId').get(validate(subscriberValidation.getSubscriber), subscriberController.getSubscriber)

router
  .route('/email-exists')
  .post(validate(subscriberValidation.subscriberEmailExists), subscriberController.subscriberEmailExists)

router
  .route('/create-ref')
  .post(validate(subscriberValidation.subscriberCreateRef), subscriberController.subscriberCreateRef)

export default router
