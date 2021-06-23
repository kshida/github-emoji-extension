export interface TextArea {
    nowArea: HTMLTextAreaElement;
}

export interface EmojiUseState {
    setEmoji: React.Dispatch<React.SetStateAction<string>>;
}

export interface EmojiProps extends EmojiUseState {
    value: string;
    iconPath: string;
}
