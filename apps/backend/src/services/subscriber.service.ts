import httpStatus from 'http-status'
import CryptoJS from 'crypto-js'

import { prisma, ApiError } from '~/shared/lib'
import { SECRET_KEY } from '~/shared/config'

export type Subscriber = {
  id: string
  email: string
}

export const createSubscriber = async (email: string): Promise<Subscriber> => {
  if (await getSubscriber({ email })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }

  return prisma.subscriber.create({
    data: {
      email,
    },
  })
}

export const getSubscriber = async ({ id, email }: Partial<Subscriber>): Promise<Subscriber | null> => {
  const OR = []

  if (id) OR.push({ id })
  if (email) OR.push({ email })

  return await prisma.subscriber.findFirst({
    where: {
      OR,
    },
  })
}

export const createRef = async (email: string): Promise<string> => {
  return CryptoJS.AES.encrypt(email, SECRET_KEY).toString()
}
