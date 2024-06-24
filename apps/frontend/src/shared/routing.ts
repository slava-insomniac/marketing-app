import { createRoute, createHistoryRouter } from 'atomic-router'

export const routes = {
  participate: createRoute(),
  final: createRoute(),
}

const routesMap = [
  { path: '/participate', route: routes.participate },
  { path: '/final', route: routes.final },
]

export const router = createHistoryRouter({
  routes: routesMap,
})
