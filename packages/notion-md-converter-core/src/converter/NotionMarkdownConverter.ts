import type {
  Block,
  Context,
  ConverterTools,
  TransformerMapping,
} from "@notion-md-converter/types";
import type {
  BookmarkBlock,
  BreadcrumbBlock,
  BulletedListItemBlock,
  CalloutBlock,
  CodeBlock,
  ColumnListBlock,
  DividerBlock,
  EmbedBlock,
  EquationBlock,
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
} from "@notion-md-converter/types";
import { BasicRichTextFormatter } from "../rich-text";
import {
  createMarkdownBookmarkTransformer,
  createMarkdownBreadcrumbTransformer,
  createMarkdownBulletedListItemTransformer,
  createMarkdownCalloutTransformer,
  createMarkdownCodeTransformer,
  createMarkdownColumnListTransformer,
  createMarkdownDividerTransformer,
  createMarkdownEmbedTransformer,
  createMarkdownEquationTransformer,
  createMarkdownFileTransformer,
  createMarkdownHeadingTransformer,
  createMarkdownImageTransformer,
  createMarkdownLinkPreviewTransformer,
  createMarkdownNumberedListItemTransformer,
  createMarkdownPDFTransformer,
  createMarkdownParagraphTransformer,
  createMarkdownQuoteTransformer,
  createMarkdownSyncedBlockTransformer,
  createMarkdownTableOfContentsTransformer,
  createMarkdownTableTransformer,
  createMarkdownTodoListItemTransformer,
  createMarkdownToggleTransformer,
  createMarkdownVideoTransformer,
} from "../transformer";
import {
  isBookmarkBlock,
  isBreadcrumbBlock,
  isBulletedListItemBlock,
  isCalloutBlock,
  isCodeBlock,
  isColumnListBlock,
  isDividerBlock,
  isEmbedBlock,
  isEquationBlock,
  isHeading1Block,
  isHeading2Block,
  isHeading3Block,
  isImageBlock,
  isLinkPreviewBlock,
  isNumberedListItemBlock,
  isParagraphBlock,
  isPdfBlock,
  isQuoteBlock,
  isSyncedBlock,
  isTableBlock,
  isTableOfContentsBlock,
  isToDoBlock,
  isToggleBlock,
  isVideoBlock,
} from "../utils";

export class NotRootBlockError extends Error {
  constructor(block: Block) {
    super(`Block is not a root block: ${block.type}`);
  }
}

export interface NotionMarkdownConverterOptions {
  /**
   * カスタムトランスフォーマーマッピング
   */
  transformers?: TransformerMapping;

  /**
   * 変換ツール
   */
  tools?: Partial<ConverterTools>;
}

export class NotionMarkdownConverter {
  protected transformers: TransformerMapping;
  protected tools: ConverterTools;

  constructor(options: NotionMarkdownConverterOptions = {}) {
    // ツールの初期化
    this.tools = {
      richTextFormatter: new BasicRichTextFormatter(),
      ...(options.tools || {}),
    };

    // トランスフォーマーの初期化
    this.transformers = this.initializeTransformers(options.transformers || {});
  }

  /**
   * トランスフォーマーの初期化
   */
  private initializeTransformers(customTransformers: TransformerMapping): TransformerMapping {
    return {
      bookmark: createMarkdownBookmarkTransformer(),
      breadcrumb: createMarkdownBreadcrumbTransformer(),
      bulleted_list_item: createMarkdownBulletedListItemTransformer(),
      callout: createMarkdownCalloutTransformer(),
      code: createMarkdownCodeTransformer(),
      column_list: createMarkdownColumnListTransformer(),
      divider: createMarkdownDividerTransformer(),
      equation: createMarkdownEquationTransformer(),
      heading: createMarkdownHeadingTransformer(),
      link_preview: createMarkdownLinkPreviewTransformer(),
      numbered_list_item: createMarkdownNumberedListItemTransformer(),
      paragraph: createMarkdownParagraphTransformer(),
      quote: createMarkdownQuoteTransformer(),
      synced_block: createMarkdownSyncedBlockTransformer(),
      table_of_contents: createMarkdownTableOfContentsTransformer(),
      table: createMarkdownTableTransformer(),
      to_do: createMarkdownTodoListItemTransformer(),
      toggle: createMarkdownToggleTransformer(),
      file: createMarkdownFileTransformer(),
      image: createMarkdownImageTransformer(),
      pdf: createMarkdownPDFTransformer(),
      video: createMarkdownVideoTransformer(),
      embed: createMarkdownEmbedTransformer(),
      ...customTransformers,
    };
  }

  execute(blocks: Block[]): string {
    const convertedMarkdown = this.transformBlocks(blocks);
    return this.onComplete(convertedMarkdown);
  }

  private transformBlocks(blocks: Block[]): string {
    const context: Context<Block> = {
      execute: (blocks) => this.transformBlocks(blocks),
      blocks,
      currentBlock: blocks[0],
      currentBlockIndex: 0,
      tools: this.tools,
    };
    const transformedBlocks = blocks.map((block, index) => {
      context.currentBlock = block;
      context.currentBlockIndex = index;

      if (isBookmarkBlock(block)) {
        const ctx = context as Context<BookmarkBlock>;
        return this.transformers.bookmark?.(ctx) ?? "";
      }

      if (isBreadcrumbBlock(block)) {
        const ctx = context as Context<BreadcrumbBlock>;
        return this.transformers.breadcrumb?.(ctx) ?? "";
      }

      if (isCalloutBlock(block)) {
        const ctx = context as Context<CalloutBlock>;
        return this.transformers.callout?.(ctx) ?? "";
      }

      if (isCodeBlock(block)) {
        const ctx = context as Context<CodeBlock>;
        return this.transformers.code?.(ctx) ?? "";
      }

      if (isColumnListBlock(block)) {
        const ctx = context as Context<ColumnListBlock>;
        return this.transformers.column_list?.(ctx) ?? "";
      }

      if (isDividerBlock(block)) {
        const ctx = context as Context<DividerBlock>;
        return this.transformers.divider?.(ctx) ?? "";
      }

      if (isEquationBlock(block)) {
        const ctx = context as Context<EquationBlock>;
        return this.transformers.equation?.(ctx) ?? "";
      }

      if (isHeading1Block(block)) {
        const ctx = context as Context<Heading1Block>;
        return this.transformers.heading?.(ctx) ?? "";
      }

      if (isHeading2Block(block)) {
        const ctx = context as Context<Heading2Block>;
        return this.transformers.heading?.(ctx) ?? "";
      }

      if (isHeading3Block(block)) {
        const ctx = context as Context<Heading3Block>;
        return this.transformers.heading?.(ctx) ?? "";
      }

      if (isLinkPreviewBlock(block)) {
        const ctx = context as Context<LinkPreviewBlock>;
        return this.transformers.link_preview?.(ctx) ?? "";
      }

      if (isBulletedListItemBlock(block)) {
        const ctx = context as Context<BulletedListItemBlock>;
        return this.transformers.bulleted_list_item?.(ctx) ?? "";
      }

      if (isNumberedListItemBlock(block)) {
        const ctx = context as Context<NumberedListItemBlock>;
        return this.transformers.numbered_list_item?.(ctx) ?? "";
      }

      if (isToDoBlock(block)) {
        const ctx = context as Context<ToDoBlock>;
        return this.transformers.to_do?.(ctx) ?? "";
      }

      if (isParagraphBlock(block)) {
        const ctx = context as Context<ParagraphBlock>;
        return this.transformers.paragraph?.(ctx) ?? "";
      }

      if (isQuoteBlock(block)) {
        const ctx = context as Context<QuoteBlock>;
        return this.transformers.quote?.(ctx) ?? "";
      }

      if (isSyncedBlock(block)) {
        const ctx = context as Context<SyncedBlock>;
        return this.transformers.synced_block?.(ctx) ?? "";
      }

      if (isTableOfContentsBlock(block)) {
        const ctx = context as Context<TableOfContentsBlock>;
        return this.transformers.table_of_contents?.(ctx) ?? "";
      }

      if (isTableBlock(block)) {
        const ctx = context as Context<TableBlock>;
        return this.transformers.table?.(ctx) ?? "";
      }

      if (isToggleBlock(block)) {
        const ctx = context as Context<ToggleBlock>;
        return this.transformers.toggle?.(ctx) ?? "";
      }

      if (isEmbedBlock(block)) {
        const ctx = context as Context<EmbedBlock>;
        return this.transformers.embed?.(ctx) ?? "";
      }

      if (isImageBlock(block)) {
        const ctx = context as Context<ImageBlock>;
        return this.transformers.image?.(ctx) ?? "";
      }

      if (isVideoBlock(block)) {
        const ctx = context as Context<VideoBlock>;
        return this.transformers.video?.(ctx) ?? "";
      }

      if (isPdfBlock(block)) {
        const ctx = context as Context<PdfBlock>;
        return this.transformers.pdf?.(ctx) ?? "";
      }
    });

    return transformedBlocks.filter((b) => b !== null && b !== undefined).join("\n");
  }

  protected onComplete(markdown: string): string {
    // 変換後にカスタマイズしたいときに使用する
    return markdown;
  }
}
