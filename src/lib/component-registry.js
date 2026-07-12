// =============================================================================
// region OFFICIAL COMPONENT ROUTING REGISTRY
// =============================================================================

const shadcnComponents = [
  ["accordion", "Accordion", "Disclosure"], ["alert", "Alert", "Feedback"], ["alert-dialog", "Alert Dialog", "Overlay"], ["aspect-ratio", "Aspect Ratio", "Layout"],
  ["avatar", "Avatar", "Data Display"], ["badge", "Badge", "Feedback"], ["breadcrumb", "Breadcrumb", "Navigation"],
  ["button", "Button", "Actions"], ["button-group", "Button Group", "Actions"], ["calendar", "Calendar", "Forms"], ["card", "Card", "Data Display"], ["checkbox", "Checkbox", "Forms"],
  ["collapsible", "Collapsible", "Disclosure"], ["combobox", "Combobox", "Forms"], ["command", "Command", "Overlay"], ["context-menu", "Context Menu", "Overlay"],
  ["dialog", "Dialog", "Overlay"], ["drawer", "Drawer", "Overlay"], ["dropdown-menu", "Dropdown Menu", "Overlay"],
  ["empty", "Empty", "Feedback"], ["field", "Field", "Forms"], ["hover-card", "Hover Card", "Overlay"], ["input", "Input", "Forms"],
  ["item", "Item", "Data Display"], ["kbd", "Keyboard Key", "Data Display"], ["label", "Label", "Forms"], ["menubar", "Menubar", "Navigation"],
  ["navigation-menu", "Navigation Menu", "Navigation"], ["number-field", "Number Field", "Forms"], ["pagination", "Pagination", "Navigation"],
  ["pin-input", "PIN Input", "Forms"], ["popover", "Popover", "Overlay"], ["progress", "Progress", "Feedback"],
  ["radio-group", "Radio Group", "Forms"], ["range-calendar", "Range Calendar", "Forms"], ["resizable", "Resizable", "Layout"], ["scroll-area", "Scroll Area", "Layout"],
  ["select", "Select", "Forms"], ["separator", "Separator", "Layout"], ["sheet", "Sheet", "Overlay"],
  ["skeleton", "Skeleton", "Feedback"], ["slider", "Slider", "Forms"], ["sonner", "Sonner", "Feedback"],
  ["spinner", "Spinner", "Feedback"], ["stepper", "Stepper", "Navigation"], ["switch", "Switch", "Forms"],
  ["table", "Table", "Data Display"], ["tabs", "Tabs", "Navigation"], ["tags-input", "Tags Input", "Forms"],
  ["textarea", "Textarea", "Forms"], ["toggle", "Toggle", "Actions"], ["tooltip", "Tooltip", "Overlay"],
]

const frappeComponents = [
  ["alert", "Alert", "Feedback"], ["autocomplete", "Autocomplete", "Forms"], ["avatar", "Avatar", "Data Display"],
  ["badge", "Badge", "Feedback"], ["breadcrumbs", "Breadcrumbs", "Navigation"], ["button", "Button", "Actions"],
  ["calendar", "Calendar", "Specialist"], ["card", "Card", "Data Display"], ["checkbox", "Checkbox", "Forms"],
  ["circular-progress", "Circular Progress", "Feedback"], ["combobox", "Combobox", "Forms"], ["command-palette", "Command Palette", "Overlay"],
  ["date-picker", "Date Picker", "Forms"], ["dialog", "Dialog", "Overlay"], ["divider", "Divider", "Layout"],
  ["dropdown", "Dropdown", "Overlay"], ["error-message", "Error Message", "Feedback"], ["file-uploader", "File Uploader", "Forms"],
  ["form-control", "Form Control", "Forms"], ["list-view", "List View", "Data Display"], ["month-picker", "Month Picker", "Forms"],
  ["multi-select", "Multi Select", "Forms"], ["password", "Password", "Forms"], ["popover", "Popover", "Overlay"],
  ["progress", "Progress", "Feedback"], ["rating", "Rating", "Forms"], ["select", "Select", "Forms"],
  ["slider", "Slider", "Forms"], ["spinner", "Spinner", "Feedback"], ["switch", "Switch", "Forms"],
  ["tab-buttons", "Tab Buttons", "Navigation"], ["tabs", "Tabs", "Navigation"], ["textarea", "Textarea", "Forms"],
  ["text-input", "Text Input", "Forms"], ["text-editor", "Text Editor", "Specialist"], ["time-picker", "Time Picker", "Forms"], ["tooltip", "Tooltip", "Overlay"], ["tree", "Tree", "Data Display"],
]

const specialistComponents = [
  ["echarts", "Chart", "ECharts", "Canvas"], ["gantt", "Gantt", "Frappe Gantt", "SVG"],
  ["flow", "Node Graph", "Vue Flow", "SVG DOM"],
]

const unavailableOfficialComponents = [
  ["attachment", "Attachment", "official registry item missing upstream"],
  ["carousel", "Carousel", "official JavaScript-mode generation cannot resolve CarouselProps"],
  ["input-group", "Input Group", "official JavaScript-mode generation cannot resolve InputGroupButtonProps"],
  ["sidebar", "Sidebar", "official JavaScript-mode generation cannot resolve SidebarProps"],
  ["toggle-group", "Toggle Group", "not generated because the official batch stopped at Sidebar"],
]

export const componentRegistry = [
  ...shadcnComponents.map(([id, name, category]) => ({ id: `shadcn-${id}`, name, provider: "shadcn-vue", category, file: `src/components/ui/${id}/`, route: "src/ui/shadcn/index.js", source: "official CLI registry", states: ["default", "focus", "disabled"], keywords: [id, "official", "editable"] })),
  ...frappeComponents.map(([id, name, category]) => ({ id: `frappe-${id}`, name, provider: "Frappe UI", category, file: `node_modules/frappe-ui/src/components/`, route: "src/ui/frappe/index.js", source: "official package export", states: ["default"], keywords: [id, "official", "provider"] })),
  ...specialistComponents.map(([id, name, provider, rendering]) => ({ id, name, provider, category: "Specialist", file: "official package", route: "src/ui/specialists/index.js", source: "official Vue integration", states: ["theme"], keywords: [rendering.toLowerCase(), "official", "provider"] })),
  ...unavailableOfficialComponents.map(([id, name, reason]) => ({ id: `unavailable-${id}`, name, provider: "shadcn-vue unavailable", category: "Compatibility", file: `official registry: ${id}`, route: "not routed", source: reason, states: ["unavailable"], keywords: [id, "official", "incompatible"] })),
]

export const providers = ["All", ...new Set(componentRegistry.map((item) => item.provider))]
export const categories = ["All", ...new Set(componentRegistry.map((item) => item.category))]

export const filterComponents = (registry, filters) => {
  const query = filters.query.trim().toLowerCase()
  const filtered = registry.filter((component) => {
    const searchable = [component.name, component.provider, component.category, component.file, component.route, component.source, ...component.keywords, ...component.states].join(" ").toLowerCase()
    return (!query || searchable.includes(query)) && (filters.provider === "All" || component.provider === filters.provider) && (filters.category === "All" || component.category === filters.category)
  })
  return [...filtered].sort((a, b) => filters.sort === "Provider" ? a.provider.localeCompare(b.provider) || a.name.localeCompare(b.name) : filters.sort === "Category" ? a.category.localeCompare(b.category) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name))
}

// endregion OFFICIAL COMPONENT ROUTING REGISTRY
