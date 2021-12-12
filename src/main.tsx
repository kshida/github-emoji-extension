import { addListener } from './KeyboardAction'
import { createPopup, hidePopup, POPUP_ID, setSameThemeAsGithub } from './Popup'

window.onload = () => {
  setSameThemeAsGithub()
  createPopup()
  addListener()
}

// Close the pop-up when you click outside the pop-up
window.addEventListener(
  `click`,
  (event) => {
    if (!(event.target as HTMLElement).closest(`#${POPUP_ID}`)) hidePopup()
  },
  { passive: true }
)
