# @notion-md-converter/hatena-blog

NotionページをはてなブログのMarkdownに変換するためのパッケージです。

## 🚀 インストール

```
# JavaScriptの場合
npm install @notion-md-converter/core @notion-md-converter/hatena-blog

# TypeScriptの場合
npm install @notion-md-converter/core @notion-md-converter/hatena-blog @notion-md-converter/types
```

## 📖 使い方

```typescript
import { $getPageFullContent } from "@notion-md-converter/core";
import { NotionHatenaBlogMarkdownConverter } from "@notion-md-converter/hatena-blog";
import { Client } from "@notionhq/client";

const client = new Client({
  auth: API_KEY,
});

const pageId = "some-page-id";
// このライブラリのNotion APIヘルパー
// Notion Blockの子要素を再帰的に取得
const content = await $getPageFullContent(client, pageId);

// Markdownに変換
const executor = new NotionHatenaBlogMarkdownConverter();
const result = executor.execute(content);
```

## ブロックオプション

## ライセンス

MITライセンスの下で配布されています。詳細は[LICENSE](https://github.com/salvage0707/notion-md-converter/blob/main/LICENSE)をご覧ください。

## 作者

malvageee (https://github.com/salvage0707)
