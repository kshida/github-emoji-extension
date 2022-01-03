import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import { EmojiList, RecentlyList } from './List'
import { Button } from './Button'
import { RecentlyProps, ThemeStyleProps } from './Interface'

export const POPUP_ID = 'popup-frame'

// Initial value of the style.
let backgroundColorTheme = 'white'
let borderColorTheme = 'white'
let fontColorTheme = 'black'
let buttonColorTheme = 'white'
// Variables for adjusting the drawing timing of the animation.
let ticking = false
// Variable to store the textarea in focus.
let focusTextArea: HTMLTextAreaElement = null

// Style settings for popup.
const useStyles = makeStyles({
  popup: (props: ThemeStyleProps) => ({
    position: 'fixed',
    zIndex: 1000,
    width: '346px',
    height: '340px',
    padding: '4px',
    backgroundColor: props.backgroundColor,
    borderColor: props.borderColor,
    color: props.fontColor,
    borderRadius: '6px',
    border: '1px solid',
    display: 'none',
  }),
  category: {},
  content: {
    height: '286px',
    overflow: 'scroll',
    flexDirection: 'column',
  },
  group: {
    padding: '4px 0 0 7px',
    borderBottom: '1px solid rgba(0, 0, 0, .15)',
    height: '38px',
  },
})

/**
 * Generate a popup.
 */
export const createPopup = (): void => {
  const app = document.createElement('div')
  document.body.append(app)
  ReactDOM.render(<Popup />, app)
}

/**
 * Get a popup that has already been drawn.
 * @returns Return the dom of the popup that has been drawn.
 */
export const getPopup = (): HTMLElement => {
  return document.getElementById(POPUP_ID)
}

/**
 * Hides the popup that has already been drawn.
 */
export const hidePopup = (): void => {
  if (!ticking) {
    requestAnimationFrame(() => {
      ticking = false
      const popup = getPopup()
      if (popup && popup.style.display != 'none') {
        popup.style.display = `none`
      }
    })
    ticking = true
  }
}

/**
 * Set the textarea in focus.
 * @param textAreaElement Focused textarea dom.
 */
export const setFocusArea = (textAreaElement: HTMLTextAreaElement): void => {
  focusTextArea = textAreaElement
}

/**
 * Get the textarea in focus.
 * @returns Focused textarea dom.
 */
export const getFocusArea = (): HTMLTextAreaElement => {
  return focusTextArea
}

/**
 * Set up the same theme as GitHub.
 */
export const setSameThemeAsGithub = (): void => {
  const htmlDom = document.getElementsByTagName('html')
  const githubTheme = htmlDom[0].dataset.colorMode
  switch (githubTheme) {
    case 'auto':
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        const darkThemeColor = htmlDom[0].dataset.darkTheme
        checkAndSetThemeColor(darkThemeColor)
      } else {
        const lightThemeColor = htmlDom[0].dataset.lightTheme
        checkAndSetThemeColor(lightThemeColor)
      }
      break
    case 'dark': {
      const darkThemeColor = htmlDom[0].dataset.darkTheme
      checkAndSetThemeColor(darkThemeColor)
      break
    }
    case 'light':
    default: {
      const lightThemeColor = htmlDom[0].dataset.lightTheme
      checkAndSetThemeColor(lightThemeColor)
      break
    }
  }
}

/**
 * Set the style to match the GitHub theme.
 * @param themeColor Themes set up on GitHub.
 */
const checkAndSetThemeColor = (themeColor: string) => {
  switch (themeColor) {
    case 'dark':
      backgroundColorTheme = '#0d1117'
      borderColorTheme = '#30363d'
      fontColorTheme = '#c9d1d9'
      buttonColorTheme = 'rgb(201, 209, 217)'
      break
    case 'dark_dimmed':
      backgroundColorTheme = '#22272e'
      borderColorTheme = '#444c56'
      fontColorTheme = '#adbac7'
      buttonColorTheme = 'rgb(173, 186, 199)'
      break
    case 'light':
    default:
      backgroundColorTheme = '#ffffff'
      borderColorTheme = '#e1e4e8'
      fontColorTheme = '#24292e'
      buttonColorTheme = 'rgba(9, 30, 66, 0.54)'
      break
  }
}

/**
 * Draw a popup.
 * @returns Return the dom for the popup.
 */
export const Popup: React.FC = () => {
  const refArray = [...Array(8)].map(() => React.createRef<HTMLDivElement>())
  const [recentlyList, setRecentlyList] = useState<RecentlyProps[]>([])
  const [emojiCode, setEmojiCode] = useState('')
  const themeProps: ThemeStyleProps = {
    backgroundColor: backgroundColorTheme,
    borderColor: borderColorTheme,
    fontColor: fontColorTheme,
    color: buttonColorTheme,
  }
  const classes = useStyles(themeProps)

  useEffect(() => {
    if (focusTextArea && emojiCode) {
      const nowText = focusTextArea.value
      const caret = focusTextArea.selectionStart
      // Insert a emoji code in the focused textarea.
      focusTextArea.value = `${nowText.substring(
        0,
        caret
      )}:${emojiCode}:${nowText.substring(caret)}`
      setEmojiCode('')
      hidePopup()
      focusTextArea.focus()
    }
  }, [emojiCode])

  return (
    <div id={POPUP_ID} className={classes.popup}>
      <div className={classes.category}>
        <Button themes={themeProps} refs={refArray} />
      </div>
      <div className={classes.content}>
        <RecentlyList
          recentlyEmojis={recentlyList}
          setRecentlyEmoji={setRecentlyList}
          setEmoji={setEmojiCode}
          refs={refArray}
        />
        <EmojiList
          setRecentlyEmoji={setRecentlyList}
          setEmoji={setEmojiCode}
          refs={refArray}
        />
      </div>
    </div>
  )
}
