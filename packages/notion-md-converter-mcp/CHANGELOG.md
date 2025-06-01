# @notion-md-converter/mcp

## 0.12.0

### Minor Changes

- [#89](https://github.com/salvage0707/notion-md-converter/pull/89) [`44aec87`](https://github.com/salvage0707/notion-md-converter/commit/44aec8744277a41a1e208f1b84a131f0d72def8b) Thanks [@salvage0707](https://github.com/salvage0707)! - feat: add CLI and MCP server packages with core improvements

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

### Patch Changes

- Updated dependencies [[`44aec87`](https://github.com/salvage0707/notion-md-converter/commit/44aec8744277a41a1e208f1b84a131f0d72def8b)]:
  - @notion-md-converter/core@0.12.0
