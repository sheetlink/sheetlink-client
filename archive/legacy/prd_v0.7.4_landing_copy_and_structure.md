# SheetLink PRD v0.7.4 – Landing Copy, Docs, Privacy, and Sandbox Alignment

Goal:
Bring all public facing pages in the `landing` app back into alignment with the current SheetLink brand and product strategy:

- Builder-first, spreadsheet-native, privacy-first.
- Clear focus on Plaid Sandbox and beta.
- No em dashes, no old brand names, no generic boilerplate.
- Pages act as a cohesive system: Landing → Sandbox → Docs → Privacy → Beta.

This PRD is **copy and structure authoritative**, even if existing files nominally “work.”

Scope:
- /landing/src/pages/index.tsx (hero and CTAs)
- /landing/src/components/HeroComingSoon.tsx (or equivalent hero component)
- /landing/src/pages/privacy.tsx
- /landing/src/pages/docs.tsx
- /landing/src/pages/sandbox.tsx (create or rebuild)
- /landing/public/screenshots/sandbox-setup.png (asset wiring)
- Global: remove em dashes in landing pages

Do not change:
- Welcome page behavior (/welcome.tsx)
- Beta page behavior (/beta.tsx) other than linking
- Backend API behavior (already correct for /api/beta-signup)

---

## 1. Global Content & Tone Rules

### Claude Action: enforce tone, no em dashes, no old names

1. Across `landing/src/pages/**/*.tsx` and `landing/src/components/**/*.tsx`:
   - **No em dashes (`—`)**. Replace with:
     - A period, comma, or vertical bar (`|`) depending on context.
   - Update SEO titles like:
     - `"Privacy Policy — ${BRAND.name}"` → `"Privacy Policy | ${BRAND.name}"`
     - `"Documentation — ${BRAND.name}"` → `"Documentation | ${BRAND.name}"`

2. Tone guidelines:
   - Builder-friendly, straightforward, specific.
   - Emphasize:
     - “Forget dashboards. Feed your spreadsheet.”
     - “SheetLink is a thin pipe from Plaid to your sheet, not a data warehouse.”
     - Privacy as a product property, not a marketing buzzword.
   - Avoid generic privacy clichés like “We care deeply about your privacy” without concrete details.

3. No old product names:
   - Remove or replace any mentions of FinSync, OpenSheet, OpenSync, etc. with “SheetLink”.

---

## 2. Landing Hero (/ and Hero component)

Files:
- `landing/src/pages/index.tsx`
- `landing/src/components/HeroComingSoon.tsx` (or whichever hero component is used on `/`)

### Claude Action: Update hero copy and CTAs

**Rebuild instruction:**
Even if the structure is similar, update the hero content to:

- H1:
  - `Forget dashboards. Feed your spreadsheet.`
- Subhead:
  - `SheetLink connects your bank to Google Sheets. Live, private, and under your control.`
- CTAs:
  - Primary button: `Try the sandbox` → links to `/sandbox`
  - Secondary button: `Join the beta` → links to `/beta`

**Replace criteria:**
- Replace any H1 like `"Your bank. Your sheet. Coming soon."` with the new H1 above.
- Replace subhead like:
  - `"SheetLink connects your bank to Google Sheets — live, private, and yours forever."`
  with:
  - `"SheetLink connects your bank to Google Sheets. Live, private, and under your control."`
- Remove or deprecate the inline email form in the hero that posts to `/api/subscribe`:
  - The hero should not contain its own submission handler; it should send users to `/beta` instead.

**Final desired hero behavior:**
- `/` loads:
  - H1 + subhead as per above.
  - Two buttons:
    - Primary: `/sandbox`
    - Secondary: `/beta`
- If a latent “coming soon” label exists, remove or minimize it. Product is now “beta” and “sandbox-first,” not “coming soon.”

**Verification:**
- Visit `http://localhost:3000/`:
  - Confirm H1 and subhead exactly match the new strings.
  - Confirm buttons go to `/sandbox` and `/beta`.
  - Confirm no inline email form submits anywhere on the hero.
  - Confirm no em dash remains in the hero component.

---

## 3. Privacy Page (/privacy.tsx)

File:
- `landing/src/pages/privacy.tsx`

### Claude Action: Rebuild privacy page structure and copy

**Rebuild instruction:**
Transform `/privacy` from generic boilerplate into a builder-grade, privacy-first explanation of how SheetLink works. Use the structure and copy below as the source of truth. Replace existing sections if needed.

**Desired structure:**

1. **Hero**
   - H1: `Privacy is the product.`
   - Subhead:
     - `SheetLink is a thin pipe from Plaid to your spreadsheet. Your financial data stays in your browser and your sheet, not on our servers.`

2. **“How SheetLink works” / Data flow**
   - Section title: `How SheetLink works`
   - Body:
     - Short paragraph explaining the architecture in plain language.
     - Bullet or small list describing the data path:
       - `Your bank connects to Plaid.`
       - `Plaid sends transaction data to your browser through SheetLink.`
       - `Your browser writes that data into a Google Sheet that you control.`
     - Clear one-liner:
       - `SheetLink is a pass-through integration, not a data warehouse.`

3. **“What we store” vs “What we do not store”**
   - Use a two-column layout or two stacked cards.

   - Left column (What we store):
     - Example items:
       - `Your email address if you join the beta`
       - `High level product telemetry without raw transaction content`
       - `Logs that help us debug the extension, without storing your full financial data`
   - Right column (What we do not store):
       - `Your bank username or password`
       - `Your full Google Sheets contents`
       - `Full copies of your transaction history, outside of temporary processing`
   - Add a note underneath:
     - `If we ever change how we handle data, we will document it here first, in plain language.`

4. **“Your options and self hosting”**
   - Section title: `Your options`
   - Content:
     - Short bullet list explaining:
       - You can remove the extension at any time.
       - You can request deletion of beta signup data.
       - You can self host the backend if you do not want us in the loop at all.
     - Include a link:
       - `Learn how to self host SheetLink` → `/self-host` (even if early; this can be a stub page initially).

5. **Legal / Policy details**
   - Keep or adapt the existing legal subsections:
     - “Information we collect”
     - “How we use your information”
     - “Third party services”
   - Rewrite them lightly to:
     - Match the technical reality of SheetLink (Plaid, Sheets, no data warehouse).
     - Avoid legalese where not required.
   - Keep a “Last updated” line with a realistic date.

**Tone requirements:**
- No em dashes.
- Concrete, specific statements.
- Do not use vague phrases like “we may temporarily cache your data” without clarifying:
  - what, where, and how long.

**Replace criteria:**
- If sections exist but are generic or misaligned, replace their content with the above structure and messages.
- It is acceptable to keep the legal headings, but their text should reflect SheetLink's pass-through architecture and minimal data retention.

**Verification:**
- Visit `http://localhost:3000/privacy`:
  - Confirm:
    - H1 and subhead match the new language.
    - There is a “How SheetLink works” section that explains the data flow.
    - There is a clear “What we store” vs “What we do not store” comparison.
    - There is a “Your options” section that mentions self hosting.
  - Confirm:
    - No em dashes remain on the page.
    - No old product names appear.
    - Text reads like a specific description of SheetLink, not generic boilerplate.

---

## 4. Docs Hub (/docs.tsx)

File:
- `landing/src/pages/docs.tsx`

### Claude Action: Convert docs page into a hub

**Rebuild instruction:**
Turn `/docs` into a navigation hub with cards, instead of a long-form getting started guide. Move sandbox-specific setup content into `/sandbox`.

**Desired structure:**

1. **Hero**
   - H1: `SheetLink docs`
   - Subhead:
     - `Sandbox setup, privacy, self hosting, and more.`

2. **Docs card grid (2×2 or similar)**

   Create a grid of cards with titles, short descriptions, and links:

   - Card 1:
     - Title: `Sandbox setup`
     - Description: `Connect a Plaid sandbox account and see transactions flow into Google Sheets.`
     - Link: `/sandbox`
   - Card 2:
     - Title: `Privacy and security`
     - Description: `Understand how SheetLink handles your data and how little we keep.`
     - Link: `/privacy`
   - Card 3:
     - Title: `Self host SheetLink`
     - Description: `Run the backend on your own infrastructure so your data never leaves your stack.`
     - Link: `/self-host`
   - Card 4:
     - Title: `Quick start and templates`
     - Description: `Starter sheets and patterns for different budgeting workflows. (Coming soon.)`
     - Link: can be `/docs` or a `#` placeholder for now, but mark as “Coming soon” in the copy.

3. **Quick links section (below cards)**

   Simple text links, for example:
   - `View the code on GitHub` → GitHub repo URL
   - `Join the beta` → `/beta`
   - `Try the sandbox` → `/sandbox`
   - `Read the privacy policy` → `/privacy`

**Content relocation:**
- Move sandbox-specific test credentials and steps from `/docs` to the new `/sandbox` page (see next section).
- Any FAQ items currently at the bottom of `/docs`:
  - Either remove or condense to a separate section **only if** they are clearly relevant and updated; otherwise, omit for now.

**Tone and formatting:**
- Card titles are short and direct.
- Descriptions are one sentence, builder-friendly.
- No em dashes.

**Replace criteria:**
- Replace the current long “Getting started” markdown-like content and sandbox test credentials with the hub layout described above.
- Preserve any reusable components (card components, etc.), but do not keep outdated long-form text.

**Verification:**
- Visit `http://localhost:3000/docs`:
  - Confirm hero text matches new copy.
  - Confirm a grid of 3–4 cards is visible and links behave correctly.
  - Confirm sandbox credentials are no longer on `/docs` but appear on `/sandbox`.
  - Confirm no em dashes remain.

---

## 5. Sandbox Page (/sandbox.tsx)

File:
- `landing/src/pages/sandbox.tsx` (create if missing)

### Claude Action: Create or rebuild the sandbox docs page

**Rebuild instruction:**
Implement a dedicated `/sandbox` page that provides a complete Plaid Sandbox walkthrough and surfaces the sandbox Sheet screenshot.

**Desired structure:**

1. **Hero**
   - H1: `Try SheetLink in Plaid Sandbox`
   - Subhead:
     - `Use Plaid's demo data to watch transactions flow into your own Google Sheet, with no real credentials required.`

2. **Step-by-step setup**

   Present as numbered steps or cards:

   - Step 1: Install the extension
     - “Install the SheetLink Chrome extension and pin it to your toolbar.”
   - Step 2: Open SheetLink and choose Sandbox mode
     - Mention the “Connect to Sandbox” action in the extension.
   - Step 3: Choose a test institution
     - Explain that Plaid provides demo institutions and demo data in sandbox mode.
   - Step 4: Complete the test login
     - If the flow uses MFA:
       - Use:
         - Phone number: `(415) 555-0123`
         - Code: `123456`
   - Step 5: Sync sample data
     - “Click Sync Sample Data in the extension. You should see 10–20 transactions appear in your Google Sheet within a few seconds.”

3. **Screenshot**

   - Expect the asset to be saved at:
     - `landing/public/screenshots/sandbox-setup.png`
   - Render this screenshot in a bordered card with a short caption beneath:
     - Caption example:
       - `Plaid sandbox transactions flowing into Google Sheets through SheetLink.`

4. **Important notes / disclaimers**

   Add a small “Important” or “Notes” section:

   - All sandbox data is fake and generated by Plaid.
   - Do not enter real bank credentials in sandbox mode.
   - Sandbox is the best way to test SheetLink before you connect your own accounts.

**Asset note:**
- If `public/screenshots/sandbox-setup.png` does not exist yet, create the page assuming it will exist and make it clear in a comment that the PNG must be added later.

**Tone:**
- Clear, step-by-step, helpful.
- Emphasize safety (demo data only).
- No em dashes.

**Replace criteria:**
- If `/sandbox.tsx` exists but is incomplete or wrong:
  - Replace its content with the structure above.
- Move any sandbox credentials or steps currently on `/docs` into this new `/sandbox` page.

**Verification:**
- Visit `http://localhost:3000/sandbox`:
  - Confirm hero text and steps are present.
  - Confirm test phone and code are clearly specified.
  - Confirm screenshot appears if `sandbox-setup.png` has been added.
  - Confirm no em dashes and no outdated content.

---

## 6. Final QA Checklist

After implementing all changes:

1. Global:
   - Search `landing/src` for `—` (em dash). Expect zero matches.
   - Search for old brand names (FinSync, OpenSheet, etc.). Expect zero matches.

2. `/` (Landing):
   - H1: “Forget dashboards. Feed your spreadsheet.”
   - Subhead: “SheetLink connects your bank to Google Sheets. Live, private, and under your control.”
   - Primary CTA → `/sandbox`
   - Secondary CTA → `/beta`

3. `/privacy`:
   - Hero “Privacy is the product.”
   - Clear “How SheetLink works” data flow explanation.
   - Visible “What we store” vs “What we do not store” comparison.
   - “Your options” section with self hosting link.

4. `/docs`:
   - Reads like a docs hub, not a tutorial.
   - Shows a grid of cards, including Sandbox, Privacy, Self host, Quick start.
   - Quick links section present.

5. `/sandbox`:
   - Exists and is reachable.
   - Shows steps for sandbox setup.
   - Mentions test phone `(415) 555-0123` and code `123456` where relevant.
   - Uses `sandbox-setup.png` screenshot when available.

6. `/beta`:
   - Still works as before (no behavior change required).
   - Navigation from `/` (hero) and `/docs` should easily direct users to `/beta`.

---

## 7. Output

When finished, print a short summary:

- Files created or modified (with paths).
- Any places where existing content was too ambiguous and required interpretation.
- A confirmation that:
  - All em dashes were removed.
  - All key pages now match the intended structure and tone.