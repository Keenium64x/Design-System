# Editable shadcn-vue Component Source

This folder owns the application's ordinary interface components.

## Ownership

- **shadcn-vue** is installed through its official CLI. The CLI-generated files in this folder are the editable source and default component system.
- **Reka UI** appears only inside interactive component files where headless accessible behavior is required.
- Pages import these files. They should not import Reka primitives directly.
- Frappe UI and specialist providers remain separate and do not replace these components.

## Where To Customize

Use the narrowest owner for a change:

1. `src/styles/tokens.css` — system-wide values such as color, type, radius, control height, padding, gap, and icon size.
2. A generated component's `.vue` or `index.js` file — permanent brand defaults, variants, sizes, states, and layout for that component.
3. A page usage — one exceptional instance through props or a `class` override.

For example, button styling lives in:

`src/components/ui/button/index.js`

Edit its official `buttonVariants` definition to change all buttons. Edit `--control-height-*`, `--control-padding-x-*`, or `--component-radius-button` in `tokens.css` to change shared sizing and shape.

## Adding An Official shadcn-vue Component

1. Run `npx shadcn-vue@latest add <component>`.
2. Confirm the official files under `src/components/ui/<name>/`.
3. Route the official exports through `src/ui/shadcn/index.js`.
4. Apply central tokens through semantic Tailwind aliases and deliberate edits to the generated variant/structure files.
5. Register the source and shared route in `src/lib/component-registry.js`.
6. Add one focused official-API demonstration to `ComponentCatalogue.vue`.
7. Run `npm run build` and test relevant states.

Do not hand-create a replacement for a shadcn-vue registry component. If the official CLI fails, record the incompatibility.

## Adding A Project-Owned Custom Component

1. Create the component outside this generated folder, normally under `src/components/custom/`.
2. Compose it from official components imported through `@/ui/shadcn`, `@/ui/frappe`, or `@/ui/specialists`.
3. Export it from `src/ui/custom/index.js`.
4. Use central tokens and semantic Tailwind utilities; keep component-specific variants in its own file.
5. Add registry metadata and a catalogue demonstration.

Provider components are never copied into `src/components/ui`. Frappe UI and specialists remain official package exports routed through `src/ui` and styled through `provider-adapters.css`.

The registry record controls search, provider/category filtering, sorting, file visibility, and the inventory count.
