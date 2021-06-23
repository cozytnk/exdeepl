# exdeepl

[DeepL](https://www.deepl.com/translator) をちょこっと便利にするchrome拡張機能。

😞 英語pdfからコピペすると改行が入って翻訳が崩れちゃう

😏 自動で改行を削除します

## つかいかた

「拡張機能 自作 追加 開発者モード」とかで調べて拡張機能をブラウザに追加。

[DeepL](https://www.deepl.com/translator) にテキストをコピペすると
「改行消しますか」なポップアップが出るので、
OKすれば改行の消えたテキストがペーストされます。
キャンセルすればそのままペーストされます。

この拡張機能のアイコンをクリックすると色が変わります。
- 紫色のとき：上記のようにコピペ時にポップアップが出ます。
- 灰色のとき：ポップアップでません。

## めもとか

- 改行は以下のルールで削除。
  ```javascript
  text = text.replace(/\r?\n/g, ' ')
  ```
- TODO: ハイフン+改行 のときは単語くっつけるようにする
- FIXME: アイコン押しても色変わらんときある。もっかい押せば変わる。
