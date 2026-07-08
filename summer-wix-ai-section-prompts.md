# Summer Camp — Wix AI Section-Generator Playbook

Use the classic Editor's **Add → Section → Create with AI** (or "Generate with AI") for each section below.
**Workflow per section:** ① paste the **PROMPT** into Wix's AI section generator → ② once it generates, replace its text with the **COPY** → ③ apply the **FIX** (colors, image, button link).

> Wix's AI writes its own placeholder copy and picks stock images — always overwrite both. Set buttons/links by hand. Brand colors: green `#5B990A`, deep green `#46760A`, green tint `#EEF4E2`, cream `#FAF6EE`, ink `#26271F`, muted `#5E6157`, clay `#C8744E`, peach `#FBEDE3`.

---

## A. Hero
**PROMPT**
```
A full-width hero section about 540px tall with a background photo of young children playing outdoors. Add a dark gradient overlay from transparent at top to dark at the bottom so white text is readable. Bottom-left aligned content: a small pill-shaped label, a large serif headline, a short paragraph, and two pill buttons side by side.
```
**COPY**
- Pill: `Summer Camp 2026 · ages 2–5`
- Headline: `Sunny mornings in our own shaded playground.`
- Paragraph: `A warm, play-filled half-day camp in the heart of Deer Park — water days, music, French and outdoor adventures, one week at a time.`
- Button 1: `Reserve Your Weeks` · Button 2: `See what's included`

**FIX:** Set background to `summer-hero.jpg`. Pill + Button 1 = clay `#C8744E`. Button 2 = white. Link Button 1 → the Register section (anchor), Button 2 → the Included section. Headline font = Fraunces (serif).

---

## B. Essentials strip
**PROMPT**
```
A short horizontal strip divided into four equal columns with a solid warm terracotta background and white text. Each column has a small uppercase label on top and a short bold value below. Thin vertical dividers between columns.
```
**COPY** (label → value)
- `WHEN` → `June 15 – Sept 4, 2026`
- `TIME` → `9–12, Mon–Fri (free drop-off from 8:45)`
- `WHERE` → `Our private, shaded Deer Park playground`
- `WHO` → `Ages 2–5 · small groups`

**FIX:** Background = clay `#C8744E`. ⚠️ Confirm dates/times before publish.

---

## C. Intro
**PROMPT**
```
A two-column section on a cream background. Left column: a small uppercase eyebrow label, a large serif heading, and a paragraph. Right column: a single rounded-corner photo with a soft shadow.
```
**COPY**
- Eyebrow: `THE ORIOLE SUMMER`
- Heading: `We bring the classroom outside.`
- Paragraph: `Summer at Oriole is unhurried and joyful. Our educators take everything children love about the school year — play-based discovery, warm small groups, fresh weekly themes — and move it into our spacious, shaded playground. Think outdoor painting, building big structures, water play, music and movement, and plenty of room to just be a kid in the sunshine.`

**FIX:** Photo = `summer-intro.jpg`. Eyebrow color = clay.

---

## D. What's included
**PROMPT**
```
A section on a soft peach background with a centered heading and subtext, then a 3-column grid of 6 cards. Each card is white with rounded corners and has an icon at top, a bold title, and a short description. End with one centered bold line of text below the grid.
```
**COPY**
- Heading: `Everything a great summer morning needs.`
- Subtext: `No add-ons or hidden extras — every week includes all of this.`
- Cards (icon · title · description):
  - 🌳 `Our shaded playground` — `Hours of outdoor play in Oriole's private, spacious, shaded yard.`
  - 💧 `Weekly water days` — `Splash, pour and cool off — a favourite part of every week.`
  - 🎶 `Daily music & movement` — `Songs, dancing and active play built into every day.`
  - 🇫🇷 `Weekly French` — `A playful French class each week.`
  - 🍎 `A healthy snack` — `A nutritious, nut-safe snack and water fresh each day.`
  - 🎨 `Themes, art & building` — `Fresh weekly themes with outdoor painting and big structures.`
- Bottom line: `Snack · music & movement · weekly water days · weekly French — all in the weekly fee.`

**FIX:** Section bg = peach `#FBEDE3`, cards white. Bottom line color = clay.

---

## E. Weekly themes  ⚠️ (AI struggles here — see note)
**PROMPT**
```
A section on a light green background with a centered heading and subtext, then a grid of 11 small cards, 4 per row. Each card is white with rounded corners and shows one large emoji at top and a short bold label below it. A small centered note under the grid.
```
**COPY**
- Heading: `Eleven weeks, eleven adventures.`
- Subtext: `Each week brings a fresh theme woven through art, music, water play and outdoor discovery — so every visit feels new.`
- Cards (label · emoji):
  `Week 1 🐛 Insects` · `Week 2 🍂 Seasons & Holidays` · `Week 3 🎵 Music` · `Week 4 👨‍👩‍👧 Friends & Family` · `Week 5 🦕 Dinosaurs` · `Week 6 🌱 Food & Gardening` · `Week 7 🚂 Transportation` · `Week 8 ⛺ Camping` · `Week 9 ⚽ Sports` · `Week 10 🚀 Space` · `Week 11 🌊 Oceans`
- Note: `Themes and their order vary year to year — this is a sample of a typical Oriole summer.`

**FIX:** Section bg = green tint `#EEF4E2`, "Week n" labels in clay.
**If the AI makes a mess of 11 cards** (it did in the full-site test): instead build ONE card, then **right-click → Duplicate** 10× and edit each — or use **Add → List → Repeater**, design one card, set it to 11 items. Repeater is best for editing themes yearly.

---

## F. Gallery
**PROMPT**
```
A section on a cream background with a small centered heading, then a photo gallery: one large image on the left and four smaller images arranged in a grid beside it.
```
**COPY:** Heading `Summer days at Oriole.`
**FIX:** Or skip AI and use **Add → Gallery → Pro Gallery** (cleaner). Images in order: `summer-gallery-1-wide` (large), then `-2`, `-3-outdoor`, `-4`, `-5`.

---

## G. Fees
**PROMPT**
```
A section on a light green background with a centered heading and subtext, then two pricing cards side by side. Each card shows a large price, a plan name, and a short description. Below the cards, a centered row of pill-shaped tags.
```
**COPY**
- Heading: `Book by the week.` · Subtext: `Choose the weeks that fit your summer — no full-summer commitment required.`
- Card 1: `$325` / `per week` / `Standard week` / `Five mornings, Monday to Friday.`
- Card 2: `$265` / `per week` / `4-day weeks` / `Weeks with a holiday closure are priced for four days.`
- Pills: `✓ Complimentary early drop-off from 8:45am` · `✓ Snack, music, water days & French included` · `✓ Sibling-friendly`

**FIX:** Bg = green tint, prices in deep green `#46760A`. ⚠️ Confirm 2026 pricing.

---

## H. How to register
**PROMPT**
```
A section on a cream background with a centered heading, then three numbered steps in a row. Each step has a large number, a bold title, and a short description.
```
**COPY**
- Heading: `Reserve your weeks in three steps.`
- 01 `Choose your weeks` — `Pick the weeks that work for your family between June 15 and September 4.`
- 02 `Complete the forms` — `New families fill out two short forms plus medical & immunization info.`
- 03 `Confirm & pay` — `Pay by PayPal, cheque or e-transfer. Immunization records confirm your spot.`

**FIX:** Big numbers in clay. Give this section an **anchor** named `register` and link the hero's "Reserve" button to it.

---

## I. Lead form  → use the Wix Forms app (not AI)
The AI generator won't wire a real form. Instead: **Add → Contact & Forms → Form**, then place it in a peach card with text beside it.
**COPY (left side):**
- Eyebrow: `GET MORE INFO` · Heading: `Questions about summer camp?`
- Body: `Leave your details and we'll send the full week-by-week schedule and answer anything you're wondering about.`
- Submit button label: `Send me the summer schedule`

**Form fields (all required):** First name (text) · Child's age (dropdown: 2 / 3 / 4 / 5 years) · Email · Phone.
**FIX:** Card bg = peach, submit button = clay. **Set form submissions to tag the lead `source = Summer Camp page`** so it feeds the pipeline. (I can help set the automation/confirmation email after.)

---

## J. Closing band
**PROMPT**
```
A centered call-to-action banner with a warm terracotta gradient background and white text: a serif heading, one line of supporting text, and a pill button. Rounded corners, generous padding.
```
**COPY**
- Heading: `Make it an Oriole summer.`
- Text: `Weeks are limited and fill with our returning families — reserve yours for Summer 2026.`
- Button: `Reserve Your Weeks` → link to the Register anchor.

**FIX:** Clay gradient `#C8744E → #A85A37`, white text, white button.

---

## After the page is built — tell me and I'll do the data side via API
- Wire the form into the enrollment pipeline (`source = Summer Camp page`, capture child's age).
- Add the confirmation email + Summer nurture automation.
- Optionally load the 11 themes into a CMS collection to drive a data-bound repeater (yearly edits = a spreadsheet change).
