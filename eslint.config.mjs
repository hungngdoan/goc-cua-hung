import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

// This project has no Prettier and ~6k lines of hand-formatted code, so nothing
// here is stylistic: a formatter would rewrite every file and bury the findings
// that matter. What ESLint is here for is the bug class this codebase can
// actually ship - hooks with stale or missing dependencies across 15 effects,
// 12 refs and audio, rAF loops and observers that outlive a render.
//
// The baseline is clean. Every rule below is an error, `npm run lint` fails on
// the first warning, and CI runs it on every push and pull request. Keep it
// that way: a lint config with a standing list of known failures is one nobody
// reads.

export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      // ~11 MB of PNGs plus a result.json written by `npm run check:sections`.
      ".section-check/**",
      // Shipped to the site byte for byte; never ours to rewrite.
      "public/**",
      // Retired prose and a design sample, kept for reference, not maintained.
      "archive/**",
      "plan-sample/**",
    ],
  },

  js.configs.recommended,

  {
    // Repo-wide correctness rules. All four already hold everywhere, so these
    // cost nothing today and exist to stop the discipline slipping later.
    // Prettier could not enforce any of them.
    rules: {
      eqeqeq: ["error", "always", { null: "ignore" }],
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  // ---------------------------------------------------------------- React
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react, "react-hooks": reactHooks },
    settings: { react: { version: "18.3" } },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Never a false positive: a conditional or nested hook is broken code.
      "react-hooks/rules-of-hooks": "error",

      // The rule this config exists for. A warning is something nobody acts on
      // in a repo with no lint history, and the two violations this rule found
      // on its first run are already fixed, so it is an error from day one.
      "react-hooks/exhaustive-deps": "error",

      // The automatic JSX runtime means React is never in scope, and this is a
      // static site with no propTypes layer.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Nothing in src/ has a console call today. Browser code that ships to
      // readers should stay quiet; scripts/ is a CLI and is exempt below.
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
  {
    // `withTheme` and `constrained` return render functions, not components:
    // StyleLab invokes them as `section.component(style, section)` with two
    // positional arguments, never as JSX. The rule's heuristic sees a function
    // returning JSX and misfires, and a displayName on a non-component would be
    // cargo cult. Scoped to this one file so the other ten components keep it.
    files: ["src/config/sections.jsx"],
    rules: { "react/display-name": "off" },
  },

  // ------------------------------------------------------------------ Astro
  ...astro.configs.recommended,
  {
    // Astro frontmatter is TypeScript even though this project has no .ts
    // files: Base.astro declares `interface Props`, and the default script
    // parser rejects the keyword outright.
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
      },
      globals: { ...globals.browser },
    },
  },
  {
    // `<script is:inline>` blocks are extracted by the plugin into virtual
    // `<file>.astro/*.js` files that the glob above does not match. Base.astro
    // runs `history` and `window` in one, so those need browser globals of
    // their own or no-undef fires on correct code.
    files: ["**/*.astro/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.browser },
    },
  },

  // ------------------------------------------------- Node scripts and config
  {
    // Node globals only, deliberately. check-section-registry.mjs drives Chrome
    // over CDP, so its `document` and `window` references sit inside template
    // literals handed to Runtime.evaluate. They are strings, not code. Adding
    // browser globals here would buy nothing and would stop no-undef catching
    // a real typo in the Node half of the file.
    files: ["scripts/**/*.mjs", "*.config.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
  },
];
