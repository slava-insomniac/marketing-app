import { PrismaClient } from '.prisma/client'

import { ENV } from '~/shared/config'

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal

export const prisma = global.prisma || new PrismaClient()

if (ENV === 'development') global.prisma = prisma
