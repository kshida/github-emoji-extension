export type TextArea = {
    nowArea: HTMLTextAreaElement;
}

export type EmojiProps = {
    emojiKey: string;
    emojiPath: string;
    emojiIndex?: number;
}

export type EmojiRef = {
    refs: React.RefObject<HTMLDivElement>[];
}

export type EmojiUseState = {
    setEmoji: React.Dispatch<React.SetStateAction<string>>;
}

export type EmojiUseStateRefs = EmojiRef & EmojiUseState;

export type EmojiPropsAndState = EmojiProps & EmojiUseState;

export type EmojiCategorizedProps = {
    category: string,
    props: EmojiProps[]
}

export type ThemeStyleProps = {
    backgroundColor: string,
    borderColor: string,
    fontColor: string
}
