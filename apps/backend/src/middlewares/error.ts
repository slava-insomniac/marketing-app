import httpStatus from 'http-status'
import { ErrorRequestHandler } from 'express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { ApiError } from '~/shared/lib'
import { ENV, logger } from '~/shared/config'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err
  if (ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(ENV === 'development' && { stack: err.stack }),
  }

  if (ENV === 'development') {
    logger.error(err)
  }

  res.status(statusCode).send(response)
}
