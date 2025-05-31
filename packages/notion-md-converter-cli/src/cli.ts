import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { convertCommand } from "./commands/convert.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getVersion(): string {
  try {
    const packageJsonPath = join(__dirname, "..", "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    return packageJson.version;
  } catch {
    return "unknown";
  }
}

export function cli(): void {
  const program = new Command();

  program
    .name("notion-md-cli")
    .description("CLI tool for converting Notion pages to Markdown")
    .version(getVersion());

  program.addCommand(convertCommand);

  program.parse();
}
