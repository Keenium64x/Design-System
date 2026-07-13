<script setup>
import { ArrowUpRight } from "lucide-vue-next";
import VisualPrimitivePreview from "@/components/primitives/VisualPrimitivePreview.vue";
import { visualPrimitiveRegistry } from "@/lib/visual-primitive-registry";
import { testSiteConfigurations } from "@/lib/test-site-configurations";
import { Badge as UiBadge, Button as UiButton } from "@/ui/shadcn";

// =============================================================================
// region ARCHITECTURAL SPLIT COMPOSITION
// =============================================================================

const primitive = (id) =>
  visualPrimitiveRegistry.find((item) => item.id === id);
const siteTokens = testSiteConfigurations.diagonal.style;

// endregion ARCHITECTURAL SPLIT COMPOSITION
</script>

<template>
  <article class="atelier-site" :style="siteTokens">
    <VisualPrimitivePreview
      class="primitive guides"
      :primitive="primitive('parallel-guides')"
      :values="{
        rotation: -24,
        spacing: 48,
        lineWidth: 0.4,
        opacity: 0.1,
        mask: 'right',
      }"
    />
    <VisualPrimitivePreview
      class="primitive fan"
      :primitive="primitive('deco-fan')"
      :values="{
        originX: 84,
        originY: 86,
        density: 7,
        rotation: -24,
        lineWidth: 0.45,
        opacity: 0.1,
        mask: 'right',
      }"
    />

    <header class="atelier-nav">
      <a href="#" class="atelier-mark">VANTA<span>/</span>ATELIER</a>
      <nav>
        <a href="#work">Work</a><a href="#studio">Studio</a
        ><a href="#contact">Contact</a>
      </nav>
      <span class="location">Cape Town · ZA</span>
    </header>

    <main>
      <section class="project-copy">
        <UiBadge variant="outline">Selected work · 04</UiBadge>
        <p class="project-type">Residential / Klein Karoo</p>
        <h1>A house<br />for the<br /><em>horizon.</em></h1>
        <p class="intro">
          A grounded retreat shaped by shade, long views and the measured rhythm
          of the landscape.
        </p>
        <UiButton as="a" href="#project" variant="outline"
          >View project <ArrowUpRight
        /></UiButton>
      </section>

      <section id="project" class="project-visual">
        <div class="architecture">
          <div class="sky" />
          <div class="mountain" />
          <div class="house"><i /><i /><span /></div>
          <div class="ground" />
        </div>
        <div class="project-meta">
          <span>House for the Horizon</span><span>Completed 2025</span
          ><span>320 m²</span>
        </div>
      </section>
    </main>

    <footer>
      <span>Architecture · Interiors · Objects</span><span>01 / 06</span
      ><a href="#next">Next project <ArrowUpRight /></a>
    </footer>
  </article>
</template>

<style scoped>
.atelier-site {
  position: relative;
  min-height: calc(100vh - 4.5rem);
  overflow: hidden;
  background: linear-gradient(
    114deg,
    var(--theme-canvas) 0 57.9%,
    var(--color-white-500) 58% 100%
  );
  color: var(--theme-text);
  font-family: var(--font-family-a);
  isolation: isolate;
}
.atelier-site:after {
  content: "";
  position: absolute;
  z-index: 2;
  left: 57.9%;
  top: -10%;
  width: 2px;
  height: 120%;
  background: var(--theme-primary);
  transform: rotate(0);
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
.guides,
.fan {
  opacity: 0.55;
}
.atelier-nav {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 5.5rem;
  padding-inline: var(--grid-gutter);
  border-bottom: 1px solid rgb(238 233 221/0.15);
  font-size: 0.64rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.atelier-mark {
  font-weight: 800;
  letter-spacing: 0.18em;
}
.atelier-mark span {
  margin-inline: 0.45rem;
  color: var(--theme-primary);
}
.atelier-nav nav {
  display: flex;
  gap: 2rem;
  color: color-mix(in oklch, var(--theme-text) 58%, transparent);
}
.location {
  justify-self: end;
  color: var(--theme-canvas);
}
main {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--grid-gutter);
  min-height: calc(100vh - 10rem);
  align-items: center;
  padding: clamp(3rem, 6vh, 5rem) var(--grid-gutter);
}
.project-copy {
  grid-column: 1 / span 5;
  max-width: 36rem;
}
.project-copy :deep(.border) {
  border-color: color-mix(in oklch, var(--theme-primary) 62%, transparent);
  border-radius: var(--component-radius-field);
  color: color-mix(in oklch, var(--theme-primary) 75%, white);
  font-family: var(--font-family-mono);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.project-type {
  margin: 2rem 0 0;
  color: var(--theme-text-muted);
  font: 600 0.59rem var(--font-family-mono);
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.project-copy h1 {
  margin: 1rem 0 0;
  font-family: var(--font-family-b);
  font-size: clamp(4.5rem, 7.7vw, 7.8rem);
  font-weight: 400;
  letter-spacing: -0.075em;
  line-height: 0.79;
}
.project-copy h1 em {
  color: color-mix(in oklch, var(--theme-primary) 72%, white);
  font-family: var(--font-family-c);
  font-weight: 400;
}
.intro {
  max-width: 29rem;
  margin: 1.6rem 0 1.8rem;
  color: var(--theme-text-muted);
  font-size: 0.82rem;
  line-height: 1.7;
}
.project-copy :deep(button),
.project-copy :deep(a) {
  border-color: color-mix(in oklch, var(--theme-text) 24%, transparent);
  color: var(--theme-text);
  font-size: 0.68rem;
}
.project-visual {
  grid-column: 7/-1;
  position: relative;
  color: var(--theme-canvas);
}
.architecture {
  position: relative;
  min-height: clamp(30rem, 62vh, 42rem);
  overflow: hidden;
  border: 1px solid rgb(23 24 22/0.2);
  background: #c8c1b5;
}
.sky {
  position: absolute;
  inset: 0 0 38%;
  background: linear-gradient(#c9c2b5, #eee7da);
}
.mountain {
  position: absolute;
  inset: 30% 0 35%;
  background: #9c9486;
  clip-path: polygon(
    0 68%,
    18% 22%,
    31% 58%,
    53% 9%,
    72% 52%,
    88% 26%,
    100% 64%,
    100% 100%,
    0 100%
  );
}
.ground {
  position: absolute;
  inset: 62% 0 0;
  background: linear-gradient(165deg, #7d7668, #4a493f);
}
.house {
  position: absolute;
  z-index: 3;
  left: 9%;
  right: 7%;
  bottom: 18%;
  height: 35%;
  background: #272925;
  box-shadow: 0 30px 50px rgb(23 24 22/0.28);
  clip-path: polygon(0 22%, 68% 0, 100% 18%, 100% 100%, 0 100%);
}
.house i:first-child {
  position: absolute;
  left: 8%;
  right: 6%;
  top: 28%;
  height: 1px;
  background: rgb(238 233 221/0.24);
}
.house i:nth-child(2) {
  position: absolute;
  left: 18%;
  bottom: 0;
  width: 24%;
  height: 58%;
  background: #c8c1b3;
}
.house span {
  position: absolute;
  right: 11%;
  bottom: 0;
  width: 36%;
  height: 46%;
  background: linear-gradient(150deg, #b15c42, #7e3623);
}
.architecture:after {
  content: "";
  position: absolute;
  inset: 1rem;
  border: 1px solid rgb(238 233 221/0.32);
  pointer-events: none;
}
.project-meta {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgb(23 24 22/0.2);
  font: 600 0.57rem var(--font-family-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.project-meta span:not(:first-child) {
  color: rgb(23 24 22/0.52);
}
footer {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 4.5rem;
  padding-inline: var(--grid-gutter);
  border-top: 1px solid rgb(238 233 221/0.15);
  font: 600 0.57rem var(--font-family-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
footer span:nth-child(2) {
  color: var(--theme-primary);
}
footer a {
  display: flex;
  justify-self: end;
  align-items: center;
  gap: 0.45rem;
  color: var(--theme-canvas);
}
footer svg {
  width: 0.8rem;
}
@media (max-width: 850px) {
  .atelier-site {
    background: var(--theme-canvas);
  }
  .atelier-site:after {
    display: none;
  }
  .atelier-nav {
    grid-template-columns: 1fr auto;
  }
  .atelier-nav nav {
    display: none;
  }
  .location {
    color: var(--theme-text-muted);
  }
  main {
    display: block;
  }
  .project-copy {
    padding: 2rem 0 4rem;
  }
  .project-copy h1 {
    font-size: clamp(4rem, 18vw, 7rem);
  }
  .project-visual {
    margin-inline: calc(var(--grid-gutter) * -1);
    padding: var(--grid-gutter);
    background: var(--color-white-500);
  }
  footer a {
    color: var(--theme-text);
  }
  footer > span:first-child {
    display: none;
  }
  footer {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
