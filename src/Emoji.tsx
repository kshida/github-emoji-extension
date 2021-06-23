import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { EmojiProps } from './Interface';

const useStyles = makeStyles({
    p: {
        margin: '0px',
    },
    img: {
        height: '35px'
    }
})

const insertEmoji = (element: React.MouseEvent<HTMLSpanElement, MouseEvent>, setEmoji: React.Dispatch<React.SetStateAction<string>>): void => {
    const emojiStr = element.currentTarget.dataset.emojiKey;
    console.log("Set Emoji");
    setEmoji(emojiStr);
}

export const Emoji: React.FC<EmojiProps> = (props) => {
    const classes = useStyles()
    return (
        <p className={classes.p} data-emoji-key={props.value} onClick={(element) => insertEmoji(element, props.setEmoji)}>
            <img className={classes.img} src={props.iconPath}/>
        </p>
    );
}
