export type EmojiProps = {
  emojiKey: string
  emojiPath: string
  emojiIndex?: number
}

export type EmojiCategorizedProps = {
  category: string
  props: EmojiProps[]
}

export type TextArea = {
  nowArea: HTMLTextAreaElement
}

export type ThemeStyleProps = {
  backgroundColor: string
  borderColor: string
  fontColor: string
  color: string
}

export type RecentlyProps = {
  emojiKey: string
  emojiPath: string
}

export type EmojiRef = {
  refs: React.RefObject<HTMLDivElement>[]
}

export type EmojiUseState = {
  setEmoji: React.Dispatch<React.SetStateAction<string>>
  setRecentlyEmoji: React.Dispatch<React.SetStateAction<RecentlyProps[]>>
}

export type ButtonThemeStyleRefs = {
  themes: ThemeStyleProps
} & EmojiRef

export type RecentlyEmojiProps = {
  recentlyEmojis: RecentlyProps[]
  refs: React.RefObject<HTMLDivElement>[]
} & EmojiUseState

export type EmojiUseStateRefs = EmojiUseState & EmojiRef

export type EmojiPropsAndState = EmojiUseState & EmojiProps
