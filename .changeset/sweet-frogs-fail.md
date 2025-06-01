---
"@notion-md-converter/hatena-blog": minor
"@notion-md-converter/testing": minor
"@notion-md-converter/config": minor
"@notion-md-converter/qiita": minor
"@notion-md-converter/types": minor
"@notion-md-converter/core": minor
"@notion-md-converter/zenn": minor
"@notion-md-converter/cli": minor
"@notion-md-converter/mcp": minor
---

feat: add CLI and MCP server packages with core improvements

- **CLI Package**: Add new `@notion-md-converter/cli` package
  providing command-line interface for converting Notion pages to
  Markdown
- **MCP Server**: Add new `@notion-md-converter/mcp` package
  implementing Model Context Protocol server for Notion
  integration
- **Core Enhancements**: Optimize `$getPageFullContent`
  function with retry logic and parallel processing, add
  comprehensive tests
- **Documentation**: Add CLI implementation plan and
  comprehensive usage examples

This release introduces two major new packages expanding the
ecosystem with command-line and protocol server capabilities.
