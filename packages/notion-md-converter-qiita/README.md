# @notion-md-converter/qiita

Qiita package for converting Notion pages to Markdown.

## 🚀 Installation

```
# if JavaScript
npm install @notion-md-converter/core @notion-md-converter/qiita

# if TypeScript
npm install @notion-md-converter/core @notion-md-converter/qiita @notion-md-converter/types
```

## 📖 Usage

```typescript
import { $getPageFullContent } from "@notion-md-converter/core";
import { NotionQiitaMarkdownConverter } from "@notion-md-converter/qiita";
import { Client } from "@notionhq/client";

const client = new Client({
  auth: API_KEY,
});

const pageId = "some-page-id";
// Notion API helpers in this library.
// Recursively retrieve the Notion Block's child elements
const content = await $getPageFullContent(client, pageId);

// convert to markdwon
const executor = new NotionQiitaMarkdownConverter();
const result = executor.execute(content);
```

## Block Options

### Callout

You can choose between Qiita note's info, warn, and alert styles based on the background color and text color settings.

| color  | note  |
| ------ | ----- |
| yellow | warn  |
| red    | alert |
| other  | info  |

### Code

You can enable diff display using Callout Metadata

| metadata | value |
| ------   | ----  |
| diff     | Set to `true` to enable diff display  |


### Embed


#### CodePen

| metadata    | value            |
| ----------- | ---------------- |
| height      | iframe height    |
| defaultTab  | default tab      |

#### Figma

| metadata    | value            |
| ----------- | ---------------- |
| height      | iframe height    |
| width       | iframe width     |

#### Google Slide

| metadata    | value            |
| ----------- | ---------------- |
| height      | iframe height    |
| width       | iframe width     |

#### YouTube

| metadata    | value            |
| ----------- | ---------------- |
| height      | iframe height    |
| width       | iframe width     |

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
