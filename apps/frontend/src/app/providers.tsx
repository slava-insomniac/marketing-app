import { RouterProvider } from 'atomic-router-react'

import { DetectDeviceProvider } from '~/shared/ui'
import { router } from '~/shared/routing'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <DetectDeviceProvider>
      <RouterProvider router={router}>{children}</RouterProvider>
    </DetectDeviceProvider>
  )
}
