// =============================================================================
// region BLOCK CATALOGUE REGISTRY
// =============================================================================

export const blockRegistry = [
  {
    id: "global-navigation",
    rank: 1,
    name: "Global navigation",
    category: "Orient",
    purpose:
      "Expose the information architecture and preserve the primary action.",
    columns: "3 + 6 + 3",
    treatment: "Quiet",
    components: ["Button", "Navigation"],
    primitives: [],
  },
  {
    id: "thesis-hero",
    rank: 2,
    name: "Thesis hero",
    category: "Orient",
    purpose:
      "State one memorable promise and establish the page's narrative direction.",
    columns: "6 + 1 + 5",
    treatment: "Editorial",
    components: ["Badge", "Button"],
    primitives: ["Tonal radial", "Construction rings"],
  },
  {
    id: "immediate-proof",
    rank: 3,
    name: "Immediate proof",
    category: "Prove",
    purpose: "Reduce disbelief with credible adoption and outcome signals.",
    columns: "3 × 4",
    treatment: "Quiet",
    components: ["Card", "Badge"],
    primitives: [],
  },
  {
    id: "product-demonstration",
    rank: 4,
    name: "Product demonstration",
    category: "Demonstrate",
    purpose: "Show the product changing a believable operational state.",
    columns: "5 + 1 + 6",
    treatment: "Product-led",
    components: ["Badge", "Button", "Card", "Progress"],
    primitives: ["Perspective grid"],
  },
  {
    id: "feature-chapter",
    rank: 5,
    name: "Sequential feature chapter",
    category: "Explain",
    purpose: "Explain one capability as a step in a coherent workflow.",
    columns: "5 + 1 + 6",
    treatment: "Editorial",
    components: ["Badge", "Tabs", "Card"],
    primitives: ["Parallel guides"],
  },
  {
    id: "case-study",
    rank: 9,
    name: "Case-study feature",
    category: "Prove",
    purpose: "Connect a real-world outcome to the mechanism that produced it.",
    columns: "7 + 5",
    treatment: "Brand-rich",
    components: ["Badge", "Button", "Card"],
    primitives: [],
  },
  {
    id: "faq",
    rank: 16,
    name: "FAQ and objection resolution",
    category: "Resolve",
    purpose: "Answer recurring blockers near the decision point.",
    columns: "4 + 1 + 7",
    treatment: "Quiet",
    components: ["Accordion", "Badge"],
    primitives: [],
  },
  {
    id: "final-cta",
    rank: 21,
    name: "Final call to action",
    category: "Convert",
    purpose: "Resolve the page into one focused next step.",
    columns: "8 + 4",
    treatment: "Cinematic",
    components: ["Badge", "Button"],
    primitives: ["Focal glow"],
  },
  {
    id: "deep-footer",
    rank: 7,
    name: "Footer and deep navigation",
    category: "Orient",
    purpose:
      "Expose the complete site taxonomy and close with a final brand gesture.",
    columns: "4 + 2 + 2 + 2 + 2",
    treatment: "Quiet",
    components: ["Button", "Separator"],
    primitives: [],
  },
  {
    id: "application-shell",
    rank: 30,
    name: "Application shell",
    category: "Application",
    purpose:
      "Keep global navigation, workspace context, account state and primary actions stable around changing tools.",
    columns: "2 + 10",
    treatment: "Operational",
    components: ["Button", "Avatar", "Badge"],
    primitives: [],
  },
  {
    id: "operational-overview",
    rank: 31,
    name: "Operational overview",
    category: "Monitor",
    purpose:
      "Summarise current health, exceptions and the next actions without turning the dashboard into decoration.",
    columns: "3 × 4 + 8 / 4",
    treatment: "Signal-led",
    components: ["Card", "Frappe Badge", "Frappe Progress"],
    primitives: [],
  },
  {
    id: "command-filter-bar",
    rank: 32,
    name: "Command and filter bar",
    category: "Discover",
    purpose:
      "Give a data workspace one predictable place for search, scope, sort and bulk actions.",
    columns: "5 + 2 + 2 + 3",
    treatment: "Compact",
    components: ["Frappe Text Input", "Frappe Select", "Frappe Button"],
    primitives: [],
  },
  {
    id: "data-workspace",
    rank: 33,
    name: "Records workspace",
    category: "Operate",
    purpose:
      "Support scanning, selecting and acting on structured records through a real system list surface.",
    columns: "12",
    treatment: "Data-dense",
    components: ["Frappe List View", "Frappe Badge", "Frappe Button"],
    primitives: [],
  },
  {
    id: "detail-inspector",
    rank: 34,
    name: "Detail inspector",
    category: "Operate",
    purpose:
      "Keep a selected record, its status and contextual actions visible beside the source workspace.",
    columns: "8 + 4",
    treatment: "Master-detail",
    components: ["Card", "Badge", "Button", "Separator"],
    primitives: [],
  },
  {
    id: "activity-feed",
    rank: 35,
    name: "Activity and audit feed",
    category: "Monitor",
    purpose:
      "Explain what changed, who changed it and which event requires attention next.",
    columns: "4 + 8",
    treatment: "Chronological",
    components: ["Avatar", "Badge", "Card"],
    primitives: [],
  },
  {
    id: "form-workflow",
    rank: 36,
    name: "Form workflow",
    category: "Input",
    purpose:
      "Group structured inputs, guidance, validation and save state into a clear operational task.",
    columns: "8 + 4",
    treatment: "Focused",
    components: ["Frappe Form Control", "Frappe Checkbox", "Frappe Button"],
    primitives: [],
  },
  {
    id: "scheduling-workspace",
    rank: 37,
    name: "Scheduling workspace",
    category: "Schedule",
    purpose:
      "Combine calendar context with an actionable agenda for planning and dispatch work.",
    columns: "9 + 3",
    treatment: "Time-based",
    components: ["Frappe Calendar", "Frappe Badge", "Frappe Button"],
    primitives: [],
  },
  {
    id: "system-states",
    rank: 38,
    name: "System state and recovery",
    category: "State",
    purpose:
      "Make empty, loading, error and permission states explain what happened and provide a useful recovery action.",
    columns: "4 × 3",
    treatment: "Instructional",
    components: ["Frappe Alert", "Button", "Skeleton"],
    primitives: [],
  },
];

export const blockCategories = [
  "All",
  ...new Set(blockRegistry.map((block) => block.category)),
];

export const filterBlocks = (blocks, filters) => {
  const query = filters.query.trim().toLowerCase();
  const filtered = blocks.filter((block) => {
    const haystack = [
      block.name,
      block.category,
      block.purpose,
      block.columns,
      block.treatment,
      ...block.components,
      ...block.primitives,
    ]
      .join(" ")
      .toLowerCase();
    return (
      (!query || haystack.includes(query)) &&
      (filters.category === "All" || filters.category === block.category)
    );
  });

  return [...filtered].sort((a, b) => {
    if (filters.sort === "Category")
      return a.category.localeCompare(b.category) || a.rank - b.rank;
    if (filters.sort === "Name") return a.name.localeCompare(b.name);
    return a.rank - b.rank;
  });
};

// endregion BLOCK CATALOGUE REGISTRY
