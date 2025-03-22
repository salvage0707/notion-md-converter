import { MarkdownUtils } from "../utils";
import type { ColorMap, EnableAnnotations, TableCell, TableHeader } from "../utils";
import { createTableTransformerFactory } from "./transformerFactory";

type TableTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownTableTransformer = (options: TableTransformerOptions = {}) => {
  const { enableAnnotations, colorMap } = options;
  return createTableTransformerFactory(({ header, rows }) => {
    const headerCells: TableHeader[] = header.table_row.cells.map((cell) => ({
      content: MarkdownUtils.richTextsToMarkdown(cell, enableAnnotations, colorMap),
    }));
    const rowsCells: TableCell[][] = rows.map((row) =>
      row.table_row.cells.map((cell) => ({
        content: MarkdownUtils.richTextsToMarkdown(cell, enableAnnotations, colorMap),
      })),
    );
    // 改行の数を出力
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.table(headerCells, rowsCells));
  });
};
