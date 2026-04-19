# Design Brief: AVT3B Premium Founder Brand

## Tone & Purpose
Premium futuristic personal brand for Prince Sharma / AVT3B founder. Bold execution-focused identity emphasizing systems, trading expertise, and AI automation. High-tech, minimal, Apple-level polish.

## Color Palette (OKLCH Dark Mode)

| Token | L | C | H | Usage |
|-------|-------|-------|-------|-------|
| Background | 0 | 0 | 0 | Pure black page background |
| Foreground | 0.95 | 0 | 0 | Primary text (#ffffff) |
| Accent | 0.72 | 0.22 | 142 | Neon green highlights, CTAs, glow effects (#00ff88) |
| Card | 0.08 | 0 | 0 | Elevated surfaces, glass-morphism containers |
| Border | 0.72 | 0.08 | 142 | Subtle green borders on cards and inputs |
| Muted | 0.25 | 0 | 0 | Secondary UI, disabled states |
| Destructive | 0.62 | 0.25 | 29 | Error/warning states (red-orange) |

## Typography

| Layer | Font | Usage | Scale |
|-------|------|-------|-------|
| Display | Space Grotesk | Hero titles, main headings, section titles | 48px–72px |
| Body | General Sans | Paragraphs, nav, descriptions, labels | 14px–18px |
| Mono | JetBrains Mono | Prices, tags, code snippets, data labels | 12px–16px |

## Elevation & Depth

| Level | Style | Usage |
|-------|-------|-------|
| Floating | Glass effect + glow-accent | CTA buttons, product cards, accent elements |
| Elevated | Card background + thin green border | Content sections, quote blocks, product showcase |
| Base | Pure black background | Page background, full-screen sections |

## Structural Zones

| Zone | Background | Border | Usage |
|------|-----------|--------|-------|
| Hero Section | `bg-background` | none | Full viewport, centered messaging |
| Card/Product | `glass` (rgba + blur) + `glow-accent-sm` | `border-accent/15` | Product showcase, testimonials |
| Button (Primary) | `bg-accent` | none | `glow-accent`, hover: `glow-accent-lg` |
| Button (Secondary) | `bg-muted/20` | `border-border` | Minimal interactive elements |
| Nav/Header | `bg-background` | `border-b border-border` | Sticky or fixed navigation |
| Footer | `bg-background` | `border-t border-border` | Full-width contact zone |

## Spacing & Rhythm

- **Gap between sections:** 2rem (md), 4rem (lg)
- **Padding on cards:** 1.5rem–2rem
- **Radius:** 0.5rem (buttons/inputs), 1rem (cards), full (avatars)
- **Line height:** 1.6 (body), 1.2 (headings)

## Component Patterns

- **Buttons:** accent background + glow-accent shadow, white text, uppercase labels in mono
- **Cards:** glass morphism (rgba + blur) with border-accent/15, glow-accent-sm shadow
- **Input fields:** bg-input (0.15 L), border-border, focus: glow-accent-sm
- **Product showcase:** 3-column grid (lg), 2-column (md), 1-column (sm) with hover glow

## Motion & Animation

- **Transitions:** all 0.6s cubic-bezier(0.4, 0, 0.2, 1)
- **Entrance:** fade-up 0.8s on section load
- **Hover:** glow-pulse 2s on accent elements
- **Section nav:** smooth scroll or translateY transition between full-screen sections
- **Cursor:** custom ring + dot on desktop (no scroll, one section at a time)

## Constraints

- Dark mode only (OKLCH `0 0 0` background enforced)
- No browser scroll — full-screen sections via JavaScript
- Accent color sparingly on CTAs, borders, and glow effects
- All colors from defined palette; no arbitrary hex/rgb
- Font stack enforced via CSS variables

## Signature Detail

Neon green glow effects on interactive elements and accent typography. Glass-morphism cards with subtle green borders create depth and premium feel. Custom cursor (ring + dot) with smooth transitions reinforces tech-forward aesthetic. Zero-scroll full-screen architecture emphasizes execution-focused messaging.

## Learnings

- OKLCH accent (0.72 0.22 142) maps perfectly to #00ff88 in dark mode
- Glass effect + glow shadow creates premium tech aesthetic without excess
- 0.6s transitions balance smoothness with snappy feel
- Full-screen sections require custom navigation logic (not browser scroll)
