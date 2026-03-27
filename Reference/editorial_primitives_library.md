# TimeHopper Editorial Primitives Library

This library defines the standard content "primitives" used by the Checklist Synthesizer to generate enforceable content contracts.

## 1. Listicle Primitives
Use these for reviews, roundups, and "Best of" directories.

- **ComparisonTableNearTop:** A high-level comparison table of top featured items (min 3 rows).
- **RubricOrScoringMethod:** Definition of the criteria used to evaluate items (e.g., "Privacy," "Speed," "Features").
- **NamedItemsCount:** Hard count of items required (as specified in 01b Scout).
- **PrimarySourceLinksPerItem:** Every item must have a link to the primary source (Chrome Store, Official Site).
- **ProsConsPerItem:** Bulleted list of pros and cons for each featured item.
- **TrustNotePerItem:** Note on publisher, last check date, and rating (if available).
- **EnrichmentPass:** (Optional) Ratings, review excerpts, and permission "shapes".

## 2. Troubleshooting Primitives
Use these for guides solving specific technical errors or "not working" queries.

- **SymptomCauseFixTableNearTop:** A quick-reference table for immediate problem identification.
- **BranchingDecisionRules:** "If OS=Windows, do X; If OS=Mac, do Y" or "If Chrome, do A; If Safari, do B".
- **QuickResetSection:** A "Clear Cache / Restart" section with platform-specific steps.
- **VisualSymptomGuide:** Text-based description of where to look for specific visual cues.
- **PlatformGaps:** Section addressing the difference between Web, Desktop, and Mobile app behavior.

## 3. Complete Guide Primitives
Use these for exhaustive "Masterclass" or "Everything you need to know" pillars.

- **DefinitionsOrSettingsMapTable:** Table mapping complex terms to their location in Google Settings.
- **DecisionMatrix:** Helping the reader choose between multiple valid options/workflows.
- **CommonMistakes:** List of ≥3 pitfalls with specific "why" and "fix" explanations.
- **Scenarios:** Narrative examples (e.g., "The Traveler's Week," "The Remote Manager").
- **Checklist:** A final "Get it Done" numbered list for completion.
- **InternalLinkCluster:** Links to deeper sibling guides in the same hub.

## 4. Verifiability Minimum (Global)
Required for any mention of a 3rd party tool/service:
- Link to primary source (Chrome Web Store listing or official site).
- Include publisher name.
- Include "Checked on <Date>" or "Last Updated" timestamp.
- If citing ratings, include source + as-of date.
- No unlinked recommendations.
