import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { EmojiCategorizedProps, EmojiProps, EmojiPropsAndState, RecentlyProps } from './Interface';
import EmojiCategory from './emoji.json';

export const EMOJI_CATEGORY_KEY = {
    RECENTLY: 'Recently',
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

const chromeStorageKey = 'emojiProp';

const useStyles = makeStyles({
    p: {
        margin: '0px',
    },
    img: {
        height: '30px',
        width: '30px'
    }
})

const insertEmoji = (element: React.MouseEvent<HTMLSpanElement, MouseEvent>, setEmoji: React.Dispatch<React.SetStateAction<string>>, setRecentlyEmoji: React.Dispatch<React.SetStateAction<RecentlyProps[]>>): void => {
    const emojiKeyStr = element.currentTarget.dataset.emojiKey;
    const emojiPathStr = element.currentTarget.dataset.emojiPath;
    updateRecentlyEmojiList(emojiKeyStr, emojiPathStr, setRecentlyEmoji);
    setEmoji(emojiKeyStr);
}

const updateRecentlyEmojiList = (emojiKey: string, emojiPath: string, setRecentlyEmoji: React.Dispatch<React.SetStateAction<RecentlyProps[]>>) => {
    chrome.storage.local.get(chromeStorageKey, result => {
        let emojiProps: EmojiProps[] = [];
        emojiProps.push({
            emojiKey: emojiKey,
            emojiPath: emojiPath
        });
        if (result.emojiProp?.length > 0) {
            const tmpEmojiProps = emojiProps.concat(result.emojiProp);
            emojiProps = tmpEmojiProps.filter((value, index, self) => self.findIndex(element => (element.emojiKey === value.emojiKey)) === index);
        }
        setRecentlyEmoji(emojiProps);
        chrome.storage.local.set({chromeStorageKey: emojiProps});
    })
}

const sortByIndex = (aEmojiProps: EmojiProps, bEmojiProps: EmojiProps) => {
    return aEmojiProps.emojiIndex - bEmojiProps.emojiIndex;
}

// 各カテゴリに分類された絵文字情報を読み込む
export const CategorizeEmojiData = (emojiPropList: EmojiProps[], setRecentlyEmoji: React.Dispatch<React.SetStateAction<RecentlyProps[]>>): EmojiCategorizedProps[] => {

    chrome.storage.local.get(chromeStorageKey, result => {
        if (result?.emojiProp?.length > 0) {
            const recentlyEmojis: EmojiProps[] = result.emojiProp;
            setRecentlyEmoji(recentlyEmojis);
        }
    })

    const propsWithoutPe: EmojiProps[] = [];
    const filteredPeopleEmojis = emojiPropList.filter(prop => {
        const isPeople = EmojiCategory.People.includes(prop.emojiKey);
        if (!isPeople) propsWithoutPe.push(prop);
        return isPeople;
    }).map(peopleEmoji => {
        peopleEmoji.emojiIndex = EmojiCategory.People.indexOf(peopleEmoji.emojiKey);
        return peopleEmoji;
    })

    const propsWithoutPeNa: EmojiProps[] = [];
    const filteredNatureEmojis = propsWithoutPe.filter(prop => {
        const isNature = EmojiCategory.Nature.includes(prop.emojiKey);
        if (!isNature) propsWithoutPeNa.push(prop);
        return isNature;
    }).map(natureEmoji => {
        natureEmoji.emojiIndex = EmojiCategory.Nature.indexOf(natureEmoji.emojiKey);
        return natureEmoji;
    })

    const propsWithoutPeNaOb: EmojiProps[] = [];
    const filteredObjectEmojis = propsWithoutPeNa.filter(prop => {
        const isObject = EmojiCategory.Objects.includes(prop.emojiKey);
        if (!isObject) propsWithoutPeNaOb.push(prop);
        return isObject;
    }).map(objectEmoji => {
        objectEmoji.emojiIndex = EmojiCategory.Objects.indexOf(objectEmoji.emojiKey);
        return objectEmoji;
    })

    const propsWithoutPeNaObFo: EmojiProps[] = [];
    const filteredFoodEmojis = propsWithoutPeNaOb.filter(prop => {
        const isFood = EmojiCategory.Foods.includes(prop.emojiKey);
        if (!isFood) propsWithoutPeNaObFo.push(prop);
        return isFood;
    }).map(foodEmoji => {
        foodEmoji.emojiIndex = EmojiCategory.Foods.indexOf(foodEmoji.emojiKey);
        return foodEmoji;
    })

    const propsWithoutPeNaObFoPl: EmojiProps[] = [];
    const filteredPlaceEmojis = propsWithoutPeNaObFo.filter(prop => {
        const isPlace = EmojiCategory.Places.includes(prop.emojiKey);
        if (!isPlace) propsWithoutPeNaObFoPl.push(prop);
        return isPlace;
    }).map(placeEmoji => {
        placeEmoji.emojiIndex = EmojiCategory.Places.indexOf(placeEmoji.emojiKey);
        return placeEmoji;
    })

    const propsWithoutPeNaObFoPlVe: EmojiProps[] = [];
    const filteredVehicleEmojis = propsWithoutPeNaObFoPl.filter(prop => {
        const isVehicle = EmojiCategory.Vehicle.includes(prop.emojiKey);
        if (!isVehicle) propsWithoutPeNaObFoPlVe.push(prop);
        return isVehicle;
    }).map(vehicleEmoji => {
        vehicleEmoji.emojiIndex = EmojiCategory.Vehicle.indexOf(vehicleEmoji.emojiKey);
        return vehicleEmoji;
    })

    const otherEmojis: EmojiProps[] = [];
    const filteredSymbolEmojis = propsWithoutPeNaObFoPlVe.filter(prop => {
        const isSymbol = EmojiCategory.Symbols.includes(prop.emojiKey);
        if (!isSymbol) otherEmojis.push(prop);
        return isSymbol;
    }).map(symbolEmoji => {
        symbolEmoji.emojiIndex = EmojiCategory.Symbols.indexOf(symbolEmoji.emojiKey);
        return symbolEmoji;
    })

    // ソートする
    filteredPeopleEmojis.sort(sortByIndex);
    filteredNatureEmojis.sort(sortByIndex);
    filteredObjectEmojis.sort(sortByIndex);
    filteredFoodEmojis.sort(sortByIndex);
    filteredPlaceEmojis.sort(sortByIndex);
    filteredVehicleEmojis.sort(sortByIndex);
    filteredSymbolEmojis.sort(sortByIndex);

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
        <p className={classes.p} data-emoji-key={props.emojiKey} data-emoji-path={props.emojiPath} onClick={(element) => insertEmoji(element, props.setEmoji, props.setRecentlyEmoji)}>
            <img className={classes.img} src={props.emojiPath}/>
        </p>
    );
}
