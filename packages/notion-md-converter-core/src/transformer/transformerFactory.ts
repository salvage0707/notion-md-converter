import type {
  ApiColor,
  Block,
  BookmarkBlock,
  BookmarkTransformer,
  BreadcrumbBlock,
  BreadcrumbTransformer,
  BulletedListItemBlock,
  BulletedListItemTransformer,
  CalloutBlock,
  CalloutTransformer,
  ChildDatabaseBlock,
  ChildDatabaseTransformer,
  ChildPageBlock,
  ChildPageTransformer,
  CodeBlock,
  CodeTransformer,
  ColumnBlock,
  ColumnListBlock,
  ColumnListTransformer,
  Context,
  DividerBlock,
  DividerTransformer,
  EmbedBlock,
  EmbedTransformer,
  EquationBlock,
  EquationTransformer,
  FileBlock,
  FileTransformer,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  HeadingTransformer,
  ImageBlock,
  ImageTransformer,
  LinkPreviewBlock,
  LinkPreviewTransformer,
  NumberedListItemBlock,
  NumberedListItemTransformer,
  PDFTransformer,
  ParagraphBlock,
  ParagraphTransformer,
  PdfBlock,
  QuoteBlock,
  QuoteTransformer,
  RichText,
  SyncedBlock,
  SyncedBlockTransformer,
  TableBlock,
  TableOfContentsBlock,
  TableOfContentsTransformer,
  TableRowBlock,
  TableTransformer,
  ToDoBlock,
  ToDoTransformer,
  ToggleBlock,
  ToggleTransformer,
  VideoBlock,
  VideoTransformer,
} from "@notion-md-converter/types";
import { CaptionMetadata } from "../rich-text";
import { isNumberedListItemBlock } from "../utils";

export class UnsupportedBlockError extends Error {
  constructor(block: Block) {
    super(`Unsupported block type: ${block.type}`);
  }
}

type BaseBlockArg<T extends Block> = { block: T; context: Context<T> };
export type ExecuteFunction<T extends Block, TExtra = Record<string, unknown>> = (
  arg: BaseBlockArg<T> & TExtra,
) => string | null;

export const createBookmarkTransformerFactory = (
  execute: ExecuteFunction<BookmarkBlock, { captionMetadata: CaptionMetadata }>,
): BookmarkTransformer => {
  return (context) => {
    if (context.currentBlock.bookmark.url === "") {
      return null;
    }
    const captionMetadata = CaptionMetadata.fromRichText(context.currentBlock.bookmark.caption);
    return execute({ block: context.currentBlock, captionMetadata, context });
  };
};

export const createBreadcrumbTransformerFactory = (
  execute: ExecuteFunction<BreadcrumbBlock>,
): BreadcrumbTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createCalloutTransformerFactory = (
  execute: ExecuteFunction<CalloutBlock, { children: string }>,
): CalloutTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createCodeTransformerFactory = (
  execute: ExecuteFunction<CodeBlock, { captionMetadata: CaptionMetadata }>,
): CodeTransformer => {
  return (context) => {
    const captionMetadata = CaptionMetadata.fromRichText(context.currentBlock.code.caption);
    return execute({
      block: context.currentBlock,
      captionMetadata,
      context,
    });
  };
};

export const createColumnListTransformerFactory = (
  execute: ExecuteFunction<ColumnListBlock, { columns: string[] }>,
): ColumnListTransformer => {
  return (context) => {
    const columns = context.currentBlock.children as ColumnBlock[];
    const columnsText = columns.map((column) => context.execute(column.children));
    return execute({ block: context.currentBlock, columns: columnsText, context });
  };
};

export const createDividerTransformerFactory = (
  execute: ExecuteFunction<DividerBlock>,
): DividerTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createEquationTransformerFactory = (
  execute: ExecuteFunction<EquationBlock>,
): EquationTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createFileTransformerFactory = (
  execute: ExecuteFunction<FileBlock, { captionMetadata: CaptionMetadata }>,
): FileTransformer => {
  return (context) => {
    const captionMetadata = CaptionMetadata.fromRichText(context.currentBlock.file.caption);
    return execute({ block: context.currentBlock, captionMetadata, context });
  };
};

export const createHeadingTransformerFactory = (
  execute: ExecuteFunction<
    Heading1Block | Heading2Block | Heading3Block,
    { level: 1 | 2 | 3; richText: RichText[]; isToggleable: boolean; color: ApiColor }
  >,
): HeadingTransformer => {
  return (context) => {
    switch (context.currentBlock.type) {
      case "heading_1":
        return execute({
          block: context.currentBlock,
          level: 1,
          richText: context.currentBlock.heading_1.rich_text,
          isToggleable: false,
          color: context.currentBlock.heading_1.color,
          context,
        });
      case "heading_2":
        return execute({
          block: context.currentBlock,
          level: 2,
          richText: context.currentBlock.heading_2.rich_text,
          isToggleable: false,
          color: context.currentBlock.heading_2.color,
          context,
        });
      case "heading_3":
        return execute({
          block: context.currentBlock,
          level: 3,
          richText: context.currentBlock.heading_3.rich_text,
          isToggleable: false,
          color: context.currentBlock.heading_3.color,
          context,
        });
      default:
        throw new UnsupportedBlockError(context.currentBlock);
    }
  };
};

export const createImageTransformerFactory = (
  execute: ExecuteFunction<ImageBlock, { captionMetadata: CaptionMetadata }>,
): ImageTransformer => {
  return (context) => {
    const image = context.currentBlock.image;
    const url = image.type === "external" ? image.external.url : image.file.url;
    if (!url) {
      return null;
    }
    const captionMetadata = CaptionMetadata.fromRichText(context.currentBlock.image.caption);
    return execute({ block: context.currentBlock, captionMetadata, context });
  };
};

export const createLinkPreviewTransformerFactory = (
  execute: ExecuteFunction<LinkPreviewBlock>,
): LinkPreviewTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createBulletedListItemTransformerFactory = (
  execute: ExecuteFunction<BulletedListItemBlock, { children: string }>,
): BulletedListItemTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createNumberedListItemTransformerFactory = (
  execute: ExecuteFunction<NumberedListItemBlock, { children: string; index: number }>,
): NumberedListItemTransformer => {
  return (context) => {
    const beforeBlocks = context.blocks.slice(0, context.currentBlockIndex);

    let listCount = 1;
    for (let index = beforeBlocks.length - 1; index >= 0; index--) {
      if (!isNumberedListItemBlock(beforeBlocks[index])) {
        break;
      }
      listCount++;
    }

    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, index: listCount, context });
  };
};

export const createTodoTransformerFactory = (
  execute: ExecuteFunction<ToDoBlock, { children: string }>,
): ToDoTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createParagraphTransformerFactory = (
  execute: ExecuteFunction<ParagraphBlock, { children: string }>,
): ParagraphTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createPDFTransformerFactory = (
  execute: ExecuteFunction<PdfBlock, { captionMetadata: CaptionMetadata }>,
): PDFTransformer => {
  return (context) => {
    const captionMetadata = CaptionMetadata.fromRichText(context.currentBlock.pdf.caption);
    return execute({ block: context.currentBlock, captionMetadata, context });
  };
};

export const createQuoteTransformerFactory = (
  execute: ExecuteFunction<QuoteBlock, { children: string }>,
): QuoteTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createSyncedBlockTransformerFactory = (
  execute: ExecuteFunction<SyncedBlock, { isSynchronizationSource: boolean; children: string }>,
): SyncedBlockTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    const isSynchronizationSource = context.currentBlock.synced_block.synced_from === null;
    return execute({
      block: context.currentBlock,
      isSynchronizationSource,
      children,
      context,
    });
  };
};

export const createTableOfContentsTransformerFactory = (
  execute: ExecuteFunction<TableOfContentsBlock>,
): TableOfContentsTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createTableTransformerFactory = (
  execute: ExecuteFunction<TableBlock, { header: TableRowBlock; rows: TableRowBlock[] }>,
): TableTransformer => {
  return (context) => {
    const block = context.currentBlock;
    const header = block.children[0] as TableRowBlock;
    const rows = block.children.slice(1) as TableRowBlock[];
    return execute({ block: context.currentBlock, header, rows, context });
  };
};

export const createToggleTransformerFactory = (
  execute: ExecuteFunction<ToggleBlock, { children: string }>,
): ToggleTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createVideoTransformerFactory = (
  execute: ExecuteFunction<VideoBlock, { captionMetadata: CaptionMetadata }>,
): VideoTransformer => {
  return (context) => {
    const video = context.currentBlock.video;
    const url = video.type === "external" ? video.external.url : video.file.url;
    if (!url) {
      return null;
    }
    const captionMetadata = CaptionMetadata.fromRichText(context.currentBlock.video.caption);
    return execute({ block: context.currentBlock, captionMetadata, context });
  };
};

export const createEmbedTransformerFactory = (
  execute: ExecuteFunction<EmbedBlock, { captionMetadata: CaptionMetadata }>,
): EmbedTransformer => {
  return (context) => {
    const captionMetadata = CaptionMetadata.fromRichText(context.currentBlock.embed.caption);
    return execute({ block: context.currentBlock, captionMetadata, context });
  };
};

export const createChildDatabaseTransformerFactory = (
  execute: ExecuteFunction<ChildDatabaseBlock>,
): ChildDatabaseTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createChildPageTransformerFactory = (
  execute: ExecuteFunction<ChildPageBlock>,
): ChildPageTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};
