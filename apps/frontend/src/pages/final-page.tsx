import { Rocket, StageLayout } from '~/entities/contest'
import { RestartButton } from '~/features/restart-contest'

const heading = `Класс! теперь ты\nучаствуешь в конкурсе`
const text = `Ты прошел все наши карты, но ты всегда\nможешь вызвать inDriver по-настоящему, для\nэтого переходи по ссылке!`

export function FinalPage() {
  return (
    <StageLayout heading={heading} text={text} sidebar={<Rocket animation="bump-up" />}>
      <RestartButton />
    </StageLayout>
  )
}
