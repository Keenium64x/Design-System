# Design System Studio

Standalone Vue 3, Vite 5, and Tailwind CSS 3.4 application for configuring, testing, and experiencing the central website design system.

The studio has four connected surfaces:

1. **Configure** — make practical color, typography, shape, spacing, layout, and behavior decisions.
2. **Components** — inspect stackable visual primitives, design concepts, official component implementations, Frappe UI adapters, and specialist providers.
3. **Blocks** — browse reusable compositions built from the component layer and twelve-column layout system.
4. **Website** — experience the same tokens, components, blocks, and primitives in an expressive composed site.

Ordinary UI is official shadcn-vue CLI-generated source under `src/components/ui/`. All providers route through `src/ui`: shadcn source, official Frappe UI package exports, official specialist integrations, and project-owned custom components. See `src/components/ui/README.md` for customization and extension.

Official registry incompatibilities are recorded in the component registry instead of being replaced with hand-written substitutes.

## Run

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run build
npm run preview
```

## Control Points

The interactive control plane changes:

- primary, secondary, and accent OKLCH hues;
- neutral temperature and chroma;
- light and dark mode;
- display and body typography roles;
- type size, weight, line height, and tracking;
- spacing, radius, borders, shadows, and motion;
- content width and page gutter.

The generated ramp logic is in `src/lib/design-system.js`. Baseline values and Utopia scales are in `src/styles/tokens.css`.

The visual primitive catalogue contains parameterized fields, structural geometry, lighting, SVG motif systems, regional masks, edge treatments, focal features, and restrained material passes. Metadata and control schemas live in `src/lib/visual-primitive-registry.js`; the shared CSS/SVG renderer lives in `src/components/primitives/VisualPrimitivePreview.vue`. Composition recipes remain separate under Design Concepts.

## Component Proof Coverage

- color ramps and automatic theme roles;
- fluid typography and font roles;
- Utopia spacing and the 12-column grid;
- realistic workspace, form, disclosure, overlay, and data scenarios;
- official shadcn-vue component source with internal Reka behavior where required;
- Frappe UI provider components;
- Frappe Gantt SVG adaptation;
- ECharts canvas token adaptation;
- FullCalendar DOM adaptation;
- Vue Flow SVG/DOM adaptation.

This project is intentionally separate from Kratium. It is the visual test surface for developing the design system before integrating it into production applications.
# Design-System
