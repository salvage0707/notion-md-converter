# @notion-md-converter/zenn

Zenn package for converting Notion pages to Markdown.

## 🚀 Installation

```
# if JavaScript
npm install @notion-md-converter/core @notion-md-converter/zenn

# if TypeScript
npm install @notion-md-converter/core @notion-md-converter/zenn @notion-md-converter/types
```

## 📖 Usage

```typescript
import { $getPageFullContent } from "@notion-md-converter/core";
import { NotionZennMarkdownConverter } from "@notion-md-converter/zenn";
import { Client } from "@notionhq/client";

const client = new Client({
  auth: API_KEY,
});

const pageId = "some-page-id";
// Notion API helpers in this library.
// Recursively retrieve the Notion Block's child elements
const content = await $getPageFullContent(client, pageId);

// convert to markdwon
const executor = new NotionZennMarkdownConverter();
const result = executor.execute(content);
```

## Block Options

### Callout

You can choose between Zenn message's info, warn, and alert styles based on the background color and text color settings.

| color  | note    |
| ------ | ------- |
| red    | alert   |
| other  | default |

### Code

You can enable diff display using Callout Metadata

| metadata | value |
| ------   | ----  |
| diff     | Set to `true` to enable diff display  |


### Embed

#### Speaker Deck

| metadata    | value            |
| ----------- | ---------------- |
| id          | Speaker Deck ID  |

If no ID is specified, it will be displayed as a link card.


### Video

YouTube videos will be displayed as embeds. Other videos will use the video tag.

## License

MIT

## Author

malvageee (https://github.com/salvage0707)
