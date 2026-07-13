<script setup>
import { ArrowRight, CircleDot, Play } from "lucide-vue-next";
import VisualPrimitivePreview from "@/components/primitives/VisualPrimitivePreview.vue";
import { visualPrimitiveRegistry } from "@/lib/visual-primitive-registry";
import { testSiteConfigurations } from "@/lib/test-site-configurations";
import {
  Button as UiButton,
  Card as UiCard,
  CardContent as UiCardContent,
} from "@/ui/shadcn";
import { FrappeBadge, FrappeProgress } from "@/ui/frappe";

// =============================================================================
// region OPERATIONAL PRODUCT COMPOSITION
// =============================================================================

const primitive = (id) =>
  visualPrimitiveRegistry.find((item) => item.id === id);
const siteTokens = testSiteConfigurations.perspective.style;
const signals = [
  { label: "Throughput", value: "+18.4%", detail: "vs. baseline" },
  { label: "Risk horizon", value: "14 days", detail: "3 constraints" },
  { label: "Confidence", value: "96.2%", detail: "model score" },
];

// endregion OPERATIONAL PRODUCT COMPOSITION
</script>

<template>
  <article class="systems-site frappe-adapter" :style="siteTokens">
    <VisualPrimitivePreview
      class="primitive horizon"
      :primitive="primitive('horizon-field')"
      :values="{ originY: 56, falloff: 88, opacity: 0.18 }"
    />
    <VisualPrimitivePreview
      class="primitive perspective"
      :primitive="primitive('perspective-grid')"
      :values="{
        originX: 74,
        originY: 47,
        density: 10,
        lineWidth: 0.4,
        opacity: 0.12,
        mask: 'right',
      }"
    />
    <VisualPrimitivePreview
      class="primitive beam"
      :primitive="primitive('directional-beam')"
      :values="{ rotation: -14, spread: 15, intensity: 0.12, mask: 'right' }"
    />

    <header class="system-nav">
      <a href="#" class="system-mark"><CircleDot /> AXIOM</a>
      <nav>
        <a href="#platform">Platform</a><a href="#solutions">Solutions</a
        ><a href="#company">Company</a>
      </nav>
      <UiButton as="a" href="#access" variant="outline" size="sm"
        >Request access <ArrowRight
      /></UiButton>
    </header>

    <main>
      <section class="system-copy">
        <FrappeBadge theme="green" class="live-badge"
          ><i /> Model online · 7 systems connected</FrappeBadge
        >
        <h1>Know the<br />constraint<br /><span>before it forms.</span></h1>
        <p>
          Axiom turns operational signals into an early, explainable view of
          risk—before flow, margin or delivery is affected.
        </p>
        <div class="system-actions">
          <UiButton as="a" href="#platform"
            >Explore platform <ArrowRight /></UiButton
          ><UiButton variant="ghost"><Play /> See how it works</UiButton>
        </div>
      </section>

      <section
        class="product-stage"
        aria-label="Axiom operational model preview"
      >
        <UiCard class="model-card">
          <header>
            <div>
              <span>FLOW MODEL / LIVE</span><strong>Network overview</strong>
            </div>
            <FrappeBadge theme="green">Nominal</FrappeBadge>
          </header>
          <UiCardContent class="model-content">
            <div class="model-graph">
              <svg
                viewBox="0 0 520 250"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 196 C72 188 74 148 140 154 S228 92 294 118 S387 55 520 72"
                />
                <path
                  class="area"
                  d="M0 196 C72 188 74 148 140 154 S228 92 294 118 S387 55 520 72V250H0Z"
                />
                <line x1="386" x2="386" y1="20" y2="230" />
                <circle cx="386" cy="70" r="5" />
              </svg>
              <div class="graph-label">
                <span>Projected throughput</span
                ><strong>84.6 units / hr</strong>
              </div>
            </div>
            <div class="signal-grid">
              <article v-for="signal in signals" :key="signal.label">
                <span>{{ signal.label }}</span
                ><strong>{{ signal.value }}</strong
                ><small>{{ signal.detail }}</small>
              </article>
            </div>
            <div class="confidence">
              <div><span>Model confidence</span><strong>96.2%</strong></div>
              <FrappeProgress :value="96.2" size="md" />
            </div>
          </UiCardContent>
        </UiCard>
      </section>
    </main>

    <footer>
      <span>Decision infrastructure for complex operations</span
      ><span>Built for real constraints—not dashboards.</span>
    </footer>
  </article>
</template>

<style scoped>
.systems-site {
  position: relative;
  min-height: calc(100vh - 4.5rem);
  overflow: hidden;
  background: var(--theme-canvas);
  color: var(--theme-text);
  font-family: var(--font-family-a);
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
.horizon {
  opacity: 0.75;
}
.perspective,
.beam {
  opacity: 0.72;
}
.system-nav {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 5.25rem;
  padding-inline: var(--grid-gutter);
  border-bottom: 1px solid
    color-mix(in oklch, var(--theme-primary) 15%, transparent);
  font-size: 0.65rem;
}
.system-mark {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--theme-accent);
  font-weight: 800;
  letter-spacing: 0.16em;
}
.system-mark svg {
  width: 1rem;
  color: var(--theme-primary);
}
.system-nav nav {
  display: flex;
  gap: 2rem;
  color: var(--theme-text-muted);
}
.system-nav > :deep(a:last-child) {
  justify-self: end;
  border-color: color-mix(in oklch, var(--theme-primary) 35%, transparent);
  color: var(--theme-accent);
}
main {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--grid-gutter);
  min-height: calc(100vh - 10rem);
  align-items: center;
  padding: clamp(3rem, 7vh, 6rem) var(--grid-gutter);
}
.system-copy {
  grid-column: 1 / span 5;
  max-width: 43rem;
}
.live-badge {
  display: inline-flex !important;
  width: max-content !important;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid color-mix(in oklch, var(--theme-primary) 32%, transparent) !important;
  background: color-mix(
    in oklch,
    var(--theme-primary) 8%,
    transparent
  ) !important;
  color: var(--theme-primary) !important;
  font: 600 0.58rem var(--font-family-mono) !important;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.live-badge i {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--theme-primary);
  box-shadow: 0 0 10px var(--theme-primary);
}
.system-copy h1 {
  margin: 1.5rem 0 0;
  font-family: var(--font-family-b);
  font-size: clamp(4rem, 7vw, 7rem);
  font-weight: 430;
  letter-spacing: -0.07em;
  line-height: 0.84;
}
.system-copy h1 span {
  color: var(--theme-primary);
}
.system-copy > p {
  max-width: 35rem;
  margin: 1.7rem 0 0;
  color: var(--theme-text-muted);
  font-size: 0.82rem;
  line-height: 1.7;
}
.system-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2rem;
}
.system-actions :deep(button),
.system-actions :deep(a) {
  font-size: 0.68rem;
}
.system-actions :deep(.bg-primary) {
  box-shadow: 0 0 30px
    color-mix(in oklch, var(--theme-primary) 18%, transparent);
}
.system-actions :deep(.hover\:bg-accent:hover) {
  background: var(--theme-surface);
}
.product-stage {
  grid-column: 7/-1;
}
.model-card {
  overflow: hidden;
  border-color: color-mix(
    in oklch,
    var(--theme-primary) 22%,
    var(--theme-border)
  );
  background: color-mix(in oklch, var(--theme-surface-raised) 90%, transparent);
  box-shadow: 0 40px 100px rgb(0 0 0/0.42);
  backdrop-filter: blur(18px);
}
.model-card > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.1rem;
  border-bottom: 1px solid var(--theme-border);
}
.model-card > header span,
.model-card > header strong {
  display: block;
}
.model-card > header span {
  color: var(--theme-primary);
  font: 600 0.53rem var(--font-family-mono);
  letter-spacing: 0.11em;
}
.model-card > header strong {
  margin-top: 0.18rem;
  font-size: 0.78rem;
}
.model-content {
  padding: 1rem !important;
}
.model-graph {
  position: relative;
  height: 18rem;
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-field);
  background: linear-gradient(
    180deg,
    color-mix(in oklch, var(--theme-primary) 5%, var(--theme-field)),
    var(--theme-surface)
  );
}
.model-graph:before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--theme-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--theme-border) 1px, transparent 1px);
  background-size:
    100% 25%,
    20% 100%;
  opacity: 0.38;
}
.model-graph svg {
  position: absolute;
  inset: 2rem 1rem 1rem;
  width: calc(100% - 2rem);
  height: calc(100% - 3rem);
  overflow: visible;
}
.model-graph path {
  fill: none;
  stroke: var(--theme-primary);
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}
.model-graph .area {
  fill: url(#none);
  stroke: none;
  opacity: 0.12;
}
.model-graph line {
  stroke: color-mix(in oklch, var(--theme-primary) 45%, transparent);
  stroke-dasharray: 3 5;
}
.model-graph circle {
  fill: var(--theme-primary);
  stroke: var(--theme-canvas);
  stroke-width: 3;
}
.graph-label {
  position: absolute;
  left: 1rem;
  top: 1rem;
}
.graph-label span,
.graph-label strong {
  display: block;
}
.graph-label span {
  color: var(--theme-text-muted);
  font-size: 0.56rem;
}
.graph-label strong {
  margin-top: 0.2rem;
  font-family: var(--font-family-mono);
  font-size: 0.7rem;
}
.signal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.55rem;
  margin-top: 0.55rem;
}
.signal-grid article {
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-field);
  background: var(--theme-surface);
  padding: 0.75rem;
}
.signal-grid span,
.signal-grid strong,
.signal-grid small {
  display: block;
}
.signal-grid span {
  color: var(--theme-text-muted);
  font-size: 0.53rem;
}
.signal-grid strong {
  margin-top: 0.35rem;
  font-family: var(--font-family-mono);
  font-size: 1.1rem;
  color: var(--theme-accent);
}
.signal-grid small {
  margin-top: 0.15rem;
  color: var(--theme-text-muted);
  font-size: 0.5rem;
}
.confidence {
  display: grid;
  grid-template-columns: 8rem 1fr;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}
.confidence > div span,
.confidence > div strong {
  display: block;
}
.confidence > div span {
  color: var(--theme-text-muted);
  font-size: 0.52rem;
}
.confidence > div strong {
  margin-top: 0.15rem;
  font-family: var(--font-family-mono);
  font-size: 0.72rem;
}
.confidence :deep(.bg-surface-gray-2) {
  background: var(--theme-field);
}
.confidence :deep(.bg-surface-gray-7) {
  background: var(--theme-primary);
}
footer {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  min-height: 4.5rem;
  align-items: center;
  padding-inline: var(--grid-gutter);
  border-top: 1px solid
    color-mix(in oklch, var(--theme-primary) 15%, transparent);
  color: var(--theme-text-muted);
  font: 600 0.55rem var(--font-family-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
@media (max-width: 900px) {
  .system-nav {
    grid-template-columns: 1fr auto;
  }
  .system-nav nav {
    display: none;
  }
  main {
    display: block;
  }
  .system-copy {
    max-width: 44rem;
  }
  .system-copy h1 {
    font-size: clamp(4rem, 16vw, 7rem);
  }
  .product-stage {
    margin-top: 4rem;
  }
  .signal-grid {
    grid-template-columns: 1fr;
  }
  .confidence {
    grid-template-columns: 1fr;
  }
  footer {
    gap: 1rem;
  }
}
</style>
