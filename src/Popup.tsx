import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { List } from './List';

export const POPUP_ID = 'popup-frame';

const useStyles = makeStyles({
    popup: {
        position: 'fixed',
        zIndex: 999,
        width: '346px',
        height: '340px',
        padding: '4px',
        backgroundColor: 'white',
        borderRadius: '6px',
        border: '1px solid',
        overflow: 'scroll',
        display: 'none',
    },
    content: {
        overflow: 'hidden',
        flexDirection: 'column'
    },
    group: {
        padding: '4px 0 0 7px',
        borderBottom: '1px solid rgba(0, 0, 0, .15)',
        height: '38px'
    },
})

export const createPopup = () => {
    // 絵文字用ポップアップを生成
    const app = document.createElement('div');
    document.body.append(app);
    ReactDOM.render(<Popup />, app);
}

export const getPopup = (): HTMLElement => {
    return document.getElementById(POPUP_ID)
}

let ticking = false;
export const hidePopup = () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            ticking = false;
            const popup = getPopup();
            if (popup && popup.style.display != 'none') {
                popup.style.display = `none`;
            }
        });
        ticking = true;
    }
}

let focusTextArea: HTMLTextAreaElement = null;
export const setFocusArea = (textAreaElement: HTMLTextAreaElement) => {
    focusTextArea = textAreaElement;
}

export const getFocusArea = () => {
    return focusTextArea;
}

export const Popup: React.FC = () => {
    const [emojiCode, setEmojiCode] = useState('');
    const classes = useStyles()

    useEffect(() => {
        if (focusTextArea && emojiCode) {
            const nowText = focusTextArea.value;
            const caret = focusTextArea.selectionStart;
            focusTextArea.value = `${nowText.substr(0, caret)}:${emojiCode}:${nowText.substr(caret)}`;
            hidePopup();
            focusTextArea.focus();
        }
    }, [emojiCode])

    return (
        <div id={POPUP_ID} className={classes.popup}>
            <div className={classes.content}>
                <List setEmoji={setEmojiCode} />
            </div>
        </div>
    )
}
