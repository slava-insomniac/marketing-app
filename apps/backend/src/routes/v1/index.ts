import express from 'express'

import subscriberRoute from './subscriber.route'

const router = express.Router()

const routes = [
  {
    path: '/subscribers',
    route: subscriberRoute,
  },
]

routes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
