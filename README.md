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

## 🚀 Installation


### **1️⃣ Clone from GitHub (Current)**

Since this package is not yet available on npm, install it directly from GitHub.

```shell
git clone <https://github.com/salvage0707/notion-md-converter.git>
cd notion-to-markdown
npm install  # Install dependencies
```


### **2️⃣ Install via npm (Coming Soon)**

We plan to publish this package to npm in the future.
Once available, you can install it using:

```shell
npm install notion-to-markdown
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