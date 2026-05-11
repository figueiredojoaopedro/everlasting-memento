<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# Everlasting Mementos (MVP - Execution Spec)

## 1. Core Goal

Ship a **mobile-first MVP** that allows users to:

- Create a memento in under 1 minute
- Add emotional memories (photo + meaning)
- Share a beautiful, private timeline

No overengineering. No unnecessary features.

---

## 2. Product Flow (Critical Path)

1. User lands on landing page
2. Clicks **Create your memento**
3. Creates memento (≤ 60 seconds)
4. Registers (email+password, upgrades from anonymous)
5. Chooses plan (Weekly R$18.90 / Yearly R$29.90)
6. Pays via AbacatePay (PIX or Card)
7. Lands on dashboard with active plan
8. Adds at least 1 memory
9. Shares the page

If this flow breaks → product fails

---

## 3. Pages & Routes

- `/` → Landing
- `/create` → Create memento
- `/register?mementoId=` → Register (email+password, upgrade from anonymous)
- `/plans?mementoId=` → Choose plan (Weekly R$18.90 / Yearly R$29.90)
- `/m/[id]` → Dashboard (private, shows plan status / expiration)
- `/m/[id]/new` → Add memory
- `/view/[id]` → Public share page

---

## 4. Landing Page

### Copy

Hero:
"Your memories, preserved forever."

Subtext:
"Create a private space for your most meaningful moments."

CTA:
"Create your memento"

### Visual Direction

- Background: `#FAF7F2`
- Soft, emotional imagery (blurred couple / memory)
- Clean layout
- Large spacing

---

## 5. Create Memento (Onboarding)

### Goal

Create something meaningful in < 1 minute

### Fields

- Title (default: "Our Story")
- Date (optional)
- Cover image (upload → Firebase Storage)
- Who is this for? (optional)

### CTA

"Create my space"

---

## 6. Dashboard (Core Experience)

### Layout

Top:

- Cover image
- Title

Below:

- Timeline of memories

### Memory Card

- Photo
- Short text
- Date
- "Why is this meaningful?" (key differentiator)

### CTA

- Add Memory

### Product Direction

Instagram feel → but slower, calmer, emotional

---

## 7. Add Memory Flow

### Goal

Make it feel emotional, not like a form

### Fields

- Photo upload (Firebase Storage)
- Title (optional)
- Description
- Date
- Why is this meaningful?

### CTA

"Save memory"

---

## 8. Share Page (Growth Engine)

### Features

- Clean public link
- Read-only timeline
- Optional password protection (post-MVP if needed)

### CTA

"Share with someone"

This is NOT secondary → this drives growth

---

## 9. Tech Stack

### Frontend

- Next.js (App Router)
- Tailwind CSS
- shadcn/ui

### Backend

- Firebase
  - Firestore
  - Firebase Storage
  - Firebase Auth

### Payments

- AbacatePay (PIX + Card)
- Two one-time plans: Weekly (R$18.90) and Yearly (R$29.90)

---

## 10. File Structure

```
everlasting-mementos/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── create/page.tsx
│   ├── register/page.tsx
│   ├── plans/page.tsx
│   ├── m/[id]/page.tsx
│   ├── m/[id]/new/page.tsx
│   ├── view/[id]/page.tsx
│   └── api/
│       ├── checkout/route.ts
│       └── webhooks/abacatepay/route.ts
│
├── components/
├── lib/
│   ├── firebase.ts
│   ├── firebase-admin.ts
│   └── abacatepay.ts
├── hooks/
├── types/
```

---

## 11. Data Model

### Memento

- id
- userId
- title
- coverImageUrl
- date
- createdAt
- expiresAt (timestamp, set after payment)
- plan (null | "weekly" | "yearly")

### Memory

- id
- mementoId
- imageUrl
- title
- description
- meaning
- date
- createdAt

---

## 12. Firebase Rules (Important)

- Users can only write to their own mementos
- Public pages only expose read-only data
- Images stored with secure paths

---

## 13. UI System (Strict)

### Colors

- Primary: `#E8A9A9`
- Secondary: `#F2E6D8`
- Background: `#FAF7F2`
- Text Primary: `#2B2B2B`
- Text Secondary: `#6B6B6B`
- Accent: `#D98C8C`
- Border: `#EDE3D7`

### Principles

- Mobile-first ALWAYS
- Large spacing
- Soft shadows
- No clutter

---

## 14. What NOT to Build (Now)

- Video upload
- AI generation
- Collaboration
- Complex themes
- Notifications

These will kill your speed

---

## 15. Execution Plan (Realistic)

### 1

- Firebase setup
- Auth
- Create memento

### 2

- Image upload (Storage)
- Add memory flow

### 3

- Timeline UI
- Public page

### 4

- Registration flow (email+password, link anonymous)
- AbacatePay integration (checkout, products, webhooks)
- Plan selection + payment flow
- Expiration logic on dashboard

---

## 16. Success Metric

- User creates memento
- Adds ≥ 1 memory
- Shares link

If users don’t share → product isn’t emotional enough

---

## 17. Final Principle

Speed > perfection

If you hesitate adding something → don’t build it.

### Commit Discipline

After every feature or meaningful change, commit. Do not wait until the end of the day. This keeps the log clean and prevents loss of work. The user forgets to do this — you must not.

## 18. Mockup Page (`/mockup`)

### Purpose
Preview/demo page showing what a finished memento looks like, inspired by the LovePanda demo design.

### Design Reference
- Layout inspired by `demo/Veja como seu presente vai ficar _ LovePanda _ Lovepanda.html`
- **Dark theme**: background `#121212`, white text with varying opacities

### Structure
1. **Hero** — Full-screen cover image with parallax, couple names overlay, "A love story" badge, relationship date
2. **Audio Player** — Voice note card with play/pause, waveform visualization (CSS bars), progress bar, duration
3. **Time Together Counter** — Card showing years/months and total days together
3. **Memories Timeline** — Large rounded images (`rounded-[2rem]`), date, title, description, "Why it's meaningful" section
4. **Letter Section** — Romantic prose text in a bordered card
5. **CTA** — "Start your memento" button linking to `/create`

### Colors
- Background: `#121212`
- Primary accent: `#E8A9A9`
- Card backgrounds: `bg-white/[0.03]` to `bg-white/5`
- Borders: `border-white/[0.06]` to `border-white/[0.08]`

### Known Pitfalls (Lessons Learned)

#### Hydration: locale mismatch
**Problem:** Server renders ptBR (no `window`), client renders user's locale → hydration error ("março 15, 2024" vs "March 15, 2024").
**Fix:** `useLocale()` hook — `useState(ptBR)` as initial (matches server), `useEffect` switches to `getUserLocale()` after hydration.

#### Hydration: AudioPlayer waveform floating point
**Problem:** `Math.sin()` produces floats like `9.371906848114229`, server serializes as `9.37191`. Client sees mismatch.
**Fix:** `Math.round()` all computed heights so both environments produce identical integers.

#### Hydration: rgba spacing in inline styles
**Problem:** Server serializes `rgba(255,255,255,0.15)` as CSS `rgba(255, 255, 255, 0.15)` (spaces). Client keeps the JS object format.
**Fix:** Write rgba strings with spaces (`rgba(255, 255, 255, 0.15)`) in the JSX style object. (Note: camelCase vs kebab-case mismatch is harmless — React ignores it for style attrs.)

#### Avoid `setState` synchronously inside `useEffect`
**Problem:** Calling `setIsPlaying(true)` directly in the effect body triggers cascading renders warning.
**Fix:** Initialize state with the desired value instead: `useState(autoPlay && !src)`. Only call `setState` inside callbacks (interval tick, `.then()`, event listeners).

#### Avoid inline `<style>` tags in JSX
**Problem:** Turbopack can hang on inline `<style>` tags inside React fragments.
**Fix:** Move keyframes to a `<style jsx>` tag, a CSS module, or use Tailwind utilities instead.

#### Static files must be in `public/`
**Problem:** Files outside `public/` return 404 (Next.js only serves from `public/`).
**Fix:** Place audio files, images, etc. under `public/`. Reference at root URL path: `/audios-samples/file.wav` (not `./@/audios-samples/...`).

#### `setInterval` return type
**Problem:** `useRef<number | null>` doesn't match `setInterval` return (`NodeJS.Timeout` in Node, `number` in browser).
**Fix:** Use `useRef<ReturnType<typeof setInterval> | null>(null)` — resolves to the correct union type.

#### Use `<Image>` from `next/image` instead of `<img>`
**Problem:** `<img>` triggers `no-img-element` warning, slower LCP, no optimization.
**Fix:** Replace with `<Image>` (import from `next/image`), add `fill` + `sizes` for responsive images, `priority` for above-the-fold.

## 19. Landing Page Section Order

The landing page (`app/page.tsx`) sections flow in this order:

1. `HeroSection`
2. `MementoSection` — Phone mockup + "A digital memory space" copy
3. `PrivacyGateSection` — Access control: password / email whitelist
4. `WhyNotSocialMedia` — Comparison table vs social media
5. `FeatureGrid` — 3-column feature cards
6. `ShowcaseCarousel`
7. `FooterSection`

## 20. PhoneMockup Component

**File:** `components/PhoneMockup.tsx`
**Client component:** Yes (`"use client"`)

### iPhone 17-like Design
- **Outer frame:** `rounded-[50px]`, `bg-zinc-800`, titanium shadow
- **Screen inset:** `inset-[8px]`, `rounded-[42px]`, `bg-[#121212]`
- **Aspect ratio:** `393/852` (iPhone Pro proportions)
- **Dynamic Island:** Centered black pill `w-[76px] h-[25px]`, `top-[8px]` 
- **Status bar:** `9:41` left, signal bars + battery right, `pt-[8px] px-5`
- **Home indicator:** Bottom `w-[120px] h-[4px] bg-white/30 rounded-full`

### Scroll Behavior
- Scroll container uses `absolute inset-0` (fills screen area)
- `overflow-y-auto` with hidden scrollbar (`scrollbarWidth: "none"`)
- `overscrollBehavior: "contain"` — prevents scroll propagation to the page
- `touchAction: "pan-y"` — ensures touch scrolling works
- All overlays (dynamic island, status bar, home indicator) use `pointer-events-none`

### Width
- `w-64 sm:w-80` (256px mobile, 320px desktop)

## 21. MockupContent Component

**File:** `components/MockupContent.tsx`
**Client component:** Yes (`"use client"`)
**Props:**
- `scrollY?: number` — when provided by parent (PhoneMockup), uses container scroll instead of window scroll
- `isCompact?: boolean` — when `true`, uses smaller font sizes and tighter spacing for phone display

### Compact Mode Sizes (isCompact = true)

| Element | Normal | Compact |
|---------|--------|---------|
| Hero title | `text-5xl md:text-7xl` | `text-2xl` |
| Section titles | `text-3xl md:text-4xl` | `text-xl` |
| Card padding | `p-8 md:p-10` | `p-5` |
| Card border radius | `rounded-[2rem]` | `rounded-2xl` |
| Time together number | `text-4xl md:text-5xl` | `text-2xl` |
| Description text | `text-sm` | `text-xs` |
| Letter text | `text-sm md:text-base` | `text-xs` |
| CTA button | `px-10 py-4` | `px-6 py-2.5` |
| Section vertical spacing | `py-20 md:py-28` | `py-12` |
| Section horizontal padding | `px-6` | `px-4` |

### Scroll Handling
- When `scrollY` prop is `undefined` (standalone `/mockup` page): listens to `window.scrollY`
- When `scrollY` is provided (inside PhoneMockup): parent manages scroll position
- Hero image parallax: `transform: scale(${1 + scrollY * 0.0005})`

### AudioPlayer + Time Together
- Both cards use `h-full` + `flex flex-col items-center justify-center` to ensure matching heights
- Parent uses `items-stretch` for equal height in row layout

## 22. Privacy Gate Section

**File:** `components/sections/PrivacyGateSection.tsx`
**Server component**

### Feature Spec
- Admin sets either a **password** or an **email whitelist** to protect the memento
- Visitors see a gate/popup asking for email or password
- **No content renders** until the visitor passes the gate
- Unlike a private YouTube link or hidden Instagram account, unauthenticated visitors see absolutely nothing

### Two Modes
1. **Password protection:** Single password for the memento. Anyone with the link + password can view it.
2. **Email whitelist:** Admin creates a list of approved emails. Only those emails can access the memento.

### UI
- Two side-by-side cards (stacked on mobile) showing password input and email input previews
- Bottom callout box with `EyeOff` icon explaining "No content leaks"

## 23. "Why Not Social Media?" Section

**File:** `components/sections/WhyNotSocialMedia.tsx`
**Server component**

### Positioning
This section establishes Everlasting as the emotional alternative to social media. It is NOT competing with Google Photos technically — it competes emotionally against Instagram, camera roll chaos, and forgotten memories.

### Comparison Table

| Everlasting | Social Media |
|-------------|-------------|
| Private by default | Public by default |
| Made for memories | Made for attention |
| Calm & timeless | Fast & disposable |
| No ads, no algorithms | Algorithm driven |
| Emotional storytelling | Endless scrolling |

### UI
- Desktop: 3-column grid (Everlasting | divider | Social Media) with rows per comparison point, each with an icon
- Mobile: Stacked cards, each showing our value with icon top, theirs indented below with a divider line
- Bottom tagline: "You don't need another social network. You need a place where the moments that matter can breathe."

## 24. Known Pitfalls (Continued)

#### PhoneMockup scroll container sizing
**Problem:** `h-full` on the scroll container inside an `aspect-ratio` parent doesn't always resolve correctly.
**Fix:** Use `absolute inset-0` on the scroll container instead of `height: 100%`.

#### Dynamic Island overlapping status bar
**Problem:** The status bar text and the dynamic island can overlap on narrow phone widths.
**Fix:** Keep the dynamic island as `z-20` and status bar as `z-30` (higher priority). Use `pointer-events-none` on both so clicks pass through to content.

#### Content overflow inside phone
**Problem:** Content inside the phone must be tall enough to create scrollable overflow. The hero uses `min-h-[100dvh]` which equals the viewport height (much taller than the ~500px phone container).
**Fix:** The hero section at 100dvh alone creates sufficient overflow. Combine with `min-h-full` on the wrapper (removed in favor of natural content flow) and `overscroll-behavior: contain` to prevent scroll chaining.

## 25. Screenshots folder

There are images for you to get based on what to do in the screenshots folder.
now it has the mobile first sketch and the flow of the user in the app.
