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
  CodeLanguage,
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
import type { CaptionMetadata } from "../utils";
import { TransformerUtils, isNumberedListItemBlock } from "../utils";

export class UnsupportedBlockError extends Error {
  constructor(block: Block) {
    super(`Unsupported block type: ${block.type}`);
  }
}

export const createBookmarkTransformerFactory = (
  execute: (args: { block: BookmarkBlock; context: Context<BookmarkBlock> }) => string,
): BookmarkTransformer => {
  return (context) => {
    if (context.currentBlock.bookmark.url === "") {
      return "";
    }
    return execute({ block: context.currentBlock, context });
  };
};

export const createBreadcrumbTransformerFactory = (
  execute: (args: { block: BreadcrumbBlock; context: Context<BreadcrumbBlock> }) => string,
): BreadcrumbTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createCalloutTransformerFactory = (
  execute: (args: { block: CalloutBlock; children: string; context: Context<CalloutBlock> }) => string,
): CalloutTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createCodeTransformerFactory = (
  execute: (args: {
    block: CodeBlock;
    metadata: { filename: string; language: CodeLanguage } & CaptionMetadata;
    context: Context<CodeBlock>;
  }) => string,
): CodeTransformer => {
  return (context) => {
    const { metadata, text } = TransformerUtils.getCaptionMetadata(
      context.currentBlock.code.caption,
    );
    const language = context.currentBlock.code.language;
    return execute({
      block: context.currentBlock,
      metadata: { ...metadata, filename: text, language },
      context,
    });
  };
};

export const createColumnListTransformerFactory = (
  execute: (args: { 
    block: ColumnListBlock; 
    columns: string[]; 
    context: Context<ColumnListBlock> 
  }) => string,
): ColumnListTransformer => {
  return (context) => {
    const columns = context.currentBlock.children as ColumnBlock[];
    const columnsText = columns.map((column) => context.execute(column.children));
    return execute({ block: context.currentBlock, columns: columnsText, context });
  };
};

export const createDividerTransformerFactory = (
  execute: (args: { block: DividerBlock; context: Context<DividerBlock> }) => string,
): DividerTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createEquationTransformerFactory = (
  execute: (args: { block: EquationBlock; context: Context<EquationBlock> }) => string,
): EquationTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createFileTransformerFactory = (
  execute: (args: { block: FileBlock; context: Context<FileBlock> }) => string,
): FileTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createHeadingTransformerFactory = (
  execute: (args: {
    block: Heading1Block | Heading2Block | Heading3Block;
    level: 1 | 2 | 3;
    richText: RichText[];
    isToggleable: boolean;
    color: ApiColor;
    context: Context<Heading1Block | Heading2Block | Heading3Block>;
  }) => string,
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
  execute: (args: { 
    block: ImageBlock; 
    metadata: CaptionMetadata;
    context: Context<ImageBlock>;
  }) => string,
): ImageTransformer => {
  return (context) => {
    const image = context.currentBlock.image;
    const url = image.type === "external" ? image.external.url : image.file.url;
    if (!url) {
      return "";
    }

    const { metadata } = TransformerUtils.getCaptionMetadata(context.currentBlock.image.caption);
    return execute({ block: context.currentBlock, metadata, context });
  };
};

export const createLinkPreviewTransformerFactory = (
  execute: (args: { block: LinkPreviewBlock; context: Context<LinkPreviewBlock> }) => string,
): LinkPreviewTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createBulletedListItemTransformerFactory = (
  execute: (args: { block: BulletedListItemBlock; children: string; context: Context<BulletedListItemBlock> }) => string,
): BulletedListItemTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createNumberedListItemTransformerFactory = (
  execute: (args: {
    block: NumberedListItemBlock;
    children: string;
    index: number;
    context: Context<NumberedListItemBlock>;
  }) => string,
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
  execute: (args: { block: ToDoBlock; children: string; context: Context<ToDoBlock> }) => string,
): ToDoTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createParagraphTransformerFactory = (
  execute: (args: { block: ParagraphBlock; children: string; context: Context<ParagraphBlock> }) => string,
): ParagraphTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createPDFTransformerFactory = (
  execute: (args: { block: PdfBlock; context: Context<PdfBlock> }) => string,
): PDFTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createQuoteTransformerFactory = (
  execute: (args: { block: QuoteBlock; children: string; context: Context<QuoteBlock> }) => string,
): QuoteTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createSyncedBlockTransformerFactory = (
  execute: (args: {
    block: SyncedBlock;
    isSynchronizationSource: boolean;
    children: string;
    context: Context<SyncedBlock>;
  }) => string,
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
  execute: (args: { block: TableOfContentsBlock; context: Context<TableOfContentsBlock> }) => string,
): TableOfContentsTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createTableTransformerFactory = (
  execute: (args: {
    block: TableBlock;
    header: TableRowBlock;
    rows: TableRowBlock[];
    context: Context<TableBlock>;
  }) => string,
): TableTransformer => {
  return (context) => {
    const block = context.currentBlock;
    const header = block.children[0] as TableRowBlock;
    const rows = block.children.slice(1) as TableRowBlock[];
    return execute({ block: context.currentBlock, header, rows, context });
  };
};

export const createToggleTransformerFactory = (
  execute: (args: { block: ToggleBlock; children: string; context: Context<ToggleBlock> }) => string,
): ToggleTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children, context });
  };
};

export const createVideoTransformerFactory = (
  execute: (args: { block: VideoBlock; context: Context<VideoBlock> }) => string,
): VideoTransformer => {
  return (context) => {
    const video = context.currentBlock.video;
    const url = video.type === "external" ? video.external.url : video.file.url;
    if (!url) {
      return "";
    }
    return execute({ block: context.currentBlock, context });
  };
};

export const createEmbedTransformerFactory = (
  execute: (args: {
    block: EmbedBlock;
    metadata: CaptionMetadata;
    context: Context<EmbedBlock>;
  }) => string,
): EmbedTransformer => {
  return (context) => {
    const { metadata } = TransformerUtils.getCaptionMetadata(context.currentBlock.embed.caption);

    return execute({
      block: context.currentBlock,
      metadata,
      context,
    });
  };
};

export const createChildDatabaseTransformerFactory = (
  execute: (args: { block: ChildDatabaseBlock; context: Context<ChildDatabaseBlock> }) => string,
): ChildDatabaseTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};

export const createChildPageTransformerFactory = (
  execute: (args: { block: ChildPageBlock; context: Context<ChildPageBlock> }) => string,
): ChildPageTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock, context });
  };
};
