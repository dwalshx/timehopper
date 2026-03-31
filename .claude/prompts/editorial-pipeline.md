# TimeHopper Editorial Pipeline

This document defines the multi-agent pipeline for creating and improving blog content.

## Pipeline Stages

### Stage 1: SEO Research → SEO Contract
**Agent:** SEO Agent (see `seo-agent.md`)
**Input:** Article topic or existing draft
**Output:** SEO Contract with keywords, optimized title/description, content structure, internal links

### Stage 2: Writer
**Agent:** Writer Agent
**Input:** SEO Contract + any existing draft content
**Output:** Full article in markdown with frontmatter

Writer rules:
- Follow the TimeHopper brand voice: calm authority, precision over persuasion, short sentences, active voice, no hype
- Use the exact `title` and `description` from the SEO Contract in frontmatter
- Target word count from the SEO Contract
- Integrate internal links naturally in body text
- Include FAQ section at the end when the SEO Contract recommends it
- Sources go in article body only — NEVER in frontmatter `sources` field (causes duplicate sections)
- Preserve original `pubDate` for existing articles; set `updatedDate` to today

### Stage 3: Critic (optional)
**Agent:** Critic Agent
**Input:** Written article + SEO Contract
**Output:** Revision notes

Critic checks:
- Does the title tag match SEO Contract? Is it under 60 chars?
- Does the meta description match? Is it under 155 chars?
- Does the content hit the target word count?
- Are all internal links included?
- Is the brand voice consistent? (no hype, no filler, no marketing speak)
- Are there any factual errors or outdated information?
- Is the FAQ section present if recommended?

### Stage 4: Revision (if Critic flagged issues)
**Agent:** Writer Agent (with Critic notes)
**Input:** Article + Critic notes
**Output:** Revised article

## When to Use Each Stage

**Full pipeline (all 4 stages):** New articles from scratch, or articles that need complete rewriting
**Direct to Writer:** Articles with decent existing structure (1,500+ words) that just need expansion
**SEO-only pass:** Existing articles that rank but have poor CTR — run SEO Agent to optimize title/description only

## File Locations

- Blog articles: `website/src/content/blog/*.md`
- Content schema: `website/src/content/config.ts`
- Blog template: `website/src/pages/blog/[...slug].astro`
- Layout (title/meta): `website/src/layouts/Layout.astro`
- Converter tool pages: `website/src/pages/tools/convert/`
- Converter data: `website/src/data/timezone-pairs.ts`
