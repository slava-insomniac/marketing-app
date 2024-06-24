import { request } from '../request'

import { SubscriberSchema, SubscriberEmailExistsSchema, SubscriberCreateRefSchema, Subscriber } from './validations'

export async function getSubscriber(id: string): Promise<Subscriber> {
  const data = await request.get(`/api/v1/subscribers/${id}`)

  return SubscriberSchema.parse(data)
}

export async function createSubscriber(email: string): Promise<Subscriber> {
  const data = await request.post(`/api/v1/subscribers`, { email })

  return SubscriberSchema.parse(data)
}

export async function subscriberEmailExists(email: string): Promise<{ exists: boolean }> {
  const data = await request.post(`/api/v1/subscribers/email-exists`, { email })

  return SubscriberEmailExistsSchema.parse(data)
}

export async function subscriberCreateRef(email: string): Promise<{ ref: string }> {
  const data = await request.post(`/api/v1/subscribers/create-ref`, { email })

  return SubscriberCreateRefSchema.parse(data)
}
