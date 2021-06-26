import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { EmojiCategorizedProps, EmojiProps, EmojiPropsAndState } from './Interface';
import EmojiCategory from './emoji.json';

export const EMOJI_CATEGORY_KEY = {
    PEOPLE: 'People',
    NATURE: 'Nature',
    OBJECTS: 'Objects',
    FOODS: 'Foods',
    PLACES: 'Places',
    VEHICLE: 'Vehicle',
    SYMBOLS: 'Symbols',
    OTHERS: 'Others'
} as const;
type EmojiCategoryKey = typeof EMOJI_CATEGORY_KEY[keyof typeof EMOJI_CATEGORY_KEY];

const useStyles = makeStyles({
    p: {
        margin: '0px',
    },
    img: {
        height: '30px',
        width: '30px'
    }
})

const insertEmoji = (element: React.MouseEvent<HTMLSpanElement, MouseEvent>, setEmoji: React.Dispatch<React.SetStateAction<string>>): void => {
    const emojiStr = element.currentTarget.dataset.emojiKey;
    setEmoji(emojiStr);
}

// 各カテゴリに分類された絵文字情報を読み込む
export const CategorizeEmojiData = (emojiPropList: EmojiProps[]): EmojiCategorizedProps[] => {

    const propsWithoutPe: EmojiProps[] = [];
    const filteredPeopleEmojis = emojiPropList.filter(prop => {
        const isPeople = EmojiCategory.People.includes(prop.emojiKey);
        if (!isPeople) propsWithoutPe.push(prop);
        return isPeople;
    })

    const propsWithoutPeNa: EmojiProps[] = [];
    const filteredNatureEmojis = propsWithoutPe.filter(prop => {
        const isNature = EmojiCategory.Nature.includes(prop.emojiKey);
        if (!isNature) propsWithoutPeNa.push(prop);
        return isNature;
    })

    const propsWithoutPeNaOb: EmojiProps[] = [];
    const filteredObjectEmojis = propsWithoutPeNa.filter(prop => {
        const isObject = EmojiCategory.Objects.includes(prop.emojiKey);
        if (!isObject) propsWithoutPeNaOb.push(prop);
        return isObject;
    })

    const propsWithoutPeNaObFo: EmojiProps[] = [];
    const filteredFoodEmojis = propsWithoutPeNaOb.filter(prop => {
        const isFood = EmojiCategory.Foods.includes(prop.emojiKey);
        if (!isFood) propsWithoutPeNaObFo.push(prop);
        return isFood;
    })

    const propsWithoutPeNaObFoPl: EmojiProps[] = [];
    const filteredPlaceEmojis = propsWithoutPeNaObFo.filter(prop => {
        const isPlace = EmojiCategory.Places.includes(prop.emojiKey);
        if (!isPlace) propsWithoutPeNaObFoPl.push(prop);
        return isPlace;
    })

    const propsWithoutPeNaObFoPlVe: EmojiProps[] = [];
    const filteredVehicleEmojis = propsWithoutPeNaObFoPl.filter(prop => {
        const isVehicle = EmojiCategory.Vehicle.includes(prop.emojiKey);
        if (!isVehicle) propsWithoutPeNaObFoPlVe.push(prop);
        return isVehicle;
    })

    const otherEmojis: EmojiProps[] = [];
    const filteredSymbolEmojis = propsWithoutPeNaObFoPlVe.filter(prop => {
        const isSymbol = EmojiCategory.Symbols.includes(prop.emojiKey);
        if (!isSymbol) otherEmojis.push(prop);
        return isSymbol;
    })

    const categorizedEmojis: EmojiCategorizedProps[] = [
        {
            category: EMOJI_CATEGORY_KEY.PEOPLE,
            props: filteredPeopleEmojis
        },
        {
            category: EMOJI_CATEGORY_KEY.NATURE,
            props: filteredNatureEmojis
        },
        {
            category: EMOJI_CATEGORY_KEY.OBJECTS,
            props: filteredObjectEmojis
        },
        {
            category: EMOJI_CATEGORY_KEY.FOODS,
            props: filteredFoodEmojis
        },
        {
            category: EMOJI_CATEGORY_KEY.PLACES,
            props: filteredPlaceEmojis
        },
        {
            category: EMOJI_CATEGORY_KEY.VEHICLE,
            props: filteredVehicleEmojis
        },
        {
            category: EMOJI_CATEGORY_KEY.SYMBOLS,
            props: filteredSymbolEmojis
        },
        {
            category: EMOJI_CATEGORY_KEY.OTHERS,
            props: otherEmojis
        },
    ]

    return categorizedEmojis;
}

export const Emoji: React.FC<EmojiPropsAndState> = (props) => {
    const classes = useStyles()
    return (
        <p className={classes.p} data-emoji-key={props.emojiKey} onClick={(element) => insertEmoji(element, props.setEmoji)}>
            <img className={classes.img} src={props.emojiPath}/>
        </p>
    );
}
