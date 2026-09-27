# 100 Websites

A collection of 100 completely independent, production-quality website concepts — one for each category in a fixed list spanning e-commerce, hospitality, real estate, healthcare, SaaS, media, nonprofits, and more.

Every site is a self-contained static build: no bundler, no framework, no shared dependencies between sites. Each one has its own layout system, navigation pattern, typography pairing, color system, and component set — nothing is a reskin of another site in the collection, and no two consecutive categories share a visual style.

## Structure

```
websites/
  01-luxury-ecommerce/
    index.html
    style.css
    script.js
  02-fashion-brand/
    index.html
    style.css
    script.js
  ...
  100-futuristic-experimental-website/
    index.html
    style.css
    script.js
```

Each `NN-slug` folder is fully independent and can be opened directly in a browser (`index.html`) or served from any static file host — no build step required.

See [`PROGRESS.md`](./PROGRESS.md) for the full list of all 100 sites: category, fictional brand name, and style direction.

## How to view a site

Open any `websites/NN-slug/index.html` file directly in a browser, or serve the whole repo with any static server, e.g.:

```bash
npx serve websites
# then visit http://localhost:3000/NN-slug/
```

## What's inside each site

- **Semantic HTML5** with a proper heading hierarchy, `<title>` and meta description for SEO, and descriptive `alt` text on every image.
- **Independent CSS** per site — its own font pairing (via Google Fonts), color system, spacing scale, and responsive breakpoints from desktop down to small mobile.
- **Vanilla JS** (IIFE-wrapped, no external runtime dependencies) handling things like: mobile navigation toggles, form validation/submission feedback, filterable grids, tabs/accordions, carousels, animated counters, and canvas/WebGL-based visual effects — scoped per site.
- **Realistic fictional brand content** throughout (no lorem ipsum): brand names, copy, pricing, testimonials, and stats are all invented but written like real marketing copy.
- **Accessible interaction patterns**: visible focus states, `aria-expanded`/`aria-label` on interactive controls, `role="status"` on form feedback, keyboard-operable menus and tabs.
- **Performance-conscious**: lazy-loaded images (`loading="lazy"`), minimal JS per page, no unnecessary third-party scripts.

## Advanced effects

At least 15 sites (17 delivered) include advanced visual techniques — Canvas 2D data visualization, raw WebGL shaders, scroll-linked reveals, parallax, draggable 3D CSS transforms, and animated particle networks — all with graceful degradation (via `prefers-reduced-motion` checks and WebGL→Canvas2D fallbacks where relevant):

| # | Brand | Technique |
|---|-------|-----------|
| 16 | Azure Cove Resort | Immersive parallax cinematic |
| 20 | Pinnacle Estates | Mouse-tilt 3D cards |
| 25 | Cognita AI | Canvas particle network |
| 37 | Frame & Motion | Cinematic parallax reel |
| 52 | ChainPoint | Futuristic geometric 3D nodes |
| 58 | United FC Athletic | Stadium cinematic crest animation |
| 60 | Vortex Esports | Aggressive dark neon motion |
| 61 | Dreamforge Studios | Cinematic immersive 3D |
| 62 | Echoes of Ardent | Cinematic trailer parallax |
| 64 | Silverlens Pictures | Dark cinematic studio motion |
| 76 | Portline Shipping | Live SVG path animation + real-time counters |
| 78 | Raven Automotive | Draggable 3D CSS car showcase + canvas starfield |
| 86 | Budgetly | Canvas donut/line chart data viz |
| 89 | Metriq Analytics | Live-updating canvas line chart |
| 91 | NeuralDesk | Canvas particle network + typing animation + animated gauge |
| 94 | Aether One | Scroll-linked sticky product reveal |
| 98 | Terra Guard | Canvas progress ring + animated bar chart |
| 100 | Void // Studio | Raw WebGL fragment shader background (Canvas2D fallback) |

## Tech

Plain HTML5, CSS3, and vanilla JavaScript across all 100 sites — chosen deliberately for zero build tooling and instant portability. No React/Vite/Tailwind/Three.js runtime dependency was needed to meet the "advanced effects" requirement; Canvas 2D and raw WebGL cover it with far less weight per page.
