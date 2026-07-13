// =============================================================================
// region PARAMETERIZED VISUAL PRIMITIVE LIBRARY
// =============================================================================

const number = (key, label, min, max, step, value) => ({ key, label, type: "number", min, max, step, value })
const select = (key, label, options, value) => ({ key, label, type: "select", options, value })
const color = (key, label, value) => ({ key, label, type: "color", value })

const shared = {
  opacity: number("opacity", "Opacity", 0, 1, 0.05, 0.22),
  originX: number("originX", "Origin X", 0, 100, 1, 50),
  originY: number("originY", "Origin Y", 0, 100, 1, 38),
  rotation: number("rotation", "Rotation", -180, 180, 1, 0),
  spacing: number("spacing", "Spacing", 8, 96, 1, 32),
  lineWidth: number("lineWidth", "Line width", 0.25, 4, 0.25, 1),
  density: number("density", "Density", 2, 24, 1, 8),
  falloff: number("falloff", "Falloff", 20, 100, 1, 68),
  primary: color("color", "Primary", "var(--theme-primary)"),
  secondary: color("colorB", "Secondary", "var(--theme-secondary)"),
  mask: select("mask", "Region", ["none", "radial", "left", "right", "top", "bottom", "safe-zone"], "radial"),
}

const primitive = (id, name, category, purpose, topology, visualWeight, renderingMethod, renderer, parameters, options = {}) => ({
  id, name, category, purpose, topology, visualWeight, renderingMethod, renderer, parameters,
  compatibleMotifs: options.compatibleMotifs ?? [topology],
  incompatibleMotifs: options.incompatibleMotifs ?? [],
  requiredInputs: options.requiredInputs ?? ["composition origin", "surface colors"],
  defaultBlendMode: options.defaultBlendMode ?? "normal",
  recommendedOpacityRange: options.recommendedOpacityRange ?? [0.08, 0.4],
  recommendedLayerRange: options.recommendedLayerRange ?? [1, 5],
  maskSupport: options.maskSupport ?? true,
  contentSafeBehaviour: options.contentSafeBehaviour ?? "Fade or mask before the composition safe zone.",
  responsiveBehaviour: options.responsiveBehaviour ?? "Re-anchor to the focal point; do not merely scale the desktop coordinates.",
  reducedMotionBehaviour: options.reducedMotionBehaviour ?? "Static form preserves the complete visual relationship.",
  performanceCost: options.performanceCost ?? "low",
  implementation: options.implementation ?? `${renderingMethod}:${renderer}`,
  nodeKind: options.nodeKind ?? "visual",
  inputChannels: options.inputChannels ?? [],
  outputChannels: options.outputChannels ?? ["rgba"],
  tileable: options.tileable ?? false,
  isolatedPreview: options.isolatedPreview ?? renderer,
  composedExample: options.composedExample ?? "See an approved composition recipe using the same topology.",
  usageRules: options.usageRules ?? ["Inherit the composition origin or axis.", "Keep supporting contrast below the focal feature."],
  failureModes: options.failureModes ?? ["Placed without a relationship to the focal feature.", "Allowed to reduce content readability."],
  inspiredBy: options.inspiredBy ?? ["Visual Primitive Engine specification", "Aether reference", "Meridian reference"],
  keywords: `${id} ${name} ${category} ${purpose} ${topology} ${renderingMethod}`.toLowerCase(),
})

export const visualPrimitiveRegistry = [
  // region 1. FOUNDATION FIELDS
  primitive("tonal-linear", "Linear tonal field", "Foundation fields", "Establish one large directional light-to-dark mass.", "diagonal", "foundation", "css", "tonal-linear", [shared.rotation, shared.opacity, shared.primary, shared.secondary, shared.mask]),
  primitive("tonal-radial", "Radial tonal field", "Foundation fields", "Build a large tonal mass around the master focal point.", "radial", "foundation", "css", "tonal-radial", [shared.originX, shared.originY, shared.falloff, shared.opacity, shared.primary, shared.mask]),
  primitive("atmospheric-field", "Atmospheric field", "Foundation fields", "Balance two restrained color masses while preserving a quiet reading zone.", "organic", "foundation", "css", "atmospheric-field", [shared.originX, shared.originY, shared.opacity, shared.primary, shared.secondary, shared.mask]),
  primitive("split-material", "Split material field", "Foundation fields", "Divide a surface into two large material territories along one master angle.", "diagonal", "foundation", "css", "split-material", [shared.rotation, number("split", "Split", 20, 80, 1, 64), shared.primary, shared.secondary]),
  primitive("horizon-field", "Horizon field", "Foundation fields", "Create distant depth and a stable horizon for perspective compositions.", "perspective", "foundation", "css", "horizon-field", [shared.originY, shared.falloff, shared.opacity, shared.primary]),
  primitive("vignette-field", "Vignette field", "Foundation fields", "Concentrate contrast around the focal region and quieten the perimeter.", "radial", "supporting", "css", "vignette-field", [shared.originX, shared.originY, shared.falloff, shared.opacity]),
  // endregion 1. FOUNDATION FIELDS

  // region 1. STRUCTURAL GEOMETRY
  primitive("cartesian-grid", "Architectural grid", "Structural geometry", "Establish measured Cartesian order and alignment tracks.", "cartesian", "supporting", "svg", "cartesian-grid", [shared.spacing, number("majorInterval", "Major interval", 2, 8, 1, 4), shared.lineWidth, shared.opacity, shared.mask]),
  primitive("perspective-grid", "Perspective field", "Structural geometry", "Lead structural lines toward one controlled vanishing point.", "perspective", "supporting", "svg", "perspective-grid", [shared.originX, shared.originY, shared.density, shared.lineWidth, shared.opacity, shared.mask]),
  primitive("polar-grid", "Polar construction grid", "Structural geometry", "Measure radial distance and angle around a focal core.", "radial", "supporting", "svg", "polar-grid", [shared.originX, shared.originY, shared.spacing, shared.density, shared.lineWidth, shared.opacity, shared.mask]),
  primitive("construction-axis", "Construction axis", "Structural geometry", "Connect focal feature, typography and edge annotations along one axis.", "cartesian", "supporting", "svg", "construction-axis", [shared.originX, shared.rotation, shared.lineWidth, shared.opacity, shared.mask]),
  primitive("concentric-rings", "Construction rings", "Structural geometry", "Create measured radial hierarchy around a shared origin.", "radial", "supporting", "svg", "concentric-rings", [shared.originX, shared.originY, shared.spacing, shared.density, shared.lineWidth, shared.opacity, shared.mask]),
  primitive("parallel-guides", "Architectural guide lines", "Structural geometry", "Repeat one angle family to organize panels and reading direction.", "diagonal", "supporting", "svg", "parallel-guides", [shared.rotation, shared.spacing, shared.lineWidth, shared.opacity, shared.mask]),
  primitive("measurement-field", "Measurement field", "Structural geometry", "Add sparse ticks and coordinate points along established edges.", "cartesian", "micro", "svg", "measurement-field", [shared.spacing, number("majorInterval", "Major interval", 2, 8, 1, 4), shared.lineWidth, shared.opacity, shared.mask]),
  // endregion 1. STRUCTURAL GEOMETRY

  // region 1. LIGHTING AND ENERGY
  primitive("focal-glow", "Focal glow", "Lighting and energy", "Attach a restrained bloom directly to the focal feature.", "radial", "supporting", "css", "focal-glow", [shared.originX, shared.originY, number("radius", "Radius", 10, 90, 1, 42), number("intensity", "Intensity", 0, 1, 0.05, 0.45), shared.primary, shared.mask]),
  primitive("eclipse-glow", "Eclipse glow", "Lighting and energy", "Separate a dark focal disc with a controlled luminous rim.", "radial", "dominant", "css", "eclipse-glow", [shared.originX, shared.originY, number("radius", "Radius", 10, 60, 1, 25), number("intensity", "Intensity", 0, 1, 0.05, 0.55), shared.primary]),
  primitive("directional-beam", "Volumetric beam", "Lighting and energy", "Create a single directional shaft tied to the master angle.", "diagonal", "supporting", "css", "directional-beam", [shared.rotation, number("spread", "Spread", 5, 70, 1, 26), number("intensity", "Intensity", 0, 1, 0.05, 0.32), shared.primary, shared.mask]),
  primitive("edge-light", "Edge illumination", "Lighting and energy", "Reveal one boundary with a narrow controlled light source.", "cartesian", "micro", "css", "edge-light", [select("edge", "Edge", ["top", "right", "bottom", "left"], "top"), number("intensity", "Intensity", 0, 1, 0.05, 0.35), shared.primary]),
  primitive("reflected-wash", "Reflected color wash", "Lighting and energy", "Bounce low-intensity color from one material region into another.", "organic", "supporting", "css", "reflected-wash", [shared.originX, shared.originY, shared.falloff, shared.opacity, shared.primary, shared.mask]),
  // endregion 1. LIGHTING AND ENERGY

  // region 1. MOTIFS AND FEATURE PATTERNS
  primitive("radial-rays", "Radial ray system", "Motifs and patterns", "Extend the radial seed into sparse rays around the focal core.", "radial", "supporting", "svg", "radial-rays", [shared.originX, shared.originY, shared.density, shared.rotation, shared.lineWidth, shared.opacity, shared.mask]),
  primitive("orbital-paths", "Orbital path system", "Motifs and patterns", "Create related elliptical paths and sparse orbital markers around one core.", "radial", "supporting", "svg", "orbital-paths", [shared.originX, shared.originY, shared.spacing, shared.density, shared.rotation, shared.lineWidth, shared.opacity, shared.mask]),
  primitive("deco-fan", "Architectural fan", "Motifs and patterns", "Build a precise fan from one radial seed for premium corner or panel territory.", "radial", "supporting", "svg", "deco-fan", [shared.originX, shared.originY, shared.density, shared.rotation, shared.lineWidth, shared.opacity, shared.mask]),
  primitive("guilloche-field", "Guilloché field", "Motifs and patterns", "Generate controlled interlaced curves for fine focal or edge detail.", "radial", "supporting", "svg", "guilloche-field", [shared.originX, shared.originY, shared.density, number("distortion", "Distortion", 0, 1, 0.05, 0.35), shared.lineWidth, shared.opacity, shared.mask], { performanceCost: "medium" }),
  primitive("wave-interference", "Wave interference", "Motifs and patterns", "Create a coherent contour field from two related wave origins.", "organic", "supporting", "svg", "wave-interference", [shared.originX, shared.originY, shared.spacing, shared.density, shared.lineWidth, shared.opacity, shared.mask], { performanceCost: "medium" }),
  primitive("topographic-contours", "Topographic contours", "Motifs and patterns", "Form nested organic contour bands within a deliberate territory.", "organic", "supporting", "svg", "topographic-contours", [shared.originX, shared.originY, shared.spacing, shared.density, shared.lineWidth, shared.opacity, shared.mask]),
  primitive("circuit-routes", "Circuit routes", "Motifs and patterns", "Route sparse orthogonal traces between composition anchors.", "cartesian", "supporting", "svg", "circuit-routes", [shared.spacing, shared.density, shared.lineWidth, shared.opacity, shared.mask]),
  primitive("isometric-lattice", "Isometric lattice", "Motifs and patterns", "Create a modular three-axis construction field for bounded panels.", "diagonal", "supporting", "svg", "isometric-lattice", [shared.spacing, shared.rotation, shared.lineWidth, shared.opacity, shared.mask]),
  primitive("dot-matrix", "Controlled dot matrix", "Motifs and patterns", "Add a scalable point field with density fading toward the safe zone.", "cartesian", "micro", "svg", "dot-matrix", [shared.spacing, shared.density, number("dotSize", "Dot size", 0.5, 5, 0.5, 1.5), shared.opacity, shared.mask]),
  // endregion 1. MOTIFS AND FEATURE PATTERNS

  // region 1. PROCEDURAL MAP SOURCES
  primitive("map-fractal-noise", "Fractal noise map", "Procedural maps", "Generate a tileable grayscale base map for grain, roughness, breakup and distortion.", "material", "micro", "canvas", "map-fractal-noise", [number("scale", "Scale", 1, 20, .25, 3.5), number("detail", "Detail", 1, 8, 1, 3), number("seed", "Seed", 1, 99, 1, 17), number("contrast", "Contrast", .2, 3, .05, .55)], { nodeKind:"source",outputChannels:["height","roughness","mask"],tileable:true,maskSupport:false,implementation:"HTML Canvas grayscale generator; preview applies output at 9% influence." }),
  primitive("map-cloud", "Cloud map", "Procedural maps", "Generate broad soft tonal masses for material variation, haze and regional masks.", "material", "supporting", "svg-filter", "map-cloud", [number("scale", "Scale", .5, 10, .25, 2.5), number("detail", "Detail", 1, 7, 1, 3), number("seed", "Seed", 1, 99, 1, 29), number("contrast", "Contrast", .2, 3, .05, .8)], { nodeKind:"source",outputChannels:["height","mask","opacity"],tileable:true,maskSupport:false }),
  primitive("map-cellular", "Cellular map", "Procedural maps", "Generate a cellular distance field for cracked, granular, stone or technical material structure.", "material", "supporting", "svg-filter", "map-cellular", [number("scale", "Cell scale", 2, 30, .5, 10), number("seed", "Seed", 1, 99, 1, 41), number("edge", "Edge width", .1, 1, .05, .45), number("contrast", "Contrast", .2, 3, .05, 1.4)], { nodeKind:"source",outputChannels:["height","edge","mask"],tileable:true,maskSupport:false,performanceCost:"medium" }),
  primitive("map-ridged-noise", "Ridged noise map", "Procedural maps", "Generate directional ridges for stone, brushed surfaces, terrain and displacement.", "material", "supporting", "canvas", "map-ridged-noise", [number("scale", "Scale", 1, 18, .25, 3), number("detail", "Detail", 1, 7, 1, 3), number("seed", "Seed", 1, 99, 1, 53), number("contrast", "Contrast", .2, 3, .05, .6)], { nodeKind:"source",outputChannels:["height","roughness","distortion"],tileable:true,maskSupport:false,implementation:"HTML Canvas ridged grayscale generator; preview applies output at 9% influence." }),
  primitive("map-fibre", "Fibre map", "Procedural maps", "Generate anisotropic strands for paper, fabric, brushed material and directional masks.", "material", "micro", "svg-filter", "map-fibre", [number("scale", "Scale", 2, 32, .5, 14), shared.rotation, number("irregularity", "Irregularity", 0, 1, .05, .35), number("contrast", "Contrast", .2, 3, .05, 1)], { nodeKind:"source",outputChannels:["height","roughness","mask"],tileable:true,maskSupport:false }),
  primitive("map-scratch", "Scratch map", "Procedural maps", "Generate sparse directional marks for controlled wear, print and metallic roughness.", "material", "micro", "canvas", "map-scratch", [number("density", "Density", 2, 80, 1, 22), shared.rotation, number("length", "Length", 2, 80, 1, 28), number("width", "Width", .25, 4, .25, .75), number("seed", "Seed", 1, 99, 1, 61)], { nodeKind:"source",outputChannels:["roughness","mask"],tileable:true,maskSupport:false }),
  primitive("map-speckle", "Speckle map", "Procedural maps", "Generate sparse irregular particles for print, stone, breakup and opacity masks.", "material", "micro", "canvas", "map-speckle", [number("density", "Density", 2, 120, 1, 36), number("size", "Particle size", .25, 8, .25, 1.5), number("variation", "Variation", 0, 1, .05, .65), number("seed", "Seed", 1, 99, 1, 73)], { nodeKind:"source",outputChannels:["mask","roughness"],tileable:true,maskSupport:false }),
  primitive("map-stipple", "Stipple map", "Procedural maps", "Generate a controlled point-density field for shading, print tone and reveal masks.", "material", "micro", "svg", "map-stipple", [number("spacing", "Spacing", 4, 40, 1, 14), number("size", "Point size", .25, 6, .25, 1), number("gradient", "Density gradient", -1, 1, .05, .4), number("seed", "Seed", 1, 99, 1, 83)], { nodeKind:"source",outputChannels:["height","mask"],tileable:true,maskSupport:false }),
  primitive("map-wave", "Wave map", "Procedural maps", "Generate repeatable sinusoidal height data for interference, distortion and directional relief.", "material", "supporting", "svg", "map-wave", [number("frequency", "Frequency", 1, 24, 1, 7), number("amplitude", "Amplitude", 1, 50, 1, 18), shared.rotation, number("phase", "Phase", 0, 360, 1, 0)], { nodeKind:"source",outputChannels:["height","distortion","mask"],tileable:true,maskSupport:false }),
  primitive("map-radial-distance", "Radial distance map", "Procedural maps", "Generate normalized distance from a shared origin for masks, falloff, rings and displacement.", "radial", "supporting", "css", "map-radial-distance", [shared.originX,shared.originY,number("radius","Radius",10,100,1,68),number("contrast","Contrast",.2,3,.05,1)], { nodeKind:"source",outputChannels:["height","distance","mask"],tileable:false,maskSupport:false }),
  // endregion 1. PROCEDURAL MAP SOURCES

  // region 1. MAP MODIFIERS
  primitive("modifier-levels", "Levels", "Map modifiers", "Remap black point, white point and gamma of an input map.", "material", "micro", "canvas", "modifier-levels", [number("black","Black point",0,1,.01,.12),number("white","White point",0,1,.01,.88),number("gamma","Gamma",.2,3,.05,1)], { nodeKind:"modifier",inputChannels:["height|mask|roughness"],outputChannels:["height|mask|roughness"],maskSupport:false,implementation:"HTML Canvas per-pixel black/white/gamma remap." }),
  primitive("modifier-threshold", "Threshold", "Map modifiers", "Convert a continuous map into a controlled binary or feathered selection.", "material", "micro", "canvas", "modifier-threshold", [number("threshold","Threshold",0,1,.01,.5),number("feather","Feather",0,.5,.01,.08)], { nodeKind:"modifier",inputChannels:["height|mask"],outputChannels:["mask"],maskSupport:false,implementation:"HTML Canvas per-pixel threshold with feathered transition." }),
  primitive("modifier-blur", "Map blur", "Map modifiers", "Remove high-frequency detail or expand soft material masses in an input map.", "material", "micro", "canvas", "modifier-blur", [number("radius","Radius",0,40,.5,4)], { nodeKind:"modifier",inputChannels:["height|mask|roughness"],outputChannels:["height|mask|roughness"],maskSupport:false,implementation:"HTML Canvas neighbourhood averaging." }),
  primitive("modifier-directional-stretch", "Directional stretch", "Map modifiers", "Turn isotropic map detail into directional fibres, streaks or brushed variation.", "material", "micro", "canvas", "modifier-directional-stretch", [number("amount","Amount",1,20,.5,6),shared.rotation], { nodeKind:"modifier",inputChannels:["height|mask"],outputChannels:["height|mask"],maskSupport:false,implementation:"HTML Canvas samples and averages the input map along the selected angle." }),
  primitive("modifier-warp", "Turbulence warp", "Map modifiers", "Distort map coordinates using a second grayscale input.", "material", "supporting", "canvas", "modifier-warp", [number("amount","Amount",0,100,1,18),number("scale","Warp scale",1,20,.25,5)], { nodeKind:"modifier",inputChannels:["source map","distortion map"],outputChannels:["height|mask|roughness"],maskSupport:false,performanceCost:"medium",implementation:"HTML Canvas coordinate resampling driven by a distortion function or second map." }),
  primitive("modifier-color-ramp", "Colour ramp mapper", "Map modifiers", "Map grayscale values into project-controlled colour or material bands.", "material", "supporting", "canvas", "modifier-color-ramp", [shared.primary,shared.secondary,number("midpoint","Midpoint",0,1,.01,.5)], { nodeKind:"modifier",inputChannels:["height|mask"],outputChannels:["rgba"],maskSupport:false,implementation:"HTML Canvas per-pixel interpolation: black→colorA, white→colorB." }),
  // endregion 1. MAP MODIFIERS

  // region 1. MASKS AND EDGES
  primitive("radial-region", "Radial region mask", "Masks and regional control", "Confine another primitive to a focal halo and fade it before content.", "radial", "supporting", "css", "radial-region", [shared.originX, shared.originY, number("inner", "Inner hold", 0, 70, 1, 18), shared.falloff]),
  primitive("directional-region", "Directional region mask", "Masks and regional control", "Confine layers to one side or edge along the master angle.", "diagonal", "supporting", "css", "directional-region", [shared.rotation, number("start", "Start", 0, 80, 1, 28), shared.falloff]),
  primitive("safe-zone-cutout", "Content-safe cutout", "Masks and regional control", "Remove detail from the planned text and control region.", "cartesian", "supporting", "css", "safe-zone-cutout", [number("safeX", "Safe X", 0, 80, 1, 18), number("safeY", "Safe Y", 0, 80, 1, 42), number("safeWidth", "Safe width", 10, 90, 1, 64), number("safeHeight", "Safe height", 10, 80, 1, 38)]),
  primitive("inset-frame", "Inset architectural frame", "Frames and edges", "Close a composition with one measured inset perimeter.", "cartesian", "supporting", "svg", "inset-frame", [number("inset", "Inset", 4, 64, 1, 20), shared.lineWidth, shared.opacity]),
  primitive("corner-brackets", "Corner brackets", "Frames and edges", "Mark the composition boundary without enclosing every edge.", "cartesian", "micro", "svg", "corner-brackets", [number("inset", "Inset", 4, 64, 1, 20), number("length", "Length", 8, 80, 1, 28), shared.lineWidth, shared.opacity]),
  primitive("diagonal-seam", "Precision seam", "Frames and edges", "Repeat a split field's angle with one metallic or high-contrast seam.", "diagonal", "supporting", "svg", "diagonal-seam", [shared.rotation, number("offset", "Offset", -50, 50, 1, 0), shared.lineWidth, shared.opacity]),
  primitive("registration-marks", "Registration marks", "Frames and edges", "Add sparse crop, crosshair and coordinate marks at structural anchors.", "cartesian", "micro", "svg", "registration-marks", [number("inset", "Inset", 4, 64, 1, 20), number("length", "Length", 4, 32, 1, 10), shared.lineWidth, shared.opacity]),
  // endregion 1. MASKS AND EDGES
]

export const primitiveCategories = ["All", ...new Set(visualPrimitiveRegistry.map((item) => item.category))]
export const primitiveTopologies = ["All", ...new Set(visualPrimitiveRegistry.map((item) => item.topology))]
export const primitiveWeights = ["All", "foundation", "dominant", "supporting", "micro"]

export const getPrimitiveDefaults = (primitive) => Object.fromEntries(primitive.parameters.map((parameter) => [parameter.key, parameter.value]))

export const filterVisualPrimitives = (items, filters) => {
  const query = filters.query.trim().toLowerCase()
  return items
    .filter((item) => filters.category === "All" || item.category === filters.category)
    .filter((item) => filters.topology === "All" || item.topology === filters.topology)
    .filter((item) => filters.weight === "All" || item.visualWeight === filters.weight)
    .filter((item) => !query || item.keywords.includes(query))
    .toSorted((a, b) => filters.sort === "Category" ? `${a.category}-${a.name}`.localeCompare(`${b.category}-${b.name}`) : a.name.localeCompare(b.name))
}

// endregion PARAMETERIZED VISUAL PRIMITIVE LIBRARY
