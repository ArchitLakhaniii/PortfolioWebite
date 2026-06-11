# Archit Lakhani — Portfolio

Futuristic dark-theme portfolio built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content (the important part)

**All portfolio content lives in one file: [`src/data/profile.ts`](src/data/profile.ts).**

Edit that file to update:

| Export | Controls |
|---|---|
| `profile` | Name, tagline, email, links, about paragraphs, availability badge |
| `stats` | The 4 quick-stat tiles in the hero terminal card |
| `projects` | Project cards (set `featured: true` for the glow strip + badge) |
| `experience` | Experience timeline entries |
| `skills` | Skill groups and tags |
| `achievements` | Achievement cards (tag controls badge color) |
| `navLinks` | Navigation menu items |

No component changes needed — every section reads from this file.

## Resume

Drop your resume PDF at `public/resume.pdf` (the Resume buttons point to `/resume.pdf`).

## Deploying

Push to GitHub and import in [Vercel](https://vercel.com) — it auto-detects Next.js. No config needed.

## Structure

```
src/
  app/          layout, page, global styles (theme: glassmorphism + neon)
  components/   Nav, Hero, About, Projects, Experience, Skills, Achievements, Contact, Footer
  data/         profile.ts  ← edit me
legacy/         previous static-HTML version of the site
```
