import { Server } from 'http'

import { app } from '~/app'
import { prisma } from '~/shared/lib'
import { PORT, logger } from '~/shared/config'

let server: Server

prisma.$connect().then(() => {
  logger.info('Connected to DB')
  server = app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}`)
  })
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
