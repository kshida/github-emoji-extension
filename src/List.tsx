import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Emoji } from './Emoji';
import { EmojiUseState } from './Interface';

const useStyles = makeStyles({
    ul: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyleType: 'none',
    },
    li: {
        cursor: 'pointer'
    }
})

export const List: React.FC<EmojiUseState> = (props) => {
    const [emojiList, setEmojiList] = useState([]);

    useEffect(() => {
        // TODO: GitHubに入った段階で取得しておく
        // TODO: アイコンパスは初回ビルド時にキャッシュで持っていても良いかも？APIのレスポンスでキャッシュを更新する
        // 絵文字データを取得
        axios.get('https://api.github.com/emojis')
            .then(res => {
                const emojis = Object.entries(res.data).map(([eKey, ePath]) => {
                    return {
                        key: eKey,
                        iconPath: ePath
                    }
                })
                setEmojiList(emojis);
            })
    }, [])

    const classes = useStyles()
    return (
        <ul className={classes.ul}>
            {emojiList.map(emoji => {
                return <li className={classes.li}><Emoji setEmoji={props.setEmoji} value={emoji.key} iconPath={emoji.iconPath} /></li>
            })}
        </ul>
    );
}
