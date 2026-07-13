// =============================================================================
// region APPROVED COMPOSITION RECIPES
// =============================================================================

export const designConceptRegistry = [
  { id: "celestial-hero", name: "Central radial composition", category: "Radial", concept: "A project-owned focal asset organized by one radial system.", topology: "radial", focalSlot: "Project focal asset", recipe: ["tonal-radial", "cartesian-grid", "concentric-rings", "radial-rays", "construction-axis", "radial-region", "map-fractal-noise", "inset-frame"] },
  { id: "diagonal-executive", name: "Architectural diagonal split", category: "Diagonal", concept: "A precision-cut surface with a project-owned feature in its dark territory.", topology: "diagonal", focalSlot: "Project image, mark or type", recipe: ["split-material", "diagonal-seam", "parallel-guides", "deco-fan", "directional-region", "map-fibre", "corner-brackets"] },
  { id: "framed-editorial", name: "Framed editorial", category: "Editorial", concept: "A project-owned headline or image held inside an architectural frame.", topology: "cartesian", focalSlot: "Project headline or image", recipe: ["tonal-linear", "inset-frame", "construction-axis", "corner-brackets", "registration-marks", "map-fractal-noise"] },
  { id: "technical-perspective", name: "Technical perspective field", category: "Perspective", concept: "A controlled journey toward a project-defined focal destination.", topology: "perspective", focalSlot: "Project focal destination", recipe: ["horizon-field", "perspective-grid", "directional-beam", "circuit-routes", "directional-region", "vignette-field", "map-cloud"] },
]

export const conceptCategories = ["All", ...new Set(designConceptRegistry.map((item) => item.category))]
export const filterDesignConcepts = (items, filters) => {
  const query = filters.query.trim().toLowerCase()
  return items.filter((item) => filters.category === "All" || item.category === filters.category)
    .filter((item) => !query || `${item.name} ${item.category} ${item.concept} ${item.recipe.join(" ")}`.toLowerCase().includes(query))
}

// endregion APPROVED COMPOSITION RECIPES
