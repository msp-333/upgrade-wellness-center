# Upgrade Wellness — Next.js (Static Export)

A statically-exported Next.js 14 + TypeScript site for **Upgrade Wellness Center**, styled with Tailwind using a soft wellness palette.  
Content lives in `/data/*.json`. Pages are rendered with the App Router and exported to `./out` — no server needed.

> **Note**: We treat the current Odoo site and screenshots as structure-only inspiration. All text here is neutral placeholder. Put real copy in `/data/*.json` and page components.

## Tech

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS (wellness palette: emerald/teal + soft neutrals) (soft wellness palette)
- TanStack React Query (provider set up for future use)
- Zod (client-side form validation)
- Static export: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`

## Local Development

```bash
npm i
npm run dev
```

Open http://localhost:3000 — all pages render statically.

## Build (Static Export)

```bash
npm run build
```

This runs `next build`. The `next.config.mjs` is preconfigured with:

- `output: 'export'`
- `trailingSlash: true` (so files export as `/path/index.html` which GitHub Pages serves nicely)
- `images.unoptimized: true`

### Base path for GitHub Pages

If you deploy to `https://<user>.github.io/<repo>`, set an env variable so assets and links resolve under the subpath:

```bash
NEXT_PUBLIC_BASE_PATH="/<repo>" npm run build
```

The config applies `basePath` **and** `assetPrefix` from `NEXT_PUBLIC_BASE_PATH` when non-empty.  
A `.nojekyll` file is included to ensure Pages serves files under the `_next/` directory.

## Deploy to GitHub Pages

Convenience script using `gh-pages`:

```bash
npm run build
npm run deploy
```

Then in your GitHub repo settings:

1. **Settings → Pages**
2. **Source: Deploy from a branch**
3. **Branch: gh-pages / (root)**
4. Save

Visit `https://<user>.github.io/<repo>/` once the action completes.

> If you use a **custom domain**, set `NEXT_PUBLIC_BASE_PATH=""` (root). Rebuild and redeploy.

## Files & Structure

```
/app
  /page.tsx                 # Home
  /events/page.tsx
  /about/page.tsx
  /success-stories/page.tsx
  /services/page.tsx
  /services/page.tsx
  /contact/page.tsx
  /faqs/page.tsx
  /privacy-policy/page.tsx
  /globals.css
  /layout.tsx
/components/{NavBar,Footer,EventCard,ServiceCard,Container,Providers}.tsx
/data/{events.json,faqs.json,testimonials.json,services.json}
/lib/{queryClient.ts,validators.ts}
/public/{logo.svg,.nojekyll}
next.config.mjs
tailwind.config.ts
postcss.config.js
tsconfig.json
package.json
README.md
```

## Accessibility & SEO

- Semantic headings, descriptive link text, and good color contrast.
- Page-level `export const metadata` + root Open Graph tags in `app/layout.tsx`.
- No external UI libraries beyond Tailwind.

## Contact Form (Zod Validation, No Server)

`/contact` validates **name**, **email**, **message** with Zod and opens a `mailto:` link on success.

- Update the `CONTACT_EMAIL` constant in `app/contact/page.tsx` to your real inbox.
- Inline comments show how to swap to Formspree or Netlify form handling later.

## Lighthouse

The Home page is intentionally lightweight (SVG-only graphics, no heavy third-party scripts). On desktop, it should score ≥ 90 on Performance out of the box.

## License

MIT — do what you like.
