import animate from "tailwindcss-animate"
import frappeUIPreset from "frappe-ui/tailwind"

const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900]
const ramp = (name) => Object.fromEntries(steps.map((step) => [step, `var(--color-${name}-${step})`]))

export default {
  darkMode: ["selector", "[data-theme='dark']"],
  presets: [frappeUIPreset],
  safelist: ["shadow-1", "shadow-2", "shadow-3", "shadow-4", "shadow-5", "shadow-6"],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: {
      primary: { ...ramp("primary"), DEFAULT: "var(--theme-primary)", foreground: "var(--theme-primary-foreground)" },
      secondary: { ...ramp("secondary"), DEFAULT: "var(--theme-secondary)", foreground: "var(--theme-secondary-foreground)" },
      neutral: ramp("neutral"), whiteTone: ramp("white"), blackTone: ramp("black"), accent: { ...ramp("accent"), DEFAULT: "var(--theme-accent-soft)", foreground: "var(--theme-text)" },
      success: ramp("success"), warning: ramp("warning"), error: ramp("error"), info: ramp("info"),
      canvas: "var(--theme-canvas)", surface: "var(--theme-surface)", "surface-raised": "var(--theme-surface-raised)", field: "var(--theme-field)", popup: "var(--theme-popup)", content: "var(--theme-text)", "theme-border": "var(--theme-border)",
      brand: "var(--theme-primary)", "brand-secondary": "var(--theme-secondary)", "brand-accent": "var(--theme-accent)",
      background: "var(--theme-canvas)", foreground: "var(--theme-text)", card: { DEFAULT: "var(--theme-surface-raised)", foreground: "var(--theme-text)" },
      popover: { DEFAULT: "var(--theme-surface-raised)", foreground: "var(--theme-text)" }, muted: { DEFAULT: "var(--theme-surface)", foreground: "var(--theme-text-muted)" },
      destructive: { DEFAULT: "var(--theme-error)", foreground: "var(--theme-error-foreground)" }, border: "var(--theme-border)", input: "var(--theme-border)", ring: "var(--theme-primary)",
      sidebar: { DEFAULT: "var(--theme-surface)", foreground: "var(--theme-text)", primary: "var(--theme-primary)", "primary-foreground": "var(--theme-primary-foreground)", accent: "var(--theme-accent-soft)", "accent-foreground": "var(--theme-text)", border: "var(--theme-border)", ring: "var(--theme-primary)" },
    },
    spacing: { "3xs": "var(--spacing-3xs)", "2xs": "var(--spacing-2xs)", xs: "var(--spacing-xs)", s: "var(--spacing-s)", m: "var(--spacing-m)", l: "var(--spacing-l)", xl: "var(--spacing-xl)", "2xl": "var(--spacing-2xl)", "3xl": "var(--spacing-3xl)", "xs-s": "var(--spacing-xs-s)", "s-m": "var(--spacing-s-m)", "m-l": "var(--spacing-m-l)", "l-xl": "var(--spacing-l-xl)", "s-l": "var(--spacing-s-l)" },
    fontFamily: { a: ["var(--font-family-a)"], b: ["var(--font-family-b)"], c: ["var(--font-family-c)"], mono: ["var(--font-family-mono)"] },
    fontSize: { "-2": ["var(--font-size--2)", { lineHeight: "var(--font-line-height-5)" }], "-1": ["var(--font-size--1)", { lineHeight: "var(--font-line-height-5)" }], 0: ["var(--font-size-0)", { lineHeight: "var(--font-line-height-4)" }], 1: ["var(--font-size-1)", { lineHeight: "var(--font-line-height-4)" }], 2: ["var(--font-size-2)", { lineHeight: "var(--font-line-height-3)" }], 3: ["var(--font-size-3)", { lineHeight: "var(--font-line-height-3)" }], 4: ["var(--font-size-4)", { lineHeight: "var(--font-line-height-2)" }], 5: ["var(--font-size-5)", { lineHeight: "var(--font-line-height-2)" }] },
    borderRadius: { 0: "var(--radius-0)", 1: "var(--radius-1)", 2: "var(--radius-2)", 3: "var(--radius-3)", 4: "var(--radius-4)", 5: "var(--radius-5)", 6: "var(--radius-6)", lg: "var(--component-radius-lg)", md: "var(--component-radius-md)", sm: "var(--component-radius-sm)", full: "var(--radius-full)" },
    boxShadow: { 1: "var(--shadow-1)", 2: "var(--shadow-2)", 3: "var(--shadow-3)", 4: "var(--shadow-4)", 5: "var(--shadow-5)", 6: "var(--shadow-6)" },
    maxWidth: { grid: "var(--grid-max-width)" }, gap: { grid: "var(--grid-gutter)" }, gridTemplateColumns: { system: "repeat(var(--grid-columns), minmax(0, 1fr))" },
    keyframes: { "accordion-down": { from: { height: "0" }, to: { height: "var(--reka-accordion-content-height)" } }, "accordion-up": { from: { height: "var(--reka-accordion-content-height)" }, to: { height: "0" } } },
    animation: { "accordion-down": "accordion-down 0.2s ease-out", "accordion-up": "accordion-up 0.2s ease-out" },
  } },
  plugins: [animate],
}
