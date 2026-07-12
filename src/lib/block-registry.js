// =============================================================================
// region BLOCK CATALOGUE REGISTRY
// =============================================================================

export const blockRegistry = [
  { id: "header", name: "Application header", category: "Navigation", description: "Brand, primary navigation and actions.", columns: "12" },
  { id: "hero", name: "Split hero", category: "Marketing", description: "Positioning, supporting copy and focused actions.", columns: "7 + 5" },
  { id: "logo-cloud", name: "Logo cloud", category: "Social proof", description: "Compact partner or customer recognition.", columns: "12" },
  { id: "features", name: "Feature grid", category: "Content", description: "Three related capabilities with equal hierarchy.", columns: "4 + 4 + 4" },
  { id: "testimonial", name: "Featured testimonial", category: "Social proof", description: "Quote, identity and supporting result.", columns: "8 + 4" },
  { id: "stats", name: "Metric strip", category: "Data", description: "Four high-level performance indicators.", columns: "3 × 4" },
  { id: "pricing", name: "Pricing comparison", category: "Commerce", description: "Three plans with one recommended option.", columns: "4 + 4 + 4" },
  { id: "faq", name: "FAQ section", category: "Content", description: "Section introduction and question stack.", columns: "4 + 8" },
  { id: "cta", name: "Call to action", category: "Marketing", description: "One message with primary and secondary action.", columns: "8 + 4" },
  { id: "footer", name: "Site footer", category: "Navigation", description: "Brand summary, grouped links and legal row.", columns: "4 + 2 + 2 + 2 + 2" },
]

export const blockCategories = ["All", ...new Set(blockRegistry.map((block) => block.category))]

export const filterBlocks = (blocks, filters) => {
  const query = filters.query.trim().toLowerCase()
  return blocks
    .filter((block) => (!query || [block.name, block.category, block.description, block.columns].join(" ").toLowerCase().includes(query)) && (filters.category === "All" || filters.category === block.category))
    .sort((a, b) => filters.sort === "Category" ? a.category.localeCompare(b.category) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name))
}

// endregion BLOCK CATALOGUE REGISTRY
