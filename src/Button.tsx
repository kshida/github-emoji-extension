import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    ClockIcon,
    SmileyIcon,
    SquirrelIcon,
    BriefcaseIcon,
    GiftIcon,
    ImageIcon,
    RocketIcon,
    MarkGithubIcon
} from '@primer/octicons-react';
import { EmojiRef } from './Interface';

const useStyles = makeStyles({
    ul: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: '0 4px',
        padding: '3px 0',
        listStyleType: 'none'
    },
    li: {

    },
    button: {
        verticalAlign: 'middle',
        backgroundColor: 'transparent',
        border: '0',
        color: 'rgba(9, 30, 66, 0.54)',
        cursor: 'pointer',
        margin: '2px 0',
        padding: '0',
        transition: 'color 0.2s ease'
    },
    span: {
        display: 'inline-block',
        lineHeight: '1',
    },
    svg: {
        maxHeight: '100%',
        maxWidth: '100%',
        verticalAlign: 'bottom',
        overflow: 'hidden',
        pointerEvents: 'none',
        color: 'currentcolor',
        fill: 'rgb(255, 255, 255)'
    },
    path: {
        fill: 'currentcolor',
        fillRule: 'evenodd'
    }
})

export const Button: React.FC<EmojiRef> = (props) => {
    const classes = useStyles()

    const linkToRef = (index: number) => {
        props.refs[index]?.current?.scrollIntoView();
    }

    return (
        <ul className={classes.ul}>
            <li>
                <button className={classes.button} onClick={() => linkToRef(0)}>
                    <span className={classes.span}>
                        <ClockIcon size='medium' />
                    </span>
                </button>
            </li>
            <li>
                <button className={classes.button} onClick={() => linkToRef(1)}>
                    <span className={classes.span}>
                        <SmileyIcon size='medium' />
                    </span>
                </button>
            </li>
            <li>
                <button className={classes.button} onClick={() => linkToRef(2)}>
                    <span className={classes.span}>
                        <SquirrelIcon size='medium' />
                    </span>
                </button>
            </li>
            <li>
                <button className={classes.button} onClick={() => linkToRef(3)}>
                    <span className={classes.span}>
                        <BriefcaseIcon size='medium' />
                    </span>
                </button>
            </li>
            <li>
                <button className={classes.button} onClick={() => linkToRef(4)}>
                    <span className={classes.span}>
                        <GiftIcon size='medium' />
                    </span>
                </button>
            </li>
            <li>
                <button className={classes.button} onClick={() => linkToRef(5)}>
                    <span className={classes.span}>
                        <ImageIcon size='medium' />
                    </span>
                </button>
            </li>
            <li>
                <button className={classes.button} onClick={() => linkToRef(6)}>
                    <span className={classes.span}>
                        <RocketIcon size='medium' />
                    </span>
                </button>
            </li>
            <li>
                <button className={classes.button} onClick={() => linkToRef(7)}>
                    <span className={classes.span}>
                        <MarkGithubIcon size='medium' />
                    </span>
                </button>
            </li>
        </ul>
    );
}