# Summer Camp — Wix Studio Build Spec

**Goal:** Recreate the `summer.html` mockup as a *native* page on the Oriole Nursery **classic Wix Editor** site (`d73cfbfb-d640-427a-ba5c-481c8b627def`, live at oriolenurseryschool.com).
**Why native (not embed):** SEO, mobile control, an editable page for the next volunteer, and a form that feeds the enrollment pipeline.

### How to use this
This page is built **by hand in the classic Wix Editor** — there's no API that designs editor pages. The workflow:
1. You open the Editor (Dashboard → **Edit Site**).
2. Go section by section below. Each section says which **Add-panel element** to drop in, how to style it, and gives a **COPY** block to paste verbatim.
3. Ping me at any step ("stuck on the themes repeater", "form won't save") and I'll talk you through it.

> **Classic Editor orientation:** Build sections with **Add → Section** (or **Add → Strip** on older editors). Colors/fonts live under **Site Design → Edit Site Theme** (colors) and **Text Themes**. The lead form uses the **Wix Forms** app. Mobile is tuned in the separate **Mobile view** (phone icon, top bar).

Work top to bottom. Everything you need to type is in the **COPY** blocks — paste them verbatim.

---

## 0. Before you start — upload the images

Drag these 7 files from `mockup/wix-upload/` into **Media Manager** (Site Files). Suggested alt text is for SEO + accessibility — paste it into each image's "Alt text" field.

| File | Used in | Alt text |
|---|---|---|
| `summer-hero.jpg` | Hero background | Children playing outside at Oriole Nursery School summer camp in Deer Park, Toronto |
| `summer-intro.jpg` | "We bring the classroom outside" | Preschoolers doing outdoor play activities at Oriole summer camp |
| `summer-gallery-1-wide.jpg` | Gallery (large) | Group of young children at Oriole summer camp |
| `summer-gallery-2.jpg` | Gallery | Toddlers at water play during Oriole summer camp |
| `summer-gallery-3-outdoor.jpg` | Gallery | Educator and children outdoors at Oriole |
| `summer-gallery-4.jpg` | Gallery | Children doing summer art activities |
| `summer-gallery-5.jpg` | Gallery | Oriole's shaded private playground |

> The logo is already on your site — reuse the existing header/footer logo. The hero photo is the most important one; pick your strongest sunny outdoor shot if you want to swap it.

---

## 1. Page setup

1. **Pages panel → + Add Page → Blank page.** Name it **Summer Camp**.
2. **Page Settings → URL slug:** `summer-camp`
3. **SEO (Page Settings → SEO basics):**
   - **Title tag:** `Summer Camp in Deer Park, Toronto | Oriole Nursery School`
   - **Meta description:** `A warm, play-filled half-day summer camp for ages 2–5 in Deer Park, Toronto. Water days, music, French and outdoor adventures — booked by the week.`
4. Add **Summer Camp** to the site's main menu (between Programs and How to Enrol, to match the mockup nav).

---

## 2. Global design tokens

Set these once in **Site Design → Edit Site Theme** so the page matches the mockup and stays consistent. (Add the hexes to your theme's color palette; pick the closest theme text styles for Fraunces/Inter.)

### Colors (add to your Site Theme palette)
| Token | Hex | Use |
|---|---|---|
| Green (primary) | `#5B990A` | Primary buttons, accents |
| Green deep | `#46760A` | Button hover, headings on tint |
| Green tint | `#EEF4E2` | Section background (themes, fees) |
| Cream | `#FAF6EE` | Page background |
| Ink | `#26271F` | Body text / dark footer |
| Muted | `#5E6157` | Secondary text |
| Clay (accent) | `#C8744E` | Eyebrows, "Reserve" CTA, essentials strip |
| Peach | `#FBEDE3` | Card backgrounds (included, lead form) |

### Fonts (Site Text Theme)
- **Headings:** Fraunces (add via Wix fonts / upload). Weight 500, tight letter-spacing (-1%).
- **Body:** Inter. Weight 400; buttons/labels 600.
- Heading scale roughly: H1 clamp ~37–64px, H2 ~30–42px, H3 ~17–19px.

### Buttons (set 3 button styles)
- **Primary (green):** bg `#5B990A`, text white, radius 100px (full pill), hover `#46760A`.
- **Clay / "Reserve":** bg `#C8744E`, text white, radius 100px, hover `#B1623F`.
- **Light:** bg white, text ink, radius 100px.

### Section rhythm
- Section vertical padding ≈ 72px desktop / 54px mobile.
- Content max width ≈ 1180px, side padding 28px.
- Card radius 18px; soft shadow on hover.

---

## 3. Header (reuse existing)

Keep the site's existing sticky header. Make sure the nav has a **Summer Camp** link (active state in clay `#C8744E`).
Right side: a small "Now booking · 2026" badge (clay text on peach pill) + a clay **Reserve Your Weeks** button linking to the `#register` section.

---

## 4. Section-by-section

### A. HERO  (full-width image section, ~540px tall)
- **Background:** `summer-hero.jpg`, full-bleed cover.
- **Overlay:** dark gradient bottom→top (so text is legible). Roughly `rgba(40,30,10,0.72)` at bottom fading to ~10% at top.
- **Content (bottom-left aligned, white text):**

**COPY**
```
[Pill badge, clay] Summer Camp 2026 · ages 2–5

[H1] Sunny mornings in our own shaded playground.

[Subtext] A warm, play-filled half-day camp in the heart of Deer Park —
water days, music, French and outdoor adventures, one week at a time.

[Button — Clay] Reserve Your Weeks   → links to #register
[Button — Light] See what's included →   → links to #included
```

---

### B. ESSENTIALS STRIP  (clay background `#C8744E`, white text)
4 equal columns, thin dividers between. On mobile → 2×2.

**COPY**
```
WHEN      June 15 – Sept 4, 2026
TIME      9–12, Mon–Fri  (free drop-off from 8:45)
WHERE     Our private, shaded Deer Park playground
WHO       Ages 2–5 · small groups
```
(Small uppercase label on top, Fraunces value below.)

> ⚠️ **Confirm these dates/times before publishing** — they're from the mockup, not verified for 2026.

---

### C. INTRO  (two columns: text left, image right)
- **Image:** `summer-intro.jpg` (rounded, soft shadow, ~5:4).

**COPY**
```
[Eyebrow, clay] THE ORIOLE SUMMER
[H2] We bring the classroom outside.
[Lead paragraph]
Summer at Oriole is unhurried and joyful. Our educators take everything
children love about the school year — play-based discovery, warm small
groups, fresh weekly themes — and move it into our spacious, shaded
playground. Think outdoor painting, building big structures, water play,
music and movement, and plenty of room to just be a kid in the sunshine.
```

---

### D. INCLUDED  (peach background `#FBEDE3`)
Section head + a **3-column grid of 6 cards** (white cards, peach icon chip). Mobile → 1 column.

**Section head COPY**
```
[Eyebrow] ALL INCLUDED IN YOUR WEEK
[H2] Everything a great summer morning needs.
[Sub] No add-ons or hidden extras — every week includes all of this.
```

**6 cards (icon · title · text):**
```
🌳  Our shaded playground   — Hours of outdoor play in Oriole's private, spacious, shaded yard — the heart of camp.
💧  Weekly water days       — Splash, pour and cool off — a favourite part of every camp week.
🎶  Daily music & movement  — Songs, dancing and active play built into every single day.
🇫🇷  Weekly French           — A playful French class each week, the same enrichment our school-year families love.
🍎  A healthy snack         — A nutritious snack and water provided fresh each day — nut-safe, like always.
🎨  Themes, art & building  — Fresh weekly themes with outdoor painting, building big structures and hands-on discovery.
```

**Footer line (centered, clay, bold):**
```
Snack · music & movement · weekly water days · weekly French — all in the weekly fee.
```

---

### E. WEEKLY THEMES  (green-tint background `#EEF4E2`)  ← the new section you asked for
Best built as a **Repeater** (1 dataset, 1 card design, 11 items). Card = white, rounded; top: clay "WEEK n" label; middle: large emoji; bottom: theme name. Layout 4 across desktop → 2 across mobile.

**Section head COPY**
```
[Eyebrow] A NEW THEME EVERY WEEK
[H2] Eleven weeks, eleven adventures.
[Sub] Each week brings a fresh theme woven through art, music, water play
and outdoor discovery — so every visit feels new.
```

**Repeater dataset (Week · Emoji · Theme):**
```
Week 1   🐛   Insects
Week 2   🍂   Seasons & Holidays
Week 3   🎵   Music
Week 4   👨‍👩‍👧   Friends & Family
Week 5   🦕   Dinosaurs
Week 6   🌱   Food & Gardening
Week 7   🚂   Transportation
Week 8   ⛺   Camping
Week 9   ⚽   Sports
Week 10  🚀   Space
Week 11  🌊   Oceans
```

**Footer line (centered, muted):**
```
Themes and their order vary year to year — this is a sample of a typical Oriole summer.
```

> **Tip:** A repeater means future you can re-order or rename themes each year without touching layout. If you prefer, a static 4-column grid of 11 boxes works too — just more manual to edit later.

---

### F. GALLERY  (cream background)
Section head + a 5-image grid. Mockup layout: 1 large image (left, tall) + 4 square images. Mobile → 2 across, large image full width.

**Section head COPY**
```
[Eyebrow] A LOOK AT CAMP
[H2] Summer days at Oriole.
```
Images, in order: `summer-gallery-1-wide.jpg` (large), then `summer-gallery-2`, `summer-gallery-3-outdoor`, `summer-gallery-4`, `summer-gallery-5`.

---

### G. FEES  (green-tint background `#EEF4E2`)
Section head + **2 price cards** + a row of "included" pills.

**Section head COPY**
```
[Eyebrow] SIMPLE WEEKLY PRICING
[H2] Book by the week.
[Sub] Choose the weeks that fit your summer — no full-summer commitment required.
```

**Card 1**
```
$325  / per week
Standard week
Five mornings, Monday to Friday.
```
**Card 2**
```
$265  / per week
4-day weeks
Weeks with a holiday closure are priced for four days.
```
**Pills row (centered):**
```
✓ Complimentary early drop-off from 8:45am
✓ Snack, music, water days & French included
✓ Sibling-friendly
```

> ⚠️ **Confirm 2026 pricing before publishing** — placeholder figures from the mockup.

---

### H. REGISTER / DETAILS  (cream)  — anchor id: `register`
Section head + **3 numbered steps** + a 4-up facts strip.

**Section head COPY**
```
[Eyebrow] HOW TO REGISTER
[H2] Reserve your weeks in three steps.
```
**3 steps (big "01/02/03" in clay, Fraunces):**
```
01  Choose your weeks   — Pick the weeks that work for your family between June 15 and September 4.
02  Complete the forms  — New families fill out two short forms plus medical & immunization info.
03  Confirm & pay       — Pay by PayPal, cheque or e-transfer. Immunization records confirm your spot.
```
**Facts strip (4 small cards):**
```
Ages 2–5            Small weekly groups
1:5 ratio           Max 15 children per week
9am–12pm            Free drop-off from 8:45
Independent on stairs   Able to navigate playground inclines
```

> ⚠️ Confirm ratio, max group size, and payment methods for 2026.

---

### I. LEAD FORM  (white section, peach card)  ← wire this to your pipeline
Two columns: text left, **Wix Form** right.

**Left COPY**
```
[Eyebrow] GET MORE INFO
[H2] Questions about summer camp?
[Body] Leave your details and we'll send the full week-by-week schedule
and answer anything you're wondering about.
```

**Form fields (all required, red asterisk — matches your per-class form pattern):**
| Field | Type | Notes |
|---|---|---|
| First name | Text | required |
| Child's age | Dropdown | 2 / 3 / 4 / 5 years, required |
| Email | Email | required |
| Phone | Phone | required |
| **Submit button** | — | label: **Send me the summer schedule** (clay button) |

**Pipeline wiring (this is the part the API *can* help with later):**
- Set the form submission to create/route a **lead** into your enrollment pipeline with **source = "Summer Camp page"** and the child's age captured.
- Add an automation: on submit → confirmation email + add to the Summer nurture flow.
- This matches the locked plan (free low-friction step before the paid application). I can set up the CMS collection / lead fields via the Wix API once the form exists — just say the word.

---

### J. CLOSING BAND  (clay gradient card, white text, centered)

**COPY**
```
[H2] Make it an Oriole summer.
[Body] Weeks are limited and fill with our returning families —
reserve yours for Summer 2026.
[Button — Light] Reserve Your Weeks   → #register
[Button — Outline white] Ask a Question   → #lead form
```

---

## 5. Footer
Reuse the existing site footer. Make sure "Summer Camp" appears under the **Programs** column.

---

## 6. Responsive checklist (mobile)
Switch to **Mobile view** (phone icon in the top bar) and check top to bottom. The classic Editor keeps desktop/mobile linked for content but lets you resize/hide/reorder per device.
- Essentials strip → stack to 2×2.
- Included grid, steps, fee cards, lead-form card → 1 column.
- Theme grid → 2 across.
- Gallery → 2 across; large image spans full width.
- Tighten vertical spacing (use the **mobile spacing / hide element** tools).
- The mobile menu (hamburger) is automatic — just confirm "Summer Camp" is in it.

---

## 7. Before you publish — verify these (flagged in the mockup as placeholder)
- [ ] Camp **dates** (June 15 – Sept 4, 2026) and **hours** (9–12)
- [ ] **Pricing** ($325 / $265)
- [ ] **Ratio / max group size** (1:5, max 15)
- [ ] **Payment methods** (PayPal / cheque / e-transfer)
- [ ] **French & snack** claims still accurate for summer
- [ ] Hero + gallery photos are the ones you want public
- [ ] Lead form routes into the pipeline and sends a confirmation

---

## What I can still do via the API once the page exists
- Create the **Summer Camp lead** data collection / fields and wire the form submission to your pipeline.
- Set up the **automation/nurture** trigger on submit.
- Bulk-load the **11 themes** into a CMS collection if you want the repeater data-driven (so yearly edits are a spreadsheet change, not a design change).

Just tell me when the page skeleton is up and I'll do the data layer.
