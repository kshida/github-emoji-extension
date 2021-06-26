import { addListener } from './KeyboardAction';
import { createPopup, hidePopup, POPUP_ID } from './Popup';

window.onload = () => {
    createPopup();
    addListener();
}

window.addEventListener(`scroll`, hidePopup, {passive: true});
window.addEventListener(`click`, (event => {
    // ポップアップの外側をクリックした場合はポップアップを閉じる
    if (!(event.target as HTMLElement).closest(`#${POPUP_ID}`)) hidePopup();
}), {passive: true});