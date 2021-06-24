import { addListener } from './KeyboardAction';
import { createPopup, hidePopup } from './Popup';

window.onload = () => {
    createPopup();
    addListener();
}

window.addEventListener(`scroll`, hidePopup, {passive: true});
window.addEventListener(`click`, hidePopup, {passive: true});
