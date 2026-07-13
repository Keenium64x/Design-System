<script setup>
import { computed, ref } from "vue";
import { Layers3 } from "lucide-vue-next";
import RadialArchiveSite from "@/components/test-sites/RadialArchiveSite.vue";
import DiagonalAtelierSite from "@/components/test-sites/DiagonalAtelierSite.vue";
import PerspectiveSystemsSite from "@/components/test-sites/PerspectiveSystemsSite.vue";
import { testSiteConfigurations } from "@/lib/test-site-configurations";

const selected = ref("radial");
const sites = [
  {
    id: "radial",
    name: "Orison Archive",
    topology: "Radial editorial",
    component: RadialArchiveSite,
    configuration: testSiteConfigurations.radial,
    stack: ["Tonal radial", "Construction rings", "Construction axis"],
  },
  {
    id: "diagonal",
    name: "Vanta Atelier",
    topology: "Diagonal architectural",
    component: DiagonalAtelierSite,
    configuration: testSiteConfigurations.diagonal,
    stack: [
      "Split material",
      "Parallel guides",
      "Architectural fan",
      "Precision seam",
    ],
  },
  {
    id: "perspective",
    name: "Axiom Systems",
    topology: "Technical perspective",
    component: PerspectiveSystemsSite,
    configuration: testSiteConfigurations.perspective,
    stack: ["Horizon field", "Perspective grid", "Directional beam"],
  },
];
const activeSite = computed(() =>
  sites.find((site) => site.id === selected.value),
);
</script>

<template>
  <div class="tested-page">
    <header class="tested-header">
      <div>
        <p class="section-kicker">Website Tested</p>
        <h1 class="display-heading text-3">
          Three systems. One primitive library.
        </h1>
        <p>
          These are real Vue compositions using shared tokens and the production
          primitive renderer.
        </p>
      </div>
      <div class="tested-tabs">
        <button
          v-for="site in sites"
          :key="site.id"
          :class="{ active: selected === site.id }"
          @click="selected = site.id"
        >
          <strong>{{ site.name }}</strong
          ><span>{{ site.topology }}</span>
        </button>
      </div>
    </header>
    <section class="tested-meta">
      <div>
        <Layers3 :size="16" /><strong
          >{{ activeSite.stack.length }} primitive layers</strong
        ><span>{{ activeSite.configuration.label }}</span
        ><span>{{ activeSite.configuration.mode }}</span>
      </div>
      <ul>
        <li v-for="item in activeSite.stack" :key="item">{{ item }}</li>
      </ul>
    </section>
    <div class="tested-stage"><component :is="activeSite.component" /></div>
  </div>
</template>

<style scoped>
.tested-page {
  min-height: calc(100vh - 4.5rem);
  background: var(--theme-canvas);
}
.tested-header {
  display: grid;
  gap: var(--spacing-s);
  max-width: var(--grid-max-width);
  margin: auto;
  padding: var(--spacing-m) var(--grid-gutter);
}
.tested-header > div:first-child > p:last-child {
  max-width: 45rem;
  margin: 0.55rem 0 0;
  color: var(--theme-text-muted);
  font-size: 0.78rem;
}
.tested-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
  border: 1px solid var(--theme-border);
  border-radius: var(--radius-4);
  background: var(--theme-surface);
  padding: 0.3rem;
}
.tested-tabs button {
  border-radius: var(--radius-3);
  padding: 0.7rem;
  text-align: left;
  color: var(--theme-text-muted);
}
.tested-tabs button.active {
  background: var(--theme-surface-raised);
  color: var(--theme-text);
  box-shadow: var(--shadow-2);
}
.tested-tabs strong,
.tested-tabs span {
  display: block;
}
.tested-tabs strong {
  font-size: 0.7rem;
}
.tested-tabs span {
  margin-top: 0.15rem;
  font-size: 0.58rem;
}
.tested-meta {
  display: flex;
  max-width: var(--grid-max-width);
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 auto var(--spacing-s);
  padding: 0 var(--grid-gutter);
  font-size: 0.65rem;
  color: var(--theme-text-muted);
}
.tested-meta > div {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--theme-primary);
}
.tested-meta ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.35rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.tested-meta li {
  border: 1px solid var(--theme-border);
  border-radius: 999px;
  padding: 0.25rem 0.5rem;
  background: var(--theme-surface);
}
.tested-stage {
  border-top: 1px solid var(--theme-border);
}
@media (min-width: 64rem) {
  .tested-header {
    grid-template-columns: 0.8fr 1.2fr;
    align-items: end;
  }
}
@media (max-width: 47.99rem) {
  .tested-tabs {
    grid-template-columns: 1fr;
  }
  .tested-meta {
    align-items: flex-start;
    flex-direction: column;
  }
  .tested-meta ul {
    justify-content: flex-start;
  }
}
</style>
