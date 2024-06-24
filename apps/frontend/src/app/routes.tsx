import { Route } from 'atomic-router-react'

import { routes } from '~/shared/routing'
import { ParticipatePage } from '~/pages/participate-page'
import { FinalPage } from '~/pages/final-page'

export function Routes() {
  return (
    <>
      <Route route={routes.participate} view={ParticipatePage} />
      <Route route={routes.final} view={FinalPage} />
    </>
  )
}
