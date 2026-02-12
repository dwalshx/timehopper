# Astro SEO & Blog Content Guidelines

## Astro SEO Setup Checklist (must-have)

### 1) Site config + canonical URLs
- In `astro.config.mjs`, set `site: "https://timehopperapp.com"` (or your exact canonical domain).
- Ensure every page outputs: `<link rel="canonical" href="...">`
- One `<h1>` per page.
- Unique `<title>` + meta description.

### 2) Sitemap.xml (required)
- Install + configure Astro sitemap integration: `@astrojs/sitemap`
- Verify it generates at: `https://timehopperapp.com/sitemap.xml`
- Ensure it includes blog posts + static pages.

### 3) robots.txt (required)
- Create `/public/robots.txt` with:
    ```
    User-agent: *
    Allow: /
    Sitemap: https://timehopperapp.com/sitemap.xml
    ```

### 4) 404 + trailing slash consistency
- Pick one style (e.g., without trailing slash for `.html` files).
- Enforce via Astro config and internal links.
- Ensure a clean `404.astro` page exists.

### 5) Open Graph + Twitter cards
- Add defaults globally in Layout/Head: `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card`, etc.
- Each blog post should override these.

### 6) Basic structured data (JSON-LD)
- Implement reusable JSON-LD components:
    - Organization (site-wide)
    - WebSite
    - BreadcrumbList
    - Article (for blog posts)

### 7) RSS feed (recommended)
- Install `@astrojs/rss`.
- Verify `/rss.xml`.

### 8) Performance (SEO multiplier)
- Static and fast output.
- Minimize JS hydration.
- Compress images.
- System fonts or preloaded fonts.

## Blog Content System Checklist

### 9) Content Collections (recommended)
- Use frontmatter: `title`, `description`, `pubDate`, `updatedDate`, `tags`, `heroImage`, `canonical`.

### 10) Clean blog URLs
- Pattern: `/blog/<slug>/`

### 11) Internal linking defaults
- Blog index: `/blog/`
- Tag pages: `/tag/<tag>/`
- "Related posts" list.

## AEO Readiness Checklist (AI answer optimization)

### 12) Answer box near the top
- Short "TL;DR / Direct Answer" section (2-5 bullets).

### 13) Question-style headings (H2/H3)
- "What is X?", "How does X work?".

### 14) Key takeaways + Steps
- Numbered steps, short definitions, tables, do/don't lists.

### 15) Only use FAQ schema if you truly need it
- Focus on on-page Q&A structure.
