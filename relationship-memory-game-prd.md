# Product Requirements Document
## Relationship Memory Game - Condensed for AI Development

---

## Product Overview

**What:** A gamified relationship assessment tool where couples play a pass-and-play card game on a single device to discover their alignment across 6 relationship dimensions.

**Business Model:** 
- Round 1: Free (15 questions, basic insights)
- Round 2: $7.99 one-time unlock (15 personalized questions, deep analysis)
- No subscription, no recurring fees

**Target Users:** Dating/engaged couples (ages 22-35) seeking relationship self-awareness without therapy cost/commitment

---

## Core Experience

### Game Mechanics (Inspired by Memory Card Game)

**Setup:**
- Single device, pass-and-play between partners
- Partners enter names on landing page
- Begin with 15 face-down cards in 3×5 grid

**Gameplay Loop:**
1. Partner 1 taps any card → sees question with binary A/B choice → answers → card flips back face-down with indicator dot
2. Device shows "Pass to Partner 2"
3. Partner 2 taps same card → sees identical question → answers
4. Immediate reveal: Card stays face-up showing either "✓ MATCH" (green) or "? DIFFERENT" (yellow)
5. Turn returns to Partner 1, continues until all 15 cards revealed

**Key Design Principles:**
- Questions sound casual but reveal deep relationship patterns
- Binary choices only (no scales, no "maybe")
- Mismatches framed as "discoveries" not "failures"
- No back navigation during play
- Both partners present for all reveals

---

## Product Flow

### 1. Landing Page
- Product name: "The Relationship Memory Game"
- Headline: "Discover how in-sync you really are"
- Two text inputs: Partner 1 name, Partner 2 name (1-20 chars each, required, cannot be identical)
- CTA: "Start Game" (disabled until both names entered)
- Brief "How it works" (3 steps)
- Trust indicators: "Private • No signup required • Takes 10 minutes"

### 2. Round 1 Gameplay (Free)
- 15 questions covering 6 themes:
  - Conflict & Communication (3 questions)
  - Emotional Support (3 questions)
  - Daily Life & Logistics (3 questions)
  - Physical Intimacy (2 questions)
  - Future & Life Goals (2 questions)
  - Personal Growth (2 questions)

**Display:**
- Header shows current player turn: "🔵 [Name]'S TURN" or "🔴 [Name]'S TURN"
- Progress: "Card X of 15"
- Running score: "Matches: X/Y answered"
- 3×5 card grid (face-down → question state → match/mismatch state)

**Question Format Example:**
```
"When plans change last minute..."

A) I adapt pretty easily
B) I get stressed or frustrated

[Tap your answer]
```

### 3. Round 1 Results (Free)
**Display:**
- Large match score: "X out of 15"
- Score tier interpretation:
  - 13-15: "Exceptional Sync"
  - 10-12: "Solid Connection"
  - 7-9: "Room to Grow"
  - 4-6: "Different Wavelengths"
  - 0-3: "Time to Talk"
- High-level theme summary:
  ```
  You matched on:
  ✓ Daily habits
  ✓ Future goals
  
  You differed on:
  ⚠ Conflict resolution
  ⚠ Emotional support
  ```
- Show 1-2 example mismatches with brief insight

### 4. Paywall Screen
**Headline:** "Want to Go Deeper?"

**Value Prop:**
```
We've generated 15 personalized follow-up 
questions based on YOUR specific mismatches.

Based on your [X] mismatches, Round 2 includes:
🔴 [N] questions on Conflict patterns
🟡 [N] questions on Emotional Support
🔵 [N] questions on Daily Life
...
```

**Pricing:**
- "ROUND 2: DEEP DIVE"
- "One-time payment • No subscription"
- "$7.99"

**CTAs:**
- Primary: "Unlock Round 2 - $7.99" (prominent button)
- Secondary: "Maybe Later" (text link)

**If "Maybe Later":**
- Confirmation: "Are you sure? You can't return to these results without replaying."
- Options: "Yes, exit" / "No, unlock Round 2"

### 5. Payment Processing
- Integrate payment provider (Stripe recommended)
- Collect card details via hosted checkout
- On success: Auto-redirect to Round 2 gameplay
- On failure: Clear error message + retry option
- Store: session_id, payment_intent_id, amount (799 cents), timestamp

### 6. Round 2 Gameplay (Paid)
- Identical mechanics to Round 1
- 15 additional questions selected via personalization algorithm (see below)
- Progress indicator: "Round 2: Card X of 15"
- Visual differentiation: Slightly different card backs to signal "Round 2"

### 7. Final Results (After Round 2)
**Display:**
```
COMPLETE RESULTS

Round 1: X/15 matches
Round 2: Y/15 matches
TOTAL: [X+Y]/30 matches
```

**Visual Relationship Map:**
- Show 6 themes with match percentages
- Color-coded bars/chart (green: 80-100%, yellow: 50-79%, orange: <50%)

**Analysis Sections:**
1. **Alignment Strengths** (top 3 themes by match %)
2. **Growth Conversations** (bottom 3 themes by match %)

**For each growth theme, show:**
- 1-2 specific mismatches from both rounds
- "Why This Matters" (2-3 sentences)
- "Conversation Starter" (specific question to ask each other)
- "Next Step" (concrete action)

**Final CTAs:**
- Primary: "Start Over" (new free Round 1)
- Secondary: "Share Your Score" (generates shareable card)

### 8. Social Sharing (Optional)
- Generates static image (800×600px) with:
  - Match score visualization
  - "We got X/30 on the Relationship Memory Game"
  - Generic text (no specific mismatches)
  - Product logo + URL
- Download PNG or copy link options

---

## Round 2 Personalization Algorithm

**Goal:** Select 15 Round 2 questions from 6 theme pools (30 questions each) based on Round 1 mismatch distribution

**Input:** Count of mismatches per theme from Round 1

**Logic:**

**If 0 mismatches (perfect match):**
```
conflict: 3
support: 3
dailyLife: 2
intimacy: 3
future: 2
growth: 2
```

**If 1 theme has all mismatches:**
```
Primary theme: 7 questions
Adjacent theme 1: 3 questions
Adjacent theme 2: 3 questions
Random other theme: 2 questions

Adjacent mappings:
  conflict → [support, growth]
  support → [conflict, intimacy]
  dailyLife → [future, growth]
  intimacy → [support, conflict]
  future → [dailyLife, growth]
  growth → [conflict, future]
```

**If 2 themes have mismatches:**
```
Theme 1: 5 questions
Theme 2: 5 questions
Adjacent themes: Fill remaining 5 slots
```

**If 3-5 themes have mismatches:**
```
1. Allocate minimum 2 questions per theme with mismatches
2. Distribute remaining slots proportionally by mismatch count
3. Adjust for rounding to ensure exactly 15 total
```

**If all 6 themes have mismatches:**
```
Distribute 15 questions proportionally by mismatch weight
Ensure minimum 2 per theme
```

**Output:** Always exactly 15 question IDs to present in Round 2

---

## Content Requirements

### Round 1: 15 Questions

**Format:** All questions must have exactly 2 binary choices (A/B)

**Sample Questions:**

**Conflict (3):**
1. "When plans change last minute..." → A) I adapt easily / B) I get stressed
2. "If something's bothering me..." → A) I'll bring it up quickly / B) I need time to process
3. "When we disagree..." → A) We reach understanding / B) One tends to let it go

**Emotional Support (3):**
4. "After a busy day, I usually want to..." → A) Talk and connect / B) Decompress alone
5. "When I'm having a bad day..." → A) I want to talk about it / B) I want distraction or space
6. "I'd describe myself as..." → A) Usually optimistic / B) More realistic/cautious

**Daily Life (3):**
7. "On a typical weekend morning..." → A) Have a plan / B) Go with the flow
8. "When we have houseguests coming..." → A) Excited / B) Stressed by prep
9. "Household chores in our relationship..." → A) Pretty evenly split / B) One does more

**Intimacy (2):**
10. "Spontaneous affection..." → A) Happens naturally throughout day / B) Happens at specific times
11. "When it comes to making plans..." → A) We both initiate equally / B) One takes the lead

**Future (2):**
12. "Our big life goals..." → A) Feel very aligned / B) Still figuring some things out
13. "When I imagine us in 10 years..." → A) Excited and confident / B) Hopeful but uncertain

**Growth (2):**
14. "In this relationship, I feel like..." → A) I can fully be myself / B) I hold back sometimes
15. "Right now, our relationship is..." → A) In a really strong place / B) Going through ups and downs

### Round 2: 180 Questions Total

**Structure:** 30 questions per theme (6 themes × 30 = 180)

**Requirements:**
- Same binary A/B format
- Dig deeper than Round 1 questions
- Reveal patterns, not just preferences
- Non-judgmental (both answers valid)
- Reading level: 8th grade
- No gendered assumptions

**Sample Round 2 Questions:**

**Conflict Pool (examples from 30):**
- "When tensions are high..." → A) Want to resolve immediately / B) Need to cool down
- "During an argument, I tend to..." → A) Stay calm and logical / B) Get emotional and reactive
- "After we fight, I usually feel..." → A) Closer / B) Drained and need recovery

**Support Pool (examples from 30):**
- "When I tell you about my day..." → A) Want empathy / B) Want advice
- "When you're sad, I usually..." → A) Want to fix it / B) Want to just be present
- "I feel most connected when..." → A) Talking deeply / B) Doing things together

**[Continue for other 4 themes...]**

### Insight Copy

**Structure for each potential mismatch:**
```
WHY THIS MATTERS:
[2-3 sentences on psychological significance]

CONVERSATION STARTER:
"[Specific open-ended question for the couple]"

NEXT STEP:
[One concrete action they can take]
```

**Tone Guidelines:**
- Warm, non-judgmental
- Action-oriented, not diagnostic
- Normalize differences
- Avoid psychological jargon
- Frame mismatches as opportunities

---

## Technical Specifications

### Platform
- Web application
- Mobile-first, fully responsive (320px - 1920px+)
- Single-page application experience
- Works offline after initial load (optional)

### Key Requirements
- Pass-and-play on single device (no multi-device sync)
- Fast animations (card flips <300ms)
- Payment provider integration (specify and integrate later)
- Session-based (no login/accounts required for MVP)
- Data retention: 30 days, then auto-delete

### Data Storage Needs
**Session Data:**
- session_id (UUID)
- partner names
- All answers (round, question_id, theme, partner_1_answer, partner_2_answer, matched)
- Payment status (payment_intent_id, amount, timestamp)
- Round 2 allocation (question IDs selected)

**Analytics Events (aggregate only):**
- Round 1 starts/completions
- Paywall views
- Payment successes/failures
- Round 2 completions
- Share card generations

### Security/Privacy
- HTTPS required
- No PII collected beyond optional payment email
- Anonymous by default
- Payment data handled by provider (PCI compliant)
- Session IDs cryptographically random
- Privacy policy + terms of service pages required

---

## Design Guidelines

### Visual Style
- Clean, playful, modern (think Duolingo meets Hinge)
- Not clinical or corporate
- Warm, encouraging tone throughout
- Gamified visual language (progress bars, badges, animations)

### Color System
- Partner 1: Blue tones
- Partner 2: Red tones
- Matched cards: Green
- Mismatched cards: Yellow/Amber (NOT red - no negative connotation)
- Background: Light/white
- Text: Dark gray (good contrast)

### Key UI Components
**Cards:**
- Face-down: Gray, centered "?"
- Question state: White background, question text + 2 large A/B buttons
- Matched: Green, "✓ MATCH"
- Mismatched: Yellow, "? DIFFERENT"
- Border radius: 12px, subtle shadows

**Animations:**
- Card flips: 300ms smooth
- Success states: Brief micro-animations (confetti, pulse)
- Screen transitions: 400ms fades
- No jarring or slow animations

**Typography:**
- Clean sans-serif (Inter, System UI, or similar)
- Readable at 16px+ on mobile
- Good contrast ratios (4.5:1 minimum)

### Mobile-First
- Touch targets: 44×44px minimum
- Thumb-friendly button placement
- Card grid adapts to screen width
- Sticky header with player turn indicator
- No horizontal scrolling

---

## Success Metrics

### MVP Launch Criteria
- All gameplay flows functional
- Payment processing works (test mode)
- Mobile responsive on iOS Safari + Chrome
- Privacy policy + terms live
- Basic analytics tracking

### 30-Day Post-Launch Goals
- 60%+ Round 1 completion rate
- 20%+ paywall conversion rate
- 90%+ Round 2 completion rate (among payers)
- $2,000+ revenue (250 paying couples)
- <5% payment failure rate
- <2% critical bugs per session

---

## Out of Scope (MVP)

- User accounts/login
- Progress tracking over time
- Question replay variations
- Native mobile apps
- Therapist/counselor portal
- Multi-language support
- Advanced accessibility (beyond basic WCAG A)
- Social features (forums, commenting)
- AI-generated insights
- Video content

---

## Key User Flows Summary

**Happy Path (Free + Paid):**
Landing → Enter names → Round 1 (15 cards) → Results → Paywall → Payment → Round 2 (15 cards) → Final Results → Share/Exit

**Free-Only Path:**
Landing → Enter names → Round 1 → Results → Paywall → "Maybe Later" → Exit

**Payment Failure:**
[...through paywall...] → Payment fails → Error + Retry option → Success or Exit to paywall

---

## Notes for AI Builder

1. **Question Content:** The 15 Round 1 questions provided are complete. Round 2 requires 180 additional questions (30 per theme) following the same binary format and tone - generate these based on the samples and requirements provided.

2. **Personalization Logic:** The algorithm must always output exactly 15 questions for Round 2 regardless of mismatch distribution. Test edge cases (0 mismatches, 15 mismatches, all in one theme).

3. **Payment Integration:** Leave payment provider flexible. Recommend Stripe but allow for alternatives. Ensure proper webhook handling for async payment confirmation.

4. **Session Management:** No user accounts means session_id is the primary identifier. Sessions expire/delete after 30 days. Store minimal data.

5. **Responsive Design:** Prioritize mobile experience (375px iPhone SE as baseline). Desktop is secondary but must work.

6. **Animations:** Keep performant - use CSS transforms over position changes. Test on older mobile devices.

7. **Analytics:** Track funnel drop-off points to identify friction. Aggregate data only - no individual tracking beyond session_id.

8. **Tone Consistency:** Every piece of copy (questions, insights, UI text) should feel warm, non-judgmental, and growth-oriented. Avoid clinical language.

---

**END OF PRD**
