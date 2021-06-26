export type TextArea = {
    nowArea: HTMLTextAreaElement;
}

export type EmojiProps = {
    emojiKey: string;
    emojiPath: string;
}

export type EmojiUseState = {
    setEmoji: React.Dispatch<React.SetStateAction<string>>;
}

export type EmojiPropsAndState = EmojiProps & EmojiUseState;

export type EmojiCategorizedProps = {
    category: string,
    props: EmojiProps[]
}
