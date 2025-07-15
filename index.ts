// filename: scrape-ltiaas-docs.ts

import * as cheerio from "cheerio";
import TurndownService from "turndown";

const BASE_URL = "https://docs.ltiaas.com";
const API_ROOT = "/api";
const OUTPUT_DIR = "./ltiaas-docs";
const OPENAPI_FILE = "./ltiaas-openapi.json";

type OpenAPI = {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
  };
  servers: { url: string }[];
  paths: Record<string, any>;
  components: { schemas: Record<string, any> };
};

const openapi: OpenAPI = {
  openapi: "3.1.0",
  info: {
    title: "Get LTIaaS docs",
    description: "Retrieves docs for LTIaas.",
    version: "v1.0.0",
  },
  servers: [{ url: `${BASE_URL}${API_ROOT}` }],
  paths: {},
  components: { schemas: {} },
};

const visited = new Set<string>();
const foundUrls = new Set<string>();

async function extractContent(
  url: string
): Promise<{ content: string; title: string }> {
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Failed to fetch ${url} with status ${res.status}`);
    throw new Error(`Failed to fetch ${url}`);
  }

  const data = await res.text();
  const $ = cheerio.load(data);

  // Extract title
  const title =
    $("h1").first().text() ||
    $("title").text() ||
    url.split("/").pop() ||
    "Untitled";

  // Find and collect all API links
  $("a[href^='/api/']").each((_, el) => {
    const href = $(el).attr("href");
    if (href) {
      foundUrls.add(BASE_URL + href);
    }
  });

  // Extract main content with better targeting
  let contentEl = $("article").first();
  if (contentEl.length === 0) contentEl = $("main").first();
  if (contentEl.length === 0) contentEl = $(".content").first();
  if (contentEl.length === 0) contentEl = $("#content").first();
  if (contentEl.length === 0) {
    // Fallback: try to find content by removing common navigation/footer elements
    $(
      "nav, .nav, .navigation, footer, .footer, header, .header, .sidebar"
    ).remove();
    contentEl = $("body");
  }

  // Configure turndown for better LLM readability
  const turndownService = new TurndownService({
    headingStyle: "atx", // Use # for headings
    codeBlockStyle: "fenced", // Use ``` for code blocks
    bulletListMarker: "-", // Use - for lists
    emDelimiter: "*", // Use * for emphasis
    strongDelimiter: "**", // Use ** for strong
  });

  // Add custom rules for better formatting
  turndownService.addRule("codeBlocks", {
    filter: ["pre"],
    replacement: (content, node) => {
      const codeEl = (node as any).querySelector("code");
      const language = codeEl?.className?.match(/language-(\w+)/)?.[1] || "";
      return `\n\`\`\`${language}\n${content.trim()}\n\`\`\`\n\n`;
    },
  });

  // Convert HTML to markdown
  const htmlContent = contentEl.html() || "";
  const markdown = turndownService.turndown(htmlContent);

  // Clean up the markdown for better LLM readability
  const cleanedMarkdown = markdown
    .replace(/\n{3,}/g, "\n\n") // Remove excessive newlines
    .replace(/^\s+$/gm, "") // Remove lines with only whitespace
    .trim();

  // Add metadata header for LLM context
  const metadataHeader = `---
title: ${title}
url: ${url}
source: LTIaaS Documentation
---

# ${title}

`;

  return {
    content: metadataHeader + cleanedMarkdown,
    title: title.trim(),
  };
}

async function saveContent(url: string, content: string, title: string) {
  const route = url.replace(BASE_URL, "");
  const filePath = `${OUTPUT_DIR}${route}/index.md`;

  // Create directory
  await Bun.write(filePath, ""); // This creates the directory structure

  // Write the content
  await Bun.write(filePath, content);

  console.log(`Saved: ${filePath} (${title})`);

  // Add to OpenAPI paths
  const operationId = route.replace(/\W+/g, "_").replace(/^_+|_+$/g, "");
  openapi.paths[route] = {
    get: {
      summary: title,
      description: `Documentation page: ${title}`,
      operationId: operationId || "get_root",
      tags: ["Documentation"],
      responses: {
        "200": {
          description: "Documentation content",
          content: {
            "text/markdown": {
              schema: {
                type: "string",
              },
            },
          },
        },
      },
    },
  };
}

async function processUrl(url: string): Promise<void> {
  if (visited.has(url)) return;
  visited.add(url);

  try {
    console.log(`Processing: ${url}`);
    const { content, title } = await extractContent(url);
    await saveContent(url, content, title);
  } catch (error) {
    console.error(`Error processing ${url}:`, error);
  }
}

async function main() {
  console.log("Starting documentation crawl...");

  // Start with the initial URL
  const startUrl = `${BASE_URL}${API_ROOT}/ltiaas`;
  foundUrls.add(startUrl);

  // Process URLs iteratively until no new ones are found
  let previousSize = 0;
  while (foundUrls.size > previousSize) {
    previousSize = foundUrls.size;

    // Get all unvisited URLs
    const urlsToProcess = Array.from(foundUrls).filter(
      (url) => !visited.has(url)
    );

    if (urlsToProcess.length === 0) break;

    console.log(`Processing batch of ${urlsToProcess.length} URLs...`);

    // Process all URLs in parallel
    await Promise.all(urlsToProcess.map(processUrl));
  }

  // Save OpenAPI file
  await Bun.write(OPENAPI_FILE, JSON.stringify(openapi, null, 2));

  console.log(`\nDone! Processed ${visited.size} pages.`);
  console.log(`Docs saved to: ${OUTPUT_DIR}`);
  console.log(`OpenAPI spec saved to: ${OPENAPI_FILE}`);
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
