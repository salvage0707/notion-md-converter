import fs from "node:fs";
import path from "node:path";

export const loadMdFixture = (dirname: string, blockType: LoadableBlockType, fileName: string) => {
  const mdPath = path.join(dirname, `__fixtures__/${blockType}/${fileName}.md`);
  const expected = fs.readFileSync(mdPath, "utf-8");
  return expected;
};
