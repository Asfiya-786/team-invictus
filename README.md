# Master App

This repository contains the built static frontend for the Master App.

## GitHub Pages deployment

The site is published from the `dist/` directory using GitHub Actions.

### Workflow

- `.github/workflows/deploy-github-pages.yml` deploys `dist/` to the `gh-pages` branch.
- The GitHub Pages site will serve from the generated `gh-pages` branch.

### Deployment steps

1. Push the repository to GitHub.
2. Confirm GitHub Pages is enabled for the repository.
3. The action runs automatically on every push to `main`.

### Important note

`dist/index.html` references assets with absolute paths like `/assets/index-*.js`, so this site expects to be served from the root of a domain.
