# editorial_team_spec.md
**Purpose:** Execution-ready spec for a **real multi-agent team** that produces **index-worthy**, **SEO/AEO-optimized** content for TimeHopperapp.com. Each role runs as an **isolated agent instance** — separate context, no shared memory, communication only through artifacts.

This spec defines what each agent does. The orchestrator (`run_editorial_pipeline.md`) defines how they're launched.

---

## 1) Team Overview

### Team Name
**TimeHopper Editorial Team (SEO/AEO)**

### Mission
For a given content target (query/keyword + intent), produce a **publishable Astro markdown** file that:
- answers the query directly (AEO-ready)
- is not "thin" (has examples, edge cases, decision rules)
- sounds like TimeHopper (calm, precise, confident — not generic tech blog)
- is trustworthy (citations + restrained claims)
- is well-linked internally and externally
- passes a final QC gate

### Architecture: Real Agents, Not Role-Play
Each role in this pipeline runs as a **separate agent instance**:
- Agents only see artifacts explicitly passed to them — not the full pipeline history
- Agents have no memory of other agents' reasoning or process
- The Critique Session uses multiple isolated agents in a facilitated exchange
- This creates genuine independence: the Critic has never seen why the Writer made shortcuts, the Writer defending the draft didn't write it

### Inputs
- `slug`
- `primary_query` (keyword / query)
- `intent` (informational | troubleshooting | commercial-investigation)
- `audience` (persona + context)
- `publish_date` (pubDate/updatedDate)
- `constraints` (voice, claims, legal, competitor rules)
- `existing_draft` (optional)
- `internal_link_targets` (optional)
- `sources_library` (sources.yml keys available)

### Outputs
- `10_publishable.md` (final Astro-ready article)
- Full artifact bundle for traceability (brief, sources, critique, linking pass, QC)

---

## 2) Roles

### Core Roles
1) **Supervisor / Orchestrator** — Creates input, launches agents, enforces gates
2) **SERP + Format Scout** — Identifies user expectations for the specific query/format
3) **Exemplar Analyst** — Researches best-in-class content to establish "what good looks like"
4) **Checklist Synthesizer** — Generates the content contract and probe schema
5) **Brief Architect** — Refines creative strategy based on contract, personas, and positioning
6) **Researcher / Source Curator** — Curates authoritative links and verifiability data
7) **Writer** — Executes draft against contract, voice guide, and quality bar
8) **Critique Session** (4 agents + facilitator) — Facilitated multi-perspective critique:
   - User Lens
   - Editor Lens (voice + craft + execution quality)
   - Discoverability Lens
   - Challenger Lens
   - Writer (defending)
   - Facilitator (Supervisor)
9) **SEO/AEO + Linking + QA** — Final optimization pass
10) **Final Reviewer** — Strict contract-driven pass/fail gate with technical verification

### Reference Documents (passed to agents as needed)
- `Reference/editorial_personas.md` — User personas (Operator, Planner, Juggler, Minimalist)
- `Reference/editorial_primitives_library.md` — Content building blocks
- `Reference/brand_voice_v1.md` — TimeHopper voice: calm authority, precision over persuasion, operational empathy
- `Reference/positioning_document_v1.md` — TimeHopper positioning: temporal workflow layer, not a replacement for calendars
- `Reference/editorial_team_template.md` — Operating principles and workflow reference

---

## 3) Folder + Artifact Contract (Required)

Create a folder:
`/content_pipeline/<slug>/`

### Required artifacts
00_input.md
01_creative_brief.md
01b_format_expectations.md
01b2_exemplar_analysis.md — Quality benchmark from best-in-class content
01c_content_contract.md
content_probe_schema.json
02_source_pack.md
03_outline.md
04_draft_v1.md
05_critique_session.md — Multi-perspective facilitated critique transcript + decision log
06_draft_v2.md
07_seo_aeo_pass.md
08_linking_pass.md
09_final_qc.md (Contract-driven + technical verification)
10_publishable.md
content_probe.json

### Conditional artifacts
content_error_packet.json    (only on QC failure)
backlog_candidates.md        (when spinout candidates are identified during writing or critique)

---

## 4) Acceptance Criteria (QC Gate)

### AEO Structure (required)
- H1 matches primary intent/query
- Each major H2 has:
  - **Direct answer (1–3 sentences)** immediately under the heading
  - supporting steps/examples after

### "Not Thin" Minimum Depth (required)
Must include **at least 3 of 5**:
- numbered checklist
- decision rule ("If X, do Y")
- table (reference/comparison/examples)
- edge cases / common mistakes (≥ 3)
- comparison/myth-busting section

### Trust + Sources (required)
- **Sources** section with **2–5** authoritative links
- No claims likely to change without citations
- No hype claims without rubric/criteria

### Voice (required)
- Matches TimeHopper brand voice (calm, precise, confident)
- No hype words ("revolutionary," "game-changing," "supercharge")
- No over-explaining — trust the reader
- Short sentences, active language
- Passes the 4 voice tests from `Reference/brand_voice_v1.md`
- **Persona consistency:** The article must speak to the same primary persona throughout — including the prevention/conclusion section. No drifting into Operator/team-lead voice in an article written for the Juggler, even when the content naturally appeals to a secondary persona. The framework can serve multiple personas, but the voice stays with the primary.

### SEO Hygiene (required)
- frontmatter includes: `title`, `description`, `pubDate`, `updatedDate`, `slug`, `tags`
- at least **2 internal links** to TimeHopper content/pages
- slugs and headings are clean and descriptive

### Technical Verification (required)
- Every link resolves (no 404s, no placeholder URLs)
- TimeHopper product links → Chrome Web Store listing (not homepage, not generic)
- Internal links → correct slugs that exist on the site
- External sources → authoritative domains matching `02_source_pack.md`
- No orphaned anchors or broken references
- Markdown renders correctly (no broken headings, unclosed formatting)
- Frontmatter includes `pubDate` and `updatedDate`
- **No duplicate sections:** Check for repeated section types (e.g., two Sources sections, two FAQ sections). This commonly occurs when the article body includes a section that the site template also auto-generates from frontmatter. If the template auto-generates a Sources section from `sources` frontmatter, the article body should NOT include its own Sources section — use inline "Reference:" links instead, or remove the frontmatter `sources` field.
- **No frontmatter conflicts:** If the article uses inline source citations (Reference: links), do NOT include a `sources` field in frontmatter — this will create a duplicate Sources section on the rendered page.

---

## 5) Loop Rules (Stop Conditions)

### Rewrite loops
- Default: **1 critique → 1 rewrite**
- Allow: **one additional revision** only if Final QC fails

### Escalation rules
Escalate to human decision (or supervisor override) if:
- Same critique repeats twice without meaningful structural changes
- Required sources cannot be found for key claims
- Intent conflict: the article keeps drifting away from target query

---

## 6) Orchestration Plan (Step-by-step)

### Step 1 — Brief Architect → `01_creative_brief.md`
**Agent receives:** `00_input.md`, `Reference/editorial_personas.md`, `Reference/positioning_document_v1.md`

Must include:
- Objective (measurable)
- Audience + pain points
- Primary persona(s) from `Reference/editorial_personas.md` (1-2 personas, with notes on how their reading style shapes this article)
- Search intent classification
- How this article serves TimeHopper's positioning (from `Reference/positioning_document_v1.md`) — not as a sales angle, but as context for what makes our perspective unique
- Differentiation vs SERP/official docs

### Step 1b — SERP + Format Scout → `01b_format_expectations.md`
**Agent receives:** `00_input.md`

Must include:
- Query + intent classification
- Declared content type (listicle, guide, etc.)
- "Top results usually include"
- "What a user expects on this page"
- Our differentiation angle
- "Minimum viable elements"

### Step 1b2 — Exemplar Analyst → `01b2_exemplar_analysis.md`
**Agent receives:** `00_input.md`, `01b_format_expectations.md`, `Reference/editorial_personas.md`

**Purpose:** Establish "what good looks like" before writing begins. This is the research + tastemaking step — studying the best existing content for this query to set a concrete quality benchmark.

Must include:
- **Exemplar Selection:** Identify 2-4 best-in-class pieces for this query (top SERP results, authoritative sources, or notably well-executed content even if not top-ranking)
- **Pattern Analysis:** What do the best pieces have in common? What structural elements appear across all top results (table stakes)?
- **Quality Differentiators:** What separates great from merely adequate? Specific examples: "Article X's comparison table breaks down by use case, not just features" or "Article Y opens with a 30-second quick fix before the full guide"
- **Table Stakes vs. Great-to-Haves:** Two explicit lists:
  - **Table stakes:** Elements that every good result has (if we skip these, we're incomplete)
  - **Great-to-haves:** Elements that only the best 1-2 results include (this is where we can differentiate)
- **Quality Bar Statement:** 1-2 sentences defining the specific quality target for this article. Not generic ("be useful") but concrete ("our comparison table should be at least as detailed as [Exemplar X]'s, with the addition of platform-specific caveats they missed")
- **Persona Lens:** How would each relevant persona (from `Reference/editorial_personas.md`) evaluate the exemplars? What do the exemplars do well for them, and where do they fall short?

**Note:** The Exemplar Analysis is a reference document — it informs the Checklist Synthesizer, the Writer, and the Critique Session. The Quality Bar Statement is explicitly referenced during critique to evaluate execution quality.

### Step 1c — Checklist Synthesizer → `01c_content_contract.md` + `content_probe_schema.json`
**Agent receives:** `01b_format_expectations.md`, `01b2_exemplar_analysis.md`, `Reference/editorial_primitives_library.md`

Must include:
- Page identity & Success definition
- Must-haves (binary pass/fail) — informed by exemplar table-stakes analysis
- Should-haves (graded) — informed by exemplar great-to-haves
- Thinness prevention plan (required primitives from `Reference/editorial_primitives_library.md`)
- Quality bar (imported from `01b2_exemplar_analysis.md` Quality Bar Statement)
- Verification plan (probe fields & thresholds)

### Step 2 — Researcher → `02_source_pack.md`
**Agent receives:** `00_input.md`, `01_creative_brief.md`, `01c_content_contract.md`

Must include:
- 2–6 authoritative sources (prefer Google/Chrome/Apple/Microsoft/IANA)
- 1 optional credible "interesting" source if relevant
- "What we won't claim" boundaries
- Notes on platform differences (Chrome/Brave, Mac/Windows)

### Step 3 — Writer → `03_outline.md`
**Agent receives:** `01_creative_brief.md`, `01c_content_contract.md`, `01b2_exemplar_analysis.md`, `02_source_pack.md`, `Reference/editorial_personas.md`, `Reference/brand_voice_v1.md`

Outline rules:
- Minimal intro (≤ 3 sentences)
- H2s phrased like user questions
- Planned answer-first blocks
- Planned checklist/table and decision rule placement
- Planned internal links

### Step 4 — Writer → `04_draft_v1.md`
**Agent receives:** `03_outline.md`, `01_creative_brief.md`, `01c_content_contract.md`, `01b2_exemplar_analysis.md`, `02_source_pack.md`, `Reference/editorial_personas.md`, `Reference/brand_voice_v1.md`, `Reference/positioning_document_v1.md`

Draft rules:
- **H1 title required:** Always include the article title as an `# H1` heading as the first line of the markdown body (after frontmatter). The Astro template does NOT render the frontmatter `title` as a visible heading — the H1 must be in the content itself.
- Answer-first blocks under each major H2
- Include ≥1 checklist and ≥1 decision rule
- Include edge cases (≥3 bullets)
- Keep TimeHopper mention helpful and brief (not salesy) — position as a natural extension of the fix, not a product pitch (per positioning doc)
- Write toward the primary persona(s) identified in the brief
- **Voice:** Follow `Reference/brand_voice_v1.md` throughout. Calm authority, not tutorial voice. Short sentences, active language. Before submitting, run the 4 voice tests:
  1. Is this clear in 1 second?
  2. Does this sound like hype?
  3. Does this reduce cognitive load?
  4. Does this build trust?
- Reference the exemplar Quality Bar Statement from `01b2_exemplar_analysis.md` — aim to meet or exceed it
- **Backlog spinout:** If any section is growing into its own topic or clearly serves a different persona than the article's primary audience, flag it at the bottom of the draft under a `## Backlog Candidates` section (title + 1-sentence rationale). These will be extracted to `backlog_candidates.md`.

### Step 5 — Facilitated Critique Session → `05_critique_session.md`

**Purpose:** A genuine multi-agent conversation where isolated agents critique the draft from different perspectives. Each critic has never seen the Writer's process — they can only evaluate what's on the page.

**Participants (each is a separate agent instance):**

#### User Lens
**Agent receives:** `04_draft_v1.md`, `01c_content_contract.md`, `Reference/editorial_personas.md`

Pick the primary persona for this article. Walk through the draft as that person — not abstractly, but as a simulation:
- "I just Googled this query. I landed on this page. What do I see first? Do I trust it? Do I find my answer?"
- Where do you get stuck, lose confidence, or consider hitting the back button?
- Where does the article assume knowledge the persona doesn't have?
- Where does it waste the persona's time with information they don't need?
- Output: 2-3 specific, actionable points. Not vague ("could be clearer") — specific ("The Juggler needs the fix in the first 3 sentences under this H2, but it's buried after 2 paragraphs of context").

#### Editor Lens (Voice + Craft + Execution Quality)
**Agent receives:** `04_draft_v1.md`, `01c_content_contract.md`, `01b2_exemplar_analysis.md`, `Reference/brand_voice_v1.md`

You are the guardian of craft and voice. Evaluate on three axes:

**Voice alignment:** Does this sound like TimeHopper? Check against `Reference/brand_voice_v1.md`:
- Calm authority, not tutorial-speak or tech blog generic
- Precision over persuasion — exact words, no vague claims
- Short sentences, active language, minimal cognitive load
- Run the 4 voice tests. Flag specific failures with the offending text quoted.
- Check the "What We Are NOT" list: any hype, cuteness, jargon, or over-explaining?
- **Persona consistency throughout:** Does the article maintain the same persona voice from start to finish? Pay special attention to the prevention/conclusion section — this is where writers commonly drift from the primary persona (e.g., Juggler) into a secondary persona (e.g., Operator/team-lead voice). The framework can serve multiple personas, but the voice must stay with the primary throughout. Flag any section where the "you" being addressed shifts from an individual to a team lead, or vice versa.

**Craft quality:** Evaluate the writing itself:
- Do all sections open differently, or is there a repetitive pattern? (Flag if 3+ sections start the same way)
- Are transitions functional or robotic? ("Now let's look at..." = robotic)
- Does the opening hook or just summarize? Would you keep reading?
- Is any section phoning it in — technically correct but lazy in execution?
- Are tables/checklists genuinely useful or just reformatted prose?

**Execution quality vs. exemplars:** Compare the draft against the Quality Bar Statement from `01b2_exemplar_analysis.md`:
- Quote the Quality Bar Statement
- For each benchmark in it, assess: does the draft meet it, fall short, or exceed it?
- Be specific: "The Quality Bar says our table should map symptoms to exact settings paths. The draft's table still uses general descriptions like 'check your OS settings' instead of exact paths."

Output: 2-3 specific points across these axes.

#### Discoverability Lens
**Agent receives:** `04_draft_v1.md`, `01c_content_contract.md`

Evaluate pure structure and extractability:
- Would an answer engine (Google AI Overview, Bing Chat) pull the right snippet from each H2's direct answer?
- Can a scanner find their answer in 10 seconds? Test this: pick the 3 most likely user queries for this page and try to find the answer by scanning headings and first sentences only.
- Are H2s doing their job? (Question-phrased? Matching real search queries? Or generic labels like "Additional Tips"?)
- Is the content structured for featured snippets? (Numbered lists, tables, definition-style Q&A)
- Any structural issues: H3s orphaned outside H2s, inconsistent heading hierarchy, missing direct answers?

Output: 2-3 specific points.

#### Challenger Lens
**Agent receives:** `04_draft_v1.md`, `00_input.md`, `01c_content_contract.md`, `Reference/positioning_document_v1.md`, `Reference/brand_voice_v1.md`

You understand this article's role — its query, its intent, its audience. You're not here to make a troubleshooting article "exciting." You're here to find the moments where the article **settles for generic when it could be distinctly TimeHopper**.

Your job:
- Identify the 1-2 sections where the article has room to elevate — where thought leadership, a unique framework, or a genuinely original insight could appear without fighting the article's utilitarian purpose.
- Call out anywhere the article reads like it could have been written by any tech blog. What would make someone bookmark this instead of just using it and leaving?
- Check: does the TimeHopper mention feel earned and natural, or bolted on? Does it align with the positioning doc's framing (temporal workflow layer that sits on top of existing tools)?
- Push on the "prevention/system" angle if there is one — this is where TimeHopper content can differentiate from pure fix-it guides.
- Be bounded: you're pushing for excellence within the article's purpose, not changing its purpose.

Output: 1-2 specific, high-leverage suggestions. Quality over quantity.

#### Writer (Defending)
**Agent receives:** `04_draft_v1.md`, all critique outputs from the 4 lenses

You did NOT write this draft. You're evaluating the critiques against what's on the page:
- Which feedback is valid and actionable?
- Which feedback misunderstands the article's purpose or audience?
- Where can you propose a solution that addresses multiple critiques at once?
- Where do you concede? Where do you push back with justification?
- Are any suggestions contradictory? Call them out and propose a resolution.

Output: Respond to each point — concede, push back, or propose an alternative. Be specific about what would change in v2.

#### Facilitator (Supervisor)
**Agent receives:** All critique outputs, Writer's response

Close the session with a **Decision Log**:
- **Changing:** Numbered list of specific changes for v2, with brief rationale from the session
- **Keeping:** Items the Writer successfully defended — noted so they don't resurface
- **Parking:** Ideas that are good but out of scope for this article (may feed into `backlog_candidates.md`)
- **Backlog spinout:** Any additional spinout candidates identified during critique

Also include a **Contract Compliance Check** — binary pass/fail against each item in `01c_content_contract.md`. This is non-negotiable. If a must-have is missing, it goes on the "Changing" list regardless of discussion.

**Session Flow:**
1. Launch User Lens, Editor Lens, Discoverability Lens, and Challenger Lens agents **in parallel** (they're independent for the opening round)
2. Pass all 4 critique outputs to the Writer agent
3. Pass the Writer's response + all critiques to the Facilitator agent
4. Facilitator produces the Decision Log
5. **Optional extension (1-2 more exchanges):** If the Writer's response raises questions that need resolution, launch a second round where lenses can respond to the Writer. Cap at 2 additional exchanges total.

### Step 6 — Writer → `06_draft_v2.md`
**Agent receives:** `04_draft_v1.md`, `05_critique_session.md` (Decision Log section), `01c_content_contract.md`, `Reference/brand_voice_v1.md`

Must:
- Implement all items from the Decision Log "Changing" list
- If rejecting any item, note why briefly (but items from Contract Compliance are non-negotiable)
- Extract any backlog candidates (from draft and critique session) into `backlog_candidates.md`

### Step 7 — SEO/AEO + Linking + QA → `07_seo_aeo_pass.md` + `08_linking_pass.md` + `content_probe.json`
**Agent receives:** `06_draft_v2.md`, `01c_content_contract.md`, `02_source_pack.md`

SEO/AEO pass must include:
- Title variants (2–3)
- Meta description suggestion (≤ 160 chars)
- Snippet candidates (2–4)
- Schema notes:
  - Article always
  - HowTo only if true step-by-step
  - FAQPage only if visible FAQ exists
- Freshness note (what to update later)

Linking pass must include:
- 2+ internal links (targets + anchor text suggestions)
- 2–5 external sources (prefer sources.yml keys)
- Sources section completeness check

`content_probe.json` must include:
```json
{
  "slug": "<slug>",
  "word_count": 0,
  "h2_count": 0,
  "answer_first_blocks_present": true,
  "internal_links_count": 0,
  "external_sources_count": 0,
  "tables_present": false,
  "checklists_present": false,
  "decision_rules_present": false,
  "thin_risk": "low|med|high"
}
```

### Step 8 — Final Reviewer → `09_final_qc.md`
**Agent receives:** `06_draft_v2.md` (or latest draft), `01c_content_contract.md`, `02_source_pack.md`, `Reference/brand_voice_v1.md`

Hard pass/fail against Acceptance Criteria (Section 4 of this spec), including:

**Content checks:**
- AEO structure compliance
- "Not Thin" minimum depth
- Trust + Sources compliance
- Voice compliance (run the 4 voice tests)

**Technical verification:**
- Every link resolves — no 404s, no placeholder URLs
- TimeHopper product links → Chrome Web Store listing (exact URL, not homepage)
- Internal links → correct slugs that exist on the site
- External sources → authoritative domains matching `02_source_pack.md`
- No orphaned anchors or broken references
- Markdown renders correctly (no broken headings, unclosed formatting)
- Frontmatter complete: `title`, `description`, `pubDate`, `updatedDate`, `slug`, `tags`
- **H1 present in body:** The markdown body must start with an `# H1` heading (matching the frontmatter title). The Astro template does not render the frontmatter title as a visible heading — missing H1 means no title on the page.
- **No duplicate sections:** Check for repeated sections (e.g., two Sources sections, repeated disclaimers, duplicate headings)

If fail:
- create `content_error_packet.json` with:
  - failure reasons (categorized: content vs. technical)
  - fix plan (who does what)
  - required deltas

### Step 9 — Supervisor outputs final → `10_publishable.md`

Final must be Astro-ready and include:
- frontmatter
- body
- Sources section (Renders once, with visible links)
- internal links
- All technical issues from Final QC resolved

---

## 7) Role Prompts (Execution-Ready)

These prompts are written so each agent can be launched independently with only the artifacts listed in their "Agent receives" section.

### Supervisor / Orchestrator (prompt)

You are the Supervisor. Create 00_input.md and orchestrate the pipeline by launching each agent in sequence (or in parallel where noted). Pass only the specified artifacts to each agent. Enforce acceptance criteria and bounded loops. If Final QC fails, create content_error_packet.json and route the fix to the correct role, then re-run Final QC once.

### Brief Architect (prompt)

You are the Brief Architect. Produce 01_creative_brief.md based on 00_input.md. Define objective, audience, intent, differentiation vs SERP/official docs, voice rules, constraints, and minimal CTA plan. Identify 1-2 primary personas from `Reference/editorial_personas.md` and note how their reading style and search behavior should shape this article. Reference `Reference/positioning_document_v1.md` to note how this article connects to TimeHopper's positioning (not as a sales angle — as context for our unique perspective). Ensure the brief includes a "Not Thin" plan (what table/checklist/decision rule you will include).

### SERP + Format Scout (prompt)

You are the Scout. Identify user expectations for the specific query and format. Analyze intent and declare the required content type (listicle, guide, etc.). Define the "Minimum Viable Elements" based on top-ranking competitors.

### Exemplar Analyst (prompt)

You are the Exemplar Analyst. Research 2-4 best-in-class pieces of content for this query. Identify patterns, table-stakes elements, and quality differentiators. Produce a concrete Quality Bar Statement that the Writer will aim for and the Critique Session will evaluate against. Consider how each relevant persona (from `Reference/editorial_personas.md`) would evaluate the exemplars. Output: `01b2_exemplar_analysis.md`.

### Checklist Synthesizer (prompt)

You are the Synthesizer. Convert format expectations into a hard **01c_content_contract.md**. Reference the `Reference/editorial_primitives_library.md` to select required blocks. Incorporate table-stakes and great-to-haves from `01b2_exemplar_analysis.md`. Import the Quality Bar Statement. Define binary pass/fail criteria and the `content_probe_schema.json`.

### Researcher / Source Curator (prompt)

You are the Researcher. Produce 02_source_pack.md. Provide 2–6 authoritative sources with notes and recommended citations. Add one optional credible non-Google source if helpful. Include "What we won't claim" boundaries and platform caveats.

### Writer (prompt)

You are the Writer. Produce 03_outline.md and 04_draft_v1.md. Use question-like headings with answer-first blocks. Include checklists, decision rules, edge cases, and minimal CTA.

**Voice:** Follow `Reference/brand_voice_v1.md` throughout. You are writing as TimeHopper — calm authority, precision over persuasion, operational empathy. Not a generic tech blog. Not tutorial-speak. Think: Apple system UI clarity meets Notion utility language. Short sentences. Active voice. Trust the reader. Before submitting, run the 4 voice tests:
1. Is this clear in 1 second?
2. Does this sound like hype? If yes → remove adjectives.
3. Does this reduce cognitive load? If not → shorten.
4. Does this build trust? If not → make it more precise.

**Personas:** Write toward the primary persona(s) from `Reference/editorial_personas.md`. Use their scenarios. Structure for how they scan.

**Quality bar:** Reference the Quality Bar Statement from `01b2_exemplar_analysis.md`. Aim to meet or exceed every benchmark in it.

**Positioning:** When mentioning TimeHopper, position as a natural extension of the fix — a temporal workflow layer that sits on top of existing tools (per `Reference/positioning_document_v1.md`). Never salesy.

**Backlog:** Flag any spinout candidates at the bottom under `## Backlog Candidates`.

### Critique Session (prompt)

This step launches **multiple isolated agent instances** in a facilitated exchange. See Step 5 in the Orchestration Plan for the full session spec, including:
- 4 critic lenses (User, Editor, Discoverability, Challenger) launched in parallel
- Writer agent responding to all critiques
- Facilitator agent producing the Decision Log
- Hard limit: opening round + Writer response + optional 1-2 follow-up exchanges
- Contract compliance checked structurally (non-negotiable)
- Execution quality evaluated against exemplar Quality Bar Statement
- Voice evaluated against `Reference/brand_voice_v1.md`

### SEO/AEO + Linking + QA (prompt)

You are the SEO/AEO + Linking + QA role. Produce 07_seo_aeo_pass.md, 08_linking_pass.md, and content_probe.json. Improve headings for query matching. Add snippet candidates and schema notes. Add 2+ internal links and 2–5 authoritative external sources. Ensure the Sources section is complete.

### Final Reviewer (prompt)

You are the Final Reviewer. Produce 09_final_qc.md. Perform a hard pass/fail against the Acceptance Criteria in Section 4 of the spec, including both content checks AND technical verification (link accuracy, correct destinations, markdown validity). If fail, generate `content_error_packet.json` with exact deltas, categorized as content vs. technical issues, and role ownership for each fix.

---

## 8) Optional: "Thinness Fix Kit" (Apply when Critic flags thinness)

Apply in order:

1. Add a decision rule ("If X, do Y")
2. Add 3+ common mistakes with "why" + "fix"
3. Add a table (settings map, comparison, examples)
4. Add one concrete scenario example (travel week, remote team meeting, back-to-back meetings)
5. Add a "recommended workflow" section (system-level)
6. Add 2–4 internal links to related posts

---

## 9) Frontmatter Standard (Astro)
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
- `sources: [source_key_1, source_key_2]` (if Sources are rendered automatically)

---

## 10) Recommended Cadence

To build crawl/index momentum:
- publish every other day for 2–3 weeks
- then maintain 2 posts/week
- update top pages monthly with real changes + updatedDate
