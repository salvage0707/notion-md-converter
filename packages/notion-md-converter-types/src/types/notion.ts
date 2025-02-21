import type {
  BookmarkBlockObjectResponse,
  BreadcrumbBlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  CalloutBlockObjectResponse,
  ChildDatabaseBlockObjectResponse,
  ChildPageBlockObjectResponse,
  CodeBlockObjectResponse,
  ColumnBlockObjectResponse,
  ColumnListBlockObjectResponse,
  DividerBlockObjectResponse,
  EmbedBlockObjectResponse,
  EquationBlockObjectResponse,
  EquationRichTextItemResponse,
  FileBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ImageBlockObjectResponse,
  LinkPreviewBlockObjectResponse,
  MentionRichTextItemResponse,
  NumberedListItemBlockObjectResponse,
  ParagraphBlockObjectResponse,
  PdfBlockObjectResponse,
  QuoteBlockObjectResponse,
  RichTextItemResponse,
  SyncedBlockBlockObjectResponse,
  TableBlockObjectResponse,
  TableOfContentsBlockObjectResponse,
  TableRowBlockObjectResponse,
  TextRichTextItemResponse,
  ToDoBlockObjectResponse,
  ToggleBlockObjectResponse,
  VideoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * @see @notionhq/client#ApiColor
 * @see https://developers.notion.com/reference/color
 */
export type ApiColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "default_background"
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "green_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background";

export type CodeLanguage = CodeBlockObjectResponse["code"]["language"];
export type CodeLanguageMapping = {
  [key in CodeLanguage]: string | undefined;
};

export type TextRichText = TextRichTextItemResponse;
export type MentionRichText = MentionRichTextItemResponse;
export type EquationRichText = EquationRichTextItemResponse;
export type RichText = RichTextItemResponse;

export type NotionInternalFile = {
  type: "file";
  file: {
    url: string;
    expiry_time: string;
  };
};

export type NotionExternalFile = {
  type: "external";
  external: {
    url: string;
  };
};

export type FileObject = NotionInternalFile | NotionExternalFile;

export type Block =
  | BookmarkBlock
  | BreadcrumbBlock
  | BulletedListItemBlock
  | CalloutBlock
  | ChildDatabaseBlock
  | ChildPageBlock
  | CodeBlock
  | ColumnListBlock
  | ColumnBlock
  | DividerBlock
  | EmbedBlock
  | EquationBlock
  | FileBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | ImageBlock
  | LinkPreviewBlock
  | NumberedListItemBlock
  | ParagraphBlock
  | PdfBlock
  | QuoteBlock
  | SyncedBlock
  | TableBlock
  | TableRowBlock
  | TableOfContentsBlock
  | ToDoBlock
  | ToggleBlock
  | VideoBlock;
export type BlockType = Block["type"];

export type RootBlock =
  | BookmarkBlock
  | BreadcrumbBlock
  | BulletedListItemBlock
  | CalloutBlock
  | ChildDatabaseBlock
  | ChildPageBlock
  | CodeBlock
  | ColumnListBlock
  | ColumnBlock
  | DividerBlock
  | EmbedBlock
  | EquationBlock
  | FileBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | ImageBlock
  | LinkPreviewBlock
  | NumberedListItemBlock
  | ParagraphBlock
  | PdfBlock
  | QuoteBlock
  | SyncedBlock
  | TableBlock
  | TableOfContentsBlock
  | ToDoBlock
  | ToggleBlock
  | VideoBlock;

export type RootBlockType = RootBlock["type"];

export type BookmarkBlock = BookmarkBlockObjectResponse;

export type BreadcrumbBlock = BreadcrumbBlockObjectResponse;

export type BulletedListItemBlock = BulletedListItemBlockObjectResponse & {
  children: Block[];
};

export type CalloutBlock = CalloutBlockObjectResponse & {
  children: Block[];
};

export type ChildDatabaseBlock = ChildDatabaseBlockObjectResponse;

export type ChildPageBlock = ChildPageBlockObjectResponse;

export type CodeBlock = CodeBlockObjectResponse;

export type ColumnListBlock = ColumnListBlockObjectResponse & {
  children: ColumnBlock[];
};

export type ColumnBlock = ColumnBlockObjectResponse & {
  children: Block[];
};

export type DividerBlock = DividerBlockObjectResponse;

export type EmbedBlock = EmbedBlockObjectResponse;

export type EquationBlock = EquationBlockObjectResponse;

export type FileBlock = FileBlockObjectResponse;

export type Heading1Block = Heading1BlockObjectResponse;

export type Heading2Block = Heading2BlockObjectResponse;

export type Heading3Block = Heading3BlockObjectResponse;

export type ImageBlock = ImageBlockObjectResponse;

export type LinkPreviewBlock = LinkPreviewBlockObjectResponse;

export type NumberedListItemBlock = NumberedListItemBlockObjectResponse & {
  children: Block[];
};

export type ParagraphBlock = ParagraphBlockObjectResponse & {
  children: Block[];
};

export type PdfBlock = PdfBlockObjectResponse;

export type QuoteBlock = QuoteBlockObjectResponse & {
  children: Block[];
};

export type SyncedBlock = SyncedBlockBlockObjectResponse & {
  children: Block[];
};

export type TableBlock = TableBlockObjectResponse & {
  children: TableRowBlock[];
};

export type TableRowBlock = TableRowBlockObjectResponse;

export type TableOfContentsBlock = TableOfContentsBlockObjectResponse;

export type ToDoBlock = ToDoBlockObjectResponse & {
  children: Block[];
};

export type ToggleBlock = ToggleBlockObjectResponse & {
  children: Block[];
};

export type VideoBlock = VideoBlockObjectResponse;

export const EmbedProvider = {
  speakerDeck: "speakerDeck",
  x: "x",
} as const;
export type EmbedProvider = (typeof EmbedProvider)[keyof typeof EmbedProvider];
