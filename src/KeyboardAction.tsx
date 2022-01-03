import { getPopup, setFocusArea } from './Popup'

/**
 * Set up a listener.
 */
export const addListener = (): void => {
  addListenerForSlashKey()
}

/**
 * Set up a listener to display a popup when ctrl and slash is pressed.
 */
const addListenerForSlashKey = () => {
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    // Get the dom of the textarea in focus.
    const textAreaElement =
      document.activeElement instanceof HTMLTextAreaElement
        ? document.activeElement
        : null
    // Check whether or not to show popup.
    if (event.ctrlKey && event.code === 'Slash' && textAreaElement) {
      event.preventDefault()
      initPopupPosition(textAreaElement)
    }
  })
}

/**
 * Adjust the display position of the popup.
 * @param textAreaElement Focused textarea dom.
 */
const initPopupPosition = (textAreaElement: HTMLTextAreaElement) => {
  // Calculate the distance from the textarea to the cursor.
  const position = getCursorOffsetPosition(
    textAreaElement,
    textAreaElement.value.substring(0, textAreaElement.selectionStart)
  )

  // Get the coordinates of the target textarea.
  const parentX = textAreaElement.getBoundingClientRect().left
  const parentY = textAreaElement.getBoundingClientRect().top

  // Determine the coordinates of the cursor.
  const cursorX = parentX + position.left
  const cursorY = parentY + position.top

  const popup = getPopup()
  if (!popup) return
  setFocusArea(textAreaElement)

  const screenWidth = document.body.clientWidth
  // Calculate if a popup is out of the browser.
  const isExceedsBrowserHeight = cursorY - 340 <= 0
  const isExceedsBrowserWidth = cursorX + 348 >= screenWidth

  popup.style.display = 'block'
  // Adjust the position of the popup if it is out of the browser.
  popup.style.top = isExceedsBrowserHeight
    ? `${cursorY + 25}px`
    : `${cursorY - 340}px`
  popup.style.left = isExceedsBrowserWidth
    ? `${cursorX - 348}px`
    : `${cursorX}px`
}

/**
 * Calculate the offset coordinates of the cursor.
 * @param textAreaElement Focused textarea dom.
 * @param text String being input.
 * @returns Return the coordinates of the cursor.
 */
const getCursorOffsetPosition = (
  textAreaElement: HTMLTextAreaElement,
  text: string
) => {
  const dummyDiv = document.createElement('div')

  // Get the style of the parent element of the textarea in focus.
  const taStyle = window.getComputedStyle(textAreaElement)

  // Copy the style to a dummy div.
  for (const k in taStyle) {
    dummyDiv.style.setProperty(k, taStyle[k])
  }

  // Draw a dummy div off-screen.
  dummyDiv.style.position = 'absolute'
  dummyDiv.style.top = '0'
  dummyDiv.style.left = '-9999'
  document.body.appendChild(dummyDiv)

  // Generate span to calculate the cursor coordinates.
  const span = document.createElement('span')
  // Insert an appropriate string to add size to the span.
  span.innerHTML = '&nbsp;'

  dummyDiv.textContent = text
  dummyDiv.scrollTop = dummyDiv.scrollHeight
  dummyDiv.appendChild(span)

  // Get the offset position of span.
  const position = {
    top: span.offsetTop,
    left: span.offsetLeft,
    height: parseInt(taStyle['lineHeight']),
  }

  document.body.removeChild(dummyDiv)

  return position
}
