<script setup>
import { reactive, ref } from "vue"
import { Settings2 } from "lucide-vue-next"
import VisualPrimitivePreview from "./VisualPrimitivePreview.vue"
import SystemRangeField from "@/components/system/SystemRangeField.vue"
import SystemSelectField from "@/components/system/SystemSelectField.vue"
import SystemColorField from "@/components/system/SystemColorField.vue"
import { getPrimitiveDefaults } from "@/lib/visual-primitive-registry"

const props = defineProps({ primitive: { type: Object, required: true } })
const values = reactive(getPrimitiveDefaults(props.primitive))
const controlsOpen = ref(false)
const showGuides = ref(false)
</script>

<template>
  <article class="component-card primitive-card">
    <header>
      <div><strong>{{ primitive.name }}</strong><span>{{ primitive.category }} · {{ primitive.topology }}</span></div>
      <div class="primitive-tags"><code>{{ primitive.renderingMethod.toUpperCase() }}</code><code>{{ primitive.visualWeight }}</code></div>
    </header>
    <div class="component-demo"><VisualPrimitivePreview :primitive="primitive" :values="values" :show-guides="showGuides" /></div>
    <div class="primitive-copy"><p>{{ primitive.purpose }}</p><small>{{ primitive.contentSafeBehaviour }}</small></div>
    <div class="primitive-actions">
      <button type="button" @click="controlsOpen = !controlsOpen"><Settings2 :size="14" /> {{ controlsOpen ? 'Close controls' : 'Configure' }}</button>
      <label><input v-model="showGuides" type="checkbox" /> Origin + safe zone</label>
    </div>
    <div v-if="controlsOpen" class="primitive-controls">
      <template v-for="parameter in primitive.parameters" :key="parameter.key">
        <SystemRangeField v-if="parameter.type === 'number'" v-model="values[parameter.key]" :label="parameter.label" :min="parameter.min" :max="parameter.max" :step="parameter.step" />
        <SystemSelectField v-else-if="parameter.type === 'select'" v-model="values[parameter.key]" :label="parameter.label" :options="parameter.options" />
        <SystemColorField v-else-if="parameter.type === 'color' && String(values[parameter.key]).startsWith('#')" v-model="values[parameter.key]" :label="parameter.label" description="Local primitive value" />
      </template>
      <dl class="primitive-contract"><div><dt>Node</dt><dd>{{ primitive.nodeKind }}</dd></div><div><dt>Input</dt><dd>{{ primitive.inputChannels.join(' · ') || 'composition' }}</dd></div><div><dt>Output</dt><dd>{{ primitive.outputChannels.join(' · ') }}</dd></div><div><dt>Compatible</dt><dd>{{ primitive.compatibleMotifs.join(' · ') }}</dd></div><div><dt>Opacity</dt><dd>{{ primitive.recommendedOpacityRange.join('–') }}</dd></div><div><dt>Cost</dt><dd>{{ primitive.performanceCost }}</dd></div></dl>
      <div class="primitive-rules"><p><strong>Use:</strong> {{ primitive.usageRules[0] }}</p><p><strong>Avoid:</strong> {{ primitive.failureModes[0] }}</p></div>
      <p class="primitive-implementation"><strong>Implementation:</strong> {{ primitive.implementation }}</p>
    </div>
  </article>
</template>

<style scoped>
.primitive-tags{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:.3rem}.primitive-copy{display:grid;gap:.35rem;padding:0 var(--spacing-xs) var(--spacing-xs)}.primitive-copy p,.primitive-copy small{margin:0}.primitive-copy p{font-size:var(--font-size--2);line-height:1.5}.primitive-copy small{color:var(--theme-text-muted);font-size:.65rem}.primitive-actions{display:flex;align-items:center;justify-content:space-between;gap:.75rem;border-top:1px solid var(--theme-border);padding:.65rem var(--spacing-xs);font-size:.65rem;color:var(--theme-text-muted)}.primitive-actions button,.primitive-actions label{display:flex;align-items:center;gap:.4rem}.primitive-actions button{color:var(--theme-primary);font-weight:650}.primitive-actions input{accent-color:var(--theme-primary)}.primitive-controls{border-top:1px solid var(--theme-border);background:var(--theme-surface);padding:var(--spacing-xs)}.primitive-contract{display:grid;grid-template-columns:repeat(3,1fr);gap:.4rem;margin:1rem 0 0}.primitive-contract div{border:1px solid var(--theme-border);border-radius:var(--radius-2);padding:.5rem}.primitive-contract dt{font-size:.55rem;color:var(--theme-text-muted);text-transform:uppercase}.primitive-contract dd{margin:.2rem 0 0;font-size:.62rem}.primitive-rules,.primitive-implementation{margin-top:.65rem;font-size:.62rem;color:var(--theme-text-muted)}.primitive-rules p{margin:.2rem 0}.primitive-rules strong,.primitive-implementation strong{color:var(--theme-text)}
</style>
