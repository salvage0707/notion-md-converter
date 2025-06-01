<div align="center">
  <h1>Notion to Markdown Converter</h1>
</div>

**notion-md-converter** は、NotionブロックをMarkdownテキストに変換するライブラリです。Markdown構文は使用するプラットフォームによって若干異なります。例えば、`$$`で囲まれた数式を数式ブロックとして認識するプラットフォームもあれば、そうでないプラットフォームもあります。
同様に、チェックリスト構文（例：`- [ ]` や `* [ ]`）も異なる場合があり、リンクや画像の埋め込み方法にも違いがあります。
**notion-md-converter** は簡単に拡張できるよう設計されており、これらのプラットフォーム固有の違いに柔軟に対応できます。

<!-- TODO: status badge -->
<!-- ![Build status](https://github.com/your-username/myproject/actions/workflows/ci.yml/badge.svg) -->
<!-- TODO: version vadge -->
<!-- [![npm version](https://badge.fury.io/js/myproject.svg)](https://www.npmjs.com/package/myproject) -->

## 🎮 デモ

**notion-md-converter** を実際に試してみましょう！[ライブデモ](https://nmc-demo.malvageee.com/)にアクセスして、NotionブロックからMarkdownへのリアルタイム変換をご覧ください。

## 🌐 対応プラットフォーム

| プラットフォーム                      | ステータス  | ライブラリ                       |
| ------------------------------------- | ----------- | -------------------------------- |
| [Zenn](https://zenn.dev)              | ✅           | @notion-md-converter/zenn        |
| [Qiita](https://qiita.com)            | ✅           | @notion-md-converter/qiita       |
| [はてなブログ](https://hatenablog.com) | ✅           | @notion-md-converter/hatena-blog |

### Platform-specific Markdown Output

| Block Type             | Smple                | Zenn                    | Qiita                    |
| ---------------------- | -------------------- | ----------------------- | ------------------------ |
| Bookmark               | Link                 | Zenn link card          | Qiita link card          |
| Breadcrumb             | -                    | -                       | -                        |
| Bulleted list item     | Bulleted list        | Bulleted list           | Bulleted list            |
| Callout                | Quotation            | Zenn message            | Qiita note               |
| Child database         | -                    | -                       | -                        |
| Child page             | -                    | -                       | -                        |
| Code                   | Code                 | Code                    | Code                     |
| Column list and column | From left to right   | From left to right      | From left to right       |
| Divider                | Divider              | Divider                 | Divider                  |
| Embed                  | Link                 | Zenn embed or Link card | Qiita embed or Link card |
| Equation               | Equation（$$）       | Equation（$$）          | Code（math）             |
| File                   | Link                 | Link                    | Link                     |
| Headings               | Headings             | Headings                | Headings                 |
| Image                  | Image                | Image                   | Image                    |
| Link Preview           | Link                 | Zenn embed or Link card | Qiita embed or Link card |
| Mention                | Rich Text            | Rich Text               | Rich Text                |
| Numbered list item     | Numbered list        | Numbered list           | Numbered list            |
| Paragraph              | Rich Text            | Rich Text               | Rich Text                |
| PDF                    | Link                 | Link                    | Link                     |
| Quote                  | Quote                | Quote                   | Quote                    |
| Synced block           | Follows inner blocks | Follows inner blocks    | Follows inner blocks     |
| Table                  | Table                | Table                   | Table                    |
| Table of contents      | -                    | -                       | -                        |
| To do                  | ToDo list            | ToDo list               | ToDo list                |
| Toggle blocks          | details tag          | Zenn toggle             | details tag              |
| Video                  | video tag            | video tag and Embed     | video tag and Embed      |

> [!CAUTION]
> このライブラリはまだメジャーバージョン（v1.0.0）をリリースしていません。そのため、マイナーバージョンの更新に破壊的な変更が含まれる可能性があります。v1.0.0に到達するまでAPIは変更される可能性があることにご注意ください。

## 🚀 インストール

### **npmでインストール**

```shell
# JavaScriptの場合
npm install @notion-md-converter/core

# TypeScriptの場合
npm install @notion-md-converter/core @notion-md-converter/types
```

## 📖 使い方


> APIキーを取得するには、NotionのGetting Started Guideに従ってください。


### 基本的な例


```typescript
import {
  $getPageFullContent,
  NotionMarkdownConverter,
} from "@notion-md-converter/core";
import { Client } from "@notionhq/client";

const client = new Client({
  auth: API_KEY,
});

const pageId = "some-page-id";
// このライブラリのNotion APIヘルパー
// Notion Blockの子要素を再帰的に取得
const content = await $getPageFullContent(client, pageId);

// Markdownに変換
const executor = new NotionMarkdownConverter();
const result = executor.execute(content);
```

### Markdown出力のカスタマイズ

見出しブロックの変換を変更したい場合の例です。
例えば、Markdown見出しの`#`の数を1つ増やすカスタムトランスフォーマーを定義します。



```typescript
import { createHeadingTransformerFactory, MarkdownUtils } from "@notion-md-converter/core";

export const createMarkdownCustomHeadingTransformer = () => {
	// トランスフォーマーを作成する関数を使用
  return createHeadingTransformerFactory(({ level, richText }) => {
    const text = MarkdownUtils.convertRichTextsToMarkdown(richText);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.heading(text, level + 1)); // レベルを1追加
  });
};
```


トランスフォーマーのテストを簡単に書けるよう、`@notion-md-converter/testing`ライブラリを提供しています。
このライブラリを使用すると、Notionブロックオブジェクトを簡単に作成し、変換結果をテストできます。

```shell
$ npm install @notion-md-converter/testing
```

```typescript
import {
  createTransformerContext,
  createHeading1Block,
  createTextRichText,
  dedent,
} from "@notion-md-converter/testing";
import { createMarkdownCustomHeadingTransformer } from "./createMarkdownCustomHeadingTransformer";

describe("createMarkdownCustomHeadingTransformer", () => {
  const transformer = createMarkdownCustomHeadingTransformer();

  it("heading_1ブロックを変換できる", () => {
    const block = createHeading1Block({
      richText: [
        createTextRichText({
          content: "Hello",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe(dedent({ wrap: true })`
      ## Hello
    `);
  });
});
```

作成したトランスフォーマーをコンバーターのオプションで定義します。

```typescript
const executor = new NotionMarkdownConverter({
  heading: createMarkdownCustomHeadingTransformer(),
});
const result = executor.execute(content);
```

## キャプションメタデータ

画像、コードブロック、埋め込みなどのブロックでキャプションにメタデータを設定できます。メタデータは`key=value`形式で指定し、キャプションの先頭から最初の`:`までがメタデータとして扱われます。

### 基本的な使い方

```
width=500:これは画像の説明です
```

この場合：
- `width=500` がメタデータ
- `これは画像の説明です` が実際のキャプション

### 複数のメタデータ

複数のメタデータは`&`で区切って指定できます：

```
width=500&height=300:これは画像の説明です
```

この場合：
- `width=500` と `height=300` がメタデータ
- `これは画像の説明です` が実際のキャプション

### 使用例

- 画像幅の指定： `width=500:画像の説明`
- コードブロックのdiff設定： `diff=true:filename.js`

## 📜 ライセンス

このプロジェクトは**MITライセンス**の下でライセンスされています。
詳細はLICENSEをご覧ください。

## 👥 コミュニティと貢献

このプロジェクトはオープンソースであり、コミュニティからの貢献を歓迎しています。

> 注: 現在は日本語でのコミュニケーションを主としています。将来的に英語でのコミュニケーションにも対応することを検討しています。
> Note: Currently, we primarily communicate in Japanese. We are considering supporting English communication in the future.

- **バグを見つけた場合**: [Issue](https://github.com/salvage0707/notion-md-converter/issues/new?template=bug_report.md)を作成してください
- **新機能の提案**: [機能要望](https://github.com/salvage0707/notion-md-converter/issues/new?template=feature_request.md)を作成してください
- **コードの貢献**: [CONTRIBUTING.md](./CONTRIBUTING.md)をご確認ください

## 🤝 サポート

- プロジェクトに関する質問や議論は[Discussions](https://github.com/salvage0707/notion-md-converter/discussions)をご利用ください
- バグ報告や機能要望は[Issues](https://github.com/salvage0707/notion-md-converter/issues)をご利用ください