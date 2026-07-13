<script setup>
import { ArrowRight } from "lucide-vue-next";
import VisualPrimitivePreview from "@/components/primitives/VisualPrimitivePreview.vue";
import { visualPrimitiveRegistry } from "@/lib/visual-primitive-registry";
import { Badge as UiBadge, Button as UiButton } from "@/ui/shadcn";
const primitive = (id) =>
  visualPrimitiveRegistry.find((item) => item.id === id);
</script>

<template>
  <section class="cta-block block-grid-12">
    <VisualPrimitivePreview
      class="primitive"
      :primitive="primitive('focal-glow')"
      :values="{
        originX: 82,
        originY: 50,
        radius: 55,
        intensity: 0.28,
        mask: 'none',
      }"
    />
    <div class="copy">
      <UiBadge variant="outline">The next decision</UiBadge>
      <h2>Make the operation visible before it becomes urgent.</h2>
    </div>
    <div class="action">
      <p>Start with one workflow. Prove the signal. Expand from clarity.</p>
      <UiButton>See Meridian in your operation <ArrowRight /></UiButton>
    </div>
  </section>
</template>

<style scoped>
.cta-block {
  position: relative;
  min-height: 25rem;
  align-items: end;
  overflow: hidden;
  padding: clamp(3rem, 7vw, 6rem) var(--block-gutter);
  background: var(--theme-text);
  color: var(--theme-canvas);
  isolation: isolate;
}
.primitive {
  position: absolute !important;
  inset: 0;
  min-height: 100% !important;
  border: 0 !important;
  pointer-events: none;
}
.primitive:deep(.primitive-preview) {
  min-height: 100%;
  border: 0;
  background: transparent;
}
.copy {
  position: relative;
  z-index: 2;
  grid-column: span 8;
}
.copy :deep(.border) {
  border-color: color-mix(in oklch, var(--theme-primary) 55%, transparent);
  color: var(--theme-primary);
}
h2 {
  max-width: 13ch;
  margin: 1rem 0 0;
  font-family: var(--font-family-b);
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 400;
  letter-spacing: -0.07em;
  line-height: 0.88;
}
.action {
  position: relative;
  z-index: 2;
  grid-column: span 4;
  display: grid;
  gap: 1.2rem;
  justify-items: start;
}
.action p {
  max-width: 22rem;
  color: color-mix(in oklch, var(--theme-canvas) 68%, transparent);
  font-size: 0.7rem;
  line-height: 1.65;
}
.action :deep(button) {
  font-size: 0.66rem;
}
@media (max-width: 760px) {
  .cta-block {
    display: block;
  }
  .action {
    margin-top: 2rem;
  }
}
</style>
