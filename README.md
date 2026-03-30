# Stefan Shterjoski Portfolio

Premium one-page portfolio website for Stefan Shterjoski, built for a senior backend/full-stack software engineer profile.

## Chosen stack

This site uses a modular zero-build static stack:

- `index.html` for semantic structure and metadata
- `styles/main.css` for the theme system, layout, and visual design tokens
- `scripts/content.js` for centralized editable portfolio content
- `scripts/main.js` for rendering repeatable sections, theme handling, navigation, motion, and form logic

## Why this stack

- Excellent performance and very fast loading
- Easy to maintain without framework overhead
- Works well for SEO-friendly semantic markup
- Simple deployment to any static host
- Clean dark/light theme handling with minimal runtime complexity
- Fits the current local environment without requiring a newer Node toolchain

## Run locally

Serve the repository with any static file server.

Example:

```bash
python3 -m http.server 4321
```

Then open `http://localhost:4321`.

## Edit content

Main page structure and section copy are in [`/Portfolio/index.html`](/Portfolio/index.html).

Centralized repeatable content lives in [`/Portfolio/scripts/content.js`](/Portfolio/scripts/content.js):

- social links
- hero terminal lines
- hero supporting cards
- about cards
- skills groups
- selected work entries
- journey timeline items
- contact cards

Theme tokens, card styling, responsive layout, and dark/light mode styling live in [`/Portfolio/styles/main.css`](/Portfolio/styles/main.css).

Client-side behavior lives in [`/Portfolio/scripts/main.js`](/Portfolio/scripts/main.js).

## Contact form

The site uses [FormSubmit](https://formsubmit.co/) for low-maintenance message delivery to `my email`.

Included features:

- client-side validation
- loading, success, and error states
- mailto fallback button
- honeypot spam field
- simple submit-timing spam guard

Production note:

- FormSubmit may require a one-time activation email confirmation before first live submissions are delivered normally

## Deploy

This project can be deployed as static files to:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

No build step is required.
