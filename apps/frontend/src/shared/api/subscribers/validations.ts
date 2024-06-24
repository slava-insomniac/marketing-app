import { z } from 'zod'

export const SubscriberSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
})

export type Subscriber = z.infer<typeof SubscriberSchema>

export const SubscriberEmailExistsSchema = z.object({
  exists: z.boolean(),
})

export const SubscriberCreateRefSchema = z.object({
  ref: z.string(),
})

export const SubscribitionIdSchema = z.string().uuid()
