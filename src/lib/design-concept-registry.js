// =============================================================================
// region DESIGN CONCEPT REGISTRY
// =============================================================================

const concept = (id, name, category, description, recipe) => ({ id, name, category, description, recipe })

export const designConceptRegistry = [
  concept("corner-inset", "Corner inset", "Framing", "Corner brackets expose the padding boundary without enclosing the whole surface.", ["pattern-grid-large", "light-spot-corner"]),
  concept("layered-atmosphere", "Layered atmosphere", "Surface composition", "A quiet gradient, sparse texture and localized light form one dimensional field.", ["gradient-silk", "texture-noise-fine", "light-spot-corner"]),
  concept("technical-field", "Technical field", "Surface composition", "A module grid, trace texture and edge light create an engineered surface.", ["pattern-grid-large", "pattern-circuit", "light-edge-top"]),
  concept("editorial-focus", "Editorial focus", "Surface composition", "Open tonal field, single motif and subtle paper texture preserve hierarchy.", ["gradient-horizon", "shape-twin-orbs", "texture-paper"]),
  concept("chromatic-depth", "Chromatic depth", "Surface composition", "Mesh color, grain and vignette produce depth without another container.", ["gradient-mesh", "texture-noise-fine", "light-vignette"]),
  concept("luminous-glass", "Luminous glass", "Surface composition", "Ambient color, micro-glass haze and rim light create a translucent material.", ["gradient-silk", "texture-glass", "light-rim"]),
  concept("soft-geometry", "Soft geometry", "Surface composition", "Large rounded motifs sit over a restrained tonal and grain base.", ["gradient-silk", "shape-orb-triad", "texture-noise-fine"]),
  concept("grid-bleed", "Grid bleed", "Layout", "One primitive layer crosses its normal content track while adjacent content stays aligned.", ["pattern-grid-large", "shape-slab-pair"]),
  concept("split-plane", "Split plane", "Layout", "Two contrasting primitive stacks meet directly instead of being wrapped in cards.", ["gradient-ocean", "gradient-sunset"]),
  concept("overlap-stack", "Overlap stack", "Layout", "Several primitive-bearing planes overlap with controlled offsets and layer order.", ["pattern-dot-micro", "gradient-duotone", "texture-paper"]),
]

export const conceptCategories = ["All", ...new Set(designConceptRegistry.map((item) => item.category))]

export const filterDesignConcepts = (items, filters) => {
  const query = filters.query.trim().toLowerCase()
  return items.filter((item) => filters.category === "All" || item.category === filters.category)
    .filter((item) => !query || `${item.name} ${item.category} ${item.description} ${item.recipe.join(" ")}`.toLowerCase().includes(query))
}

// endregion DESIGN CONCEPT REGISTRY
