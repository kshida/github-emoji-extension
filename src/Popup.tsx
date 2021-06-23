import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from './List';
import { TextArea } from './Interface';

const POPUP_ID = 'popup-frame';

const useStyles = makeStyles({
    popup: {
        position: 'fixed',
        zIndex: 999,
        width: '360px',
        height: '340px',
        padding: '4px',
        backgroundColor: 'white',
        borderRadius: '6px',
        border: '1px solid',
        overflow: 'scroll',
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
    // search: {
    //   padding: '14px',
    //   position: 'relative'
    // },
})

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

export const Popup: React.FC<TextArea> = (props) => {
    const [emojiCode, setEmojiCode] = useState('');
    const nowTextArea = props.nowArea;
    const classes = useStyles()

    useEffect(() => {
        if (nowTextArea && emojiCode) {
            const nowText = nowTextArea.value;
            const caret = nowTextArea.selectionStart;
            nowTextArea.value = `${nowText.substr(0, caret)}:${emojiCode}:${nowText.substr(caret)}`;
            nowTextArea.focus();
            console.log("nowTextArea");
            console.log(nowTextArea);
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
