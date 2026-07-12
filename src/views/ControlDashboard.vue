<script setup>
import { Check, Moon, RotateCcw, Sun } from "lucide-vue-next"
import SystemColorField from "@/components/system/SystemColorField.vue"
import SystemRangeField from "@/components/system/SystemRangeField.vue"
import SystemSelectField from "@/components/system/SystemSelectField.vue"
import { controls, resetControls } from "@/lib/design-system"
import { FrappeAlert, FrappeBadge, FrappeButton, FrappeFormControl, FrappeSwitch } from "@/ui/frappe"

defineEmits(["navigate"])

// =============================================================================
// region CONTROL PLANE MODEL
// =============================================================================

const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900]
const palettes = ["primary", "secondary", "accent", "neutral", "white", "black"]
const colorFields = [
  ["primary500", "Primary", "Main actions and emphasis"],
  ["secondary500", "Secondary", "Supporting brand color"],
  ["accent500", "Accent", "Highlights and data"],
  ["neutral500", "Neutral", "Borders and quiet UI"],
  ["white500", "White tone", "Light-mode material"],
  ["black500", "Black tone", "Dark-mode material"],
]
const fontOptions = [
  { value: "modern", label: "Modern sans" },
  { value: "neo", label: "Neo grotesk" },
  { value: "geometric", label: "Geometric" },
  { value: "editorial", label: "Editorial serif" },
]
const swatchStyle = (palette, step) => ({ background: `var(--color-${palette}-${step})` })

// endregion CONTROL PLANE MODEL
</script>

<template>
  <div class="studio-page">
    <header class="page-intro">
      <div><p class="section-kicker">Configure</p><h1 class="display-heading text-4">Author decisions, not every shade.</h1></div>
      <p class="max-w-xl text--1 text-muted-foreground">Choose each 500 anchor. The studio generates the perceptually related ramp and routes it through components, blocks, and the 12-column website.</p>
    </header>

    <div class="control-workspace control-workspace--revised">
      <aside class="control-sidebar">
        <header class="control-sidebar-header">
          <div><strong>System controls</strong><span>Live output</span></div>
          <FrappeButton class="frappe-adapter" variant="ghost" theme="gray" tooltip="Reset system" aria-label="Reset system" @click="resetControls"><RotateCcw :size="15" /></FrappeButton>
        </header>

        <div class="control-groups">
          <section class="control-group">
            <p class="control-heading">Mode</p>
            <div class="mode-picker frappe-adapter">
              <FrappeButton :variant="controls.theme === 'light' ? 'solid' : 'ghost'" theme="gray" @click="controls.theme = 'light'"><template #prefix><Sun :size="15" /></template>Light</FrappeButton>
              <FrappeButton :variant="controls.theme === 'dark' ? 'solid' : 'ghost'" theme="gray" @click="controls.theme = 'dark'"><template #prefix><Moon :size="15" /></template>Dark</FrappeButton>
            </div>
          </section>

          <details class="control-group" open>
            <summary class="control-heading">500 anchors <span>6 inputs</span></summary>
            <div class="color-field-list">
              <SystemColorField v-for="([key,label,description]) in colorFields" :key="key" v-model="controls[key]" :label="label" :description="description" />
            </div>
          </details>

          <details class="control-group" open>
            <summary class="control-heading">Typography <span>Roles</span></summary>
            <div class="control-pair"><SystemSelectField v-model="controls.displayFont" label="Display" :options="fontOptions" /><SystemSelectField v-model="controls.bodyFont" label="Body" :options="fontOptions" /></div>
            <SystemRangeField v-model="controls.bodySize" label="Base size" :min="14" :max="22" :display-value="`${controls.bodySize}px`" />
            <SystemRangeField v-model="controls.displayWeight" label="Display weight" :min="200" :max="800" :step="100" />
            <SystemRangeField v-model="controls.bodyLineHeight" label="Line height" :min="1.2" :max="1.9" :step="0.05" />
            <SystemRangeField v-model="controls.headingTracking" label="Heading tracking" :min="-0.08" :max="0.08" :step="0.005" :display-value="`${controls.headingTracking}em`" />
          </details>

          <details class="control-group">
            <summary class="control-heading">Component geometry <span>Independent</span></summary>
            <SystemRangeField v-model="controls.radius" label="Base radius step" :min="0" :max="12" :display-value="`${controls.radius}px`" />
            <SystemRangeField v-model="controls.fieldRadius" label="Field radius" :min="0" :max="24" :display-value="`${controls.fieldRadius}px`" />
            <SystemRangeField v-model="controls.buttonRadius" label="Button radius" :min="0" :max="32" :display-value="`${controls.buttonRadius}px`" />
            <SystemRangeField v-model="controls.cardRadius" label="Card radius" :min="0" :max="32" :display-value="`${controls.cardRadius}px`" />
            <SystemRangeField v-model="controls.blockRadius" label="Block radius" :min="0" :max="48" :display-value="`${controls.blockRadius}px`" />
            <SystemRangeField v-model="controls.borderWidth" label="Border weight" :min="0" :max="3" :step="0.5" :display-value="`${controls.borderWidth}px`" />
            <SystemRangeField v-model="controls.componentScale" label="Component scale" :min="0.8" :max="1.25" :step="0.05" />
          </details>

          <details class="control-group">
            <summary class="control-heading">Layout & motion <span>System</span></summary>
            <SystemRangeField v-model="controls.maxWidth" label="Content width" :min="960" :max="1600" :step="40" :display-value="`${controls.maxWidth}px`" />
            <SystemRangeField v-model="controls.gutter" label="12-column gutter" :min="12" :max="72" :step="4" :display-value="`${controls.gutter}px`" />
            <SystemRangeField v-model="controls.spacingScale" label="Spacing density" :min="0.8" :max="1.3" :step="0.05" />
            <SystemRangeField v-model="controls.shadowStrength" label="Shadow depth" :min="0" :max="0.7" :step="0.05" />
            <SystemRangeField v-model="controls.motionSpeed" label="Motion speed" :min="0.5" :max="2" :step="0.1" />
            <SystemRangeField v-model="controls.patternOpacity" label="Pattern opacity" :min="0" :max="0.6" :step="0.02" />
            <SystemRangeField v-model="controls.glowIntensity" label="Glow intensity" :min="0" :max="0.7" :step="0.05" />
          </details>
        </div>
      </aside>

      <main class="preview-stage control-proof">
        <section class="system-status frappe-adapter">
          <FrappeAlert theme="green" title="System synchronized" description="The selected 500 anchors generated six complete ramps and updated every connected surface." :dismissable="false" />
        </section>

        <section class="ramp-proof">
          <header><div><p class="section-kicker">Generated output</p><h2 class="display-heading text-3">Six anchored OKLCH ramps</h2></div><FrappeBadge class="frappe-adapter" theme="green" label="500 preserved" /></header>
          <div class="ramp-proof-list"><div v-for="palette in palettes" :key="palette" class="ramp-proof-row"><span>{{ palette }}</span><div><i v-for="step in steps" :key="step" :style="swatchStyle(palette, step)"><small>{{ step }}</small></i></div></div></div>
        </section>

        <section class="control-proof-grid frappe-adapter">
          <article class="control-proof-card control-proof-card--wide"><p class="section-kicker">Component proof</p><h3 class="mt-xs display-heading text-2">Operational controls inherit the generated system.</h3><div class="control-proof-actions"><FrappeButton theme="blue" variant="solid" label="Save system" /><FrappeButton theme="gray" variant="outline" label="Preview website" @click="$emit('navigate', 'example')" /></div></article>
          <article class="control-proof-card"><FrappeFormControl label="Project name" variant="outline" placeholder="Northstar" /><FrappeFormControl class="mt-xs" label="Surface style" type="select" :options="['Quiet','Balanced','Expressive']" /></article>
          <article class="control-proof-card"><FrappeSwitch :model-value="true" label="Automatic sync" description="Push token changes to every proof." /><div class="mt-s flex flex-wrap gap-xs"><FrappeBadge label="Ready" theme="green" /><FrappeBadge label="Review" theme="orange" /><FrappeBadge label="Draft" theme="gray" /></div></article>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.control-sidebar-header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--theme-border);padding:var(--spacing-s)}.control-sidebar-header strong,.control-sidebar-header span{display:block}.control-sidebar-header strong{font-size:.78rem}.control-sidebar-header span{margin-top:.1rem;color:var(--theme-text-muted);font-size:.62rem}.color-field-list{display:grid;gap:.45rem;margin-top:.8rem}.control-pair{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}.system-status>div{border:1px solid color-mix(in oklch,var(--theme-success) 35%,var(--theme-border));background:color-mix(in oklch,var(--theme-success) 12%,var(--theme-surface-raised))}.ramp-proof,.control-proof-card{border:1px solid var(--theme-border);border-radius:var(--component-radius-block);background:var(--theme-surface-raised);box-shadow:var(--shadow-2)}.ramp-proof{padding:var(--spacing-m)}.ramp-proof>header{display:flex;align-items:end;justify-content:space-between;gap:var(--spacing-s)}.ramp-proof-list{display:grid;gap:.55rem;margin-top:var(--spacing-m)}.ramp-proof-row{display:grid;grid-template-columns:5rem 1fr;align-items:center;gap:.75rem}.ramp-proof-row>span{color:var(--theme-text-muted);font-size:.68rem;text-transform:capitalize}.ramp-proof-row>div{display:grid;grid-template-columns:repeat(9,minmax(0,1fr));overflow:hidden;border-radius:var(--component-radius-field)}.ramp-proof-row i{display:flex;min-height:3.2rem;align-items:end;padding:.28rem}.ramp-proof-row small{font-size:.48rem;color:color-mix(in oklch,var(--theme-text) 65%,transparent);mix-blend-mode:difference}.control-proof-grid{display:grid;gap:var(--spacing-s)}.control-proof-card{padding:var(--spacing-m)}.control-proof-actions{display:flex;flex-wrap:wrap;gap:var(--control-gap);margin-top:var(--spacing-s)}@media(min-width:48rem){.control-proof-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.control-proof-card--wide{grid-column:span 2}}
</style>
