# @notion-md-converter/core

NotionページをMarkdownに変換するためのコアパッケージです。

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

## ライセンス

MITライセンスの下で配布されています。詳細は[LICENSE](https://github.com/salvage0707/notion-md-converter/blob/main/LICENSE)をご覧ください。

## 作者

malvageee (https://github.com/salvage0707)
