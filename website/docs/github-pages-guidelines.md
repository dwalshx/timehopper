# GitHub Pages SEO/AEO Checklist for Astro

## 1) Site + Custom Domain Correctness
- In `astro.config.mjs` set: `site: "https://timehopperapp.com"`
- Confirm repo has a `CNAME` file in the published output (e.g., `public/CNAME`).
- Ensure Pages is serving HTTPS; enforce one canonical host.

## 2) Base Path + Build Output
- Publishing from `/docs` folder: Set Astro `outDir` to `../docs`.

## 3) Trailing Slashes and 404 Behavior
- Pick a strategy and stick to it (Prefer `trailingSlash: "always"` for GH Pages).
- Ensure 404 page outputs to `/404.html`.

## 4) Redirect Reality Check
- GitHub Pages lacks native 301 redirects.
- Avoid changing slugs. If needed, use meta refresh or handle at DNS layer (e.g., Cloudflare).

## 5) Headers (Limited)
- Public performance comes from static optimization, not header tuning.

## 6) Sitemap + Robots
- Ensure `/sitemap-index.xml` and `/robots.txt` exist.

## 7) Verify Indexing
- Add to Google Search Console and submit sitemap.
- Check "Pages" for indexing issues.
