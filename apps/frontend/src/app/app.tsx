import './app.css'

import { not } from 'patronum'
import { sample } from 'effector'
import { createBrowserHistory, createMemoryHistory } from 'history'

import { appStarted, $isBrowser } from '~/shared/app'
import { router } from '~/shared/routing'
import { Header } from '~/widgets/header'

import { Providers } from './providers'
import { Routes } from './routes'
import { Layout } from './layout'

sample({
  clock: appStarted,
  filter: $isBrowser,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
})

sample({
  clock: appStarted,
  filter: not($isBrowser),
  fn: () => createMemoryHistory(),
  target: router.setHistory,
})

export function App() {
  return (
    <Providers>
      <Layout>
        <Header />
        <Routes />
      </Layout>
    </Providers>
  )
}
