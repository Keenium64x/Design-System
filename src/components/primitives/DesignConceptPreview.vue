<script setup>
import { computed } from "vue"
import VisualPrimitivePreview from "./VisualPrimitivePreview.vue"
import { visualPrimitiveRegistry } from "@/lib/visual-primitive-registry"

const props = defineProps({ concept: { type: Object, required: true } })
const layers = computed(() => props.concept.recipe.map((id) => visualPrimitiveRegistry.find((item) => item.id === id)).filter(Boolean))
</script>

<template>
  <div class="concept-preview">
    <VisualPrimitivePreview v-for="primitive in layers" :key="primitive.id" class="concept-layer" :primitive="primitive" />
    <div class="concept-safe-zone"><span>CONTENT SAFE ZONE</span></div>
    <div class="concept-focal-slot"><span>{{ concept.focalSlot }}</span></div>
    <div class="concept-caption"><small>{{ concept.topology }}</small><strong>{{ concept.concept }}</strong></div>
  </div>
</template>

<style scoped>
.concept-preview{position:relative;min-height:22rem;overflow:hidden;border:1px solid var(--theme-border);border-radius:var(--radius-3);background:var(--theme-canvas);isolation:isolate}.concept-layer{position:absolute!important;inset:0;min-height:100%!important;border:0!important;border-radius:0!important;background:transparent!important}.concept-safe-zone{position:absolute;z-index:30;left:16%;right:16%;bottom:12%;height:28%;border:1px dashed color-mix(in oklch,var(--theme-success) 40%,transparent);display:flex;align-items:flex-end;justify-content:center;padding:.35rem;color:color-mix(in oklch,var(--theme-success) 70%,var(--theme-text));font:600 .52rem var(--font-family-mono);letter-spacing:.12em}.concept-caption{position:absolute;z-index:31;left:1rem;top:1rem;display:grid;max-width:13rem;gap:.2rem}.concept-caption small{font:600 .55rem var(--font-family-mono);letter-spacing:.13em;text-transform:uppercase;color:var(--theme-primary)}.concept-caption strong{font-size:.78rem;line-height:1.35}
.concept-focal-slot{position:absolute;z-index:29;left:50%;top:38%;display:grid;width:22%;aspect-ratio:1;place-items:center;border:1px dashed color-mix(in oklch,var(--theme-primary) 65%,transparent);border-radius:50%;transform:translate(-50%,-50%);background:color-mix(in oklch,var(--theme-primary) 5%,transparent);color:var(--theme-primary);font:600 .5rem var(--font-family-mono);text-align:center}
</style>
