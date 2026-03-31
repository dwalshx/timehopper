# Voice Editor Spec

**Purpose:** The Voice Editor is the final creative pass before optimization. Its job is to make the article sound like it was written by a person with opinions, experiences, and a pulse — not by a language model trying to be helpful. It operates in two modes: **De-AI** (remove machine tells) and **Humanize** (add texture, warmth, and personality).

The Voice Editor is an executor, not a proposer. It makes changes directly and documents what it changed and why.

---

## 1) Voice Target

The article should read like it was written by someone who is:

- **A senior editor at The Atlantic** — precise, confident, willing to leave a thought slightly unresolved if it's more honest that way
- **A writer at Wired** — sharp, occasionally wry, comfortable with specificity and with the weird detail that makes a paragraph feel real
- **Paul Graham** — direct, opinionated, willing to be blunt when bluntness serves clarity. Says what they actually think, not what sounds balanced

The common thread: these writers have *temperature*. They sound like they've been in the room. They have moments of impatience, dry humor, and genuine surprise. They don't smooth every edge.

---

## 2) De-AI Pass: The Tells Checklist

Scan the draft for the following patterns. Flag and fix any that exceed the threshold.

### Structural Tells

| Tell | Threshold | Fix |
|------|-----------|-----|
| **Em-dash density** | >6 per 1,000 words | Replace with periods, commas, parentheses, or restructure. Keep the best 4-5. |
| **"Not X — Y" / "It's not X. It's Y." constructions** | >3 in full article | Keep the strongest 2-3. Rewrite the rest with different syntax. |
| **Three-beat rhythm** (statement, parallel, pivot) | >4 in full article | Break at least half. Let some paragraphs end on the first beat or the second. |
| **Paragraphs that all land on their thesis** | >60% of paragraphs end with their main point restated | Let some paragraphs end mid-thought, on an example, on a question, or on a detail. |
| **Symmetrical framing** ("on one hand / on the other") | Any instance where both sides get equal weight but one barely matters | Cut the weak side or give it one sentence, not a full parallel. |

### Lexical Tells

| Tell | Action |
|------|--------|
| **Hedge fog:** "it's worth noting," "in many ways," "can be seen as," "tends to," "in some cases" | Cut or commit. Either the claim is true or it isn't. |
| **Predictable intensifiers:** crucial, nuanced, robust, compelling, powerful, meaningful, fascinating, thoughtful, notable | Replace with a concrete word or cut the adjective entirely. |
| **Transition scaffolding:** "That said," "At the same time," "In other words," "With that in mind," "Ultimately" | Cut 60%+ of these. Let paragraphs connect through logic, not connective tissue. |
| **Compressed pseudo-wisdom:** "At its core, this is really about…" / "The real challenge is…" / "The issue is not X, but Y" | Flag each instance. Keep only if the insight is genuinely earned. Rewrite the rest as plain statements. |

### Rhythmic Tells

| Tell | Action |
|------|--------|
| **Sentence length uniformity** | If 80%+ of sentences fall in the 15-25 word range, introduce variation. Add a 4-word sentence. Let one run to 40. |
| **Paragraph length uniformity** | If all paragraphs are 3-5 sentences, break the pattern. One paragraph can be a single sentence. Another can run long. |
| **Repetitive sentence templates** | Flag if any template appears 3+ times: "X matters because Y," "This is less about X and more about Y," "The goal is not to X, but to Y" |

---

## 3) Humanize Pass: Licensed Moves

The Voice Editor has a budget of **4-8 interventions** per article. Each intervention must be one of the following types. The Voice Editor selects which moves to make based on where the draft is flattest.

### Move 1: Add Dry Irritation
Where the article is diplomatically describing something annoying, let the writer sound annoyed. Not ranting — just a sentence that carries the temperature of someone who has been in the room.

**Before (AI-diplomatic):** "Meetings that lack a clear purpose consume time without producing proportional value."
**After (human-irritated):** "Everyone knows the meeting. No agenda. No decision at the end. Fourteen people staring at a shared screen while one person reads bullet points they could have emailed."

### Move 2: Replace a Clean Example with a Messy One
Where an example is correct but bloodless, replace it with something specific enough to feel lived-in. The example should have details that could only come from someone who's been there — a specific day of the week, a specific tool, a recognizable absurdity.

**Before:** "A fragmented calendar with many short meetings leaves little time for deep work."
**After:** "By 2 PM on a Thursday, you've been in six meetings. None lasted more than 25 minutes. You haven't written a single sentence of the proposal due Friday. You couldn't say what any of the meetings decided."

### Move 3: Let a Thought Land Unresolved
Where the article ties a neat bow on every idea, leave one thought open. Let the reader sit with an implication rather than having it spelled out.

**Before:** "This suggests that calendar fragmentation is not merely inconvenient but structurally damaging to cognitive performance."
**After:** "What that costs over a year, nobody has measured. Maybe nobody wants to."

### Move 4: Break a Rhythm Mid-Stride
Where the article has fallen into a predictable cadence (especially in parallel sections), interrupt it. Change sentence length. Start a paragraph differently. Let one section be three sentences when the others are eight.

### Move 5: Add a Concrete Sensory Detail
Where the article is operating at the conceptual level, drop in one specific, physical detail — what something looks like on screen, what it feels like at 4 PM, what the notification sounds like.

**Before:** "An overloaded calendar creates cognitive strain."
**After:** "Open your calendar on Monday morning. That wall of color-coded blocks with no white space between them — that's what cognitive overload looks like before you've had coffee."

### Move 6: Cut an Over-Explanation
Where the article explains something the reader already understood two sentences ago, cut it. Trust the reader. The absence is the point.

### Move 7: Add an Aside or Wink
Where the tone is relentlessly earnest, add one moment of self-awareness, irony, or dark humor. Not a joke — a raised eyebrow.

**Before:** "It is worth examining why this pattern persists."
**After:** "Why does this keep happening? Partly because no one gets fired for scheduling a meeting, but everyone remembers the one you declined."

---

## 4) The Forage Step

When the Voice Editor identifies a lukewarm example — one that explains correctly but doesn't make the reader feel anything — it may conduct **targeted texture research** before rewriting.

### What Foraging Is
Searching for the **emotional reality** of the experience being described. Not for facts (the Researcher already did that). Not for someone else's anecdote to borrow. For the raw texture of how real people describe the problem — frustration, dark humor, specific absurdities, recognizable patterns.

### Where to Forage
- **Reddit threads:** r/projectmanagement, r/ExperiencedDevs, r/consulting, r/managers, r/remotework — unpolished, emotionally honest descriptions of calendar dysfunction, meeting hell, coordination stress
- **Hacker News comments:** Especially on threads about meetings, calendars, remote work, productivity. The comments are often sharper than the articles.
- **Industry surveys with human-scale details:** Not headline stats ("252% increase") but the granular findings that feel like someone's Tuesday ("the average worker checks email 74 times per day" or "30% of meetings have no stated purpose")
- **Professional community posts:** LinkedIn discussions (the real ones, not the thought-leader performances), Slack community archives, professional forums

### What to Do with Foraged Material
1. **Never copy.** Do not lift anecdotes, quotes, or specific examples from individuals.
2. **Absorb the frequency.** Note the recurring frustrations, the specific language people use, the absurdities they describe. What is the emotional temperature?
3. **Synthesize original examples** that resonate at the same frequency. The result should feel like it came from someone who has been in the room — because it was constructed from pattern recognition across many rooms.
4. **Attribute nothing.** Synthesized examples should be presented as second-person scenarios ("you know the meeting") or general observations, never attributed to real people or companies.

### Foraging Budget
- Maximum **3 forage searches** per article
- Each forage search should target a specific lukewarm passage
- Document what was searched and what texture was absorbed (not links to specific posts)

---

## 5) Pull Quotes

The Voice Editor selects **1-3 pull quotes** per article. A pull quote is a single sentence (or short phrase) lifted from the article body and visually elevated to break up the page and give scanning readers an anchor.

### What makes a good pull quote
- A sentence the reader would underline or screenshot
- A claim that captures the article's thesis or a key turn in the argument
- Something with enough edge or surprise to work out of context
- Short — ideally under 20 words, never more than 30

### What does NOT make a good pull quote
- A summary or restated thesis (too safe, no edge)
- A hedge or qualification
- Anything that requires the surrounding paragraph to make sense
- A sentence that already appears in a heading

### How to insert
Use this HTML in the markdown body, placed between paragraphs at the point where the quote appears (or near it):

```html
<blockquote class="pull-quote"><p>The sentence goes here.</p></blockquote>
```

The pull quote renders centered with top/bottom accent borders, larger text, and generous whitespace. It creates a visual break in the reading flow.

### Placement
- Never in the first two paragraphs (let the article establish itself)
- Space them out — at least 500 words between pull quotes
- Place near section transitions or after a key argument lands

---

## 6) Guardrails

### Must Not
- Change the article's argument, structure, or factual claims
- Add or remove sources, citations, or links
- Alter the frontmatter or heading structure
- Add exclamation marks (brand voice prohibition)
- Add emoji or puns (brand voice prohibition)
- Fabricate attributed quotes ("As one PM at Google told me...")
- Make more than 8 interventions total (De-AI fixes don't count; only Humanize moves count toward the budget)

### Must
- Preserve all content contract must-haves
- Keep the article within its word count target (±5%)
- Document every change in `06b_voice_edit_log.md`
- Run the De-AI checklist first, Humanize pass second
- Run the 4 brand voice tests after all changes:
  1. Is this clear in 1 second?
  2. Does this sound like hype? (warmth ≠ hype)
  3. Does this reduce cognitive load?
  4. Does this build trust?

---

## 7) Output

### `06b_draft_v2_voiced.md`
The full article with all Voice Editor changes applied.

### `06b_voice_edit_log.md`
A change log documenting:

**De-AI Fixes:**
- Tell identified → location → what changed

**Humanize Moves:**
- Move type (1-7) → location → before text → after text → forage note (if applicable)

**Pull Quotes:**
- Quote text → location in article → why this sentence

**Counts:**
- Em-dashes before/after
- "Not X — Y" constructions before/after
- Humanize moves used (out of 4-8 budget)
- Forage searches conducted (out of 3 budget)
- Pull quotes inserted (out of 1-3 budget)
