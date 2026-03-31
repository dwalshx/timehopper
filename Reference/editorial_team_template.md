Purpose: A repeatable, **multi-agent** workflow for producing index-worthy, SEO/AEO-optimized content on TimeHopperapp.com — with real agent isolation, genuine creative tension, and bounded rewrite loops.

Each role runs as a **separate agent instance** with its own context. Agents communicate only through artifacts. This creates genuine independence — critics who never saw the Writer's shortcuts, a Writer who defends work on its merits.

## 0) Operating Principles

### P0 — Useful beats long
Word count is not the goal. Incremental value is the goal:
- clearer explanation than what's already ranking
- more actionable steps than official docs
- better decision rules and edge cases
- better templates/checklists

### P1 — Answer-first always
For each primary query:
- Use a question-like heading
- Put a direct answer (1–3 sentences) immediately under it
- Then: steps, edge cases, examples, comparisons
- End: FAQ variants + Sources

### P2 — Trust is a feature
Content should signal trust via:
- minimal hype
- specific claims only when supported
- citations for factual statements (especially anything that could change)
- clear author/editor attribution if available

### P3 — Bounded loops
No infinite editing. Each article gets:
- Draft v1 → Critique Session → Draft v2 → Final QC
- Optional: one additional revision only if Final QC fails
- If same critique repeats twice without change, or sources can't be found, or intent drifts → escalate to human
- See editorial_team_spec.md Section 5 for full loop rules

### P4 — Sound like TimeHopper
Follow `Reference/brand_voice_v1.md`. Calm authority, precision over persuasion, operational empathy. Not a generic tech blog. Not tutorial-speak. Every article should sound like it came from the same team.

### P5 — Real agents, real tension
Each role runs in isolation. The Critic has never seen why the Writer made shortcuts. The Writer defending the draft didn't write it. This is by design — it produces genuine feedback, not self-review.

---

## 1) Team Roles

### Required roles
1. Supervisor / Orchestrator
2. Brief Architect
3. SERP + Format Scout
4. Exemplar Analyst — Research best-in-class content, establish quality benchmark
5. Checklist Synthesizer
6. Researcher / Source Curator
7. Writer
8. Critique Session — Multi-perspective facilitated critique:
   - User Lens (persona-specific walkthrough)
   - Editor Lens (voice + craft + execution quality vs. exemplars)
   - Discoverability Lens (SEO/AEO extractability)
   - Challenger Lens (push for distinction within the article's purpose)
   - Writer (defending)
   - Facilitator/Supervisor (Decision Log)
9. SEO/AEO + Linking + QA (combined role)
10. Final Reviewer (content + technical verification)

### Reference documents
- `Reference/editorial_personas.md` — User personas (Operator, Planner, Juggler, Minimalist)
- `Reference/editorial_primitives_library.md` — Content building blocks
- `Reference/brand_voice_v1.md` — TimeHopper voice guidelines
- `Reference/positioning_document_v1.md` — TimeHopper positioning and messaging

---

## 2) Artifacts Per Article

Each article produces a folder with these files:

```
/content_pipeline/<slug>/
  00_input.md
  01_creative_brief.md
  01b_format_expectations.md
  01b2_exemplar_analysis.md    — Quality benchmark from best-in-class content
  01c_content_contract.md
  content_probe_schema.json
  02_source_pack.md
  03_outline.md
  04_draft_v1.md
  05_critique_session.md       — Multi-perspective critique transcript + decision log
  06_draft_v2.md
  07_seo_aeo_pass.md
  08_linking_pass.md
  09_final_qc.md
  10_publishable.md
  content_probe.json
  content_error_packet.json    (only if needed)
  backlog_candidates.md        (when spinout candidates identified)
```

### Artifact descriptions
- **00_input.md:** starting point (existing draft, notes, target query, publish date)
- **01_creative_brief.md:** objective, audience, constraints, differentiation, persona selection, positioning context
- **01b_format_expectations.md:** what users expect for this query (SERP patterns + intent)
- **01b2_exemplar_analysis.md:** quality benchmark — patterns, table stakes vs. differentiators, Quality Bar Statement, persona evaluation
- **01c_content_contract.md:** the hard checklist/rubric for this specific piece (informed by exemplar analysis)
- **content_probe_schema.json:** fields to verify in the final probe
- **02_source_pack.md:** authoritative sources + notes + "what we won't claim"
- **03_outline.md:** H1 + H2/H3 structure with answer-first blocks planned
- **04_draft_v1.md:** first full draft (voice-checked, exemplar-referenced)
- **05_critique_session.md:** facilitated multi-agent critique transcript + Decision Log (Changing / Keeping / Parking)
- **06_draft_v2.md:** revised draft addressing Decision Log
- **07_seo_aeo_pass.md:** snippet blocks, heading polish, schema notes, extractability checks
- **08_linking_pass.md:** internal link plan + sources.yml keys + outbound citations
- **09_final_qc.md:** pass/fail checklist (content + technical verification)
- **10_publishable.md:** Astro-ready markdown with frontmatter
- **content_probe.json:** automated checks (structure, links, sources, thin risk)
- **content_error_packet.json:** only when QC fails; diagnosis + fix plan

---

## 3) Acceptance Criteria (Pass/Fail)

### A) AEO "Answer-First" requirements
- H1 matches primary query intent
- First major section is a question-like heading
- Under each major H2, there is a direct answer (1–3 sentences)
- Content is scannable: short paragraphs, bullets, numbered steps

### B) "Not thin" requirements
Must include at least 3 of these 5:
- Step-by-step checklist (numbered)
- Decision rule ("If X, do Y")
- Examples table or reference table
- Edge cases / common mistakes (≥ 3 bullets)
- Short comparison ("Option A vs B") or myth-busting section

### C) Sources & trust requirements
- 2–5 authoritative sources in a Sources section
- Any factual claim likely to change is cited (UI paths, policy, dates)
- No exaggerated claims ("best," "guaranteed") without criteria/rubric

### D) Voice requirements
- Matches TimeHopper brand voice (calm, precise, confident)
- Passes the 4 voice tests from `Reference/brand_voice_v1.md`
- No hype words, no over-explaining, no passive constructions
- Short sentences, active language, trust the reader

### E) SEO requirements
- Unique title + meta description in frontmatter
- Clean slug
- At least 2 internal links to related TimeHopper posts/pages

### F) Technical verification requirements
- Every link resolves (no 404s, no placeholders)
- TimeHopper product links → Chrome Web Store listing
- Internal links → correct existing slugs
- External sources → authoritative domains from source pack
- Markdown renders correctly (no broken headings)
- Frontmatter includes pubDate and updatedDate
- Images (if any) have alt text (and are optimized)

---

## 4) Workflow

### Step 1 — Supervisor creates 00_input.md
Include: primary query/intent, audience, publish date, constraints, any existing draft content, CTA guidance.

### Step 1b — SERP + Format Scout produces 01b_format_expectations.md
Identify intent, content type, and "Minimum Viable Elements" based on SERP analysis.

### Step 1b2 — Exemplar Analyst produces 01b2_exemplar_analysis.md
Research 2-4 best-in-class pieces. Identify patterns, table stakes vs. great-to-haves. Produce Quality Bar Statement. Evaluate exemplars through persona lenses.

### Step 1c — Checklist Synthesizer produces 01c_content_contract.md
Convert expectations, primitives, and exemplar findings into a pass/fail rubric. Import Quality Bar Statement.

### Step 2 — Brief Architect produces 01_creative_brief.md
Define objective, audience, intent, differentiation, personas, positioning context, voice rules.

### Step 3 — Researcher produces 02_source_pack.md
2–6 authoritative sources + notes, "What we won't claim" boundaries, platform differences.

### Step 4 — Writer creates 03_outline.md then 04_draft_v1.md
Outline with answer-first blocks planned. Draft following voice guide, persona targeting, and Quality Bar Statement. Flag backlog spinout candidates.

### Step 5 — Facilitated Critique Session produces 05_critique_session.md
Multi-agent conversation with 4 lenses (User, Editor, Discoverability, Challenger) + Writer + Facilitator:
1. Launch 4 critic agents in parallel
2. Pass all critiques to Writer agent
3. Writer responds (concedes, pushes back, proposes alternatives)
4. Facilitator produces Decision Log (Changing / Keeping / Parking)
5. Optional: 1-2 follow-up exchanges if Writer's response needs resolution
Includes Contract Compliance Check (binary, non-negotiable) and Execution Quality evaluation.

### Step 6 — Writer produces 06_draft_v2.md
Implement Decision Log "Changing" list. Extract backlog candidates.

### Step 7 — SEO/AEO + Linking + QA produces 07_seo_aeo_pass.md, 08_linking_pass.md, and content_probe.json
Title variants, meta description, snippet candidates, heading changes, schema notes, freshness plan. Internal links (2+), external sources (2–5), Sources section, thin risk assessment.

### Step 8 — Final Reviewer produces 09_final_qc.md
Hard pass/fail against Acceptance Criteria (content + technical verification). If fail, generate content_error_packet.json with categorized fixes.

### Step 10 — Supervisor outputs 10_publishable.md
Final Astro-ready file with frontmatter, content, Sources section, internal links, all technical issues resolved.

---

## 5) Role Prompts (Copy/Paste)

### Supervisor Prompt
You are the Supervisor. Orchestrate the pipeline by launching each agent in sequence (or in parallel where noted). Pass only the specified artifacts to each agent — agents should not see the full pipeline history. Enforce acceptance criteria and bounded loops.

### Brief Architect Prompt
You are the Brief Architect. Produce 01_creative_brief.md. Define objective, audience, intent, differentiation, voice rules, constraints, and CTA placement. Select 1-2 primary personas from `Reference/editorial_personas.md`. Reference `Reference/positioning_document_v1.md` for positioning context. Include a "Not Thin" plan.

### SERP + Format Scout Prompt
You are the Scout. Identify user expectations for the specific query and format. Analyze intent and declare the required content type. Define "Minimum Viable Elements" based on top-ranking competitors.

### Exemplar Analyst Prompt
You are the Exemplar Analyst. Research 2-4 best-in-class pieces. Identify patterns, table stakes, quality differentiators. Produce a Quality Bar Statement. Evaluate through persona lenses.

### Checklist Synthesizer Prompt
You are the Synthesizer. Convert expectations into a hard content contract. Reference primitives library. Incorporate exemplar findings. Import Quality Bar Statement. Define binary pass/fail criteria.

### Researcher Prompt
You are the Researcher. Produce 02_source_pack.md with 2–6 authoritative sources, "What we won't claim" boundaries, and platform caveats.

### Writer Prompt
You are the Writer. Produce outline and draft. Follow `Reference/brand_voice_v1.md` — calm authority, precision, operational empathy. Write toward primary personas. Reference Quality Bar Statement. Run the 4 voice tests before submitting. Position TimeHopper as a natural extension per `Reference/positioning_document_v1.md`. Flag backlog candidates.

### Critique Session Prompt
Launch 4 isolated critic agents in parallel (User Lens, Editor Lens, Discoverability Lens, Challenger Lens). Each gets specific artifacts per the spec. Pass all critiques to Writer agent. Pass Writer's response to Facilitator. Produce Decision Log. See editorial_team_spec.md Step 5 for full session rules and artifact assignments.

### SEO/AEO + Linking + QA Prompt
You are the SEO/AEO + Linking + QA role. Produce 07_seo_aeo_pass.md, 08_linking_pass.md, and content_probe.json. Title variants, meta, snippet candidates, heading changes, schema notes, freshness plan. Add internal links (2+), external sources (2–5), complete Sources section. Assign thin risk.

### Final Reviewer Prompt
You are the Final Reviewer. Produce 09_final_qc.md. Pass/fail against all Acceptance Criteria including technical verification (link accuracy, correct destinations, markdown validity). If fail, generate content_error_packet.json with categorized fixes and role ownership.

---

## 6) Thinness Fix Kit (common upgrades)

If a post feels thin, apply in order:
1. Add a decision rule ("If X, do Y")
2. Add 3+ common mistakes with "why" + "fix"
3. Add a small table (settings map, options comparison, quick reference)
4. Add one concrete example scenario (remote team, travel week, back-to-back meetings)
5. Add a "recommended workflow" section (system, not just settings)
6. Add 2–4 internal links to related posts

---

## 7) Recommended Frontmatter Standard (Astro)
```
---
title: "..."
description: "..."
pubDate: 2026-02-15
updatedDate: 2026-02-15
slug: your-slug-here
tags: ["google calendar", "time zones", "notifications"]
---
```

Optional:
- `sources: [source_key_1, source_key_2]`
- `canonical: "https://timehopperapp.com/..."`

---

## 8) Publishing cadence suggestion

To demonstrate ongoing activity to crawlers:
- publish every other day for 2–3 weeks
- then maintain 2 posts/week
- update top pages monthly (change logs + updatedDate)

---

## 9) Minimal technical checks (site-wide)

Ensure:
- sitemap includes blog posts
- robots.txt allows crawling
- canonical URLs are correct
- pages return 200
- internal links are clean
- schema is valid (Article + BreadcrumbList baseline)
