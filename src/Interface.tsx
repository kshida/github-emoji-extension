// For basic information on emojis.
export type EmojiProps = {
  emojiKey: string
  emojiPath: string
  emojiIndex?: number
}

// For basic information on categorized emojis.
export type EmojiCategorizedProps = {
  category: string
  props: EmojiProps[]
}

// For the dom of the textarea where you are currently typing.
export type TextArea = {
  nowArea: HTMLTextAreaElement
}

// For popup styles.
export type ThemeStyleProps = {
  backgroundColor: string
  borderColor: string
  color: string
}

// For a list of recently used emoji.
export type RecentlyProps = {
  emojiKey: string
  emojiPath: string
}

// For refs used in popup.
export type EmojiRef = {
  refs: React.RefObject<HTMLDivElement>[]
}

// For useSate.
export type EmojiUseState = {
  setEmoji: React.Dispatch<React.SetStateAction<string>>
  setRecentlyEmoji: React.Dispatch<React.SetStateAction<RecentlyProps[]>>
}

// For recently used lists.
export type RecentlyEmojiProps = {
  recentlyEmojis: RecentlyProps[]
  refs: React.RefObject<HTMLDivElement>[]
} & EmojiUseState

// For emoji list.
export type EmojiUseStateRefs = EmojiUseState & EmojiRef

// For emoji dom.
export type EmojiUseStateProps = EmojiUseState & EmojiProps
