<div align="center">
  <h1>Notion to Markdown Converter</h1>
</div>

**notion-md-converter** is a library that converts Notion blocks into Markdown text.Markdown syntax varies slightly depending on the platform being used. For example, some platforms recognize equations enclosed in `$$` as equation blocks, while others do not.
Similarly, checklist syntax (e.g., `- [ ]` or `* [ ]`) may differ, and there may also be variations in how links and images are embedded.
**notion-md-converter** is designed to be easily extensible, allowing flexible adaptation to these platform-specific differences.

<!-- TODO: status badge -->
<!-- ![Build status](https://github.com/your-username/myproject/actions/workflows/ci.yml/badge.svg) -->
<!-- TODO: version vadge -->
<!-- [![npm version](https://badge.fury.io/js/myproject.svg)](https://www.npmjs.com/package/myproject) -->

## 🎮 Demo

Try out **notion-md-converter** in action! Visit our [live demo](https://nmc-demo.malvageee.com/) to see how it converts Notion blocks to Markdown in real-time.

## 🚀 Installation

### **Install via npm**

```shell
# if JavaScript
npm install @notion-md-converter/core

# if TypeScript
npm install @notion-md-converter/core @notion-md-converter/types
```


## 📖 Usage


> Follow Notion's Getting Started Guide to obtain an API key.


### Basic Example


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
// Notion API helpers in this library.
// Recursively retrieve the Notion Block's child elements
const content = await $getPageFullContent(client, pageId);

// convert to markdwon
const executor = new NotionMarkdownConverter();
const result = executor.execute(content);
```



### Customizing Output Markdown

If you want to change the conversion of a Heading Block.
For example, define a custom transformer that increases the number of `#` in a Markdown heading by one.



```typescript
import { MarkdownUtils } from "../utils";
import { createBasicHeadingTransformer } from "./createBasicTransformer";

export const createMarkdownCustomHeadingTransformer = () => {
	// Use a function to create a transformer
  return createBasicHeadingTransformer(({ level, richText }) => {
    const text = MarkdownUtils.convertRichTextsToMarkdown(richText);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.heading(text, level + 1)); // add 1 level
  });
};

```


To simplify writing tests for transformers, we provide the `@notion-md-converter/testing` library.
This library allows you to easily create Notion block objects and test their conversion results.

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

Define the created transformer in the options of the converter.

```typescript
const executor = new NotionMarkdownConverter({
  heading: createMarkdownCustomHeadingTransformer(),
});
const result = executor.execute(content);
```

**You got it! 😊**

## 📜 License

This project is licensed under the **MIT License**.
See LICENSE for details.

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