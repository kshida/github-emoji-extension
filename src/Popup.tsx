import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { EmojiList, RecentlyList } from './List';
import { Button } from './Button';
import { RecentlyProps, ThemeStyleProps } from './Interface';

export const POPUP_ID = 'popup-frame';

let backgroundColorTheme = 'white';
let borderColorTheme = 'white';
let fontColorTheme = 'black';

const useStyles = makeStyles({
    popup: (props: ThemeStyleProps) => ({
        position: 'fixed',
        zIndex: 999,
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
    category: {

    },
    content: {
        height: '286px',
        overflow: 'scroll',
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

export const setSameThemeAsGithub = () => {
    const htmlDom = document.getElementsByTagName('html');
    const githubTheme = htmlDom[0].dataset.colorMode;
    switch (githubTheme) {
        case 'auto':
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                const darkThemeColor = htmlDom[0].dataset.darkTheme;
                checkAndSetThemeColor(darkThemeColor);
            } else {
                const lightThemeColor = htmlDom[0].dataset.lightTheme;
                checkAndSetThemeColor(lightThemeColor);
            }
            break;
        case 'dark':
            const darkThemeColor = htmlDom[0].dataset.darkTheme;
            checkAndSetThemeColor(darkThemeColor);
            break;
        case 'light':
        default:
            const lightThemeColor = htmlDom[0].dataset.lightTheme;
            checkAndSetThemeColor(lightThemeColor);
            break;
    }
}

const checkAndSetThemeColor = (themeColor: string) => {
    switch (themeColor) {
        case 'dark':
            backgroundColorTheme = '#0d1117';
            borderColorTheme = '#30363d';
            fontColorTheme = '#c9d1d9';
            break;
        case 'dark_dimmed':
            backgroundColorTheme = '#22272e';
            borderColorTheme = '#444c56';
            fontColorTheme = '#adbac7';
            break;
        case 'light':
        default:
            backgroundColorTheme = '#ffffff';
            borderColorTheme = '#e1e4e8';
            fontColorTheme = '#24292e';
            break;
    }
}

const refArray = [...Array(8)].map(() => React.createRef<HTMLDivElement>());
export const Popup: React.FC = () => {
    const [recentlyList, setRecentlyList] = useState<RecentlyProps[]>([]);
    const [emojiCode, setEmojiCode] = useState('');
    const themeProps: ThemeStyleProps = {
        backgroundColor: backgroundColorTheme,
        borderColor: borderColorTheme,
        fontColor: fontColorTheme
    };
    const classes = useStyles(themeProps);

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
            <div className={classes.category}>
                <Button refs={refArray} />
            </div>
            <div className={classes.content}>
                <RecentlyList recentlyEmojis={recentlyList} setRecentlyEmoji={setRecentlyList} setEmoji={setEmojiCode} refs={refArray} />
                <EmojiList setRecentlyEmoji={setRecentlyList} setEmoji={setEmojiCode} refs={refArray} />
            </div>
        </div>
    )
}
