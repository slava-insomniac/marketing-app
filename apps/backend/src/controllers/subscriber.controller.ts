import httpStatus from 'http-status'

import { catchAsync, ApiError } from '~/shared/lib'
import { subscriberService } from '~/services'

export const getSubscriber = catchAsync(async (req, res) => {
  const subscriber = await subscriberService.getSubscriber({ id: req.params.subscriberId })

  if (!subscriber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subscriber not found')
  }

  res.send(subscriber)
})

export const createSubscriber = catchAsync(async (req, res) => {
  const subscriber = await subscriberService.createSubscriber(req.body.email)

  res.status(httpStatus.CREATED).send(subscriber)
})

export const subscriberEmailExists = catchAsync(async (req, res) => {
  const subscriber = await subscriberService.getSubscriber({ email: req.body.email })

  res.send({ exists: Boolean(subscriber) })
})

export const subscriberCreateRef = catchAsync(async (req, res) => {
  const ref = await subscriberService.createRef(req.body.email)

  res.send({ ref })
})
