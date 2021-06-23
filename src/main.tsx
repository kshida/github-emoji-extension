import { addListener } from './KeyboardAction';
import { hidePopup } from './Popup';

window.onload = () => {
    addListener();
}

window.addEventListener(`scroll`, hidePopup, {passive: true});
window.addEventListener(`click`, hidePopup, {passive: true});
