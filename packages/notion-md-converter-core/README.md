# @notion-md-converter/core

Core package for converting Notion pages to Markdown.

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

> [!WARNING]
> The APIs `$getPageFullContent` and `$getDatabasePages` may undergo specification changes in the future as we plan to remove the dependency on `@notionhq/client`.

### Customizing Output Markdown

If you want to change the conversion of a Heading Block.
For example, define a custom transformer that increases the number of `#` in a Markdown heading by one.



```typescript
import { createHeadingTransformerFactory, MarkdownUtils } from "@notion-md-converter/core";

export const createMarkdownCustomHeadingTransformer = () => {
	// Use a function to create a transformer
  return createHeadingTransformerFactory(({ level, richText }) => {
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

  it("Can convert heading_1 block", () => {
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

## Caption Metadata

You can set metadata for captions in blocks such as images, code blocks, and embeds. Metadata is specified in `key=value` format, and the portion from the beginning of the caption to the first `:` is treated as metadata.

### Basic Usage

```
width=500:This is an image description
```

In this case:
- `width=500` is the metadata
- `This is an image description` is the actual caption

### Multiple Metadata

Multiple metadata can be specified by separating them with `&`:

```
width=500&height=300:This is an image description
```

In this case:
- `width=500` and `height=300` are metadata
- `This is an image description` is the actual caption

### Usage Examples

- Specifying image width: `width=500:Image description`
- Setting diff for code blocks: `diff=true:filename.js`

## License

Distributed under the MIT License. See [LICENSE](https://github.com/salvage0707/notion-md-converter/blob/main/LICENSE) for more information.

## Author

malvageee (https://github.com/salvage0707)
