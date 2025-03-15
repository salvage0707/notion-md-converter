import { MarkdownUtils } from "../utils";
import type { TableCell, TableHeader } from "../utils";
import { createTableTransformerFactory } from "./transformerFactory";

export const createMarkdownTableTransformer = () => {
  return createTableTransformerFactory(({ header, rows }) => {
    const headerCells: TableHeader[] = header.table_row.cells.map((cell) => ({
      content: MarkdownUtils.richTextsToMarkdown(cell),
    }));
    const rowsCells: TableCell[][] = rows.map((row) =>
      row.table_row.cells.map((cell) => ({
        content: MarkdownUtils.richTextsToMarkdown(cell),
      })),
    );
    // 改行の数を出力
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.table(headerCells, rowsCells));
  });
};
