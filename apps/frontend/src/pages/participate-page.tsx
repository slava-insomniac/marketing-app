import { Rocket, StageLayout } from '~/entities/contest'
import { Share } from '~/features/share-contest'
import { LeaveEmail } from '~/features/leave-email'

const heading = `Все круто! Tеперь\nвыигрывай путешествие`
const text = `Чтобы участвовать в розыгрыше\nпутешествия, оставь актуальную почту\nи поделись с друзьями`

export function ParticipatePage() {
  return (
    <StageLayout heading={heading} text={text} sidebar={<Rocket />}>
      <LeaveEmail />
      <Share />
    </StageLayout>
  )
}
