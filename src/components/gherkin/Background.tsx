import * as React from 'react'
import Keyword from './Keyword'
import Description from './Description'
import Step from './Step'
import { messages } from 'cucumber-messages'
import IBackground = messages.GherkinDocument.Feature.IBackground
import StepList from './StepList'

interface IProps {
  background: IBackground
}

const Background: React.FunctionComponent<IProps> = ({ background }) => {
  return (
    <section>
      <h2>
        <Keyword>{background.keyword}</Keyword>: <span>{background.name}</span>
      </h2>
      <Description description={background.description} />
      <StepList steps={background.steps || []} />
    </section>
  )
}

export default Background
