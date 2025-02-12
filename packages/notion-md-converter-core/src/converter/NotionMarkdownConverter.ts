import {
  createMarkdownBookmarkTransformer,
  createMarkdownBreadcrumbTransformer,
  createMarkdownBulletedListItemTransformer,
  createMarkdownCalloutTransformer,
  createMarkdownCodeTransformer,
  createMarkdownColumnListTransformer,
  createMarkdownDividerTransformer,
  createMarkdownEquationTransformer,
  createMarkdownFileTransformer,
  createMarkdownHeadingTransformer,
  createMarkdownImageTransformer,
  createMarkdownLinkPreviewTransformer,
  createMarkdownNumberedListItemTransformer,
  createMarkdownParagraphTransformer,
  createMarkdownPdfTransformer,
  createMarkdownQuoteTransformer,
  createMarkdownSyncedBlockTransformer,
  createMarkdownTableOfContentsTransformer,
  createMarkdownTableTransformer,
  createMarkdownTodoListItemTransformer,
  createMarkdownToggleTransformer,
  createMarkdownVideoTransformer,
} from "../transformer";
import type { Context, TransformerMapping } from "../types";
import type {
  Block,
  BookmarkBlock,
  BreadcrumbBlock,
  BulletedListItemBlock,
  CalloutBlock,
  CodeBlock,
  ColumnListBlock,
  DividerBlock,
  EquationBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  LinkPreviewBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  QuoteBlock,
  SyncedBlock,
  TableBlock,
  TableOfContentsBlock,
  ToDoBlock,
  ToggleBlock,
} from "../types/notion";
import {
  isBookmarkBlock,
  isBreadcrumbBlock,
  isBulletedListItemBlock,
  isCalloutBlock,
  isCodeBlock,
  isColumnListBlock,
  isDividerBlock,
  isEquationBlock,
  isHeading1Block,
  isHeading2Block,
  isHeading3Block,
  isLinkPreviewBlock,
  isNumberedListItemBlock,
  isParagraphBlock,
  isQuoteBlock,
  isRootBlock,
  isSyncedBlock,
  isTableBlock,
  isTableOfContentsBlock,
  isToDoBlock,
  isToggleBlock,
} from "../utils";

export class NotRootBlockError extends Error {
  constructor(block: Block) {
    super(`Block is not a root block: ${block.type}`);
  }
}

export class NotionMarkdownConverter {
  protected transformers: TransformerMapping;

  constructor(transformers: TransformerMapping = {}) {
    this.transformers = {
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
      pdf: createMarkdownPdfTransformer(),
      video: createMarkdownVideoTransformer(),
      ...transformers,
    };
  }

  execute(blocks: Block[]): string {
    const context: Context<Block> = {
      execute: (blocks) => this.execute(blocks),
      blocks,
      currentBlock: blocks[0],
      currentBlockIndex: 0,
    };
    const transformedBlocks = blocks.map((block, index) => {
      context.currentBlock = block;
      context.currentBlockIndex = index;

      if (!isRootBlock(block)) {
        throw new NotRootBlockError(block);
      }

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
    });

    return transformedBlocks.filter((b) => b !== null).join("\n");
  }
}
