# @notion-md-converter/zenn

NotionページをZennのMarkdownに変換するためのパッケージです。

## 🚀 インストール

```
# JavaScriptの場合
npm install @notion-md-converter/core @notion-md-converter/zenn

# TypeScriptの場合
npm install @notion-md-converter/core @notion-md-converter/zenn @notion-md-converter/types
```

## 📖 使い方

```typescript
import { $getPageFullContent } from "@notion-md-converter/core";
import { NotionZennMarkdownConverter } from "@notion-md-converter/zenn";
import { Client } from "@notionhq/client";

const client = new Client({
  auth: API_KEY,
});

const pageId = "some-page-id";
// このライブラリのNotion APIヘルパー
// Notion Blockの子要素を再帰的に取得
const content = await $getPageFullContent(client, pageId);

// Markdownに変換
const executor = new NotionZennMarkdownConverter();
const result = executor.execute(content);
```

## ブロックオプション

### コールアウト

背景色とテキスト色の設定に基づいて、Zennメッセージのinfo、warn、alertスタイルを選択できます。

| 色     | ノート    |
| ------ | ------- |
| red    | alert   |
| その他  | default |

### コード

コールアウトメタデータを使用してdiff表示を有効にできます

| メタデータ | 値 |
| ------   | ----  |
| diff     | `true`に設定するとdiff表示が有効になります  |


### 画像

メタデータを設定して画像のサイズを調整できます。

| メタデータ | 値 |
| ------   | ----  |
| width    | 画像の幅を指定します（例：`500`） |


### 埋め込み

#### Speaker Deck

| メタデータ    | 値            |
| ----------- | ---------------- |
| id          | Speaker Deck ID  |

IDが指定されていない場合は、リンクカードとして表示されます。


### ビデオ

YouTube動画は埋め込みとして表示されます。その他の動画はvideoタグを使用します。

## ライセンス

MITライセンスの下で配布されています。詳細は[LICENSE](https://github.com/salvage0707/notion-md-converter/blob/main/LICENSE)をご覧ください。

## 作者

malvageee (https://github.com/salvage0707)
