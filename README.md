# gherkinfmt

Opinionated Gherkin formatter - zero configuration, one way to format.

[![npm version](https://badge.fury.io/js/gherkinfmt.svg)](https://badge.fury.io/js/gherkinfmt)
[![Download - npm](https://img.shields.io/npm/dt/gherkinfmt.svg)](https://www.npmjs.com/package/gherkinfmt)
[![License - npm](https://img.shields.io/npm/l/gherkinfmt.svg)](http://opensource.org/licenses/MIT)
[![install size](https://packagephobia.com/badge?p=gherkinfmt)](https://packagephobia.com/result?p=gherkinfmt)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

[![continuous integration](https://github.com/jojoee/gherkinfmt/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/jojoee/gherkinfmt/actions/workflows/continuous-integration.yml)
[![release](https://github.com/jojoee/gherkinfmt/actions/workflows/release.yml/badge.svg)](https://github.com/jojoee/gherkinfmt/actions/workflows/release.yml)
[![runnable](https://github.com/jojoee/gherkinfmt/actions/workflows/runnable.yml/badge.svg)](https://github.com/jojoee/gherkinfmt/actions/workflows/runnable.yml)
[![codecov](https://codecov.io/gh/jojoee/gherkinfmt/branch/main/graph/badge.svg)](https://codecov.io/gh/jojoee/gherkinfmt)

## Philosophy

Like [Standard.js](https://standardjs.com/) for JavaScript - no configuration, no debates. One way to format Gherkin/Cucumber feature files.

## Installation

```bash
# npm
npm install gherkinfmt

# yarn
yarn add gherkinfmt

# pnpm
pnpm add gherkinfmt

# global install for CLI
npm install -g gherkinfmt
```

## Usage

### CLI

```bash
# Check if files are formatted (validates without modifying)
gherkinfmt --check file.feature

# Check multiple files with glob pattern
gherkinfmt --check "src/**/*.feature"

# Check all .feature files in current directory
gherkinfmt --check "*.feature"

# Check all .feature files in directory (recursive)
gherkinfmt --check src/

# Format files in-place (overwrites)
gherkinfmt --write file.feature

# Format multiple files with glob pattern
gherkinfmt --write "src/**/*.feature"

# Format all .feature files in directory (recursive)
gherkinfmt --write src/

# Show help
gherkinfmt --help

# Show version
gherkinfmt --version
```

Glob patterns support:
- `*` - matches any characters except path separator
- `**` - matches any characters including path separator (recursive)
- `?` - matches single character
- `{a,b}` - matches either pattern

Exit codes:
- `0` - All files are formatted correctly (check) or formatted successfully (write)
- `1` - Some files need formatting, errors occurred, or no mode specified

### API

```typescript
import { check, format } from 'gherkinfmt';

// Check if Gherkin string is formatted correctly
const isFormatted = check('Feature: My Feature\n');
console.log(isFormatted); // true or false

// Format Gherkin string
const formatted = format('Feature:My Feature');
console.log(formatted); // 'Feature: My Feature\n'
```

### CommonJS

```javascript
const { check, format } = require('gherkinfmt');

const formatted = format('Feature: My Feature');
```

### Browser (UMD)

```html
<script src="https://unpkg.com/gherkinfmt/dist/gherkinfmt.umd.js"></script>
<script>
  const formatted = gherkinfmt.format('Feature: My Feature');
</script>
```

### Docker

```bash
# Check a file
docker run --rm -v $(pwd):/data ghcr.io/jojoee/gherkinfmt --check /data/file.feature

# Check all .feature files in a directory
docker run --rm -v $(pwd):/data ghcr.io/jojoee/gherkinfmt --check /data/

# Format a file
docker run --rm -v $(pwd):/data ghcr.io/jojoee/gherkinfmt --write /data/file.feature
```

## Formatting Rules

These rules are **not configurable** - that's the point!

| Rule | Value |
|------|-------|
| Indentation | 2 spaces |
| Feature keyword | No indentation |
| Background/Scenario/Scenario Outline | 2 spaces |
| Rule keyword | 2 spaces |
| Steps (Given/When/Then/And/But/*) | 4 spaces |
| Examples | 4 spaces |
| Data tables | Aligned columns |
| Doc strings | Preserved with media type |
| Tags | One per line, before element |
| Comments | Preserved in place |
| Trailing whitespace | Removed |
| Blank lines | Single between scenarios |
| End of file | Single newline |

## API Reference

### `check(input: string): boolean`

Check if a Gherkin string is formatted correctly.

```typescript
check('Feature: My Feature\n');  // true
check('Feature:My Feature');      // false (missing space)
```

### `format(input: string): string`

Format a Gherkin string according to the opinionated rules.

```typescript
format('Feature:My Feature');
// Returns: 'Feature: My Feature\n'
```

## Gherkin Features Supported

- Feature keyword
- Background
- Scenario
- Scenario Outline with Examples
- Steps (Given, When, Then, And, But, *)
- Data tables (with column alignment)
- Doc strings (triple quotes with media type)
- Tags (@tag)
- Comments (#)
- Rule keyword (Gherkin 6+)
- Descriptions (Feature, Scenario, Rule)
- Unicode and special characters
- Escaped characters in tables

## Integration

### Pre-commit Hook

```bash
# .husky/pre-commit
npx gherkinfmt --check "features/**/*.feature"
```

### VS Code Task

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Check Gherkin",
      "type": "shell",
      "command": "npx gherkinfmt --check features/"
    }
  ]
}
```

### CI/CD

```yaml
# GitHub Actions
- name: Check Gherkin formatting
  run: npx gherkinfmt --check "features/**/*.feature"
```

## Development

### Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build
npm run build

# Build CLI
npm run build:cli

# Lint
npm run lint
```

```bash
# Run locally

# Check a single file
node bin/gherkinfmt.js --check resource/01-minimal.feature

# Check entire resource folder
node bin/gherkinfmt.js --check resource/

# Format a single file (writes changes)
node bin/gherkinfmt.js --write resource/all-cases.feature

# Format entire resource folder (writes changes)
node bin/gherkinfmt.js --write resource/
```

## Related

- [Gherkin Specification](https://cucumber.io/docs/gherkin/reference/)
- [Cucumber](https://cucumber.io/)
- [prettier-plugin-gherkin](https://github.com/mapado/prettier-plugin-gherkin) - Prettier plugin for Gherkin files
- [Standard.js](https://standardjs.com/) - Inspiration for zero-config philosophy
