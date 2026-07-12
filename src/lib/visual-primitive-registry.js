// =============================================================================
// region STACKABLE SURFACE PRIMITIVE REGISTRY
// =============================================================================

const surface = (id, name, category, description, options = {}) => ({
  id,
  name,
  category,
  description,
  token: `--primitive-${id}`,
  size: options.size ?? "cover",
  position: options.position ?? "center",
  repeat: options.repeat ?? "no-repeat",
  blend: options.blend ?? "normal",
  syntax: options.syntax ?? "image",
  origin: options.origin ?? "Researched",
  keywords: `${id} ${name} ${category} ${description}`.toLowerCase(),
})

export const visualPrimitiveRegistry = [
  // region 1. GRADIENTS
  surface("gradient-silk", "Silk diagonal", "Gradients", "Quiet tonal diagonal with a soft highlight through the middle."),
  surface("gradient-duotone", "Duotone diagonal", "Gradients", "Clean primary-to-secondary directional color field."),
  surface("gradient-horizon", "Horizon fade", "Gradients", "Layered vertical transition with a narrow horizon glow."),
  surface("gradient-band", "Chromatic band", "Gradients", "A restrained color band crossing an otherwise open surface."),
  surface("gradient-radial", "Radial bloom", "Gradients", "Centered radial color bloom with generous transparent falloff."),
  surface("gradient-corner", "Corner bloom", "Gradients", "Radial color source entering from one corner."),
  surface("gradient-mesh", "Triad mesh", "Gradients", "Three separated radial color fields that balance a surface."),
  surface("gradient-aurora", "Aurora ribbons", "Gradients", "Elongated overlapping color fields with open negative space."),
  surface("gradient-conic", "Conic spectrum", "Gradients", "Continuous angular brand sweep for energetic surfaces."),
  surface("gradient-halo", "Conic halo", "Gradients", "Angular ring with an open center and softened edge."),
  surface("gradient-metal", "Metallic sweep", "Gradients", "Alternating narrow tonal highlights that imply reflective material."),
  surface("gradient-sunset", "Sunset field", "Gradients", "Warm horizon blend with a cool upper edge."),
  surface("gradient-ocean", "Ocean depth", "Gradients", "Cool layered field that deepens toward the lower edge."),
  surface("gradient-acid", "Acid shift", "Gradients", "High-energy accent transition for small expressive surfaces."),
  surface("gradient-sheen", "Glass sheen", "Gradients", "Transparent diagonal highlight designed to overlay another primitive."),
  surface("gradient-iridescent", "Iridescent wash", "Gradients", "Low-opacity multi-hue wash with a pearlescent transition."),
  // endregion 1. GRADIENTS

  // region 1. PATTERNS
  surface("pattern-pinstripe-h", "Horizontal pinstripe", "Patterns", "Even horizontal one-pixel rules.", { size: "16px 16px", repeat: "repeat" }),
  surface("pattern-pinstripe-v", "Vertical pinstripe", "Patterns", "Even vertical one-pixel rules.", { size: "16px 16px", repeat: "repeat" }),
  surface("pattern-pinstripe-d", "Diagonal pinstripe", "Patterns", "Fine diagonal rules for directional movement.", { size: "18px 18px", repeat: "repeat" }),
  surface("pattern-crosshatch", "Crosshatch", "Patterns", "Two diagonal rule layers forming a light woven grid.", { size: "18px 18px", repeat: "repeat" }),
  surface("pattern-grid-micro", "Micro grid", "Patterns", "Compact orthogonal grid for technical surfaces.", { size: "12px 12px", repeat: "repeat" }),
  surface("pattern-grid-large", "Module grid", "Patterns", "Open orthogonal grid for spatial rhythm.", { size: "32px 32px", repeat: "repeat" }),
  surface("pattern-dot-micro", "Micro dots", "Patterns", "Small evenly spaced point field.", { size: "12px 12px", repeat: "repeat" }),
  surface("pattern-dot-large", "Large dots", "Patterns", "Larger low-density point field.", { size: "28px 28px", repeat: "repeat" }),
  surface("pattern-halftone", "Halftone fade", "Patterns", "Dot field whose apparent density changes across the tile.", { size: "20px 20px", repeat: "repeat" }),
  surface("pattern-checker", "Soft checker", "Patterns", "Alternating transparent squares with restrained contrast.", { size: "24px 24px", repeat: "repeat" }),
  surface("pattern-tartan", "Tartan weave", "Patterns", "Layered broad and narrow horizontal and vertical bands.", { size: "64px 64px", repeat: "repeat" }),
  surface("pattern-chevron", "Chevron", "Patterns", "Repeated angled bands producing a directional zigzag.", { syntax: "background" }),
  surface("pattern-zigzag", "Fine zigzag", "Patterns", "Thin alternating diagonal segments.", { syntax: "background" }),
  surface("pattern-diamond", "Diamond lattice", "Patterns", "Diagonal grid forming repeated diamond cells.", { size: "28px 28px", repeat: "repeat" }),
  surface("pattern-isometric", "Isometric grid", "Patterns", "Three-axis line field suggesting dimensional modules.", { size: "36px 62px", repeat: "repeat" }),
  surface("pattern-honeycomb", "Honeycomb", "Patterns", "Offset hexagonal cell field.", { size: "36px 62px", repeat: "repeat" }),
  surface("pattern-rings", "Concentric rings", "Patterns", "Repeated circular contours radiating from each tile.", { size: "48px 48px", repeat: "repeat" }),
  surface("pattern-sunburst", "Sunburst", "Patterns", "Repeated angular rays from a central origin."),
  surface("pattern-wave", "Wave lines", "Patterns", "Interlocking radial arcs producing a soft wave rhythm.", { size: "32px 16px", repeat: "repeat" }),
  surface("pattern-circuit", "Circuit traces", "Patterns", "Orthogonal interrupted linework with small terminal points.", { syntax: "background" }),
  surface("pattern-brick", "Offset brick", "Patterns", "Staggered horizontal modules with fine mortar lines.", { syntax: "background" }),
  surface("pattern-scales", "Overlapping scales", "Patterns", "Repeated overlapping arcs with an organic tiled rhythm.", { syntax: "background" }),
  surface("pattern-confetti", "Confetti marks", "Patterns", "Sparse short multi-directional marks for playful energy.", { syntax: "background" }),
  surface("pattern-plus", "Plus field", "Patterns", "Repeated small cross marks with generous negative space.", { syntax: "background" }),
  // endregion 1. PATTERNS

  // region 1. TEXTURES
  surface("texture-noise-fine", "Fine noise", "Textures", "Fine monochrome grain that removes digital flatness.", { size: "180px 180px", repeat: "repeat", blend: "soft-light" }),
  surface("texture-noise-coarse", "Coarse noise", "Textures", "Larger high-contrast grain for expressive surfaces.", { size: "220px 220px", repeat: "repeat", blend: "overlay" }),
  surface("texture-paper", "Paper grain", "Textures", "Soft fiber-like noise with warm tonal variation.", { size: "220px 220px", repeat: "repeat", blend: "multiply" }),
  surface("texture-speckle", "Speckle", "Textures", "Irregular sparse dots at multiple scales.", { size: "64px 64px", repeat: "repeat" }),
  surface("texture-scanline", "Scanlines", "Textures", "Fine alternating horizontal luminance bands.", { size: "100% 4px", repeat: "repeat" }),
  surface("texture-frost", "Frosted grain", "Textures", "Clouded translucent grain suited to glass-like overlays.", { size: "160px 160px", repeat: "repeat", blend: "screen" }),
  surface("texture-brushed", "Brushed metal", "Textures", "Fine directional streaks with an underlying metallic sweep.", { size: "100% 8px", repeat: "repeat" }),
  surface("texture-carbon", "Carbon weave", "Textures", "Dense diagonal micro-weave for dark technical surfaces.", { size: "12px 12px", repeat: "repeat" }),
  surface("texture-canvas", "Canvas weave", "Textures", "Orthogonal fibers with subtle alternating highlights.", { size: "8px 8px", repeat: "repeat" }),
  surface("texture-stipple", "Stipple", "Textures", "Dense tiny points with controlled irregularity.", { size: "20px 20px", repeat: "repeat" }),
  surface("texture-dither", "Ordered dither", "Textures", "Pixel-like threshold matrix for deliberately digital shading.", { size: "8px 8px", repeat: "repeat" }),
  surface("texture-marble", "Soft marble", "Textures", "Layered curved veins over a quiet tonal base.", { size: "cover" }),
  surface("texture-topographic", "Topographic contours", "Textures", "Nested irregular contour lines creating terrain-like flow.", { size: "72px 72px", repeat: "repeat" }),
  surface("texture-water", "Water caustic", "Textures", "Overlapping luminous arcs suggesting refracted water light.", { size: "72px 72px", repeat: "repeat", blend: "screen" }),
  surface("texture-glass", "Micro glass", "Textures", "Fine highlight and haze overlay for translucent surfaces.", { size: "cover", blend: "screen" }),
  surface("texture-grunge", "Restrained grunge", "Textures", "Sparse worn flecks without obscuring foreground content.", { size: "120px 120px", repeat: "repeat", blend: "multiply" }),
  // endregion 1. TEXTURES

  // region 1. LIGHTING
  surface("light-softbox-top", "Top softbox", "Lighting", "Broad rectangular light falling from above."),
  surface("light-softbox-side", "Side softbox", "Lighting", "Broad soft light entering from one side."),
  surface("light-spot-center", "Center spotlight", "Lighting", "Focused circular light centered on the surface."),
  surface("light-spot-corner", "Corner spotlight", "Lighting", "Focused light entering from an upper corner."),
  surface("light-ambient", "Ambient wash", "Lighting", "Low-contrast illumination spread across the whole plane."),
  surface("light-rim", "Rim light", "Lighting", "Narrow luminous edge around an open central area."),
  surface("light-beam", "Directional beam", "Lighting", "Angled shaft of light crossing the surface."),
  surface("light-under", "Underlight", "Lighting", "Broad illumination rising from the lower edge."),
  surface("light-pool-dual", "Dual light pools", "Lighting", "Two separated soft pools for balanced asymmetry."),
  surface("light-pool-triad", "Triad light pools", "Lighting", "Three soft sources distributed across the plane."),
  surface("light-prism", "Prism light", "Lighting", "Narrow spectral beam with soft chromatic separation."),
  surface("light-vignette", "Soft vignette", "Lighting", "Dark peripheral falloff that focuses the center."),
  surface("light-edge-top", "Top edge glow", "Lighting", "Narrow linear illumination along the upper boundary."),
  surface("light-edge-side", "Side edge glow", "Lighting", "Narrow vertical illumination along one boundary."),
  // endregion 1. LIGHTING

  // region 1. SHAPE FIELDS
  surface("shape-twin-orbs", "Twin orbs", "Shape fields", "Two overlapping circles forming a simple reusable focal motif."),
  surface("shape-orb-triad", "Orb triad", "Shape fields", "Three circles at varied scales forming a balanced cluster."),
  surface("shape-ring-pair", "Ring pair", "Shape fields", "Two outlined circles crossing at different scales."),
  surface("shape-corner-rings", "Corner rings", "Shape fields", "Large cropped rings entering from opposing corners."),
  surface("shape-pill-pair", "Floating pills", "Shape fields", "Two rotated capsules that add soft directional geometry."),
  surface("shape-square-stack", "Square stack", "Shape fields", "Three offset squares forming a modular focal cluster.", { syntax: "background" }),
  surface("shape-diamond-pair", "Diamond pair", "Shape fields", "Two rotated squares with controlled overlap."),
  surface("shape-arch", "Arch field", "Shape fields", "Large cropped semicircular band rising from an edge."),
  surface("shape-capsule-frame", "Capsule frame", "Shape fields", "Large hollow pill contour crossing the surface."),
  surface("shape-target", "Target rings", "Shape fields", "Centered concentric outlines for a precise focal anchor."),
  surface("shape-bubble-field", "Bubble field", "Shape fields", "Scattered translucent circles at multiple scales."),
  surface("shape-slab-pair", "Offset slabs", "Shape fields", "Two large rectangular color planes with a measured offset."),
  surface("shape-ribbon", "Folded ribbon", "Shape fields", "Angular connected bands crossing a surface."),
  surface("shape-crescent", "Crescent", "Shape fields", "A single cropped circular crescent with strong negative space."),
  surface("shape-quarter-discs", "Quarter discs", "Shape fields", "Opposing quarter-circle fields anchored to corners."),
  surface("shape-floating-lines", "Floating rules", "Shape fields", "Sparse short horizontal lines placed as a modular constellation.", { syntax: "background" }),
  // endregion 1. SHAPE FIELDS
]

export const primitiveCategories = ["All", ...new Set(visualPrimitiveRegistry.map((item) => item.category))]
export const primitiveOrigins = ["All", "System", "Researched"]

export const getPrimitiveStyle = (item) => ({
  ...(item.syntax === "background"
    ? { background: `var(${item.token})` }
    : {
        backgroundImage: `var(${item.token})`,
        backgroundSize: item.size,
        backgroundPosition: item.position,
        backgroundRepeat: item.repeat,
      }),
  backgroundBlendMode: item.blend,
})

export const filterVisualPrimitives = (items, filters) => {
  const query = filters.query.trim().toLowerCase()
  return items
    .filter((item) => filters.category === "All" || item.category === filters.category)
    .filter((item) => filters.origin === "All" || item.origin === filters.origin)
    .filter((item) => !query || item.keywords.includes(query))
    .toSorted((a, b) => filters.sort === "Category"
      ? `${a.category}-${a.name}`.localeCompare(`${b.category}-${b.name}`)
      : a.name.localeCompare(b.name))
}

// endregion STACKABLE SURFACE PRIMITIVE REGISTRY
