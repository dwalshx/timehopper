# Run Editorial Pipeline — Agent Orchestration Guide

**Purpose:** This document tells the Supervisor (you, or an orchestrating agent) exactly how to launch each step of the editorial pipeline as **real, isolated agent instances**. Each agent gets only the artifacts listed — nothing more.

This is the execution layer. For what each agent does, see `editorial_team_spec.md`.

---

## How to Launch Agents

Each step below uses the **Agent tool** to launch a separate agent instance. Key principles:

1. **Isolation:** Each agent starts fresh. It only knows what you pass in its prompt.
2. **Artifact-based communication:** Pass file contents (via Read) or file paths. Never summarize — let the agent read the actual artifact.
3. **Parallel where possible:** Steps marked "parallel" can be launched simultaneously.
4. **Sequential where dependent:** Wait for the previous agent's output before launching the next.

---

## Pipeline Execution

### Prerequisites
- Set the working directory: `/content_pipeline/<slug>/`
- Ensure `00_input.md` exists with: slug, primary query, intent, audience, publish date, constraints, existing draft (if any), CTA guidance, internal link targets (optional), sources library keys (optional)

### Reference docs (absolute paths)
```
PERSONAS = Reference/editorial_personas.md
PRIMITIVES = Reference/editorial_primitives_library.md
BRAND_VOICE = Reference/brand_voice_v1.md
POSITIONING = Reference/positioning_document_v1.md
SPEC = Reference/editorial_team_spec.md
LESSONS = Reference/editorial_lessons.md
```

---

### Phase 1: Research & Planning (Steps 1, 1b, 1b2, 1c)

**Step 1b — SERP + Format Scout** (can run in parallel with Step 1)
```
Launch Agent:
  Description: "SERP format scout"
  Prompt: Read 00_input.md. You are the SERP + Format Scout. [paste Scout prompt from spec]. Write output to 01b_format_expectations.md.
  Receives: 00_input.md
```

**Step 1 — Brief Architect** (can run in parallel with Step 1b)
```
Launch Agent:
  Description: "Brief architect"
  Prompt: Read 00_input.md, Reference/editorial_personas.md, and Reference/positioning_document_v1.md. You are the Brief Architect. [paste Brief Architect prompt from spec]. Write output to 01_creative_brief.md.
  Receives: 00_input.md, editorial_personas.md, positioning_document_v1.md
```

**Wait for Step 1b to complete.**

**Step 1b2 — Exemplar Analyst** (requires 01b)
```
Launch Agent:
  Description: "Exemplar analysis"
  Prompt: Read 00_input.md, 01b_format_expectations.md, and Reference/editorial_personas.md. You are the Exemplar Analyst. [paste Exemplar Analyst prompt from spec, including full "Must include" section from Step 1b2]. Write output to 01b2_exemplar_analysis.md.
  Receives: 00_input.md, 01b_format_expectations.md, editorial_personas.md
```

**Wait for Step 1b2 to complete.**

**Step 1c — Checklist Synthesizer** (requires 01b + 01b2)
```
Launch Agent:
  Description: "Content contract"
  Prompt: Read 01b_format_expectations.md, 01b2_exemplar_analysis.md, and Reference/editorial_primitives_library.md. You are the Checklist Synthesizer. [paste Synthesizer prompt from spec]. Write output to 01c_content_contract.md and content_probe_schema.json.
  Receives: 01b_format_expectations.md, 01b2_exemplar_analysis.md, editorial_primitives_library.md
```

---

### Phase 2: Research (Step 2)

**Step 2 — Researcher** (requires 00_input, 01_brief, 01c_contract)
```
Launch Agent:
  Description: "Source research"
  Prompt: Read 00_input.md, 01_creative_brief.md, and 01c_content_contract.md. You are the Researcher. [paste Researcher prompt from spec]. Write output to 02_source_pack.md.
  Receives: 00_input.md, 01_creative_brief.md, 01c_content_contract.md
```

---

### Phase 3: Writing (Steps 3-4)

**Step 3+4 — Writer (Outline + Draft)** (requires brief, contract, exemplar, sources, personas, voice)
```
Launch Agent:
  Description: "Writer outline+draft"
  Prompt: Read the following files:
    - 01_creative_brief.md
    - 01c_content_contract.md
    - 01b2_exemplar_analysis.md
    - 02_source_pack.md
    - Reference/editorial_personas.md
    - Reference/brand_voice_v1.md
    - Reference/positioning_document_v1.md
    - Reference/editorial_lessons.md (read the "Writer" section — these are patterns from prior runs to avoid or replicate)

  You are the Writer. [paste full Writer prompt from spec, including voice guidance, persona targeting, Quality Bar reference, backlog spinout instructions, and the 4 voice tests].

  **Lessons from prior runs:** Before writing, read the Writer section of Reference/editorial_lessons.md. These are concrete patterns observed in prior pipeline runs. Apply them proactively — do not wait for the critique session to catch the same issues again.

  Write 03_outline.md first, then 04_draft_v1.md.
  Receives: 01_creative_brief.md, 01c_content_contract.md, 01b2_exemplar_analysis.md, 02_source_pack.md, editorial_personas.md, brand_voice_v1.md, positioning_document_v1.md, editorial_lessons.md
```

---

### Phase 4: Critique Session (Step 5) — MULTI-AGENT

This is where real agent isolation matters most. Launch 4 critic agents in parallel, then the Writer, then the Facilitator.

**Round 1 — Launch all 4 lenses IN PARALLEL:**

**User Lens Agent:**
```
Launch Agent:
  Description: "Critique user lens"
  Prompt: Read 04_draft_v1.md, 01c_content_contract.md, and Reference/editorial_personas.md.

  You are the User Lens critic. Pick the primary persona for this article. Walk through the draft as that person — not abstractly, but as a simulation:
  - "I just Googled this query. I landed on this page. What do I see first? Do I trust it? Do I find my answer?"
  - Where do you get stuck, lose confidence, or consider hitting the back button?
  - Where does the article assume knowledge the persona doesn't have?
  - Where does it waste the persona's time with information they don't need?

  Output: 2-3 specific, actionable points. Not vague ("could be clearer") — specific ("The Juggler needs the fix in the first 3 sentences under this H2, but it's buried after 2 paragraphs of context").

  Return your critique as text — do not write to a file.
```

**Editor Lens Agent:**
```
Launch Agent:
  Description: "Critique editor lens"
  Prompt: Read 04_draft_v1.md, 01c_content_contract.md, 01b2_exemplar_analysis.md, Reference/brand_voice_v1.md, and Reference/editorial_lessons.md (Critique section + Writer section).

  You are the Editor Lens critic — guardian of craft, voice, and execution quality.

  **Lessons from prior runs:** Read the Critique and Writer sections of Reference/editorial_lessons.md. Check whether known patterns (e.g., repetitive H2 openings, over-explanation, em-dash density) appear in this draft. If a known pattern recurs, flag it explicitly: "This is a recurring pattern from prior runs — see editorial_lessons.md."

  Evaluate on three axes:

  VOICE ALIGNMENT: Does this sound like TimeHopper? Check against the brand voice doc:
  - Calm authority, not tutorial-speak or tech blog generic
  - Precision over persuasion — exact words, no vague claims
  - Short sentences, active language, minimal cognitive load
  - Run the 4 voice tests. Flag specific failures with the offending text quoted.
  - Check the "What We Are NOT" list: any hype, cuteness, jargon, or over-explaining?
  - PERSONA CONSISTENCY: Does the article maintain the same persona voice from start to finish? Pay special attention to the prevention/conclusion section — this is where writers drift from the primary persona (e.g., Juggler) into a secondary persona (e.g., Operator/team-lead voice). Flag any section where the "you" being addressed shifts.

  CRAFT QUALITY:
  - Do all sections open differently, or is there a repetitive pattern? (Flag if 3+ sections start the same way)
  - Are transitions functional or robotic? ("Now let's look at..." = robotic)
  - Does the opening hook or just summarize?
  - Is any section phoning it in — technically correct but lazy?
  - Are tables/checklists genuinely useful or just reformatted prose?

  EXECUTION QUALITY VS. EXEMPLARS:
  - Quote the Quality Bar Statement from the exemplar analysis
  - For each benchmark, assess: does the draft meet it, fall short, or exceed it?
  - Be specific: "The Quality Bar says X. The draft does Y. Gap: Z."

  Output: 2-3 specific points across these axes.

  Return your critique as text — do not write to a file.
```

**Discoverability Lens Agent:**
```
Launch Agent:
  Description: "Critique discoverability"
  Prompt: Read 04_draft_v1.md and 01c_content_contract.md.

  You are the Discoverability Lens critic. Evaluate pure structure and extractability:
  - Would an answer engine (Google AI Overview, Bing Chat) pull the right snippet from each H2's direct answer?
  - Can a scanner find their answer in 10 seconds? Test: pick the 3 most likely user queries for this page and try to find the answer by scanning headings and first sentences only.
  - Are H2s doing their job? (Question-phrased? Matching real search queries? Or generic labels like "Additional Tips"?)
  - Is the content structured for featured snippets? (Numbered lists, tables, definition-style Q&A)
  - Any structural issues: H3s orphaned outside H2s, inconsistent heading hierarchy, missing direct answers?

  Output: 2-3 specific points.

  Return your critique as text — do not write to a file.
```

**Challenger Lens Agent:**
```
Launch Agent:
  Description: "Critique challenger lens"
  Prompt: Read 04_draft_v1.md, 00_input.md, 01c_content_contract.md, Reference/positioning_document_v1.md, and Reference/brand_voice_v1.md.

  You are the Challenger Lens critic. You understand this article's role — its query, its intent, its audience. You're not here to make a troubleshooting article "exciting." You're here to find the moments where the article settles for generic when it could be distinctly TimeHopper.

  Your job:
  - Identify the 1-2 sections where the article has room to elevate — where thought leadership, a unique framework, or a genuinely original insight could appear without fighting the article's utilitarian purpose.
  - Call out anywhere the article reads like it could have been written by any tech blog. What would make someone bookmark this instead of just using it and leaving?
  - Check: does the TimeHopper mention feel earned and natural, or bolted on? Does it align with the positioning doc's framing (temporal workflow layer on top of existing tools)?
  - Push on the "prevention/system" angle if there is one — this is where TimeHopper content can differentiate from pure fix-it guides.
  - Be bounded: push for excellence within the article's purpose, not against it.

  Output: 1-2 specific, high-leverage suggestions. Quality over quantity.

  Return your critique as text — do not write to a file.
```

**Wait for all 4 to complete. Collect their outputs.**

**Round 2 — Writer Responds:**
```
Launch Agent:
  Description: "Writer critique response"
  Prompt: Read 04_draft_v1.md.

  You are the Writer in a critique session. You did NOT write this draft — you're evaluating critiques against what's on the page.

  Here are critiques from 4 independent reviewers:

  --- USER LENS ---
  [paste User Lens output]

  --- EDITOR LENS ---
  [paste Editor Lens output]

  --- DISCOVERABILITY LENS ---
  [paste Discoverability Lens output]

  --- CHALLENGER LENS ---
  [paste Challenger Lens output]

  For each point:
  - Which feedback is valid and actionable?
  - Which misunderstands the article's purpose or audience?
  - Where can you propose a solution that addresses multiple critiques at once?
  - Where do you concede? Where do you push back with justification?
  - Are any suggestions contradictory? Call them out and propose a resolution.

  Be specific about what would change in v2.

  Return your response as text — do not write to a file.
```

**Round 3 — Facilitator closes:**
```
Launch Agent:
  Description: "Critique facilitator"
  Prompt: Read 04_draft_v1.md, 01c_content_contract.md, and Reference/editorial_lessons.md.

  You are the Facilitator closing a critique session. Here is the full exchange:

  --- USER LENS CRITIQUE ---
  [paste]

  --- EDITOR LENS CRITIQUE ---
  [paste]

  --- DISCOVERABILITY LENS CRITIQUE ---
  [paste]

  --- CHALLENGER LENS CRITIQUE ---
  [paste]

  --- WRITER'S RESPONSE ---
  [paste]

  Produce a Decision Log:
  - **Changing:** Numbered list of specific changes for v2, with brief rationale
  - **Keeping:** Items the Writer successfully defended — noted so they don't resurface
  - **Parking:** Good ideas that are out of scope (may feed backlog_candidates.md)
  - **Backlog spinout:** Any spinout candidates identified during critique

  Also include a **Contract Compliance Check** — binary pass/fail against each item in 01c_content_contract.md. If any must-have is missing, add it to the "Changing" list regardless of what the Writer said.

  Also include a **Lessons Check** — scan Reference/editorial_lessons.md for known patterns. If any known lesson recurred in this draft (e.g., "Writer over-explains after experiential moments" and the critics flagged over-explanation), note it in the Decision Log under a "Recurring Patterns" section. This helps the Retrospective Agent track reinforcement.

  Write the full session transcript + Decision Log to 05_critique_session.md.
```

**Optional Round 4 — Extended exchange** (only if Writer's response raises unresolved questions):
Launch critic agents again with the Writer's response, get their reactions, pass back to Writer. Cap at 2 additional exchanges total.

---

### Phase 5: Rewrite (Step 6)

**Step 6 — Writer v2**
```
Launch Agent:
  Description: "Writer draft v2"
  Prompt: Read 04_draft_v1.md, the Decision Log section of 05_critique_session.md, 01c_content_contract.md, Reference/brand_voice_v1.md, and Reference/editorial_lessons.md (Writer section).

  You are the Writer producing draft v2. Implement all items from the Decision Log "Changing" list. Contract Compliance items are non-negotiable. If rejecting any other item, note why briefly.

  **Lessons from prior runs:** Check the Writer section of Reference/editorial_lessons.md. If the Decision Log flags any recurring pattern from lessons, prioritize fixing it thoroughly — these are patterns that have survived previous critique sessions.

  Continue following Reference/brand_voice_v1.md for voice. Run the 4 voice tests before submitting.

  Extract any backlog candidates (from draft and critique) into backlog_candidates.md.

  Write output to 06_draft_v2.md (and backlog_candidates.md if applicable).
```

---

### Phase 5b: Voice Edit (Step 6b)

**Step 6b — Voice Editor**
```
Launch Agent:
  Description: "Voice editor"
  Prompt: Read 06_draft_v2.md, Reference/voice_editor_spec.md, Reference/brand_voice_v1.md, and Reference/editorial_lessons.md (Voice Editor section).

  You are the Voice Editor. Follow the full spec in Reference/voice_editor_spec.md.

  **Lessons from prior runs:** Read the Voice Editor section of Reference/editorial_lessons.md before starting. These are patterns from prior runs — recurring tells, effective moves, calibration data. Use them to prioritize your De-AI and Humanize passes.

  Pass 1 — De-AI: Run the tells checklist (Section 2). Count and fix em-dashes, "not X — Y" constructions, three-beat rhythms, hedge fog, intensifiers, transition scaffolding, uniformity. Mechanical pass.

  Pass 2 — Humanize: Make 4-8 interventions using the licensed moves (Section 3). Where the draft is flat, add temperature. Use the Forage step (Section 4) for up to 3 web searches when a lukewarm example needs emotional texture — search Reddit, HN, forums for how real people describe the experience. Never copy; synthesize.

  Guardrails: Do not change argument, structure, facts, links, frontmatter, or headings. Stay within word count ±5%. Run the 4 voice tests after all changes.

  Write output to 06b_draft_v2_voiced.md and 06b_voice_edit_log.md.
  Receives: 06_draft_v2.md, Reference/voice_editor_spec.md, Reference/brand_voice_v1.md, Reference/editorial_lessons.md
```

---

### Phase 6: Optimization (Steps 7-8)

**Step 7+8 — SEO/AEO + Linking + QA**
```
Launch Agent:
  Description: "SEO linking QA"
  Prompt: Read 06b_draft_v2_voiced.md, 01c_content_contract.md, and 02_source_pack.md.

  You are the SEO/AEO + Linking + QA role. [paste full prompt from spec].

  Write output to 07_seo_aeo_pass.md, 08_linking_pass.md, and content_probe.json.
```

---

### Phase 7: Final QC (Step 9)

**Step 9 — Final Reviewer**
```
Launch Agent:
  Description: "Final QC review"
  Prompt: Read 06b_draft_v2_voiced.md (or latest draft with SEO/linking changes applied), 01c_content_contract.md, 02_source_pack.md, and Reference/brand_voice_v1.md.

  You are the Final Reviewer. Perform a hard pass/fail against the Acceptance Criteria in the spec:

  CONTENT CHECKS:
  - AEO structure compliance
  - "Not Thin" minimum depth
  - Trust + Sources compliance
  - Voice compliance (run the 4 voice tests from brand_voice_v1.md)

  TECHNICAL VERIFICATION:
  - Every link resolves — no 404s, no placeholder URLs
  - TimeHopper product links → Chrome Web Store listing (exact URL)
  - Internal links → correct slugs that exist
  - External sources → authoritative domains from source pack
  - No orphaned anchors or broken references
  - Markdown renders correctly
  - Frontmatter complete

  Write output to 09_final_qc.md.
  If fail, also create content_error_packet.json with categorized fixes and role ownership.
```

---

### Phase 8: Publish (Step 9)

**If QC passes:** The Supervisor (orchestrating agent) assembles `10_publishable.md` — the final Astro-ready file incorporating all SEO/linking changes and QC fixes.

**If QC fails:** Route the error packet to the appropriate role agent, re-run that step, then re-run Final QC once. If it fails again, escalate to human.

---

### Phase 9: Retrospective (Step 10b)

**Step 10b — Retrospective Agent** (runs after publishable is assembled)
```
Launch Agent:
  Description: "Pipeline retrospective"
  Prompt: Read the following files:
    - content_pipeline/<slug>/05_critique_session.md
    - content_pipeline/<slug>/06b_voice_edit_log.md
    - content_pipeline/<slug>/09_final_qc.md
    - Reference/editorial_lessons.md

  You are the Retrospective Agent. Follow the full spec in Reference/editorial_team_spec.md (Retrospective Agent prompt).

  Extract actionable patterns from this pipeline run. For each artifact, identify:
  - Writer habits (structural tells, over-explanation patterns, framework definition style)
  - Voice Editor patterns (which De-AI tells recur, which humanize moves were most effective)
  - Critique patterns (which lenses found real issues, which critiques were rejected and why)
  - QC patterns (recurring technical issues, factual accuracy problems)
  - What worked well (moves that elevated the piece — just as important as problems)

  Update Reference/editorial_lessons.md:
  - Add new lessons (New tier)
  - Reinforce existing lessons that appeared again (bump tier)
  - Flag graduates ready for spec promotion (add to Graduation Queue)
  - Prune if over 30 items (drop unreinforced New lessons older than 3 runs)
  - Retire lessons now in the specs

  Write output to:
  - content_pipeline/<slug>/10b_retrospective.md
  - Reference/editorial_lessons.md (updated)

  Receives: 05_critique_session.md, 06b_voice_edit_log.md, 09_final_qc.md, Reference/editorial_lessons.md
```

**If the Graduation Queue has items:** Surface them to the human for review. Graduated lessons get promoted into the relevant spec (editorial_team_spec.md, voice_editor_spec.md, or run_editorial_pipeline.md) and retired from the lessons file.

---

## Parallelism Summary

| Phase | Steps | Parallel? |
|-------|-------|-----------|
| 1. Research & Planning | 1 + 1b | ✅ Parallel |
| 1. Research & Planning | 1b2 | Sequential (needs 1b) |
| 1. Research & Planning | 1c | Sequential (needs 1b2) |
| 2. Research | 2 | Sequential (needs 1, 1c) |
| 3. Writing | 3+4 | Sequential (needs all prior) |
| 4. Critique | 4 critic lenses | ✅ Parallel |
| 4. Critique | Writer response | Sequential (needs all critiques) |
| 4. Critique | Facilitator | Sequential (needs Writer response) |
| 5. Rewrite | 6 | Sequential (needs Decision Log) |
| 5b. Voice Edit | 6b | Sequential (needs v2 draft) |
| 6. Optimization | 7+8 | Sequential (needs voiced draft) |
| 7. Final QC | 9 | Sequential (needs optimization) |
| 8. Publish | 10 | Sequential (needs QC pass) |
| 9. Retrospective | 10b | Sequential (needs QC pass + publish) |
