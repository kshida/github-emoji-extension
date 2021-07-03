import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
import { ButtonThemeStyleRefs, ThemeStyleProps } from './Interface'

const useStyles = makeStyles({
  ul: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '0 4px',
    padding: '3px 0',
    listStyleType: 'none',
  },
  li: {
    cursor: 'pointer',
  },
  button: (props: ThemeStyleProps) => ({
    verticalAlign: 'middle',
    backgroundColor: 'transparent',
    border: '0',
    color: props.color,
    cursor: 'pointer',
    margin: '2px 0',
    padding: '0',
    transition: 'color 0.2s ease',
  }),
  span: {
    display: 'inline-block',
    lineHeight: '1',
  },
  svg: {
    '&:hover': {
      fill: '#0366d6',
    },
  },
})

export const Button: React.FC<ButtonThemeStyleRefs> = (props) => {
  const classes = useStyles(props.themes)

  const linkToRef = (index: number) => {
    props.refs[index]?.current?.scrollIntoView()
  }

  return (
    <ul className={classes.ul}>
      <li className={classes.li}>
        <button className={classes.button} onClick={() => linkToRef(0)}>
          <span className={classes.span}>
            <ClockIcon className={classes.svg} size="medium" />
          </span>
        </button>
      </li>
      <li>
        <button className={classes.button} onClick={() => linkToRef(1)}>
          <span className={classes.span}>
            <SmileyIcon className={classes.svg} size="medium" />
          </span>
        </button>
      </li>
      <li>
        <button className={classes.button} onClick={() => linkToRef(2)}>
          <span className={classes.span}>
            <SquirrelIcon className={classes.svg} size="medium" />
          </span>
        </button>
      </li>
      <li>
        <button className={classes.button} onClick={() => linkToRef(3)}>
          <span className={classes.span}>
            <BriefcaseIcon className={classes.svg} size="medium" />
          </span>
        </button>
      </li>
      <li>
        <button className={classes.button} onClick={() => linkToRef(4)}>
          <span className={classes.span}>
            <GiftIcon className={classes.svg} size="medium" />
          </span>
        </button>
      </li>
      <li>
        <button className={classes.button} onClick={() => linkToRef(5)}>
          <span className={classes.span}>
            <ImageIcon className={classes.svg} size="medium" />
          </span>
        </button>
      </li>
      <li>
        <button className={classes.button} onClick={() => linkToRef(6)}>
          <span className={classes.span}>
            <RocketIcon className={classes.svg} size="medium" />
          </span>
        </button>
      </li>
      <li>
        <button className={classes.button} onClick={() => linkToRef(7)}>
          <span className={classes.span}>
            <MarkGithubIcon className={classes.svg} size="medium" />
          </span>
        </button>
      </li>
    </ul>
  )
}
