import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  EmojiCategorizedProps,
  EmojiProps,
  EmojiUseStateProps,
  RecentlyProps,
} from './Interface'
import EmojiCategory from './emoji.json'

// Key for emoji categories.
export const EMOJI_CATEGORY_KEY = {
  RECENTLY: 'Recently',
  PEOPLE: 'People',
  NATURE: 'Nature',
  OBJECTS: 'Objects',
  FOODS: 'Foods',
  PLACES: 'Places',
  VEHICLE: 'Vehicle',
  SYMBOLS: 'Symbols',
  OTHERS: 'Others',
} as const
type EmojiCategoryKey =
  typeof EMOJI_CATEGORY_KEY[keyof typeof EMOJI_CATEGORY_KEY]

// Key for chrome storage.
const chromeStorageKey = 'emojiProp'

// Style settings for emoji.
const useStyles = makeStyles({
  p: {
    margin: '0px',
  },
  img: {
    height: '30px',
    width: '30px',
  },
})

/**
 * Save and insert the emoji you pressed.
 * @param element Element of the clicked area.
 * @param setEmoji Function to save the clicked emoji code.
 * @param setRecentlyEmoji Function to save to the recently used list.
 */
const insertEmoji = (
  element: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  setEmoji: React.Dispatch<React.SetStateAction<string>>,
  setRecentlyEmoji: React.Dispatch<React.SetStateAction<RecentlyProps[]>>
): void => {
  const emojiKeyStr = element.currentTarget.dataset.emojiKey
  const emojiPathStr = element.currentTarget.dataset.emojiPath
  updateRecentlyEmojiList(emojiKeyStr, emojiPathStr, setRecentlyEmoji)
  setEmoji(emojiKeyStr)
}

/**
 * Save to the recently used list.
 * @param emojiKey Emoji code of the clicked area.
 * @param emojiPath Url for the emoji image of the clicked area.
 * @param setRecentlyEmoji Function to save to the recently used list.
 */
const updateRecentlyEmojiList = (
  emojiKey: string,
  emojiPath: string,
  setRecentlyEmoji: React.Dispatch<React.SetStateAction<RecentlyProps[]>>
) => {
  chrome.storage.local.get(chromeStorageKey, (result) => {
    let emojiProps: EmojiProps[] = []
    emojiProps.push({
      emojiKey: emojiKey,
      emojiPath: emojiPath,
    })
    if (result.emojiProp?.length > 0) {
      const tmpEmojiProps = emojiProps.concat(result.emojiProp)
      // Exclude duplicate emoji.
      emojiProps = tmpEmojiProps.filter(
        (value, index, self) =>
          self.findIndex((element) => element.emojiKey === value.emojiKey) ===
          index
      ).slice(0, 16);
    }
    setRecentlyEmoji(emojiProps)
    chrome.storage.local.set({ [chromeStorageKey]: emojiProps })
  })
}

/**
 * Sort emoji.
 */
const sortByIndex = (aEmojiProps: EmojiProps, bEmojiProps: EmojiProps) => {
  return aEmojiProps.emojiIndex - bEmojiProps.emojiIndex
}

/**
 * Classify the retrieved emoji list into categories.
 * @param emojiPropList List of retrieved emojis.
 * @param setRecentlyEmoji Function to save to the recently used list.
 * @returns Returns a list of categorized emoji.
 */
export const CategorizeEmojiData = (
  emojiPropList: EmojiProps[],
  setRecentlyEmoji: React.Dispatch<React.SetStateAction<RecentlyProps[]>>
): EmojiCategorizedProps[] => {
  // Get a list of recently used emoji.
  chrome.storage.local.get(chromeStorageKey, (result) => {
    if (result?.emojiProp?.length > 0) {
      const recentlyEmojis: EmojiProps[] = result.emojiProp
      setRecentlyEmoji(recentlyEmojis)
    }
  })

  const propsWithoutPe: EmojiProps[] = []
  // Classify emojis in the "People" category.
  const filteredPeopleEmojis = emojiPropList
    .filter((prop) => {
      const isPeople = EmojiCategory.People.includes(prop.emojiKey)
      if (!isPeople) propsWithoutPe.push(prop)
      return isPeople
    })
    .map((peopleEmoji) => {
      peopleEmoji.emojiIndex = EmojiCategory.People.indexOf(
        peopleEmoji.emojiKey
      )
      return peopleEmoji
    })

  const propsWithoutPeNa: EmojiProps[] = []
  // Classify emojis in the "Nature" category.
  const filteredNatureEmojis = propsWithoutPe
    .filter((prop) => {
      const isNature = EmojiCategory.Nature.includes(prop.emojiKey)
      if (!isNature) propsWithoutPeNa.push(prop)
      return isNature
    })
    .map((natureEmoji) => {
      natureEmoji.emojiIndex = EmojiCategory.Nature.indexOf(
        natureEmoji.emojiKey
      )
      return natureEmoji
    })

  const propsWithoutPeNaOb: EmojiProps[] = []
  // Classify emojis in the "Objects" category.
  const filteredObjectEmojis = propsWithoutPeNa
    .filter((prop) => {
      const isObject = EmojiCategory.Objects.includes(prop.emojiKey)
      if (!isObject) propsWithoutPeNaOb.push(prop)
      return isObject
    })
    .map((objectEmoji) => {
      objectEmoji.emojiIndex = EmojiCategory.Objects.indexOf(
        objectEmoji.emojiKey
      )
      return objectEmoji
    })

  const propsWithoutPeNaObFo: EmojiProps[] = []
  // Classify emojis in the "Foods" category.
  const filteredFoodEmojis = propsWithoutPeNaOb
    .filter((prop) => {
      const isFood = EmojiCategory.Foods.includes(prop.emojiKey)
      if (!isFood) propsWithoutPeNaObFo.push(prop)
      return isFood
    })
    .map((foodEmoji) => {
      foodEmoji.emojiIndex = EmojiCategory.Foods.indexOf(foodEmoji.emojiKey)
      return foodEmoji
    })

  const propsWithoutPeNaObFoPl: EmojiProps[] = []
  // Classify emojis in the "Places" category.
  const filteredPlaceEmojis = propsWithoutPeNaObFo
    .filter((prop) => {
      const isPlace = EmojiCategory.Places.includes(prop.emojiKey)
      if (!isPlace) propsWithoutPeNaObFoPl.push(prop)
      return isPlace
    })
    .map((placeEmoji) => {
      placeEmoji.emojiIndex = EmojiCategory.Places.indexOf(placeEmoji.emojiKey)
      return placeEmoji
    })

  const propsWithoutPeNaObFoPlVe: EmojiProps[] = []
  // Classify emojis in the "Vehicles" category.
  const filteredVehicleEmojis = propsWithoutPeNaObFoPl
    .filter((prop) => {
      const isVehicle = EmojiCategory.Vehicle.includes(prop.emojiKey)
      if (!isVehicle) propsWithoutPeNaObFoPlVe.push(prop)
      return isVehicle
    })
    .map((vehicleEmoji) => {
      vehicleEmoji.emojiIndex = EmojiCategory.Vehicle.indexOf(
        vehicleEmoji.emojiKey
      )
      return vehicleEmoji
    })

  const otherEmojis: EmojiProps[] = []
  // Classify emojis in the "Symbols" category.
  const filteredSymbolEmojis = propsWithoutPeNaObFoPlVe
    .filter((prop) => {
      const isSymbol = EmojiCategory.Symbols.includes(prop.emojiKey)
      if (!isSymbol) otherEmojis.push(prop)
      return isSymbol
    })
    .map((symbolEmoji) => {
      symbolEmoji.emojiIndex = EmojiCategory.Symbols.indexOf(
        symbolEmoji.emojiKey
      )
      return symbolEmoji
    })

  // Sort the categorized list.
  filteredPeopleEmojis.sort(sortByIndex)
  filteredNatureEmojis.sort(sortByIndex)
  filteredObjectEmojis.sort(sortByIndex)
  filteredFoodEmojis.sort(sortByIndex)
  filteredPlaceEmojis.sort(sortByIndex)
  filteredVehicleEmojis.sort(sortByIndex)
  filteredSymbolEmojis.sort(sortByIndex)

  const categorizedEmojis: EmojiCategorizedProps[] = [
    {
      category: EMOJI_CATEGORY_KEY.PEOPLE,
      props: filteredPeopleEmojis,
    },
    {
      category: EMOJI_CATEGORY_KEY.NATURE,
      props: filteredNatureEmojis,
    },
    {
      category: EMOJI_CATEGORY_KEY.OBJECTS,
      props: filteredObjectEmojis,
    },
    {
      category: EMOJI_CATEGORY_KEY.FOODS,
      props: filteredFoodEmojis,
    },
    {
      category: EMOJI_CATEGORY_KEY.PLACES,
      props: filteredPlaceEmojis,
    },
    {
      category: EMOJI_CATEGORY_KEY.VEHICLE,
      props: filteredVehicleEmojis,
    },
    {
      category: EMOJI_CATEGORY_KEY.SYMBOLS,
      props: filteredSymbolEmojis,
    },
    {
      category: EMOJI_CATEGORY_KEY.OTHERS,
      props: otherEmojis,
    },
  ]

  return categorizedEmojis
}

/**
 * Draw a emoji.
 * @param props Emoji information and functions passed from the parent element.
 * @returns Return the dom of the emoji.
 */
export const Emoji: React.FC<EmojiUseStateProps> = (props) => {
  const classes = useStyles()
  return (
    <p
      className={classes.p}
      data-emoji-key={props.emojiKey}
      data-emoji-path={props.emojiPath}
      onClick={(element) =>
        insertEmoji(element, props.setEmoji, props.setRecentlyEmoji)
      }
    >
      <img className={classes.img} src={props.emojiPath} />
    </p>
  )
}
