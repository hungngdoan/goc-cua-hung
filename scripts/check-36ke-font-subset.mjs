/**
 * Guard for the Noto Serif SC `text=` subset used by the 36 Kế tab.
 *
 * `ThirtySixKe.jsx` asks Google Fonts for a font that contains ONLY the
 * characters listed in its `notoSerifScSubset` constant. That is what turns a
 * 4.4 MB download into roughly 67 KB. It is also a trap: the day someone adds a
 * new Hanzi to `src/content/36ke.html`, that character is not in the subset, so
 * the browser silently falls back to a system CJK face. Nothing errors, nothing
 * warns, and the page just looks wrong on some machines and fine on others.
 *
 * This script fails the build instead. It re-derives the set of characters that
 * 36ke.html actually renders in Noto Serif SC and asserts every one of them is
 * present in the subset constant.
 *
 * Two independent assertions, because two different kinds of character reach
 * that font:
 *   1. Every CJK codepoint anywhere in 36ke.html. Deliberately broader than the
 *      elements styled with Noto Serif SC, so a Hanzi added to any element is
 *      caught even if it is not styled with the font today.
 *   2. Every character inside the elements whose CSS names 'Noto Serif SC'.
 *      This is what catches non-CJK, and it is not hypothetical: `.ke-index`
 *      renders the Arabic digits 1 to 36 in Noto Serif SC 700.
 *
 * Usage:
 *   node scripts/check-36ke-font-subset.mjs           # assert, exit 1 on failure
 *   node scripts/check-36ke-font-subset.mjs --print   # print the correct subset
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const componentPath = join(projectRoot, "src", "components", "react", "ThirtySixKe.jsx");
const htmlPath = join(projectRoot, "src", "content", "36ke.html");
const cssPath = join(projectRoot, "src", "content", "36ke.css");

const component = readFileSync(componentPath, "utf8");
const html = readFileSync(htmlPath, "utf8");
const css = readFileSync(cssPath, "utf8");

const failures = [];

/** The declared subset, read out of the component. */
const subsetMatch = component.match(/const notoSerifScSubset\s*=\s*"([^"]*)"/u);
if (!subsetMatch) {
  console.error(
    "FAIL: could not find `const notoSerifScSubset = \"...\"` in\n  " + componentPath +
      "\nThe font subset guard cannot run. If the constant was renamed or moved," +
      " update scripts/check-36ke-font-subset.mjs to match.",
  );
  process.exit(1);
}
const subset = new Set([...subsetMatch[1]]);

/** Assertion 1: every CJK codepoint in the content file. */
const CJK = /[㐀-䶿一-鿿豈-﫿]/gu;
const cjkInContent = [...new Set(html.match(CJK) || [])];
const missingCjk = cjkInContent.filter((ch) => !subset.has(ch));

/**
 * Assertion 2: every character rendered by an element whose rule names
 * 'Noto Serif SC'. The class list is derived from 36ke.css rather than hardcoded,
 * so styling a new element with the font also extends this check.
 */
const notoClasses = [];
for (const block of css.split("}")) {
  if (!/font-family:\s*'Noto Serif SC'/u.test(block)) continue;
  for (const match of block.matchAll(/\.([A-Za-z0-9_-]+)\s*(?:,|\{|$)/gu)) {
    if (match[1].startsWith("ke-") || match[1].startsWith("thirty-six")) {
      notoClasses.push(match[1]);
    }
  }
}
const styledClasses = [...new Set(notoClasses)].filter((c) => c !== "thirty-six-ke-page");
if (styledClasses.length === 0) {
  failures.push(
    "No class in 36ke.css declares font-family: 'Noto Serif SC'. Either the font " +
      "was dropped (then delete this guard and the text= subset) or the selectors " +
      "changed shape and this parser no longer finds them.",
  );
}

const renderedChars = new Map(); // char -> Set of class names
for (const className of styledClasses) {
  const re = new RegExp(`class="${className}"[^>]*>([^<]*)<`, "gu");
  for (const match of html.matchAll(re)) {
    for (const ch of match[1]) {
      if (ch === " " || ch === "\n" || ch === "\t" || ch === "\r") continue;
      if (!renderedChars.has(ch)) renderedChars.set(ch, new Set());
      renderedChars.get(ch).add(className);
    }
  }
}
const missingStyled = [...renderedChars.keys()].filter((ch) => !subset.has(ch));

if (process.argv.includes("--print")) {
  const required = [...new Set([...cjkInContent, ...renderedChars.keys()])].sort(
    (a, b) => a.codePointAt(0) - b.codePointAt(0),
  );
  console.log(required.join(""));
  process.exit(0);
}

function describe(ch) {
  const hex = ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0");
  const where = renderedChars.get(ch);
  return `  ${ch}  U+${hex}${where ? `  (rendered by .${[...where].join(", .")})` : ""}`;
}

if (missingCjk.length) {
  failures.push(
    `${missingCjk.length} CJK character(s) in src/content/36ke.html are NOT in the ` +
      `Noto Serif SC text= subset:\n${missingCjk.map(describe).join("\n")}`,
  );
}
if (missingStyled.length) {
  failures.push(
    `${missingStyled.length} character(s) rendered by a Noto Serif SC element are ` +
      `NOT in the text= subset:\n${missingStyled.map(describe).join("\n")}`,
  );
}

/** Cheap sanity check: an oversized subset is dead weight, not a bug. */
const required = new Set([...cjkInContent, ...renderedChars.keys()]);
const stale = [...subset].filter((ch) => !required.has(ch));

if (failures.length) {
  console.error("36 Kế font subset check FAILED.\n");
  for (const failure of failures) console.error(failure + "\n");
  console.error(
    "Fix: run `node scripts/check-36ke-font-subset.mjs --print` and paste the " +
      "result into `notoSerifScSubset` in src/components/react/ThirtySixKe.jsx.\n" +
      "Do not delete the guard. Without the subset this tab downloads 4.4 MB of font.",
  );
  process.exit(1);
}

console.log(
  `36 Kế font subset OK: ${subset.size} characters declared, ` +
    `${cjkInContent.length} CJK in content, ` +
    `${renderedChars.size} characters rendered by [${styledClasses
      .map((c) => "." + c)
      .join(", ")}], all covered.`,
);
if (stale.length) {
  console.log(
    `Note: ${stale.length} character(s) in the subset are no longer used ` +
      `(${stale.join("")}). Harmless, but they can be removed.`,
  );
}
