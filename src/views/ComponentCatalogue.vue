<script setup>
import { Check, Search, Settings, TrendingUp } from "lucide-vue-next"
import { computed, reactive, ref } from "vue"
import {
  Accordion as UiAccordion, AccordionContent as UiAccordionContent, AccordionItem as UiAccordionItem, AccordionTrigger as UiAccordionTrigger,
  Alert as UiAlert, AlertDescription as UiAlertDescription, AlertTitle as UiAlertTitle,
  Avatar as UiAvatar, AvatarFallback as UiAvatarFallback,
  Badge as UiBadge, Breadcrumb as UiBreadcrumb, BreadcrumbItem as UiBreadcrumbItem, BreadcrumbLink as UiBreadcrumbLink, BreadcrumbList as UiBreadcrumbList, BreadcrumbPage as UiBreadcrumbPage, BreadcrumbSeparator as UiBreadcrumbSeparator,
  Button as UiButton, Card as UiCard, CardContent as UiCardContent, CardDescription as UiCardDescription, CardHeader as UiCardHeader, CardTitle as UiCardTitle,
  Checkbox as UiCheckbox, Collapsible as UiCollapsible, CollapsibleContent as UiCollapsibleContent, CollapsibleTrigger as UiCollapsibleTrigger,
  Dialog as UiDialog, DialogContent as UiDialogContent, DialogDescription as UiDialogDescription, DialogFooter as UiDialogFooter, DialogHeader as UiDialogHeader, DialogTitle as UiDialogTitle, DialogTrigger as UiDialogTrigger,
  DropdownMenu as UiDropdownMenu, DropdownMenuContent as UiDropdownMenuContent, DropdownMenuItem as UiDropdownMenuItem, DropdownMenuSeparator as UiDropdownMenuSeparator, DropdownMenuTrigger as UiDropdownMenuTrigger,
  Input as UiInput, Label as UiLabel, Pagination as UiPagination, PaginationContent as UiPaginationContent, PaginationItem as UiPaginationItem,
  Popover as UiPopover, PopoverContent as UiPopoverContent, PopoverTrigger as UiPopoverTrigger, Progress as UiProgress,
  RadioGroup as UiRadioGroup, RadioGroupItem as UiRadioGroupItem,
  Select as UiSelect, SelectContent as UiSelectContent, SelectItem as UiSelectItem, SelectTrigger as UiSelectTrigger, SelectValue as UiSelectValue,
  Separator as UiSeparator, Sheet as UiSheet, SheetContent as UiSheetContent, SheetDescription as UiSheetDescription, SheetHeader as UiSheetHeader, SheetTitle as UiSheetTitle, SheetTrigger as UiSheetTrigger,
  Skeleton as UiSkeleton, Slider as UiSlider, Switch as UiSwitch,
  Table as UiTable, TableBody as UiTableBody, TableCell as UiTableCell, TableHead as UiTableHead, TableHeader as UiTableHeader, TableRow as UiTableRow,
  Tabs as UiTabs, TabsContent as UiTabsContent, TabsList as UiTabsList, TabsTrigger as UiTabsTrigger,
  Textarea as UiTextarea, Toggle as UiToggle, Tooltip as UiTooltip, TooltipContent as UiTooltipContent, TooltipProvider as UiTooltipProvider, TooltipTrigger as UiTooltipTrigger,
} from "@/ui/shadcn"
import { FrappeAlert, FrappeAutocomplete, FrappeAvatar, FrappeBadge, FrappeButton, FrappeCheckbox, FrappeCombobox, FrappeDatePicker, FrappeErrorMessage, FrappeFileUploader, FrappeFormControl, FrappeListView, FrappeMonthPicker, FrappeMultiSelect, FrappePassword, FrappeProgress, FrappeRating, FrappeSelect, FrappeSlider, FrappeSwitch, FrappeTextInput, FrappeTextarea, FrappeTimePicker, FrappeTree } from "@/ui/frappe"
import CalendarShowcase from "@/components/CalendarShowcase.vue"
import ChartShowcase from "@/components/ChartShowcase.vue"
import FlowShowcase from "@/components/FlowShowcase.vue"
import GanttShowcase from "@/components/GanttShowcase.vue"
import { categories, componentRegistry, filterComponents, providers } from "@/lib/component-registry"
import VisualPrimitiveCard from "@/components/primitives/VisualPrimitiveCard.vue"
import { filterVisualPrimitives, primitiveCategories, primitiveTopologies, primitiveWeights, visualPrimitiveRegistry } from "@/lib/visual-primitive-registry"
import DesignConceptPreview from "@/components/primitives/DesignConceptPreview.vue"
import { conceptCategories, designConceptRegistry, filterDesignConcepts } from "@/lib/design-concept-registry"

// =============================================================================
// region COMPONENT LIBRARY CATALOGUE
// =============================================================================

const filters = reactive({ query: "", provider: "All", category: "All", sort: "Name" })
const primitiveFilters = reactive({ query: "", category: "All", topology: "All", weight: "All", sort: "Category" })
const conceptFilters = reactive({ query: "", category: "All" })
const enabled = ref(true)
const checked = ref(true)
const radioValue = ref("comfortable")
const selectValue = ref("design")
const activeTab = ref("overview")
const page = ref(1)
const sliderValue = ref([64])
const frappeSliderValue = ref([42])
const frappeSelectValue = ref("Design")
const frappeMultiValue = ref([])
const frappeDateValue = ref(null)
const frappeMonthValue = ref("")
const frappeTimeValue = ref("")
const frappeTextValue = ref("")
const frappePasswordValue = ref("")
const frappeAutocompleteValue = ref("")
const frappeComboboxValue = ref("")
const toggled = ref(false)
const visiblePrimitives = computed(() => filterVisualPrimitives(visualPrimitiveRegistry, primitiveFilters))
const visibleConcepts = computed(() => filterDesignConcepts(designConceptRegistry, conceptFilters))
const visibleComponents = computed(() => filterComponents(componentRegistry, filters))
const visibleIds = computed(() => new Set(visibleComponents.value.map((item) => item.id)))
const isVisible = (id) => visibleIds.value.has(`shadcn-${id}`) || visibleIds.value.has(id)
const hasProvider = (provider) => visibleComponents.value.some((item) => item.provider === provider)
const showShadcn = computed(() => hasProvider("shadcn-vue"))
const showFrappe = computed(() => hasProvider("Frappe UI"))
const showSpecialists = computed(() => visibleComponents.value.some((item) => item.category === "Specialist"))
const rows = [{ name: "Brand direction", owner: "Maya Chen", status: "Complete" }, { name: "Token architecture", owner: "Jon Bell", status: "In progress" }, { name: "Provider adapters", owner: "Alex Kim", status: "Review" }]
const frappeColumns = [{ label: "Workstream", key: "name", width: "2fr" }, { label: "Owner", key: "owner", width: "1fr" }, { label: "Status", key: "status", width: "1fr" }]
const frappeTree = { label: "Design system", children: [{ label: "Foundations", children: [{ label: "Color" }, { label: "Typography" }, { label: "Spacing" }] }, { label: "Components", children: [{ label: "Inputs" }, { label: "Data display" }] }] }
const frappeChoiceOptions = ["Design", "Engineering", "Marketing"]
const expandedDemoIds = new Set(["shadcn-button", "shadcn-input", "shadcn-label", "shadcn-textarea", "shadcn-select", "shadcn-checkbox", "shadcn-radio-group", "shadcn-switch", "shadcn-slider", "shadcn-toggle", "shadcn-badge", "shadcn-alert", "shadcn-tabs", "shadcn-breadcrumb", "shadcn-accordion", "shadcn-dialog", "shadcn-dropdown-menu", "shadcn-popover", "shadcn-sheet", "shadcn-collapsible", "shadcn-tooltip", "shadcn-card", "shadcn-avatar", "shadcn-progress", "shadcn-skeleton", "shadcn-separator", "shadcn-table", "shadcn-pagination", "frappe-button", "frappe-form-control", "frappe-text-input", "frappe-autocomplete", "frappe-combobox", "frappe-checkbox", "frappe-select", "frappe-textarea", "frappe-date-picker", "frappe-month-picker", "frappe-time-picker", "frappe-multi-select", "frappe-password", "frappe-file-uploader", "frappe-list-view", "frappe-tree", "frappe-calendar", "frappe-slider", "frappe-switch", "frappe-rating", "frappe-badge", "frappe-alert", "frappe-avatar", "frappe-progress", "frappe-error-message", "echarts", "gantt", "flow"])
const routedOnlyComponents = computed(() => visibleComponents.value.filter((item) => !expandedDemoIds.has(item.id)))

// endregion COMPONENT LIBRARY CATALOGUE
</script>

<template>
  <div class="studio-page">
    <header class="page-intro">
      <div><p class="section-kicker">Component library</p><h1 class="display-heading text-4">Inspect every layer.</h1></div>
      <p class="max-w-xl text--1 text-muted-foreground">shadcn-vue owns the editable component files. Reka UI is only the internal behavior engine where accessibility needs it.</p>
    </header>

    <main class="catalogue-layout">
      <nav class="catalogue-jump" aria-label="Component catalogue sections"><a href="#primitives">Primitives</a><a href="#concepts">Design concepts</a><a href="#components">Components</a></nav>

      <section id="primitives" class="catalogue-group">
        <header class="catalogue-group-heading"><div><span>01 · CONTROLLED VISUAL OPERATIONS</span><h2 class="display-heading text-3">Visual primitives</h2></div><p>{{ visiblePrimitives.length }} of {{ visualPrimitiveRegistry.length }} parameterized primitives shown. Each inherits composition geometry, region and visual weight.</p></header>
        <div class="catalogue-filters frappe-adapter primitive-filters">
          <FrappeTextInput v-model="primitiveFilters.query" size="md" variant="outline" placeholder="Search job, topology, renderer…"><template #prefix><Search :size="16" /></template></FrappeTextInput>
          <FrappeSelect v-model="primitiveFilters.category" size="md" variant="outline" :options="primitiveCategories" aria-label="Filter primitives by category" />
          <FrappeSelect v-model="primitiveFilters.topology" size="md" variant="outline" :options="primitiveTopologies" aria-label="Filter primitives by topology" />
          <FrappeSelect v-model="primitiveFilters.weight" size="md" variant="outline" :options="primitiveWeights" aria-label="Filter primitives by weight" />
          <FrappeSelect v-model="primitiveFilters.sort" size="md" variant="outline" :options="['Name','Category']" aria-label="Sort primitives" />
        </div>
        <div class="component-card-grid primitive-card-grid">
          <VisualPrimitiveCard v-for="primitive in visiblePrimitives" :key="primitive.id" :primitive="primitive" />
        </div>
        <div v-if="!visiblePrimitives.length" class="empty-library"><Search :size="24" /><strong>No primitives match</strong><p>Clear or broaden the filters to restore the visual vocabulary.</p></div>
      </section>

      <section id="concepts" class="catalogue-group">
        <header class="catalogue-group-heading"><div><span>02 · SHARED COMPOSITION GRAMMAR</span><h2 class="display-heading text-3">Design concepts</h2></div><p>Approved recipes with one concept, topology, focal relationship, safe zone and ordered primitive stack.</p></header>
        <div class="catalogue-filters frappe-adapter concept-filters">
          <FrappeTextInput v-model="conceptFilters.query" size="md" variant="outline" placeholder="Search concept or primitive recipe…"><template #prefix><Search :size="16" /></template></FrappeTextInput>
          <FrappeSelect v-model="conceptFilters.category" size="md" variant="outline" :options="conceptCategories" aria-label="Filter concepts by category" />
        </div>
        <div class="component-card-grid primitive-card-grid">
          <article v-for="concept in visibleConcepts" :key="concept.id" class="component-card primitive-card">
            <header><div><strong>{{ concept.name }}</strong><span>{{ concept.category }} · {{ concept.topology }}</span></div><code>{{ concept.recipe.length }} nodes</code></header>
            <div class="component-demo"><DesignConceptPreview :concept="concept" /></div>
            <p class="primitive-function">{{ concept.concept }}</p>
            <div class="concept-recipe"><code v-for="id in concept.recipe" :key="id">{{ id }}</code></div>
          </article>
        </div>
      </section>

      <section id="components" class="catalogue-group">
        <header class="catalogue-group-heading"><div><span>03 · SEARCHABLE INVENTORY</span><h2 class="display-heading text-3">Real component files</h2></div><p>{{ visibleComponents.length }} of {{ componentRegistry.length }} registered components shown.</p></header>
        <div class="catalogue-filters frappe-adapter">
          <FrappeTextInput v-model="filters.query" size="md" variant="outline" placeholder="Search name, state, provider, file…"><template #prefix><Search :size="16" /></template></FrappeTextInput>
          <FrappeSelect v-model="filters.provider" size="md" variant="outline" :options="providers" aria-label="Filter by provider" />
          <FrappeSelect v-model="filters.category" size="md" variant="outline" :options="categories" aria-label="Filter by category" />
          <FrappeSelect v-model="filters.sort" size="md" variant="outline" :options="['Name','Provider','Category']" aria-label="Sort components" />
        </div>

        <template v-if="showShadcn">
          <header class="provider-heading"><div><span class="default-provider">DEFAULT OWNER</span><h3 class="display-heading text-2">shadcn-vue</h3></div><p>Owned source under <code>src/components/ui/</code>. Edit each file directly.</p></header>
          <div class="component-card-grid">
            <article v-if="isVisible('button')" class="component-card component-card--wide"><header><div><strong>Button</strong><span>Variants, sizes, hover, focus, disabled</span></div><code>ui/button/Button.vue</code></header><div class="component-demo flex flex-wrap items-center gap-xs"><UiButton size="sm">Small</UiButton><UiButton>Default</UiButton><UiButton size="lg">Large</UiButton><UiButton variant="secondary">Secondary</UiButton><UiButton variant="outline">Outline</UiButton><UiButton variant="ghost">Ghost</UiButton><UiButton variant="destructive">Delete</UiButton><UiButton disabled>Disabled</UiButton></div></article>
            <article v-if="isVisible('input')" class="component-card"><header><div><strong>Input</strong><span>Text field</span></div><code>ui/input/Input.vue</code></header><div class="component-demo"><label class="field-label">Email<UiInput placeholder="name@company.com" /></label></div></article>
            <article v-if="isVisible('label')" class="component-card"><header><div><strong>Label</strong><span>Field relationship</span></div><code>ui/label/Label.vue</code></header><div class="component-demo"><UiLabel for="label-example">Project name</UiLabel><UiInput id="label-example" class="mt-2" placeholder="Northstar" /></div></article>
            <article v-if="isVisible('textarea')" class="component-card"><header><div><strong>Textarea</strong><span>Multi-line field</span></div><code>ui/textarea/Textarea.vue</code></header><div class="component-demo"><label class="field-label">Message<UiTextarea placeholder="Add a note" /></label></div></article>
            <article v-if="isVisible('select')" class="component-card"><header><div><strong>Select</strong><span>Root · trigger · value · content · items</span></div><code>ui/select/</code></header><div class="component-demo"><label class="field-label">Workspace<UiSelect v-model="selectValue"><UiSelectTrigger><UiSelectValue placeholder="Select workspace" /></UiSelectTrigger><UiSelectContent><UiSelectItem value="design">Product design</UiSelectItem><UiSelectItem value="engineering">Engineering</UiSelectItem><UiSelectItem value="marketing">Marketing</UiSelectItem></UiSelectContent></UiSelect></label></div></article>
            <article v-if="isVisible('checkbox')" class="component-card"><header><div><strong>Checkbox</strong><span>Multiple selection</span></div><code>ui/checkbox/Checkbox.vue</code></header><div class="component-demo flex items-center gap-2"><UiCheckbox v-model="checked" /><span class="text--1">Include design tokens</span></div></article>
            <article v-if="isVisible('radio-group')" class="component-card"><header><div><strong>Radio group</strong><span>Root + item</span></div><code>ui/radio-group/</code></header><div class="component-demo"><UiRadioGroup v-model="radioValue"><label class="flex items-center gap-2 text--1"><UiRadioGroupItem value="comfortable" /> Comfortable</label><label class="flex items-center gap-2 text--1"><UiRadioGroupItem value="compact" /> Compact</label></UiRadioGroup></div></article>
            <article v-if="isVisible('switch')" class="component-card"><header><div><strong>Switch</strong><span>Boolean setting</span></div><code>ui/switch/Switch.vue</code></header><div class="component-demo flex items-center justify-between gap-s"><span class="text--1">Automatic sync</span><UiSwitch v-model="enabled" /></div></article>
            <article v-if="isVisible('slider')" class="component-card"><header><div><strong>Slider</strong><span>Continuous value</span></div><code>ui/slider/Slider.vue</code></header><div class="component-demo"><div class="mb-s flex justify-between text--2"><span>Intensity</span><strong>{{ sliderValue[0] }}%</strong></div><UiSlider v-model="sliderValue" /></div></article>
            <article v-if="isVisible('toggle')" class="component-card"><header><div><strong>Toggle</strong><span>Pressed action</span></div><code>ui/toggle/Toggle.vue</code></header><div class="component-demo"><UiToggle v-model="toggled" variant="outline">Grid overlay</UiToggle></div></article>
            <article v-if="isVisible('badge')" class="component-card"><header><div><strong>Badge</strong><span>Labels and status</span></div><code>ui/badge/Badge.vue</code></header><div class="component-demo flex flex-wrap gap-xs"><UiBadge>Default</UiBadge><UiBadge variant="secondary">Secondary</UiBadge><UiBadge variant="outline">Outline</UiBadge><UiBadge variant="success">Complete</UiBadge><UiBadge variant="warning">Review</UiBadge></div></article>
            <article v-if="isVisible('alert')" class="component-card"><header><div><strong>Alert</strong><span>Root · title · description</span></div><code>ui/alert/</code></header><div class="component-demo"><UiAlert><Check /><UiAlertTitle>Tokens synchronized</UiAlertTitle><UiAlertDescription>All connected previews are current.</UiAlertDescription></UiAlert></div></article>
            <article v-if="isVisible('tabs')" class="component-card"><header><div><strong>Tabs</strong><span>Root · list · trigger · content</span></div><code>ui/tabs/</code></header><div class="component-demo"><UiTabs v-model="activeTab"><UiTabsList><UiTabsTrigger value="overview">Overview</UiTabsTrigger><UiTabsTrigger value="activity">Activity</UiTabsTrigger><UiTabsTrigger value="settings">Settings</UiTabsTrigger></UiTabsList><UiTabsContent value="overview">Overview content</UiTabsContent><UiTabsContent value="activity">Activity content</UiTabsContent><UiTabsContent value="settings">Settings content</UiTabsContent></UiTabs></div></article>
            <article v-if="isVisible('breadcrumb')" class="component-card"><header><div><strong>Breadcrumb</strong><span>List · item · link · separator · page</span></div><code>ui/breadcrumb/</code></header><div class="component-demo"><UiBreadcrumb><UiBreadcrumbList><UiBreadcrumbItem><UiBreadcrumbLink href="#">Studio</UiBreadcrumbLink></UiBreadcrumbItem><UiBreadcrumbSeparator /><UiBreadcrumbItem><UiBreadcrumbLink href="#components">Components</UiBreadcrumbLink></UiBreadcrumbItem><UiBreadcrumbSeparator /><UiBreadcrumbItem><UiBreadcrumbPage>Button</UiBreadcrumbPage></UiBreadcrumbItem></UiBreadcrumbList></UiBreadcrumb></div></article>
            <article v-if="isVisible('accordion')" class="component-card"><header><div><strong>Accordion</strong><span>Root · item · trigger · content</span></div><code>ui/accordion/</code></header><div class="component-demo"><UiAccordion type="single" collapsible><UiAccordionItem value="tokens"><UiAccordionTrigger>How are tokens applied?</UiAccordionTrigger><UiAccordionContent>Shared tokens route through the Tailwind adapter.</UiAccordionContent></UiAccordionItem><UiAccordionItem value="owner"><UiAccordionTrigger>Who owns components?</UiAccordionTrigger><UiAccordionContent>Official shadcn-vue source is generated into the project.</UiAccordionContent></UiAccordionItem></UiAccordion></div></article>
            <article v-if="isVisible('dialog')" class="component-card"><header><div><strong>Dialog</strong><span>Root · trigger · content · header · footer</span></div><code>ui/dialog/</code></header><div class="component-demo"><UiDialog><UiDialogTrigger as-child><UiButton variant="outline">Open dialog</UiButton></UiDialogTrigger><UiDialogContent><UiDialogHeader><UiDialogTitle>Publish changes?</UiDialogTitle><UiDialogDescription>Every connected preview will update.</UiDialogDescription></UiDialogHeader><UiDialogFooter><UiButton>Publish</UiButton></UiDialogFooter></UiDialogContent></UiDialog></div></article>
            <article v-if="isVisible('dropdown-menu')" class="component-card"><header><div><strong>Dropdown menu</strong><span>Root · trigger · content · items</span></div><code>ui/dropdown-menu/</code></header><div class="component-demo"><UiDropdownMenu><UiDropdownMenuTrigger as-child><UiButton variant="outline">Open menu</UiButton></UiDropdownMenuTrigger><UiDropdownMenuContent><UiDropdownMenuItem>Edit component</UiDropdownMenuItem><UiDropdownMenuItem>Duplicate</UiDropdownMenuItem><UiDropdownMenuSeparator /><UiDropdownMenuItem>Archive</UiDropdownMenuItem></UiDropdownMenuContent></UiDropdownMenu></div></article>
            <article v-if="isVisible('popover')" class="component-card"><header><div><strong>Popover</strong><span>Root · trigger · content</span></div><code>ui/popover/</code></header><div class="component-demo"><UiPopover><UiPopoverTrigger as-child><UiButton variant="outline">Open popover</UiButton></UiPopoverTrigger><UiPopoverContent><strong class="text--1">Component settings</strong><p class="mt-1 text--2 text-muted-foreground">Adjust local behavior without leaving the page.</p></UiPopoverContent></UiPopover></div></article>
            <article v-if="isVisible('sheet')" class="component-card"><header><div><strong>Sheet</strong><span>Root · trigger · content · header</span></div><code>ui/sheet/</code></header><div class="component-demo"><UiSheet><UiSheetTrigger as-child><UiButton variant="outline">Open sheet</UiButton></UiSheetTrigger><UiSheetContent><UiSheetHeader><UiSheetTitle>Component settings</UiSheetTitle><UiSheetDescription>Edit this component's local configuration.</UiSheetDescription></UiSheetHeader><UiInput class="mt-4" placeholder="Component name" /></UiSheetContent></UiSheet></div></article>
            <article v-if="isVisible('collapsible')" class="component-card"><header><div><strong>Collapsible</strong><span>Root · trigger · content</span></div><code>ui/collapsible/</code></header><div class="component-demo"><UiCollapsible class="rounded-md border border-border p-3"><UiCollapsibleTrigger as-child><UiButton variant="ghost">Show implementation detail</UiButton></UiCollapsibleTrigger><UiCollapsibleContent class="pt-3 text--2 text-muted-foreground">Official component source routes through shared tokens.</UiCollapsibleContent></UiCollapsible></div></article>
            <article v-if="isVisible('tooltip')" class="component-card"><header><div><strong>Tooltip</strong><span>Provider · root · trigger · content</span></div><code>ui/tooltip/</code></header><div class="component-demo"><UiTooltipProvider><UiTooltip><UiTooltipTrigger as-child><UiButton size="icon" variant="outline" aria-label="Settings"><Settings /></UiButton></UiTooltipTrigger><UiTooltipContent>System settings</UiTooltipContent></UiTooltip></UiTooltipProvider></div></article>
            <article v-if="isVisible('card')" class="component-card"><header><div><strong>Card</strong><span>Root · header · title · description · content</span></div><code>ui/card/</code></header><div class="component-demo"><UiCard><UiCardHeader><UiCardDescription>System coverage</UiCardDescription><UiCardTitle>84%</UiCardTitle></UiCardHeader><UiCardContent><small class="flex items-center gap-1 text-success-600"><TrendingUp :size="13" /> 12% this month</small></UiCardContent></UiCard></div></article>
            <article v-if="isVisible('avatar')" class="component-card"><header><div><strong>Avatar</strong><span>Root · image · fallback</span></div><code>ui/avatar/</code></header><div class="component-demo flex items-center gap-xs"><UiAvatar><UiAvatarFallback>MC</UiAvatarFallback></UiAvatar><UiAvatar><UiAvatarFallback>JB</UiAvatarFallback></UiAvatar><div><strong class="block text--1">Maya Chen</strong><small class="text--2 text-muted-foreground">Product designer</small></div></div></article>
            <article v-if="isVisible('progress')" class="component-card"><header><div><strong>Progress</strong><span>Completion state</span></div><code>ui/progress/Progress.vue</code></header><div class="component-demo"><div class="mb-xs flex justify-between text--2"><span>Implementation</span><strong>72%</strong></div><UiProgress :model-value="72" /></div></article>
            <article v-if="isVisible('skeleton')" class="component-card"><header><div><strong>Skeleton</strong><span>Loading state</span></div><code>ui/skeleton/Skeleton.vue</code></header><div class="component-demo flex gap-xs"><UiSkeleton class="size-10 rounded-full" /><div class="flex-1 space-y-2"><UiSkeleton class="h-3 w-2/3" /><UiSkeleton class="h-3 w-full" /><UiSkeleton class="h-3 w-4/5" /></div></div></article>
            <article v-if="isVisible('separator')" class="component-card"><header><div><strong>Separator</strong><span>Content division</span></div><code>ui/separator/Separator.vue</code></header><div class="component-demo space-y-xs"><span class="text--1">Section one</span><UiSeparator /><span class="text--1">Section two</span></div></article>
            <article v-if="isVisible('table')" class="component-card component-card--wide"><header><div><strong>Table</strong><span>Table · header · row · head · body · cell</span></div><code>ui/table/</code></header><UiTable><UiTableHeader><UiTableRow><UiTableHead>Workstream</UiTableHead><UiTableHead>Owner</UiTableHead><UiTableHead>Status</UiTableHead></UiTableRow></UiTableHeader><UiTableBody><UiTableRow v-for="row in rows" :key="row.name"><UiTableCell>{{ row.name }}</UiTableCell><UiTableCell>{{ row.owner }}</UiTableCell><UiTableCell><UiBadge variant="secondary">{{ row.status }}</UiBadge></UiTableCell></UiTableRow></UiTableBody></UiTable></article>
            <article v-if="isVisible('pagination')" class="component-card"><header><div><strong>Pagination</strong><span>Root · content · item</span></div><code>ui/pagination/</code></header><div class="component-demo"><UiPagination v-slot="{ page: currentPage }" v-model:page="page" :items-per-page="10" :total="30"><UiPaginationContent><UiPaginationItem v-for="number in 3" :key="number" :value="number" as-child><UiButton :variant="currentPage === number ? 'default' : 'outline'" size="icon-sm">{{ number }}</UiButton></UiPaginationItem></UiPaginationContent></UiPagination></div></article>
          </div>
        </template>

        <template v-if="showFrappe">
          <header class="provider-heading"><div><span class="provider-label">SYSTEM UI PROVIDER</span><h3 class="display-heading text-2">Frappe UI</h3></div><p>Official Frappe components own system-facing fields, lists, trees, calendars, and operational surfaces. shadcn-vue remains the default for ordinary product UI.</p></header>
          <div class="component-card-grid frappe-adapter">
            <article v-if="isVisible('frappe-button')" class="component-card"><header><div><strong>Button</strong><span>Frappe action</span></div><code>frappe-ui/Button.vue</code></header><div class="component-demo flex flex-wrap gap-xs"><FrappeButton label="Solid" theme="blue" variant="solid" /><FrappeButton label="Outline" theme="gray" variant="outline" /></div></article>
            <article v-if="isVisible('frappe-form-control')" class="component-card"><header><div><strong>Form control</strong><span>Canonical labelled field</span></div><code>frappe-ui/FormControl.vue</code></header><div class="component-demo"><FrappeFormControl v-model="frappeTextValue" label="Project name" description="Label, description and control share one API." type="text" variant="outline" placeholder="Northstar" /></div></article>
            <article v-if="isVisible('frappe-text-input')" class="component-card"><header><div><strong>Text input</strong><span>Text, email, number and search base</span></div><code>frappe-ui/TextInput.vue</code></header><div class="component-demo"><FrappeTextInput v-model="frappeTextValue" variant="outline" placeholder="Editable system value" /></div></article>
            <article v-if="isVisible('frappe-autocomplete')" class="component-card"><header><div><strong>Autocomplete</strong><span>Suggested single value</span></div><code>frappe-ui/Autocomplete.vue</code></header><div class="component-demo"><FrappeAutocomplete v-model="frappeAutocompleteValue" :options="frappeChoiceOptions" placeholder="Search a team" /></div></article>
            <article v-if="isVisible('frappe-combobox')" class="component-card"><header><div><strong>Combobox</strong><span>Searchable controlled choice</span></div><code>frappe-ui/Combobox.vue</code></header><div class="component-demo"><FrappeCombobox v-model="frappeComboboxValue" :options="frappeChoiceOptions" variant="outline" placeholder="Choose a team" /></div></article>
            <article v-if="isVisible('frappe-badge')" class="component-card"><header><div><strong>Badge</strong><span>Frappe status</span></div><code>frappe-ui/Badge.vue</code></header><div class="component-demo flex flex-wrap gap-xs"><FrappeBadge label="Ready" theme="green" /><FrappeBadge label="Review" theme="orange" /><FrappeBadge label="Draft" theme="gray" /></div></article>
            <article v-if="isVisible('frappe-alert')" class="component-card"><header><div><strong>Alert</strong><span>Frappe feedback</span></div><code>frappe-ui/Alert.vue</code></header><div class="component-demo"><FrappeAlert title="Provider connected" description="This component inherits the system." theme="green" /></div></article>
            <article v-if="isVisible('frappe-avatar')" class="component-card"><header><div><strong>Avatar</strong><span>Official Frappe identity</span></div><code>frappe-ui/Avatar.vue</code></header><div class="component-demo flex gap-xs"><FrappeAvatar label="MC" size="lg" /><FrappeAvatar label="JB" size="lg" shape="square" /></div></article>
            <article v-if="isVisible('frappe-checkbox')" class="component-card"><header><div><strong>Checkbox</strong><span>Official Frappe selection</span></div><code>frappe-ui/Checkbox.vue</code></header><div class="component-demo"><FrappeCheckbox v-model="checked" label="Accept system defaults" /></div></article>
            <article v-if="isVisible('frappe-progress')" class="component-card"><header><div><strong>Progress</strong><span>Official Frappe progress</span></div><code>frappe-ui/Progress.vue</code></header><div class="component-demo"><FrappeProgress label="Implementation" :value="64" :hint="true" /></div></article>
            <article v-if="isVisible('frappe-rating')" class="component-card"><header><div><strong>Rating</strong><span>Official Frappe rating</span></div><code>frappe-ui/Rating.vue</code></header><div class="component-demo"><FrappeRating label="Design fit" /></div></article>
            <article v-if="isVisible('frappe-switch')" class="component-card"><header><div><strong>Switch</strong><span>Official Frappe boolean</span></div><code>frappe-ui/Switch.vue</code></header><div class="component-demo"><FrappeSwitch v-model="enabled" label="Automatic sync" /></div></article>
            <article v-if="isVisible('frappe-textarea')" class="component-card"><header><div><strong>Textarea</strong><span>Official Frappe text area</span></div><code>frappe-ui/Textarea.vue</code></header><div class="component-demo"><FrappeTextarea variant="outline" label="Notes" placeholder="Write something…" /></div></article>
            <article v-if="isVisible('frappe-select')" class="component-card"><header><div><strong>Select</strong><span>Official Frappe select</span></div><code>frappe-ui/Select.vue</code></header><div class="component-demo"><FrappeSelect v-model="frappeSelectValue" :options="['Design','Engineering','Marketing']" variant="outline" /></div></article>
            <article v-if="isVisible('frappe-slider')" class="component-card"><header><div><strong>Slider</strong><span>Official Frappe range</span></div><code>frappe-ui/Slider.vue</code></header><div class="component-demo"><FrappeSlider v-model="frappeSliderValue" /></div></article>
            <article v-if="isVisible('frappe-date-picker')" class="component-card"><header><div><strong>Date picker</strong><span>Official Frappe date input</span></div><code>frappe-ui/DatePicker.vue</code></header><div class="component-demo"><FrappeDatePicker v-model="frappeDateValue" placeholder="Select date" label="Milestone" /></div></article>
            <article v-if="isVisible('frappe-month-picker')" class="component-card"><header><div><strong>Month picker</strong><span>Month and year selection</span></div><code>frappe-ui/MonthPicker.vue</code></header><div class="component-demo"><FrappeMonthPicker v-model="frappeMonthValue" placeholder="Select month" /></div></article>
            <article v-if="isVisible('frappe-time-picker')" class="component-card"><header><div><strong>Time picker</strong><span>Time selection and custom entry</span></div><code>frappe-ui/TimePicker.vue</code></header><div class="component-demo"><FrappeTimePicker v-model="frappeTimeValue" variant="outline" placeholder="Select time" /></div></article>
            <article v-if="isVisible('frappe-multi-select')" class="component-card"><header><div><strong>Multi select</strong><span>Official Frappe multiple choice</span></div><code>frappe-ui/MultiSelect.vue</code></header><div class="component-demo"><FrappeMultiSelect v-model="frappeMultiValue" :options="['Tokens','Components','Website']" placeholder="Choose surfaces" /></div></article>
            <article v-if="isVisible('frappe-error-message')" class="component-card"><header><div><strong>Error message</strong><span>Official Frappe validation</span></div><code>frappe-ui/ErrorMessage.vue</code></header><div class="component-demo"><FrappeErrorMessage message="This field needs attention." /></div></article>
            <article v-if="isVisible('frappe-password')" class="component-card"><header><div><strong>Password</strong><span>Revealable secure text field</span></div><code>frappe-ui/Password.vue</code></header><div class="component-demo"><FrappePassword v-model="frappePasswordValue" label="API password" variant="outline" placeholder="Enter password" /></div></article>
            <article v-if="isVisible('frappe-file-uploader')" class="component-card"><header><div><strong>File uploader</strong><span>Official upload interaction</span></div><code>frappe-ui/FileUploader.vue</code></header><div class="component-demo"><FrappeFileUploader /></div></article>
            <article v-if="isVisible('frappe-list-view')" class="component-card component-card--wide"><header><div><strong>List view</strong><span>System table with selection and row states</span></div><code>frappe-ui/ListView.vue</code></header><div class="component-demo"><div class="frappe-data-surface"><FrappeListView :columns="frappeColumns" :rows="rows" row-key="name" :options="{ selectable: true, rowHeight: 44 }" /></div></div></article>
            <article v-if="isVisible('frappe-tree')" class="component-card"><header><div><strong>Tree</strong><span>System hierarchy</span></div><code>frappe-ui/Tree.vue</code></header><div class="component-demo"><div class="frappe-tree-surface"><FrappeTree :node="frappeTree" :options="{ defaultCollapsed: false, rowHeight: '32px', indentWidth: '20px', showIndentationGuides: true }" /></div></div></article>
            <article v-if="isVisible('frappe-calendar')" class="component-card component-card--wide"><header><div><strong>Calendar</strong><span>System month, week and day scheduling</span></div><code>frappe-ui/Calendar.vue</code></header><div class="component-demo"><CalendarShowcase /></div></article>
          </div>
        </template>

        <template v-if="showSpecialists">
          <header class="provider-heading"><div><span class="provider-label">SPECIALISTS</span><h3 class="display-heading text-2">Complex capabilities</h3></div><p>Owned wrappers translate tokens into DOM, SVG, and canvas providers.</p></header>
          <div class="specialist-grid"><article v-if="isVisible('echarts')" class="specialist-card"><header><div><span>ECharts</span><strong>Chart</strong></div><FrappeBadge label="Canvas" theme="gray" /></header><ChartShowcase /></article><article v-if="isVisible('gantt')" class="specialist-card"><header><div><span>Frappe Gantt</span><strong>Timeline</strong></div><FrappeBadge label="SVG" theme="gray" /></header><div class="p-xs"><GanttShowcase /></div></article><article v-if="isVisible('flow')" class="specialist-card specialist-card--wide"><header><div><span>Vue Flow</span><strong>Node graph</strong></div><FrappeBadge label="SVG + DOM" theme="gray" /></header><FlowShowcase /></article></div>
        </template>

        <section v-if="routedOnlyComponents.length" class="routed-inventory">
          <header><div><span class="provider-label">FULL ROUTED INVENTORY</span><h3 class="mt-xs display-heading text-2">Available through the shared UI layer</h3></div><p>These are official installed/exported components. Add an expanded demo card when you begin evaluating or using one.</p></header>
          <div class="routed-inventory-grid"><article v-for="component in routedOnlyComponents" :key="component.id"><div><strong>{{ component.name }}</strong><span>{{ component.provider }} · {{ component.category }}</span></div><code>{{ component.route }}</code><small>{{ component.source }}</small></article></div>
        </section>

        <div v-if="!visibleComponents.length" class="empty-library"><Search :size="24" /><strong>No components match</strong><p>Clear or broaden the filters to restore the inventory.</p></div>
      </section>

    </main>
  </div>
</template>

<style scoped>
.field-label{display:grid;gap:.45rem;font-size:.75rem;font-weight:600;color:var(--theme-text-muted)}
.primitive-function{margin:0;padding:0 var(--spacing-xs) var(--spacing-xs);color:var(--theme-text-muted);font-size:var(--font-size--2);line-height:var(--font-line-height-5)}
.primitive-card :deep(.component-demo){padding:var(--spacing-xs)}
.concept-recipe{display:flex;flex-wrap:wrap;gap:.35rem;padding:0 var(--spacing-xs) var(--spacing-xs)}.concept-recipe code{border:1px solid var(--theme-border);border-radius:999px;padding:.2rem .45rem;background:var(--theme-surface);font-size:.6rem;color:var(--theme-text-muted)}
.concept-filters{grid-template-columns:minmax(14rem,2fr) minmax(10rem,1fr)}
</style>
