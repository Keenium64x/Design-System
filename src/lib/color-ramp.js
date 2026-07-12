// =============================================================================
// region OKLCH ANCHORED RAMP GENERATOR
// =============================================================================

export const rampSteps = [100, 200, 300, 400, 500, 600, 700, 800, 900]

const chromaShape = [0.28, 0.46, 0.66, 0.84, 1, 0.94, 0.82, 0.68, 0.52]
const rampProfiles = {
  color: { light: [0.94, 0.86, 0.72, 0.48], dark: [0.86, 0.68, 0.51, 0.37] },
  neutral: { light: [0.92, 0.82, 0.64, 0.38], dark: [0.82, 0.61, 0.43, 0.29] },
  white: { light: [0.88, 0.7, 0.48, 0.24], dark: [0.94, 0.86, 0.76, 0.63] },
  black: { light: [0.56, 0.4, 0.27, 0.14], dark: [0.74, 0.51, 0.31, 0.16] },
}

const linearizeSrgb = (value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4

export const hexToOklch = (hex) => {
  const normalized = hex.replace("#", "")
  const [r, g, b] = [0, 2, 4].map((offset) => linearizeSrgb(parseInt(normalized.slice(offset, offset + 2), 16) / 255))
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const yellowBlue = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const chroma = Math.sqrt(a ** 2 + yellowBlue ** 2)
  const hue = (Math.atan2(yellowBlue, a) * 180 / Math.PI + 360) % 360
  return { lightness, chroma, hue: Number.isFinite(hue) ? hue : 0 }
}

const resolveLightness = (anchor, index, profile) => {
  if (index === 4) return anchor
  if (index < 4) return anchor + (1 - anchor) * profile.light[index]
  return anchor * profile.dark[index - 5]
}

export const buildAnchoredRamp = (hex, profileName = "color") => {
  const anchor = hexToOklch(hex)
  const profile = rampProfiles[profileName]
  return rampSteps.map((step, index) => ({
    step,
    value: index === 4
      ? `oklch(${(anchor.lightness * 100).toFixed(3)}% ${anchor.chroma.toFixed(4)} ${anchor.hue.toFixed(2)})`
      : `oklch(${(resolveLightness(anchor.lightness, index, profile) * 100).toFixed(3)}% ${(anchor.chroma * chromaShape[index]).toFixed(4)} ${anchor.hue.toFixed(2)})`,
  }))
}

// endregion OKLCH ANCHORED RAMP GENERATOR
