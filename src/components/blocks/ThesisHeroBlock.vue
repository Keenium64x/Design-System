<script setup>
import { ArrowUpRight, Sparkles } from "lucide-vue-next";
import VisualPrimitivePreview from "@/components/primitives/VisualPrimitivePreview.vue";
import { visualPrimitiveRegistry } from "@/lib/visual-primitive-registry";
import { Badge as UiBadge, Button as UiButton } from "@/ui/shadcn";
const primitive = (id) =>
  visualPrimitiveRegistry.find((item) => item.id === id);
</script>

<template>
  <section class="hero-block block-grid-12">
    <VisualPrimitivePreview
      class="primitive tonal"
      :primitive="primitive('tonal-radial')"
      :values="{ originX: 78, originY: 42, falloff: 72, opacity: 0.2 }"
    />
    <VisualPrimitivePreview
      class="primitive rings"
      :primitive="primitive('concentric-rings')"
      :values="{
        originX: 78,
        originY: 42,
        density: 5,
        spacing: 48,
        lineWidth: 0.4,
        opacity: 0.14,
        mask: 'right',
      }"
    />
    <div class="copy">
      <UiBadge variant="outline"><Sparkles /> Operational intelligence</UiBadge>
      <h2>Clarity for the moments that move everything.</h2>
      <p>
        Meridian turns scattered operational signals into one calm, explainable
        view of what deserves attention next.
      </p>
      <div class="actions">
        <UiButton>Explore the platform <ArrowUpRight /></UiButton
        ><UiButton variant="ghost">Watch the overview</UiButton>
      </div>
    </div>
    <div class="focal">
      <span class="orbit"
        ><i /><i /><strong>84%</strong><small>flow confidence</small></span
      >
      <p><b>7 systems</b><span>Connected and learning</span></p>
    </div>
  </section>
</template>

<style scoped>
.hero-block {
  position: relative;
  min-height: 34rem;
  align-items: center;
  overflow: hidden;
  padding: clamp(3rem, 7vw, 6rem) var(--block-gutter);
  background: var(--theme-canvas);
  isolation: isolate;
}
.primitive {
  position: absolute !important;
  inset: 0;
  min-height: 100% !important;
  border: 0 !important;
  border-radius: 0 !important;
  pointer-events: none;
}
.primitive:deep(.primitive-preview) {
  min-height: 100%;
  border: 0;
  border-radius: 0;
  background: transparent;
}
.primitive:deep(svg) {
  color: var(--theme-primary);
}
.tonal {
  opacity: 0.65;
}
.rings {
  opacity: 0.55;
}
.copy {
  position: relative;
  z-index: 3;
  grid-column: span 6;
  max-width: 42rem;
}
.copy :deep(.border) {
  border-color: color-mix(
    in oklch,
    var(--theme-primary) 45%,
    var(--theme-border)
  );
  color: var(--theme-primary);
}
h2 {
  max-width: 12ch;
  margin: 1.2rem 0 0;
  font-family: var(--font-family-b);
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: var(--font-display-weight);
  letter-spacing: -0.07em;
  line-height: 0.88;
}
.copy > p {
  max-width: 34rem;
  margin: 1.5rem 0 0;
  color: var(--theme-text-muted);
  font-size: 0.8rem;
  line-height: 1.7;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.6rem;
}
.actions :deep(button) {
  font-size: 0.67rem;
}
.focal {
  position: relative;
  z-index: 3;
  grid-column: 8/-1;
  display: grid;
  place-items: center;
}
.orbit {
  position: relative;
  display: grid;
  width: min(20rem, 100%);
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid
    color-mix(in oklch, var(--theme-primary) 25%, var(--theme-border));
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in oklch, var(--theme-primary) 16%, var(--theme-surface-raised)),
    var(--theme-canvas) 65%
  );
  box-shadow: 0 0 80px
    color-mix(in oklch, var(--theme-primary) 12%, transparent);
}
.orbit i {
  position: absolute;
  inset: 13%;
  border: 1px dashed color-mix(in oklch, var(--theme-primary) 28%, transparent);
  border-radius: 50%;
}
.orbit i:nth-child(2) {
  inset: 29%;
  border-style: solid;
}
.orbit strong,
.orbit small {
  position: absolute;
}
.orbit strong {
  font: 500 3rem var(--font-family-b);
}
.orbit small {
  margin-top: 4.5rem;
  color: var(--theme-text-muted);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.focal > p {
  display: flex;
  width: min(20rem, 100%);
  justify-content: space-between;
  margin-top: 1rem;
  border-top: 1px solid var(--theme-border);
  padding-top: 0.7rem;
  font-size: 0.6rem;
}
.focal > p span {
  color: var(--theme-text-muted);
}
@media (max-width: 760px) {
  .hero-block {
    display: block;
  }
  .copy {
    max-width: 36rem;
  }
  .focal {
    margin-top: 3.5rem;
  }
  .orbit {
    max-width: 17rem;
  }
  h2 {
    font-size: clamp(3.5rem, 15vw, 5.5rem);
  }
}
</style>
