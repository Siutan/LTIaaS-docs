# LTIaaS Documentation Scraper

A TypeScript script that crawls and scrapes the LTIaaS (Learning Tools Interoperability as a Service) documentation website, converting it to LLM-friendly markdown files and generating an OpenAPI specification.

## What it does

This script:

- Crawls the LTIaaS documentation at `https://docs.ltiaas.com/api/*`
- Discovers all API documentation pages automatically
- Converts HTML content to clean, LLM-optimized markdown
- Generates an OpenAPI 3.1.0 specification file
- Organizes output in a structured directory format

## Installation

```bash
bun install
```

## Usage

```bash
bun run index.ts
```

## Output

The script generates two main outputs:

### 1. Documentation Files (`./ltiaas-docs/`)

- Organized directory structure matching the original site URLs
- Each page saved as `index.md` with YAML frontmatter
- LLM-optimized markdown formatting:
  - Consistent heading styles
  - Fenced code blocks with language detection
  - Clean whitespace and formatting
  - Metadata headers for context

Example structure:

```
ltiaas-docs/
├── api/
│   ├── ltiaas/
│   │   └── index.md
│   ├── get-admin-platforms/
│   │   └── index.md
│   └── post-api-registrations/
│       └── index.md
```

### 2. OpenAPI Specification (`./ltiaas-openapi.json`)

- Complete OpenAPI 3.1.0 specification
- All discovered endpoints with metadata
- Response schemas and descriptions
- Organized with tags for better navigation

## Features

- **Parallel processing**: Processes multiple pages simultaneously for speed
- **Smart content extraction**: Targets main content areas, removes navigation/footer
- **LLM-friendly formatting**: Clean markdown with metadata for AI consumption
- **Comprehensive crawling**: Automatically discovers all linked API pages
- **Error handling**: Graceful handling of failed requests with detailed logging

