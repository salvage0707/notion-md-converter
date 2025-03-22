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
import type { CaptionMetadata, ProviderType } from "../utils";
import { ProviderUtils, TransformerUtils, isNumberedListItemBlock } from "../utils";

export class UnsupportedBlockError extends Error {
  constructor(block: Block) {
    super(`Unsupported block type: ${block.type}`);
  }
}

export const createBookmarkTransformerFactory = (
  execute: (args: { block: BookmarkBlock }) => string,
): BookmarkTransformer => {
  return (context) => {
    if (context.currentBlock.bookmark.url === "") {
      return "";
    }
    return execute({ block: context.currentBlock });
  };
};

export const createBreadcrumbTransformerFactory = (
  execute: (args: { block: BreadcrumbBlock }) => string,
): BreadcrumbTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createCalloutTransformerFactory = (
  execute: (args: { block: CalloutBlock; children: string }) => string,
): CalloutTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createCodeTransformerFactory = (
  execute: (args: {
    block: CodeBlock;
    metadata: { filename: string; language: CodeLanguage } & CaptionMetadata;
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
    });
  };
};

export const createColumnListTransformerFactory = (
  execute: (args: { block: ColumnListBlock; columns: string[] }) => string,
): ColumnListTransformer => {
  return (context) => {
    const columns = context.currentBlock.children as ColumnBlock[];
    const columnsText = columns.map((column) => context.execute(column.children));
    return execute({ block: context.currentBlock, columns: columnsText });
  };
};

export const createDividerTransformerFactory = (
  execute: (args: { block: DividerBlock }) => string,
): DividerTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createEquationTransformerFactory = (
  execute: (args: { block: EquationBlock }) => string,
): EquationTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createFileTransformerFactory = (
  execute: (args: { block: FileBlock }) => string,
): FileTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createHeadingTransformerFactory = (
  execute: (args: {
    block: Heading1Block | Heading2Block | Heading3Block;
    level: 1 | 2 | 3;
    richText: RichText[];
    isToggleable: boolean;
    color: ApiColor;
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
        });
      case "heading_2":
        return execute({
          block: context.currentBlock,
          level: 2,
          richText: context.currentBlock.heading_2.rich_text,
          isToggleable: false,
          color: context.currentBlock.heading_2.color,
        });
      case "heading_3":
        return execute({
          block: context.currentBlock,
          level: 3,
          richText: context.currentBlock.heading_3.rich_text,
          isToggleable: false,
          color: context.currentBlock.heading_3.color,
        });
      default:
        throw new UnsupportedBlockError(context.currentBlock);
    }
  };
};

export const createImageTransformerFactory = (
  execute: (args: { block: ImageBlock; metadata: CaptionMetadata }) => string,
): ImageTransformer => {
  return (context) => {
    const image = context.currentBlock.image;
    const url = image.type === "external" ? image.external.url : image.file.url;
    if (!url) {
      return "";
    }

    const { metadata } = TransformerUtils.getCaptionMetadata(context.currentBlock.image.caption);
    return execute({ block: context.currentBlock, metadata });
  };
};

export const createLinkPreviewTransformerFactory = (
  execute: (args: { block: LinkPreviewBlock }) => string,
): LinkPreviewTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBulletedListItemTransformerFactory = (
  execute: (args: { block: BulletedListItemBlock; children: string }) => string,
): BulletedListItemTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createNumberedListItemTransformerFactory = (
  execute: (args: {
    block: NumberedListItemBlock;
    children: string;
    index: number;
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
    return execute({ block: context.currentBlock, children, index: listCount });
  };
};

export const createTodoTransformerFactory = (
  execute: (args: { block: ToDoBlock; children: string }) => string,
): ToDoTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createParagraphTransformerFactory = (
  execute: (args: { block: ParagraphBlock; children: string }) => string,
): ParagraphTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createPDFTransformerFactory = (
  execute: (args: { block: PdfBlock }) => string,
): PDFTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createQuoteTransformerFactory = (
  execute: (args: { block: QuoteBlock; children: string }) => string,
): QuoteTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createSyncedBlockTransformerFactory = (
  execute: (args: {
    block: SyncedBlock;
    isSynchronizationSource: boolean;
    children: string;
  }) => string,
): SyncedBlockTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    const isSynchronizationSource = context.currentBlock.synced_block.synced_from === null;
    return execute({
      block: context.currentBlock,
      isSynchronizationSource,
      children,
    });
  };
};

export const createTableOfContentsTransformerFactory = (
  execute: (args: { block: TableOfContentsBlock }) => string,
): TableOfContentsTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createTableTransformerFactory = (
  execute: (args: {
    block: TableBlock;
    header: TableRowBlock;
    rows: TableRowBlock[];
  }) => string,
): TableTransformer => {
  return (context) => {
    const block = context.currentBlock;
    const header = block.children[0] as TableRowBlock;
    const rows = block.children.slice(1) as TableRowBlock[];
    return execute({ block: context.currentBlock, header, rows });
  };
};

export const createToggleTransformerFactory = (
  execute: (args: { block: ToggleBlock; children: string }) => string,
): ToggleTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createVideoTransformerFactory = (
  execute: (args: { block: VideoBlock }) => string,
): VideoTransformer => {
  return (context) => {
    const video = context.currentBlock.video;
    const url = video.type === "external" ? video.external.url : video.file.url;
    if (!url) {
      return "";
    }
    return execute({ block: context.currentBlock });
  };
};

export const createEmbedTransformerFactory = (
  execute: (args: {
    block: EmbedBlock;
    metadata: CaptionMetadata;
    providerType: ProviderType | null;
  }) => string,
): EmbedTransformer => {
  return (context) => {
    const { metadata } = TransformerUtils.getCaptionMetadata(context.currentBlock.embed.caption);
    const providerType = ProviderUtils.getType(context.currentBlock.embed.url);

    return execute({
      block: context.currentBlock,
      metadata,
      providerType,
    });
  };
};

export const createChildDatabaseTransformerFactory = (
  execute: (args: { block: ChildDatabaseBlock }) => string,
): ChildDatabaseTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createChildPageTransformerFactory = (
  execute: (args: { block: ChildPageBlock }) => string,
): ChildPageTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};
