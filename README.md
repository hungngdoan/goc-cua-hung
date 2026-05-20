# goc-cua-hung

Live site: https://hungngdoan.github.io/goc-cua-hung/

## Getting Started

Clone the project, install dependencies, and start the local dev server:

```bash
git clone https://github.com/hungngdoan/goc-cua-hung.git
cd goc-cua-hung
npm install
npm start
```

Open the localhost URL shown in the terminal, usually `http://localhost:4321/goc-cua-hung/`. This is the best mode while editing because it auto refreshes.

## Available Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install project dependencies, including Astro. |
| `npm start` | Start the local development server on port `4321`. |
| `npm run dev` | Same local development server as `npm start`. |
| `npm run build` | Build the static site into `dist/`. |
| `npm run preview` | Preview the already-built `dist/` folder locally. |

`npm run preview` only serves the already-built `dist/` folder, so run `npm run build` again after source changes.

## GitHub Pages Build

On every push to `main`, GitHub Actions runs `.github/workflows/deploy.yml`: it installs dependencies with `npm ci`, builds the Astro site with `npm run build`, uploads `dist/`, and deploys it to GitHub Pages.
