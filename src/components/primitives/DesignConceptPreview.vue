<script setup>
import { computed } from "vue"
import { getPrimitiveStyle, visualPrimitiveRegistry } from "@/lib/visual-primitive-registry"

const props = defineProps({ concept: { type: Object, required: true } })
const layers = computed(() => props.concept.recipe
  .map((id) => visualPrimitiveRegistry.find((item) => item.id === id))
  .filter(Boolean))
</script>

<template>
  <div class="concept-preview">
    <div v-for="primitive in layers" :key="primitive.id" class="concept-layer" :style="getPrimitiveStyle(primitive)" />
    <div v-if="concept.id === 'corner-inset'" class="corner-inset" />
    <div v-if="concept.id === 'grid-bleed'" class="bleed-plane" />
    <div v-if="concept.id === 'split-plane'" class="split-plane" />
    <div v-if="concept.id === 'overlap-stack'" class="overlap-planes"><i/><i/><i/></div>
  </div>
</template>

<style scoped>
.concept-preview{position:relative;min-height:11rem;overflow:hidden;border:1px solid var(--theme-border);border-radius:var(--radius-3);background:var(--theme-surface);isolation:isolate}.concept-layer{position:absolute;inset:0;background-color:transparent}
.corner-inset{position:absolute;inset:1.25rem;background:linear-gradient(var(--theme-primary),var(--theme-primary)) left top/1.35rem 2px no-repeat,linear-gradient(var(--theme-primary),var(--theme-primary)) left top/2px 1.35rem no-repeat,linear-gradient(var(--theme-primary),var(--theme-primary)) right top/1.35rem 2px no-repeat,linear-gradient(var(--theme-primary),var(--theme-primary)) right top/2px 1.35rem no-repeat,linear-gradient(var(--theme-primary),var(--theme-primary)) left bottom/1.35rem 2px no-repeat,linear-gradient(var(--theme-primary),var(--theme-primary)) left bottom/2px 1.35rem no-repeat,linear-gradient(var(--theme-primary),var(--theme-primary)) right bottom/1.35rem 2px no-repeat,linear-gradient(var(--theme-primary),var(--theme-primary)) right bottom/2px 1.35rem no-repeat}
.bleed-plane{position:absolute;inset:28% -8% 25% 24%;background:color-mix(in oklch,var(--theme-primary) 68%,transparent);transform:rotate(-4deg)}.split-plane{position:absolute;inset:0 0 0 58%;border-left:2px solid var(--theme-surface);background:var(--primitive-gradient-sunset)}.overlap-planes{position:absolute;inset:15%;display:flex;align-items:center;justify-content:center}.overlap-planes i{width:42%;height:60%;margin-left:-12%;border:1px solid var(--theme-border);border-radius:var(--radius-3);background:var(--theme-surface-raised);box-shadow:var(--shadow-3);transform:rotate(-6deg)}.overlap-planes i:nth-child(2){background:var(--theme-primary);transform:translateY(8%) rotate(3deg)}.overlap-planes i:nth-child(3){background:var(--theme-secondary);transform:translateY(-5%) rotate(8deg)}
</style>
