# goc-cua-hung

## Run Locally

Simple local sequence:

```bash
npm install
npm run dev
```

Open the localhost URL shown in the terminal. This is the best mode while editing because it auto refreshes.

To check the production build locally:

```bash
npm run build
npm run preview
```

`npm run preview` only serves the already-built `dist/` folder, so run `npm run build` again after source changes.

## GitHub Pages Build

On every push to `main`, GitHub Actions runs `.github/workflows/deploy.yml`: it installs dependencies with `npm ci`, builds the Astro site with `npm run build`, uploads `dist/`, and deploys it to GitHub Pages.
