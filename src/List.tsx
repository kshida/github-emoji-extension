import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { CategorizeEmojiData, Emoji } from './Emoji';
import { EmojiUseStateRefs, EmojiProps } from './Interface';

const useStyles = makeStyles({
    ul: {
        lineHeight: '1',
        marginLeft: '8px',
        display: 'flex',
        flexWrap: 'wrap',
        listStyleType: 'none',
    },
    li: {
        padding: '5px',
        cursor: 'pointer'
    },
    categoryTitle: {
        padding: '5px 8px'
    },
    titleFont: {
        fontSize: '18px',
        fontWeight: 'bold'
    },
})

export const List: React.FC<EmojiUseStateRefs> = (props) => {
    const [emojiList, setEmojiList] = useState([]);

    useEffect(() => {
        // 絵文字データを取得
        axios.get('https://api.github.com/emojis')
            .then(res => {
                const emojis = Object.entries(res.data).map(([eKey, ePath]: [string, string]): EmojiProps => {
                    return {
                        emojiKey: eKey,
                        emojiPath: ePath
                    }
                })
                setEmojiList(CategorizeEmojiData(emojis));
            })
    }, [])

    const classes = useStyles()
    return (
        <div>
            {emojiList.filter((emojiData, index) => index === 0 || emojiData.props.length > 0).map((emojis, index) => {
                return (
                    <React.Fragment>
                        <div id={emojis.category} className={classes.categoryTitle} ref={props.refs[index]}>
                            <span className={classes.titleFont}>{emojis.category}</span>
                        </div>
                        <ul className={classes.ul}>
                            {emojis.props.map((emoji: EmojiProps) => {
                                return <li className={classes.li}><Emoji setEmoji={props.setEmoji} emojiKey={emoji.emojiKey} emojiPath={emoji.emojiPath} /></li>
                            })}
                        </ul>
                    </React.Fragment>
                )
            })}
        </div>
    );
}
