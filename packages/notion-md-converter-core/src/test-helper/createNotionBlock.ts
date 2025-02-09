import type {
  Block,
  BookmarkBlock,
  BreadcrumbBlock,
  BulletedListItemBlock,
  CalloutBlock,
  ChildDatabaseBlock,
  ChildPageBlock,
  CodeBlock,
  ColumnBlock,
  ColumnListBlock,
  DividerBlock,
  EmbedBlock,
  EquationBlock,
  FileBlock,
  FileObject,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  ImageBlock,
  LinkPreviewBlock,
  NotionExternalFile,
  NotionInternalFile,
  NumberedListItemBlock,
  ParagraphBlock,
  PdfBlock,
  QuoteBlock,
  RichText,
  SyncedBlock,
  TableBlock,
  TableOfContentsBlock,
  TableRowBlock,
  TextRichText,
  ToDoBlock,
  ToggleBlock,
  VideoBlock,
} from "../types";

const createBaseBlock = () => {
  return {
    object: "block" as const,
    id: "1a2b3c4d-1a2b-1a2b-1a2b-c11a2ee936cc",
    parent: {
      type: "page_id" as const,
      page_id: "page-id",
    },
    created_time: "2025-01-21T15:36:00.000Z",
    last_edited_time: "2025-01-21T15:36:00.000Z",
    created_by: {
      object: "user" as const,
      id: "1a2b3c4d-user-user-user-9bd865ee73e4",
    },
    last_edited_by: {
      object: "user" as const,
      id: "1a2b3c4d-user-user-user-9bd865ee73e4",
    },
    has_children: false,
    archived: false,
    in_trash: false,
  };
};

type RichTextBaseOption = {
  root?: Partial<Omit<RichText, "annotations">>;
  annotations?: Partial<RichText["annotations"]>;
};

export const createTextRichText = (options: {
  root?: RichTextBaseOption["root"];
  annotations?: RichTextBaseOption["annotations"];
}): TextRichText => {
  return {
    type: "text",
    annotations: {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: "default",
      ...options.annotations,
    },
    plain_text: options.root?.plain_text ?? "Example",
    href: null,
    text: {
      content: options.root?.plain_text ?? "Example",
      link: options.root?.href ? { url: options.root.href } : null,
    },
  };
};

export const createBookmarkBlock = (options?: {
  url?: string;
  caption?: RichText[];
}): BookmarkBlock => {
  const defaultCaption = [
    createTextRichText({
      root: {
        plain_text: "Example",
      },
    }),
  ];

  return {
    ...createBaseBlock(),
    type: "bookmark",
    bookmark: {
      url: options?.url ?? "https://example.com",
      caption: options?.caption ?? defaultCaption,
    },
  };
};

export const createParagraphBlock = (options?: {
  richText?: RichText[];
  color?: ParagraphBlock["paragraph"]["color"];
  children?: Block[];
}): ParagraphBlock => {
  const defaultText = [
    createTextRichText({
      root: {
        plain_text: "Example",
      },
    }),
  ];

  return {
    ...createBaseBlock(),
    type: "paragraph",
    paragraph: {
      rich_text: options?.richText ?? defaultText,
      color: options?.color ?? "default",
    },
    children: options?.children ?? [],
  };
};

export const createBreadcrumbBlock = (): BreadcrumbBlock => {
  return {
    ...createBaseBlock(),
    type: "breadcrumb",
    breadcrumb: {},
  };
};

export const createBulletedListItemBlock = (options: {
  richText?: RichText[];
  color?: BulletedListItemBlock["bulleted_list_item"]["color"];
  children?: Block[];
}): BulletedListItemBlock => {
  const defaultRichText = [
    createTextRichText({
      root: {
        plain_text: "Example",
      },
    }),
  ];

  return {
    ...createBaseBlock(),
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: options?.richText ?? defaultRichText,
      color: options?.color ?? "default",
    },
    children: options?.children ?? [],
  };
};

export const createCalloutBlock = (options?: {
  richText?: RichText[];
  icon?: CalloutBlock["callout"]["icon"];
  color?: CalloutBlock["callout"]["color"];
  children?: Block[];
}): CalloutBlock => {
  const defaultRichText = [
    createTextRichText({
      root: {
        plain_text: "Example",
      },
    }),
  ];

  return {
    ...createBaseBlock(),
    type: "callout",
    callout: {
      rich_text: options?.richText ?? defaultRichText,
      icon: options?.icon ?? { type: "emoji", emoji: "💡" },
      color: options?.color ?? "default",
    },
    children: options?.children ?? [],
  };
};

export const createCodeBlock = (options?: {
  richText?: RichText[];
  language?: CodeBlock["code"]["language"];
  caption?: RichText[];
}): CodeBlock => {
  return {
    ...createBaseBlock(),
    type: "code",
    code: {
      rich_text: options?.richText ?? [],
      caption: options?.caption ?? [],
      language: options?.language ?? "plain text",
    },
  };
};

export const createColumnBlock = (options?: {
  children?: Block[];
}): ColumnBlock => {
  return {
    ...createBaseBlock(),
    type: "column",
    column: {},
    children: options?.children ?? [],
  };
};

export const createColumnListBlock = (options?: {
  children?: ColumnBlock[];
}): ColumnListBlock => {
  return {
    ...createBaseBlock(),
    type: "column_list",
    column_list: {},
    children: options?.children ?? [
      createColumnBlock({
        children: [createParagraphBlock()],
      }),
    ],
  };
};

export const createDividerBlock = (): DividerBlock => {
  return {
    ...createBaseBlock(),
    type: "divider",
    divider: {},
  };
};

export const createEquationBlock = (options?: {
  expression?: string;
}): EquationBlock => {
  return {
    ...createBaseBlock(),
    type: "equation",
    equation: {
      expression: options?.expression ?? "a = 1 + x",
    },
  };
};

export const createFileBlock = (options?: {
  caption?: RichText[];
  name?: string;
  url?: string;
  fileObject?: FileObject;
}): FileBlock => {
  const fileObject = options?.fileObject ?? createNotionInternalFile();
  return {
    ...createBaseBlock(),
    type: "file",
    file: {
      caption: options?.caption ?? [],
      name: options?.name ?? "example.png",
      ...fileObject,
    },
  };
};

export const createHeading1Block = (options?: {
  richText?: RichText[];
  color?: Heading1Block["heading_1"]["color"];
}): Heading1Block => {
  return {
    ...createBaseBlock(),
    type: "heading_1",
    heading_1: {
      rich_text: options?.richText ?? [],
      is_toggleable: false,
      color: options?.color ?? "default",
    },
  };
};

export const createHeading2Block = (options?: {
  richText?: RichText[];
  color?: Heading2Block["heading_2"]["color"];
}): Heading2Block => {
  return {
    ...createBaseBlock(),
    type: "heading_2",
    heading_2: {
      rich_text: options?.richText ?? [],
      is_toggleable: false,
      color: options?.color ?? "default",
    },
  };
};

export const createHeading3Block = (options?: {
  richText?: RichText[];
  color?: Heading3Block["heading_3"]["color"];
}): Heading3Block => {
  return {
    ...createBaseBlock(),
    type: "heading_3",
    heading_3: {
      rich_text: options?.richText ?? [],
      is_toggleable: false,
      color: options?.color ?? "default",
    },
  };
};

export const createImageBlock = (options?: {
  url?: string;
  caption?: RichText[];
}): ImageBlock => {
  return {
    ...createBaseBlock(),
    type: "image",
    image: {
      caption: options?.caption ?? [
        createTextRichText({ root: { plain_text: "Example" } }),
      ],
      type: "external",
      external: {
        url: options?.url ?? "https://example.com",
      },
    },
  };
};

export type CreateLinkPreviewBlockOptions = {
  url?: string;
};

export const createLinkPreviewBlock = (options?: {
  url?: string;
}): LinkPreviewBlock => {
  return {
    ...createBaseBlock(),
    type: "link_preview",
    link_preview: {
      url: options?.url ?? "https://example.com",
    },
  };
};

export const createNumberedListItemBlock = (options?: {
  richText?: RichText[];
  color?: NumberedListItemBlock["numbered_list_item"]["color"];
  children?: Block[];
}): NumberedListItemBlock => {
  return {
    ...createBaseBlock(),
    type: "numbered_list_item",
    numbered_list_item: {
      rich_text: options?.richText ?? [],
      color: options?.color ?? "default",
    },
    children: options?.children ?? [],
  };
};

export const createPdfBlock = (options?: {
  caption?: RichText[];
  fileObject?: FileObject;
}): PdfBlock => {
  const fileObject = options?.fileObject ?? createNotionInternalFile();
  return {
    ...createBaseBlock(),
    type: "pdf",
    pdf: {
      caption: options?.caption ?? [],
      ...fileObject,
    },
  };
};

export const createQuoteBlock = (options?: {
  richText?: RichText[];
  color?: QuoteBlock["quote"]["color"];
  children?: Block[];
}): QuoteBlock => {
  return {
    ...createBaseBlock(),
    type: "quote",
    quote: {
      rich_text: options?.richText ?? [],
      color: options?.color ?? "default",
    },
    children: options?.children ?? [],
  };
};

export const createSyncedBlock = (options?: {
  children?: Block[];
}): SyncedBlock => {
  return {
    ...createBaseBlock(),
    type: "synced_block",
    synced_block: {
      synced_from: null,
    },
    children: options?.children ?? [
      createParagraphBlock({
        richText: [createTextRichText({ root: { plain_text: "Example" } })],
      }),
    ],
  };
};

export const createTableRowBlock = (options?: {
  children?: RichText[][];
}): TableRowBlock => {
  return {
    ...createBaseBlock(),
    type: "table_row",
    table_row: {
      cells: options?.children ?? [
        [createTextRichText({ root: { plain_text: "Example" } })],
      ],
    },
  };
};

export const createTableBlock = (options?: {
  children?: TableRowBlock[];
}): TableBlock => {
  return {
    ...createBaseBlock(),
    type: "table",
    table: {
      table_width: options?.children?.[0]?.table_row.cells.length ?? 1,
      has_column_header: false,
      has_row_header: false,
    },
    children: options?.children ?? [
      createTableRowBlock({
        children: [[createTextRichText({ root: { plain_text: "Example" } })]],
      }),
    ],
  };
};

export const createTableOfContentsBlock = (options?: {
  color?: TableOfContentsBlock["table_of_contents"]["color"];
}): TableOfContentsBlock => {
  return {
    ...createBaseBlock(),
    type: "table_of_contents",
    table_of_contents: {
      color: options?.color ?? "default",
    },
  };
};

export const createToDoBlock = (options?: {
  richText?: RichText[];
  checked?: ToDoBlock["to_do"]["checked"];
  color?: ToDoBlock["to_do"]["color"];
  children?: Block[];
}): ToDoBlock => {
  return {
    ...createBaseBlock(),
    type: "to_do",
    to_do: {
      rich_text: options?.richText ?? [],
      checked: options?.checked ?? false,
      color: options?.color ?? "default",
    },
    children: options?.children ?? [],
  };
};

export const createToggleBlock = (options?: {
  richText?: RichText[];
  color?: ToggleBlock["toggle"]["color"];
  children?: Block[];
}): ToggleBlock => {
  return {
    ...createBaseBlock(),
    type: "toggle",
    toggle: {
      rich_text: options?.richText ?? [],
      color: options?.color ?? "default",
    },
    children: options?.children ?? [],
  };
};

export const createVideoBlock = (options?: {
  caption?: RichText[];
  fileObject?: FileObject;
}): VideoBlock => {
  const fileObject = options?.fileObject ?? createNotionInternalFile();
  return {
    ...createBaseBlock(),
    type: "video",
    video: {
      caption: options?.caption ?? [],
      ...fileObject,
    },
  };
};

export const createNotionInternalFile = (options?: {
  url?: string;
}): NotionInternalFile => {
  return {
    type: "file",
    file: {
      url: options?.url ?? "https://example.com",
      expiry_time: "2025-01-21T15:36:00.000Z",
    },
  };
};

export const createNotionExternalFile = (options?: {
  url?: string;
}): NotionExternalFile => {
  return {
    type: "external",
    external: {
      url: options?.url ?? "https://example.com",
    },
  };
};

export const createEmbedBlock = (options?: {
  url?: string;
  caption?: RichText[];
}): EmbedBlock => {
  return {
    ...createBaseBlock(),
    type: "embed",
    embed: {
      url: options?.url ?? "https://example.com",
      caption: options?.caption ?? [],
    },
  };
};

export const createChildDatabaseBlock = (options?: {
  title?: string;
}): ChildDatabaseBlock => {
  return {
    ...createBaseBlock(),
    type: "child_database",
    child_database: {
      title: options?.title ?? "Example",
    },
  };
};

export const createChildPageBlock = (options?: {
  title?: string;
}): ChildPageBlock => {
  return {
    ...createBaseBlock(),
    type: "child_page",
    child_page: {
      title: options?.title ?? "Example",
    },
  };
};
