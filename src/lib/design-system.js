import { reactive, watch } from "vue"
import { buildAnchoredRamp } from "./color-ramp"

// =============================================================================
// region DESIGN SYSTEM CONTROL STATION
// =============================================================================

const fontOptions = {
  neo: '"Helvetica Neue", Arial, ui-sans-serif, sans-serif',
  modern: 'Inter, ui-sans-serif, system-ui, sans-serif',
  geometric: 'Montserrat, "Avenir Next", ui-sans-serif, sans-serif',
  editorial: 'Georgia, "Times New Roman", serif',
}

export const defaults = {
  theme: "dark",
  primary500: "#9a7b16",
  secondary500: "#b85c35",
  accent500: "#297f91",
  neutral500: "#8b8882",
  white500: "#eeeae4",
  black500: "#242321",
  // HMR compatibility: an already-mounted pre-anchor dashboard can render
  // once more while Vite swaps modules. These no longer drive ramp output.
  primaryHue: 82,
  secondaryHue: 55,
  accentHue: 205,
  brandChroma: 0.16,
  neutralHue: 70,
  neutralChroma: 0.012,
  whiteHue: 75,
  whiteChroma: 0.008,
  blackHue: 70,
  blackChroma: 0.012,
  bodyFont: "modern",
  displayFont: "neo",
  bodySize: 18,
  displayWeight: 300,
  bodyLineHeight: 1.55,
  headingTracking: -0.035,
  spacingScale: 1,
  radius: 2,
  fieldRadius: 8,
  buttonRadius: 12,
  cardRadius: 12,
  blockRadius: 16,
  borderWidth: 1,
  maxWidth: 1280,
  gutter: 32,
  shadowStrength: 0.32,
  motionSpeed: 1,
  componentScale: 1,
  patternOpacity: 0.22,
  glowIntensity: 0.3,
}

export const controls = reactive({ ...defaults })

const setVariable = (name, value) => document.documentElement.style.setProperty(name, value)
const applyColorRamp = (name, anchorHex, profile) => {
  buildAnchoredRamp(anchorHex, profile).forEach(({ step, value }) => setVariable(`--color-${name}-${step}`, value))
}

export const applyControls = () => {
  document.documentElement.dataset.theme = controls.theme
  applyColorRamp("primary", controls.primary500, "color")
  applyColorRamp("secondary", controls.secondary500, "color")
  applyColorRamp("accent", controls.accent500, "color")
  applyColorRamp("neutral", controls.neutral500, "neutral")
  applyColorRamp("white", controls.white500, "white")
  applyColorRamp("black", controls.black500, "black")
  setVariable("--font-family-a", fontOptions[controls.bodyFont])
  setVariable("--font-family-b", fontOptions[controls.displayFont])
  setVariable("--font-base", `${controls.bodySize}px`)
  setVariable("--font-display-weight", String(controls.displayWeight))
  setVariable("--font-body-line-height", String(controls.bodyLineHeight))
  setVariable("--font-heading-tracking", `${controls.headingTracking}em`)
  setVariable("--spacing-scale", String(controls.spacingScale))
  setVariable("--radius-3", `${controls.radius}px`)
  setVariable("--radius-4", `${controls.radius * 2}px`)
  setVariable("--radius-5", `${controls.radius * 3}px`)
  setVariable("--component-radius-field", `${controls.fieldRadius}px`)
  setVariable("--component-radius-button", `${controls.buttonRadius}px`)
  setVariable("--component-radius-card", `${controls.cardRadius}px`)
  setVariable("--component-radius-block", `${controls.blockRadius}px`)
  setVariable("--border-width-system", `${controls.borderWidth}px`)
  setVariable("--grid-max-width", `${controls.maxWidth / 16}rem`)
  setVariable("--grid-gutter", `${controls.gutter}px`)
  setVariable("--shadow-strength", String(controls.shadowStrength))
  setVariable("--motion-speed", String(controls.motionSpeed))
  setVariable("--component-scale", String(controls.componentScale))
  setVariable("--pattern-opacity", String(controls.patternOpacity))
  setVariable("--glow-intensity", String(controls.glowIntensity))
}

export const resetControls = () => Object.assign(controls, defaults)

watch(controls, applyControls, { deep: true, immediate: true })

// endregion DESIGN SYSTEM CONTROL STATION
