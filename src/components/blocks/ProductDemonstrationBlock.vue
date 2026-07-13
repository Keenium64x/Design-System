<script setup>
import { ArrowRight, CircleDot } from "lucide-vue-next";
import VisualPrimitivePreview from "@/components/primitives/VisualPrimitivePreview.vue";
import { visualPrimitiveRegistry } from "@/lib/visual-primitive-registry";
import {
  Badge as UiBadge,
  Button as UiButton,
  Card as UiCard,
  CardContent as UiCardContent,
  Progress as UiProgress,
} from "@/ui/shadcn";
const primitive = (id) =>
  visualPrimitiveRegistry.find((item) => item.id === id);
const signals = [
  { label: "Inbound flow", value: "Nominal", score: 86 },
  { label: "Dock pressure", value: "Rising", score: 62 },
  { label: "Route variance", value: "Contained", score: 74 },
];
</script>

<template>
  <section class="demo-block block-grid-12">
    <div class="copy">
      <UiBadge variant="outline">01 / Detect</UiBadge>
      <h2>See the constraint before it becomes the day.</h2>
      <p>
        Meridian connects work, capacity and risk signals, then shows the reason
        behind every recommendation.
      </p>
      <UiButton variant="outline">Explore detection <ArrowRight /></UiButton>
    </div>
    <div class="stage">
      <VisualPrimitivePreview
        class="primitive"
        :primitive="primitive('perspective-grid')"
        :values="{
          originX: 70,
          originY: 42,
          density: 9,
          lineWidth: 0.4,
          opacity: 0.12,
          mask: 'none',
        }"
      /><UiCard class="console"
        ><header>
          <div><CircleDot /><span>FLOW MODEL</span></div>
          <UiBadge>Live</UiBadge>
        </header>
        <UiCardContent
          ><div class="chart">
            <svg viewBox="0 0 500 180" preserveAspectRatio="none">
              <path
                d="M0 145C70 137 93 105 145 113S224 82 277 92S367 28 500 48"
              />
              <line x1="368" x2="368" y1="12" y2="170" />
              <circle cx="368" cy="52" r="5" /></svg
            ><strong>84.6</strong><span>units / hour</span>
          </div>
          <div class="signals">
            <article v-for="signal in signals" :key="signal.label">
              <div>
                <span>{{ signal.label }}</span
                ><strong>{{ signal.value }}</strong>
              </div>
              <UiProgress :model-value="signal.score" />
            </article></div
        ></UiCardContent>
        <footer>
          <span>Updated 04 seconds ago</span><span>Confidence 96.2%</span>
        </footer></UiCard
      >
    </div>
  </section>
</template>

<style scoped>
.demo-block {
  align-items: center;
  padding: clamp(3rem, 7vw, 6rem) var(--block-gutter);
  background: var(--theme-surface);
}
.copy {
  grid-column: span 5;
  max-width: 34rem;
}
.copy :deep(.border) {
  color: var(--theme-primary);
}
h2 {
  margin: 1rem 0 0;
  font-family: var(--font-family-b);
  font-size: clamp(2.5rem, 5vw, 4.8rem);
  font-weight: 400;
  letter-spacing: -0.065em;
  line-height: 0.9;
}
.copy > p {
  margin: 1.4rem 0;
  color: var(--theme-text-muted);
  font-size: 0.78rem;
  line-height: 1.7;
}
.copy :deep(button) {
  font-size: 0.66rem;
}
.stage {
  position: relative;
  grid-column: 7/-1;
  min-width: 0;
}
.primitive {
  position: absolute !important;
  inset: -3rem;
  min-height: calc(100% + 6rem) !important;
  border: 0 !important;
  opacity: 0.65;
}
.primitive:deep(.primitive-preview) {
  min-height: 100%;
  border: 0;
  background: transparent;
}
.console {
  position: relative;
  overflow: hidden;
  border-color: color-mix(
    in oklch,
    var(--theme-primary) 22%,
    var(--theme-border)
  );
  background: color-mix(in oklch, var(--theme-surface-raised) 94%, transparent);
  box-shadow: var(--shadow-5);
}
.console > header,
.console > footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  font: 600 0.52rem var(--font-family-mono);
  letter-spacing: 0.08em;
}
.console > header {
  border-bottom: 1px solid var(--theme-border);
}
.console > header > div {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--theme-primary);
}
.console > header svg {
  width: 0.85rem;
}
.console :deep(.p-6) {
  padding: 1rem;
}
.chart {
  position: relative;
  height: 12rem;
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-field);
  background: linear-gradient(var(--theme-field), var(--theme-surface));
}
.chart:before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--theme-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--theme-border) 1px, transparent 1px);
  background-size:
    100% 25%,
    20% 100%;
  opacity: 0.45;
}
.chart svg {
  position: absolute;
  inset: 1rem;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
}
.chart path {
  fill: none;
  stroke: var(--theme-primary);
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}
.chart line {
  stroke: var(--theme-primary);
  stroke-dasharray: 3 5;
  opacity: 0.5;
}
.chart circle {
  fill: var(--theme-primary);
  stroke: var(--theme-canvas);
  stroke-width: 3;
}
.chart strong,
.chart span {
  position: absolute;
  left: 1rem;
}
.chart strong {
  top: 1rem;
  font: 600 1.1rem var(--font-family-mono);
}
.chart span {
  top: 2.5rem;
  color: var(--theme-text-muted);
  font-size: 0.5rem;
}
.signals {
  display: grid;
  gap: 0.6rem;
  margin-top: 0.6rem;
}
.signals article {
  display: grid;
  grid-template-columns: 8rem 1fr;
  align-items: center;
  gap: 0.8rem;
}
.signals span,
.signals strong {
  display: block;
  font-size: 0.52rem;
}
.signals span {
  color: var(--theme-text-muted);
}
.signals strong {
  margin-top: 0.1rem;
  font-family: var(--font-family-mono);
  color: var(--theme-text);
}
.console > footer {
  border-top: 1px solid var(--theme-border);
  color: var(--theme-text-muted);
}
@media (max-width: 800px) {
  .demo-block {
    display: block;
  }
  .stage {
    margin-top: 3rem;
  }
  .signals article {
    grid-template-columns: 7rem 1fr;
  }
}
</style>
