# @notion-md-converter/hatena-blog

Hatena Blog package for converting Notion pages to Markdown.

## 🚀 Installation

```
# if JavaScript
npm install @notion-md-converter/core @notion-md-converter/hatena-blog

# if TypeScript
npm install @notion-md-converter/core @notion-md-converter/hatena-blog @notion-md-converter/types
```

## 📖 Usage

```typescript
import { $getPageFullContent } from "@notion-md-converter/core";
import { NotionHatenaBlogMarkdownConverter } from "@notion-md-converter/hatena-blog";
import { Client } from "@notionhq/client";

const client = new Client({
  auth: API_KEY,
});

const pageId = "some-page-id";
// Notion API helpers in this library.
// Recursively retrieve the Notion Block's child elements
const content = await $getPageFullContent(client, pageId);

// convert to markdwon
const executor = new NotionHatenaBlogMarkdownConverter();
const result = executor.execute(content);
```

## Block Options

TODO: 記載する

## License

Distributed under the MIT License. See [LICENSE](https://github.com/salvage0707/notion-md-converter/blob/main/LICENSE) for more information.

## Author

malvageee (https://github.com/salvage0707)
