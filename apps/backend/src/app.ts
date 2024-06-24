import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import httpStatus from 'http-status'
import compression from 'compression'

import routes from '~/routes/v1'
import { ApiError } from '~/shared/lib'
import { errorConverter, errorHandler } from '~/middlewares/error'

export const app = express()

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// v1 api routes
app.use('/v1', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)
