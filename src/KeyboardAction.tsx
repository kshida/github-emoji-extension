import { getPopup, setFocusArea } from './Popup'

/**
 * Set up a listener.
 */
export const addListener = (): void => {
  addListenerForSlashKey()
}

/**
 * Check if the cursor position satisfies the conditions to display the popup.
 * @param element Focused textarea dom.
 * @returns Return true if the popup should be shown.
 */
const checkShowPopupCaretPosition = (element: HTMLTextAreaElement) => {
  return (
    element.selectionStart === 0 ||
    element.value.substr(element.selectionStart - 1, 1) === ' '
  )
}

/**
 * Set up a listener to display a popup when the slash is pressed.
 */
const addListenerForSlashKey = () => {
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    // Get the dom of the textarea in focus.
    const textAreaElement =
      document.activeElement instanceof HTMLTextAreaElement
        ? document.activeElement
        : null
    // Check to show a popup when a slash is pressed.
    if (
      event.code === 'Slash' &&
      textAreaElement &&
      checkShowPopupCaretPosition(textAreaElement)
    ) {
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
    textAreaElement.value.substr(0, textAreaElement.selectionStart)
  )

  // Get the coordinates of the target textarea.
  const parentX = textAreaElement.getBoundingClientRect().left
  const parentY = textAreaElement.getBoundingClientRect().top

  // Determine the coordinates of the cursor.
  const cursorX = parentX + position.left
  const cursorY = parentY + position.top

  // Get the dom of the popup.
  let popup = getPopup()
  if (!popup) return
  // Temporarily save the textarea in focus.
  setFocusArea(textAreaElement)

  // Get the width of the browser.
  const screenWidth = document.body.clientWidth;

  // Calculate if a popup is out of the browser.
  const isExceedsBrowserHeight = (cursorY - 340) <= 0;
  const isExceedsBrowserWidth = (cursorX + 348) >= screenWidth;

  // Adjust the coordinates of the cursor so that it is at the bottom left of the popup.
  popup.style.display = 'block'
  // Adjust the position of the popup if it is out of the browser.
  popup.style.top = isExceedsBrowserHeight ? `${cursorY + 25}px` : `${cursorY - 340}px`
  popup.style.left = isExceedsBrowserWidth ? `${cursorX - 348}px` : `${cursorX}px`
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
  // Generate a dummy div.
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

  // Inserts the string that is being typed.
  dummyDiv.textContent = text
  // Adjust the scroll position.
  dummyDiv.scrollTop = dummyDiv.scrollHeight
  // Insert a span into the dummy div.
  dummyDiv.appendChild(span)

  // Get the offset position of span.
  const position = {
    top: span.offsetTop,
    left: span.offsetLeft,
    height: parseInt(taStyle['lineHeight']),
  }

  // Delete the dummy.
  document.body.removeChild(dummyDiv)

  return position
}
