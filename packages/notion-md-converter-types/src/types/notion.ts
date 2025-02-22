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

export interface TextRichText extends TextRichTextItemResponse {}
export interface MentionRichText extends MentionRichTextItemResponse {}
export interface EquationRichText extends EquationRichTextItemResponse {}
export type RichText = TextRichText | MentionRichText | EquationRichText;

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

export interface BookmarkBlock extends BookmarkBlockObjectResponse {}

export interface BreadcrumbBlock extends BreadcrumbBlockObjectResponse {}

export interface BulletedListItemBlock extends BulletedListItemBlockObjectResponse {
  children: Block[];
}

export interface CalloutBlock extends CalloutBlockObjectResponse {
  children: Block[];
}

export interface ChildDatabaseBlock extends ChildDatabaseBlockObjectResponse {}

export interface ChildPageBlock extends ChildPageBlockObjectResponse {}

export interface CodeBlock extends CodeBlockObjectResponse {}

export interface ColumnListBlock extends ColumnListBlockObjectResponse {
  children: ColumnBlock[];
}

export interface ColumnBlock extends ColumnBlockObjectResponse {
  children: Block[];
}

export interface DividerBlock extends DividerBlockObjectResponse {}

export interface EmbedBlock extends EmbedBlockObjectResponse {}

export interface EquationBlock extends EquationBlockObjectResponse {}

export interface FileBlock extends FileBlockObjectResponse {}

export interface Heading1Block extends Heading1BlockObjectResponse {}

export interface Heading2Block extends Heading2BlockObjectResponse {}

export interface Heading3Block extends Heading3BlockObjectResponse {}

export interface ImageBlock extends ImageBlockObjectResponse {}

export interface LinkPreviewBlock extends LinkPreviewBlockObjectResponse {}

export interface NumberedListItemBlock extends NumberedListItemBlockObjectResponse {
  children: Block[];
}

export type ParagraphBlock = ParagraphBlockObjectResponse & {
  children: Block[];
};

export interface PdfBlock extends PdfBlockObjectResponse {}

export interface QuoteBlock extends QuoteBlockObjectResponse {
  children: Block[];
}

export interface SyncedBlock extends SyncedBlockBlockObjectResponse {
  children: Block[];
}

export interface TableBlock extends TableBlockObjectResponse {
  children: TableRowBlock[];
}

export interface TableRowBlock extends TableRowBlockObjectResponse {}

export interface TableOfContentsBlock extends TableOfContentsBlockObjectResponse {}

export interface ToDoBlock extends ToDoBlockObjectResponse {
  children: Block[];
}

export interface ToggleBlock extends ToggleBlockObjectResponse {
  children: Block[];
}

export interface VideoBlock extends VideoBlockObjectResponse {}

export const EmbedProvider = {
  speakerDeck: "speakerDeck",
  x: "x",
} as const;
export type EmbedProvider = (typeof EmbedProvider)[keyof typeof EmbedProvider];
