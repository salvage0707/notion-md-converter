import type {
  ApiColor,
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
  RichText,
  SyncedBlock,
  TableBlock,
  TableOfContentsBlock,
  ToDoBlock,
  ToggleBlock,
  VideoBlock,
} from "./notion";

/**
 * アノテーションの有効設定
 */
export type EnableAnnotations = {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  code?: boolean;
  equation?: boolean;
  color?: boolean;
  link?: boolean;
};

/**
 * カラーマッピング
 */
export type ColorMap = Record<ApiColor, string | undefined>;

/**
 * リッチテキストをフォーマットするツールのインターフェース
 */
export interface RichTextFormatter {
  /**
   * リッチテキストを整形する
   * @param richTexts リッチテキスト配列
   * @param enableAnnotations 有効化するアノテーション
   * @param colorMap カラーマップ
   * @returns 整形されたテキスト
   */
  format(richTexts: RichText[], enableAnnotations?: EnableAnnotations, colorMap?: ColorMap): string;

  /**
   * デコレーションを除いたテキスト
   * @param richTexts リッチテキスト配列
   * @returns テキスト
   */
  plainText(richTexts: RichText[]): string;
}

/**
 * 変換に使用するツール群
 */
export interface ConverterTools {
  /**
   * リッチテキストフォーマッター
   */
  richTextFormatter: RichTextFormatter;
}

export type Context<T extends Block> = {
  execute: (blocks: Block[]) => string;
  blocks: Block[];
  currentBlock: T;
  currentBlockIndex: number;
  tools: ConverterTools;
};

export type NotionBlockTransformer<T extends Block> = (context: Context<T>) => string | null;

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
export type BulletedListItemTransformer = NotionBlockTransformer<BulletedListItemBlock>;
export type NumberedListItemTransformer = NotionBlockTransformer<NumberedListItemBlock>;
export type ToDoTransformer = NotionBlockTransformer<ToDoBlock>;
export type ParagraphTransformer = NotionBlockTransformer<ParagraphBlock>;
export type QuoteTransformer = NotionBlockTransformer<QuoteBlock>;
export type SyncedBlockTransformer = NotionBlockTransformer<SyncedBlock>;
export type TableOfContentsTransformer = NotionBlockTransformer<TableOfContentsBlock>;
export type TableTransformer = NotionBlockTransformer<TableBlock>;
export type ToggleTransformer = NotionBlockTransformer<ToggleBlock>;
export type ChildDatabaseTransformer = NotionBlockTransformer<ChildDatabaseBlock>;
export type ChildPageTransformer = NotionBlockTransformer<ChildPageBlock>;
export type VideoTransformer = NotionBlockTransformer<VideoBlock>;
export type EmbedTransformer = NotionBlockTransformer<EmbedBlock>;
export type PDFTransformer = NotionBlockTransformer<PdfBlock>;
export type FileTransformer = NotionBlockTransformer<FileBlock>;
export type ImageTransformer = NotionBlockTransformer<ImageBlock>;
export type UnsupportedBlockTransformer = NotionBlockTransformer<Block>;

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
  pdf?: PDFTransformer;
  file?: FileTransformer;
  image?: ImageTransformer;
};
