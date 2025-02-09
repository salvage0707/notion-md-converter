import type {
  Block,
  BookmarkBlock,
  BreadcrumbBlock,
  BulletedListItemBlock,
  CalloutBlock,
  ChildDatabaseBlock,
  ChildPageBlock,
  CodeBlock,
  ColumnListBlock,
  DividerBlock,
  EmbedBlock,
  EquationBlock,
  FileBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  ImageBlock,
  LinkPreviewBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  PdfBlock,
  QuoteBlock,
  SyncedBlock,
  TableBlock,
  TableOfContentsBlock,
  ToDoBlock,
  ToggleBlock,
  VideoBlock,
} from "./notion";

export type Context<T extends Block> = {
  execute: (blocks: Block[]) => string;
  blocks: Block[];
  currentBlock: T;
  currentBlockIndex: number;
};

export type NotionBlockTransformer<T extends Block> = (
  context: Context<T>
) => string;

export type BookmarkTransformer = NotionBlockTransformer<BookmarkBlock>;
export type BreadcrumbTransformer = NotionBlockTransformer<BreadcrumbBlock>;
export type CalloutTransformer = NotionBlockTransformer<CalloutBlock>;
export type CodeTransformer = NotionBlockTransformer<CodeBlock>;
export type ColumnListTransformer = NotionBlockTransformer<ColumnListBlock>;
export type DividerTransformer = NotionBlockTransformer<DividerBlock>;
export type EquationTransformer = NotionBlockTransformer<EquationBlock>;
export type HeadingTransformer = NotionBlockTransformer<
  Heading1Block | Heading2Block | Heading3Block
>;
export type LinkPreviewTransformer = NotionBlockTransformer<LinkPreviewBlock>;
export type BulletedListItemTransformer =
  NotionBlockTransformer<BulletedListItemBlock>;
export type NumberedListItemTransformer =
  NotionBlockTransformer<NumberedListItemBlock>;
export type ToDoTransformer = NotionBlockTransformer<ToDoBlock>;
export type ParagraphTransformer = NotionBlockTransformer<ParagraphBlock>;
export type QuoteTransformer = NotionBlockTransformer<QuoteBlock>;
export type SyncedBlockTransformer = NotionBlockTransformer<SyncedBlock>;
export type TableOfContentsTransformer =
  NotionBlockTransformer<TableOfContentsBlock>;
export type TableTransformer = NotionBlockTransformer<TableBlock>;
export type ToggleTransformer = NotionBlockTransformer<ToggleBlock>;
export type ChildDatabaseTransformer =
  NotionBlockTransformer<ChildDatabaseBlock>;
export type ChildPageTransformer = NotionBlockTransformer<ChildPageBlock>;
export type VideoTransformer = NotionBlockTransformer<VideoBlock>;
export type EmbedTransformer = NotionBlockTransformer<EmbedBlock>;
export type PdfTransformer = NotionBlockTransformer<PdfBlock>;
export type FileTransformer = NotionBlockTransformer<FileBlock>;
export type ImageTransformer = NotionBlockTransformer<ImageBlock>;

export type TransformerMapping = {
  bookmark?: BookmarkTransformer;
  breadcrumb?: BreadcrumbTransformer;
  callout?: CalloutTransformer;
  code?: CodeTransformer;
  column_list?: ColumnListTransformer;
  divider?: DividerTransformer;
  equation?: EquationTransformer;
  heading?: HeadingTransformer;
  link_preview?: LinkPreviewTransformer;
  bulleted_list_item?: BulletedListItemTransformer;
  numbered_list_item?: NumberedListItemTransformer;
  to_do?: ToDoTransformer;
  paragraph?: ParagraphTransformer;
  quote?: QuoteTransformer;
  synced_block?: SyncedBlockTransformer;
  table_of_contents?: TableOfContentsTransformer;
  table?: TableTransformer;
  toggle?: ToggleTransformer;
  child_database?: ChildDatabaseTransformer;
  child_page?: ChildPageTransformer;
  video?: VideoTransformer;
  embed?: EmbedTransformer;
  pdf?: PdfTransformer;
  file?: FileTransformer;
  image?: ImageTransformer;
};
