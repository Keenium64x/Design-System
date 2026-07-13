<script setup>
import { ArrowRight, Menu } from "lucide-vue-next";
import VisualPrimitivePreview from "@/components/primitives/VisualPrimitivePreview.vue";
import { visualPrimitiveRegistry } from "@/lib/visual-primitive-registry";
import { testSiteConfigurations } from "@/lib/test-site-configurations";
import { Badge as UiBadge, Button as UiButton } from "@/ui/shadcn";

// =============================================================================
// region RADIAL EDITORIAL COMPOSITION
// =============================================================================

const primitive = (id) =>
  visualPrimitiveRegistry.find((item) => item.id === id);
const siteTokens = testSiteConfigurations.radial.style;
const collection = [
  { number: "01", name: "Ritual vessels", detail: "Clay · fire · mineral" },
  { number: "02", name: "Woven memory", detail: "Fibre · rhythm · hand" },
  { number: "03", name: "New heirlooms", detail: "Bronze · wood · time" },
];

// endregion RADIAL EDITORIAL COMPOSITION
</script>

<template>
  <article class="archive-site" :style="siteTokens">
    <VisualPrimitivePreview
      class="primitive tonal"
      :primitive="primitive('tonal-radial')"
      :values="{ originX: 72, originY: 39, falloff: 70, opacity: 0.22 }"
    />
    <VisualPrimitivePreview
      class="primitive rings"
      :primitive="primitive('concentric-rings')"
      :values="{
        originX: 72,
        originY: 39,
        density: 6,
        spacing: 54,
        lineWidth: 0.45,
        opacity: 0.18,
        mask: 'right',
      }"
    />
    <VisualPrimitivePreview
      class="primitive axis"
      :primitive="primitive('construction-axis')"
      :values="{
        originX: 72,
        originY: 39,
        lineWidth: 0.45,
        opacity: 0.12,
        mask: 'right',
      }"
    />

    <header class="archive-nav">
      <a href="#" class="wordmark"><i /> ORISON</a>
      <nav aria-label="Archive navigation">
        <a href="#collection">Collection</a><a href="#journal">Journal</a
        ><a href="#about">About</a>
      </nav>
      <UiButton variant="ghost" size="icon-sm" aria-label="Open menu"
        ><Menu
      /></UiButton>
    </header>

    <main>
      <section class="archive-copy">
        <UiBadge variant="outline">Independent archive · 2026</UiBadge>
        <h1>Form carries<br /><em>memory.</em></h1>
        <p>
          Objects, makers and rituals shaping a living record of contemporary
          African material culture.
        </p>
        <div class="archive-actions">
          <UiButton as="a" href="#collection"
            >Explore the collection <ArrowRight
          /></UiButton>
          <a href="#about" class="text-link">Read our approach</a>
        </div>
      </section>

      <section class="archive-object" aria-label="Featured object">
        <div class="object-stage">
          <div class="vessel"><i /><span /></div>
        </div>
        <div class="object-caption">
          <span>Featured object / 07</span><strong>Burnished vessel</strong
          ><small>KwaZulu-Natal · 1984</small>
        </div>
      </section>
    </main>

    <section id="collection" class="collection-strip">
      <article v-for="item in collection" :key="item.number">
        <span>{{ item.number }}</span>
        <div>
          <strong>{{ item.name }}</strong
          ><small>{{ item.detail }}</small>
        </div>
        <ArrowRight />
      </article>
    </section>
  </article>
</template>

<style scoped>
.archive-site {
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
.tonal {
  opacity: 0.8;
}
.rings,
.axis {
  opacity: 0.68;
}
.archive-nav {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 5.5rem;
  margin-inline: var(--grid-gutter);
  border-bottom: 1px solid
    color-mix(in oklch, var(--theme-text) 14%, transparent);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.wordmark {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.18em;
}
.wordmark i {
  width: 0.55rem;
  aspect-ratio: 1;
  border: 1px solid var(--theme-primary);
  transform: rotate(45deg);
}
.archive-nav nav {
  display: flex;
  gap: 2rem;
  color: var(--theme-text-muted);
}
.archive-nav > button {
  justify-self: end;
  color: var(--theme-text);
}
main {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--grid-gutter);
  min-height: calc(100vh - 13.5rem);
  align-items: center;
  padding: clamp(3rem, 7vh, 6rem) var(--grid-gutter);
}
.archive-copy {
  grid-column: 1 / span 6;
  max-width: 42rem;
}
.archive-copy > [data-v] {
  max-width: max-content;
}
.archive-copy :deep(.border) {
  border-color: color-mix(in oklch, var(--theme-primary) 55%, transparent);
  background: color-mix(in oklch, var(--theme-primary) 7%, transparent);
  color: var(--theme-primary);
  font-family: var(--font-family-mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.archive-copy h1 {
  max-width: 9ch;
  margin: 1.6rem 0 0;
  font-family: var(--font-family-b);
  font-size: clamp(4.2rem, 8.5vw, 8.2rem);
  font-weight: 400;
  letter-spacing: -0.075em;
  line-height: 0.82;
}
.archive-copy h1 em {
  color: var(--theme-primary);
  font-weight: 400;
}
.archive-copy > p {
  max-width: 33rem;
  margin: 1.8rem 0 0;
  color: var(--theme-text-muted);
  font-size: clamp(0.82rem, 1vw, 1rem);
  line-height: 1.7;
}
.archive-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}
.archive-actions :deep(.bg-primary) {
  box-shadow: none;
  font-size: 0.7rem;
}
.text-link {
  border-bottom: 1px solid
    color-mix(in oklch, var(--theme-text) 35%, transparent);
  padding: 0.55rem 0;
  color: var(--theme-text-muted);
  font-size: 0.7rem;
}
.archive-object {
  grid-column: 8/-1;
  position: relative;
  align-self: stretch;
  display: grid;
  align-content: center;
}
.object-stage {
  position: relative;
  display: grid;
  width: min(100%, 32rem);
  aspect-ratio: 4/5;
  place-items: center;
  margin-inline: auto;
  border: 1px solid color-mix(in oklch, var(--theme-text) 12%, transparent);
  background: radial-gradient(
    circle at 50% 44%,
    color-mix(in oklch, var(--theme-primary) 18%, transparent),
    transparent 48%
  );
}
.object-stage:before,
.object-stage:after {
  content: "";
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-color: var(--theme-primary);
}
.object-stage:before {
  left: -1px;
  top: -1px;
  border-left: 1px solid;
  border-top: 1px solid;
}
.object-stage:after {
  right: -1px;
  bottom: -1px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}
.vessel {
  position: relative;
  width: 46%;
  height: 58%;
  border-radius: 44% 44% 18% 18%/30% 30% 12% 12%;
  background: linear-gradient(
    105deg,
    #392e20,
    #b79252 38%,
    #e1c47c 51%,
    #75572f 70%,
    #241d16
  );
  box-shadow: 0 35px 55px rgb(0 0 0/0.38);
}
.vessel:before {
  content: "";
  position: absolute;
  left: 20%;
  right: 20%;
  top: -4%;
  height: 11%;
  border-radius: 50%;
  background: #17130f;
  box-shadow: inset 0 3px 0 #9d7b44;
}
.vessel i {
  position: absolute;
  inset: 16% 9% auto;
  height: 1px;
  background: rgb(238 233 220/0.25);
  box-shadow:
    0 12px rgb(238 233 220/0.12),
    0 24px rgb(238 233 220/0.09);
}
.vessel span {
  position: absolute;
  right: 12%;
  top: 18%;
  width: 8%;
  height: 60%;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    transparent,
    rgb(255 238 188/0.42),
    transparent
  );
  filter: blur(4px);
}
.object-caption {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.2rem;
  margin-top: 1rem;
  font-size: 0.64rem;
}
.object-caption span {
  grid-column: 1/-1;
  color: var(--theme-primary);
  font-family: var(--font-family-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.object-caption strong {
  font-size: 0.78rem;
}
.object-caption small {
  color: var(--theme-text-muted);
}
.collection-strip {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid color-mix(in oklch, var(--theme-text) 14%, transparent);
}
.collection-strip article {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  min-height: 7.5rem;
  padding: 1rem var(--grid-gutter);
  border-right: 1px solid
    color-mix(in oklch, var(--theme-text) 14%, transparent);
}
.collection-strip article:last-child {
  border-right: 0;
}
.collection-strip > article > span {
  color: var(--theme-primary);
  font: 600 0.58rem var(--font-family-mono);
}
.collection-strip strong,
.collection-strip small {
  display: block;
}
.collection-strip strong {
  font-family: var(--font-family-b);
  font-size: 0.92rem;
}
.collection-strip small {
  margin-top: 0.2rem;
  color: var(--theme-text-muted);
  font-size: 0.62rem;
}
.collection-strip svg {
  width: 0.9rem;
  color: var(--theme-text-muted);
}
@media (max-width: 800px) {
  .archive-nav {
    grid-template-columns: 1fr auto;
  }
  .archive-nav nav {
    display: none;
  }
  main {
    display: block;
    padding-top: 3.5rem;
  }
  .archive-copy {
    max-width: 36rem;
  }
  .archive-copy h1 {
    font-size: clamp(4rem, 18vw, 6.5rem);
  }
  .archive-object {
    margin-top: 4rem;
  }
  .object-stage {
    max-width: 25rem;
  }
  .collection-strip {
    grid-template-columns: 1fr;
  }
  .collection-strip article {
    border-right: 0;
    border-bottom: 1px solid
      color-mix(in oklch, var(--theme-text) 14%, transparent);
  }
}
</style>
