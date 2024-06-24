import Joi from 'joi'

const email: Joi.EmailOptions = { tlds: false }

export const getSubscriber = {
  params: Joi.object().keys({
    subscriberId: Joi.string().required().uuid(),
  }),
}

export const createSubscriber = {
  body: Joi.object().keys({
    email: Joi.string().required().email(email),
  }),
}

export const subscriberEmailExists = {
  body: Joi.object().keys({
    email: Joi.string().email(email).required(),
  }),
}

export const subscriberCreateRef = {
  body: Joi.object().keys({
    email: Joi.string().email(email).required(),
  }),
}
