# Ajay Darisi — Portfolio

A modern, interactive portfolio website built with Next.js 15, featuring 3D graphics, smooth animations, and a cyberpunk-inspired dark theme.

## Tech Stack

- **Framework:** Next.js 15 / React 19 / TypeScript
- **3D Graphics:** Three.js, React Three Fiber, Drei
- **Styling:** Tailwind CSS 4, shadcn/ui, Framer Motion
- **State:** Zustand
- **Fonts:** Orbitron, Rajdhani, Inter

## Features

- Interactive 3D hero scene with animated robot and particle effects
- Glassmorphism UI with neon glow effects
- Scroll-triggered animations via Framer Motion
- Fully responsive with mobile navigation
- Data-driven sections — edit JSON files to update content
- Six sections: Hero, About, Skills, Experience, Projects, Contact

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build && npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/                  # Next.js app router (layout, pages, styles)
components/
  canvas/             # 3D scenes (Three.js / R3F)
  sections/           # Portfolio sections (Hero, About, Skills, etc.)
  layout/             # Navbar
  ui/                 # shadcn/ui components
data/                 # Content config (portfolio, skills, experience, projects)
hooks/                # Custom React hooks
lib/                  # Utilities and Zustand store
public/               # Static assets and favicons
```

## Customization

All portfolio content lives in a single file: `data/portfolio.json`. It contains profile info, section order, skills, experience, and projects.
