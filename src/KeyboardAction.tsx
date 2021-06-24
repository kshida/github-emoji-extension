import { getPopup, setFocusArea } from './Popup';

export const addListener = (): void => {
    addListenerForSlashKey();
}

const checkShowPopupCaretPosition = (element: HTMLTextAreaElement) => {
    return (element.selectionStart === 0 || element.value.substr(element.selectionStart - 1, 1) === ' ');
}

const addListenerForSlashKey = () => {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        // テキストエリアのDOMを取得
        const textAreaElement = document.activeElement instanceof HTMLTextAreaElement ? document.activeElement : null;
        // "/"押下、かつ先頭または半角スペースの直後の場合
        if (event.code === 'Slash' && textAreaElement && checkShowPopupCaretPosition(textAreaElement)) {
            event.preventDefault();
            initPopupPosition(textAreaElement);
        }
    })
}

const initPopupPosition = (textAreaElement: HTMLTextAreaElement) => {

    // テキストエリアからカーソルまでの座標を計算
    const position = getCursorOffsetPosition(textAreaElement, textAreaElement.value.substr(0, textAreaElement.selectionStart));

    // テキストエリアの座標を取得
    const parentX = textAreaElement.getBoundingClientRect().left;
    const parentY = textAreaElement.getBoundingClientRect().top;

    // カーソルの座標を決定
    const cursorX = parentX + position.left;
    const cursorY = parentY + position.top;

    // ポップアップを取得
    let popup = getPopup();
    if (!popup) return;
    // 入力中のテキストエリアを設定
    setFocusArea(textAreaElement);

    // カーソルの座標にポップアップの左下がくるように調整
    popup.style.display = 'block';
    popup.style.top = `${cursorY - 340}px`;
    popup.style.left = `${cursorX}px`;
}

const getCursorOffsetPosition = (textAreaElement: HTMLTextAreaElement, text: string) => {

    // ダミーのdivを生成
    const dummyDiv = document.createElement('div');

    // 親要素のテキストエリアのスタイルを取得
    const taStyle = window.getComputedStyle(textAreaElement);

    // ダミーのdivにテキストエリアのスタイルをコピー
    for(const k in taStyle) {
        dummyDiv.style.setProperty(k, taStyle[k]);
    }

    // ダミーのdivを画面外に描画する
    dummyDiv.style.position = 'absolute';
    dummyDiv.style.top = '0';
    dummyDiv.style.left = '-9999';
    document.body.appendChild(dummyDiv);

    // カーソル位置計算用のspanを生成
    const span = document.createElement('span');
    // spanに大きさをもたせるために適当な文字列を挿入
    span.innerHTML = '&nbsp;';
    
    // 入力中の文字列を挿入
    dummyDiv.textContent = text;
    // スクロール位置を調整
    dummyDiv.scrollTop = dummyDiv.scrollHeight;
    // ダミーのdivにspanを挿入
    dummyDiv.appendChild(span);

    // spanの相対位置を取得
    const position = {
        top: span.offsetTop,
        left: span.offsetLeft,
        height: parseInt(taStyle['lineHeight'])
    }

    // ダミー削除
    document.body.removeChild(dummyDiv);

    return position;
}
