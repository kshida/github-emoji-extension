import ky from 'ky'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/styles'
import { CategorizeEmojiData, Emoji, EMOJI_CATEGORY_KEY } from './Emoji'
import { EmojiUseStateRefs, EmojiProps, RecentlyEmojiProps } from './Interface'

// Style settings for list.
const UlComponent = styled('ul')({
  lineHeight: '1',
  marginLeft: '8px',
  display: 'flex',
  flexWrap: 'wrap',
  listStyleType: 'none',
})
const LiComponent = styled('li')({
  padding: '5px',
  cursor: 'pointer',
})
const CategoryTitleComponent = styled('div')({
  padding: '5px 8px',
})
const TitleFontComponent = styled('span')({
  fontSize: '18px',
  fontWeight: 'bold',
})

/**
 * Draws a list of recently used emoji.
 * @param props List of refs and recently used emoji passed from the parent element.
 * @returns Return the dom for the recently list.
 */
export const RecentlyList: React.FC<RecentlyEmojiProps> = (props) => {
  return (
    <div>
      <React.Fragment>
        <CategoryTitleComponent
          id={EMOJI_CATEGORY_KEY.RECENTLY}
          ref={props.refs[0]}
        >
          <TitleFontComponent>{EMOJI_CATEGORY_KEY.RECENTLY}</TitleFontComponent>
        </CategoryTitleComponent>
        <UlComponent>
          {props.recentlyEmojis.map((emoji: EmojiProps) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <LiComponent>
                <Emoji
                  setEmoji={props.setEmoji}
                  setRecentlyEmoji={props.setRecentlyEmoji}
                  emojiKey={emoji.emojiKey}
                  emojiPath={emoji.emojiPath}
                />
              </LiComponent>
            )
          })}
        </UlComponent>
      </React.Fragment>
    </div>
  )
}

/**
 * Draws a list of emoji for each category.
 * @param props List of refs and useState passed from the parent element.
 * @returns Returns a list of emoji categorized by category.
 */
export const EmojiList: React.FC<EmojiUseStateRefs> = (props) => {
  const [emojiList, setEmojiList] = useState([])

  useEffect(() => {
    // Get the emoji data.
    ky.get('https://api.github.com/emojis')
      .json()
      .then((res) => {
        const emojis = Object.entries(res).map(
          ([eKey, ePath]: [string, string]): EmojiProps => {
            return {
              emojiKey: eKey,
              emojiPath: ePath,
            }
          }
        )
        setEmojiList(CategorizeEmojiData(emojis, props.setRecentlyEmoji))
      })
  }, [])

  return (
    <div>
      {emojiList
        .filter((emojiData) => emojiData.props.length > 0)
        .map((emojis, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <React.Fragment>
              <CategoryTitleComponent
                id={emojis.category}
                ref={props.refs[index + 1]}
              >
                <TitleFontComponent>{emojis.category}</TitleFontComponent>
              </CategoryTitleComponent>
              <UlComponent>
                {emojis.props.map((emoji: EmojiProps) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <LiComponent>
                      <Emoji
                        setEmoji={props.setEmoji}
                        setRecentlyEmoji={props.setRecentlyEmoji}
                        emojiKey={emoji.emojiKey}
                        emojiPath={emoji.emojiPath}
                      />
                    </LiComponent>
                  )
                })}
              </UlComponent>
            </React.Fragment>
          )
        })}
    </div>
  )
}
