import fs from "node:fs";
import path from "node:path";
import type { RootBlock, RootBlockType } from "../types";

/**
 * 対象のブロックタイプのテストデータ一覧を取得する
 */
type ResultContext<T extends RootBlock> = {
  dataType: string;
  content: T[];
};
export const loadBlockContentFixture = <T extends RootBlock>(blockType: RootBlockType) => {
  const fixtureDir = path.join(__dirname, `__fixtures__/${blockType}`);
  const files = fs.readdirSync(fixtureDir);
  const dataTypes = files.map((file) => file.split(".")[0]);

  const result: ResultContext<T>[] = [];
  for (const dataType of dataTypes) {
    const jsonPath = path.join(fixtureDir, `${dataType}.json`);
    const input = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as T[];
    result.push({
      dataType,
      content: input,
    });
  }

  return result;
};

export const loadMdFixture = (dirname: string, blockType: RootBlockType, fileName: string) => {
  const mdPath = path.join(dirname, `__fixtures__/${blockType}/${fileName}.md`);
  const expected = fs.readFileSync(mdPath, "utf-8");
  return expected;
};
