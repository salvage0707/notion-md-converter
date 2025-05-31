---
"@notion-md-converter/core": major
"@notion-md-converter/types": major
"@notion-md-converter/testing": major
"@notion-md-converter/zenn": major
"@notion-md-converter/qiita": major
"@notion-md-converter/hatena-blog": major
---

feat: upgrade to Node.js v24 requirement

BREAKING CHANGE: This package now requires Node.js v24.0.0 or higher. Previous Node.js versions are no longer supported.

- Updated all package.json files to specify `engines: { "node": ">=24.0.0" }`
- Fixed rollup configuration compatibility issues with Node.js v24
- Updated CI/CD pipelines to use Node.js v24
- All builds and tests are now validated against Node.js v24

If you are using an older version of Node.js, please upgrade to Node.js v24 or higher before updating to this version.