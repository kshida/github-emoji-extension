import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { styled } from '@mui/styles'
import { EmojiList, RecentlyList } from './List'
import { Button } from './Button'
import { RecentlyProps, ThemeStyleProps } from './Interface'

export const POPUP_ID = 'popup-frame'

// Initial value of the style.
let backgroundColorTheme = 'white'
let borderColorTheme = 'white'
let buttonColorTheme = 'white'
// Variables for adjusting the drawing timing of the animation.
let ticking = false
// Variable to store the textarea in focus.
let focusTextArea: HTMLTextAreaElement = null

// Style settings for popup.
const PopupComponent = styled('div')({
  position: 'fixed',
  zIndex: 1000,
  width: '346px',
  height: '340px',
  padding: '4px',
  borderRadius: '6px',
  border: '1px solid',
  display: 'none',
})
const ContentComponent = styled('div')({
  height: '286px',
  overflow: 'scroll',
  flexDirection: 'column',
})

/**
 * Generate a popup.
 */
export const createPopup = (): void => {
  const app = document.createElement('div')
  document.body.append(app)
  createRoot(app).render(<Popup />)
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
 * Get theme of popup.
 * @returns Theme of popup.
 */
export const getThemeColors = (): ThemeStyleProps => {
  return {
    backgroundColor: backgroundColorTheme,
    borderColor: borderColorTheme,
    color: buttonColorTheme,
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
      buttonColorTheme = '#c9d1d9'
      break
    case 'dark_dimmed':
      backgroundColorTheme = '#22272e'
      borderColorTheme = '#444c56'
      buttonColorTheme = '#adbac7'
      break
    case 'dark_high_contrast':
      backgroundColorTheme = '#0a0c10'
      borderColorTheme = '#7a828e'
      buttonColorTheme = '#f0f3f6'
      break
    case 'dark_colorblind':
    case 'dark_tritanopia':
      backgroundColorTheme = '#0d1117'
      borderColorTheme = '#21262d'
      buttonColorTheme = '#c9d1d9'
      break
    case 'light_high_contrast':
      backgroundColorTheme = '#ffffff'
      borderColorTheme = '#21262d'
      buttonColorTheme = '#0e1116'
      break
    case 'light_colorblind':
    case 'light_tritanopia':
      backgroundColorTheme = '#ffffff'
      borderColorTheme = '#21262d'
      buttonColorTheme = '#24292f'
      break
    case 'light':
    default:
      backgroundColorTheme = '#ffffff'
      borderColorTheme = '#e1e4e8'
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
    <PopupComponent id={POPUP_ID}>
      <div>
        <Button refs={refArray} />
      </div>
      <ContentComponent>
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
      </ContentComponent>
    </PopupComponent>
  )
}
