import { MarkdownUtils, type TableCell, type TableHeader } from "../utils";
import { createTableTransformerFactory } from "./transformerFactory";

export const createMarkdownTableTransformer = () => {
  return createTableTransformerFactory(({ header, rows, context }) => {
    const headerCells: TableHeader[] = header.table_row.cells.map((cell) => ({
      content: context.tools.richTextFormatter.format(cell),
    }));
    const rowsCells: TableCell[][] = rows.map((row) =>
      row.table_row.cells.map((cell) => ({
        content: context.tools.richTextFormatter.format(cell),
      })),
    );
    // 改行の数を出力
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.table(headerCells, rowsCells));
  });
};
