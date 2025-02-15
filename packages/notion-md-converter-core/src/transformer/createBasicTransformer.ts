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
  ParagraphBlock,
  ParagraphTransformer,
  PdfBlock,
  PdfTransformer,
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
} from "../types";
import { isNumberedListItemBlock } from "../utils";

export class UnsupportedBlockError extends Error {
  constructor(block: Block) {
    super(`Unsupported block type: ${block.type}`);
  }
}

export const createBasicBookmarkTransformer = (
  execute: (args: { block: BookmarkBlock }) => string,
): BookmarkTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicBreadcrumbTransformer = (
  execute: (args: { block: BreadcrumbBlock }) => string,
): BreadcrumbTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicCalloutTransformer = (
  execute: (args: { block: CalloutBlock; children: string }) => string,
): CalloutTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createBasicCodeTransformer = (
  execute: (args: {
    block: CodeBlock;
    meta: { diff: boolean; filename: string; language: CodeLanguage };
  }) => string,
): CodeTransformer => {
  return (context) => {
    const caption = context.currentBlock.code.caption
      .map((richText) => richText.plain_text)
      .join("");
    const diff = caption.startsWith("diff:");
    const filename = caption.replace("diff:", "").trim();
    const language = context.currentBlock.code.language;
    return execute({ block: context.currentBlock, meta: { diff, filename, language } });
  };
};

export const createBasicColumnListTransformer = (
  execute: (args: { block: ColumnListBlock; columns: string[] }) => string,
): ColumnListTransformer => {
  return (context) => {
    const columns = context.currentBlock.children as ColumnBlock[];
    const columnsText = columns.map((column) => context.execute(column.children));
    return execute({ block: context.currentBlock, columns: columnsText });
  };
};

export const createBasicDividerTransformer = (
  execute: (args: { block: DividerBlock }) => string,
): DividerTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicEquationTransformer = (
  execute: (args: { block: EquationBlock }) => string,
): EquationTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicFileTransformer = (
  execute: (args: { block: FileBlock }) => string,
): FileTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicHeadingTransformer = (
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

export const createBasicImageTransformer = (
  execute: (args: { block: ImageBlock }) => string,
): ImageTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicLinkPreviewTransformer = (
  execute: (args: { block: LinkPreviewBlock }) => string,
): LinkPreviewTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicBulletedListItemTransformer = (
  execute: (args: { block: BulletedListItemBlock; children: string }) => string,
): BulletedListItemTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createBasicNumberedListItemTransformer = (
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

export const createBasicTodoTransformer = (
  execute: (args: { block: ToDoBlock; children: string }) => string,
): ToDoTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createBasicParagraphTransformer = (
  execute: (args: { block: ParagraphBlock; children: string }) => string,
): ParagraphTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createBasicPDFTransformer = (
  execute: (args: { block: PdfBlock }) => string,
): PdfTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicQuoteTransformer = (
  execute: (args: { block: QuoteBlock; children: string }) => string,
): QuoteTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createBasicSyncedBlockTransformer = (
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

export const createBasicTableOfContentsTransformer = (
  execute: (args: { block: TableOfContentsBlock }) => string,
): TableOfContentsTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicTableTransformer = (
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

export const createBasicToggleTransformer = (
  execute: (args: { block: ToggleBlock; children: string }) => string,
): ToggleTransformer => {
  return (context) => {
    const children = context.execute(context.currentBlock.children);
    return execute({ block: context.currentBlock, children });
  };
};

export const createBasicVideoTransformer = (
  execute: (args: { block: VideoBlock }) => string,
): VideoTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicEmbedTransformer = (
  execute: (args: { block: EmbedBlock }) => string,
): EmbedTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicChildDatabaseTransformer = (
  execute: (args: { block: ChildDatabaseBlock }) => string,
): ChildDatabaseTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};

export const createBasicChildPageTransformer = (
  execute: (args: { block: ChildPageBlock }) => string,
): ChildPageTransformer => {
  return (context) => {
    return execute({ block: context.currentBlock });
  };
};
