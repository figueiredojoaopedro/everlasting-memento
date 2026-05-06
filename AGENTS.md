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

## 18. Screenshots folder

There are images for you to get based on what to do in the screenshots folder.
now it has the mobile first sketch and the flow of the user in the app.
