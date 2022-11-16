import React from 'react'
import { styled } from '@mui/styles'
import {
  ClockIcon,
  SmileyIcon,
  SquirrelIcon,
  BriefcaseIcon,
  GiftIcon,
  ImageIcon,
  RocketIcon,
  MarkGithubIcon,
} from '@primer/octicons-react'
import { EmojiRef } from './Interface'

// Style settings for button.
const UlComponent = styled('ul')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  margin: '0 4px',
  padding: '3px 0',
  listStyleType: 'none',
})
const LiComponent = styled('li')({
  cursor: 'pointer',
})
const SpanComponent = styled('span')({
  display: 'inline-block',
  lineHeight: '1',
  '&:hover': {
    opacity: 0.5,
  },
})
const ButtonComponent = styled('button')({
  verticalAlign: 'middle',
  backgroundColor: 'transparent',
  border: '0',
  cursor: 'pointer',
  margin: '2px 0',
  padding: '0',
  transition: 'color 0.2s ease',
})

/**
 * Draw a category button.
 * @param props List of refs and styles passed from the parent element.
 * @returns Returns the dom of the category button.
 */
export const Button: React.FC<EmojiRef> = (props) => {
  // Scroll to the target position according to the category button you pressed.
  const linkToRef = (index: number) => {
    props.refs[index]?.current?.scrollIntoView()
  }

  return (
    <UlComponent>
      <LiComponent>
        <ButtonComponent onClick={() => linkToRef(0)}>
          <SpanComponent>
            <ClockIcon size="medium" />
          </SpanComponent>
        </ButtonComponent>
      </LiComponent>
      <LiComponent>
        <ButtonComponent onClick={() => linkToRef(1)}>
          <SpanComponent>
            <SmileyIcon size="medium" />
          </SpanComponent>
        </ButtonComponent>
      </LiComponent>
      <LiComponent>
        <ButtonComponent onClick={() => linkToRef(2)}>
          <SpanComponent>
            <SquirrelIcon size="medium" />
          </SpanComponent>
        </ButtonComponent>
      </LiComponent>
      <LiComponent>
        <ButtonComponent onClick={() => linkToRef(3)}>
          <SpanComponent>
            <BriefcaseIcon size="medium" />
          </SpanComponent>
        </ButtonComponent>
      </LiComponent>
      <LiComponent>
        <ButtonComponent onClick={() => linkToRef(4)}>
          <SpanComponent>
            <GiftIcon size="medium" />
          </SpanComponent>
        </ButtonComponent>
      </LiComponent>
      <LiComponent>
        <ButtonComponent onClick={() => linkToRef(5)}>
          <SpanComponent>
            <ImageIcon size="medium" />
          </SpanComponent>
        </ButtonComponent>
      </LiComponent>
      <LiComponent>
        <ButtonComponent onClick={() => linkToRef(6)}>
          <SpanComponent>
            <RocketIcon size="medium" />
          </SpanComponent>
        </ButtonComponent>
      </LiComponent>
      <LiComponent>
        <ButtonComponent onClick={() => linkToRef(7)}>
          <SpanComponent>
            <MarkGithubIcon size="medium" />
          </SpanComponent>
        </ButtonComponent>
      </LiComponent>
    </UlComponent>
  )
}
