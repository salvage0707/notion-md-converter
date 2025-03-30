---
"@notion-md-converter/hatena-blog": minor
"@notion-md-converter/testing": minor
"@notion-md-converter/qiita": minor
"@notion-md-converter/types": minor
"@notion-md-converter/core": minor
"@notion-md-converter/zenn": minor
---

- MarkdownUtils.richTextsToMarkdown を削除
  - 各 Factory に context を追加し、tools プロパティから共通的な formatter を使う実装に変更
- BasicRichTextFormatter クラスを追加
  - リッチテキストの変換処理を実行するクラス
