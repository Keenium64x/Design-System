<script setup>
import { Search } from "lucide-vue-next";
import { computed, reactive } from "vue";
import BlockPreview from "@/components/blocks/BlockPreview.vue";
import {
  blockCategories,
  blockRegistry,
  filterBlocks,
} from "@/lib/block-registry";
import { FrappeBadge, FrappeSelect, FrappeTextInput } from "@/ui/frappe";

// =============================================================================
// region BLOCK CATALOGUE
// =============================================================================

const filters = reactive({ query: "", category: "All", sort: "Priority" });
const visibleBlocks = computed(() => filterBlocks(blockRegistry, filters));

// endregion BLOCK CATALOGUE
</script>

<template>
  <div class="studio-page">
    <header class="page-intro">
      <div>
        <p class="section-kicker">Blocks</p>
        <h1 class="display-heading text-4">
          Build experiences from proven parts.
        </h1>
      </div>
      <p class="max-w-xl text--1 text-muted-foreground">
        Marketing narratives and reusable application workspaces: one job per
        block, real shared components, 12-column composition and restrained
        brand expression.
      </p>
    </header>
    <main class="block-catalogue">
      <div class="block-filters frappe-adapter">
        <FrappeTextInput
          v-model="filters.query"
          variant="outline"
          size="md"
          placeholder="Search purpose, components or treatment…"
          ><template #prefix><Search :size="15" /></template></FrappeTextInput
        ><FrappeSelect
          v-model="filters.category"
          :options="blockCategories"
          variant="outline"
          size="md"
        /><FrappeSelect
          v-model="filters.sort"
          :options="['Priority', 'Name', 'Category']"
          variant="outline"
          size="md"
        />
      </div>
      <div class="block-grid">
        <article
          v-for="block in visibleBlocks"
          :key="block.id"
          class="block-card"
        >
          <header>
            <div class="identity">
              <div>
                <span class="rank"
                  >#{{ String(block.rank).padStart(2, "0") }}</span
                ><FrappeBadge :label="block.category" theme="gray" />
              </div>
              <h2>{{ block.name }}</h2>
              <p>{{ block.purpose }}</p>
            </div>
            <dl>
              <div>
                <dt>Composition</dt>
                <dd>{{ block.columns }}</dd>
              </div>
              <div>
                <dt>Treatment</dt>
                <dd>{{ block.treatment }}</dd>
              </div>
              <div>
                <dt>Components</dt>
                <dd>{{ block.components.join(" · ") }}</dd>
              </div>
              <div>
                <dt>Primitives</dt>
                <dd>{{ block.primitives.join(" · ") || "None" }}</dd>
              </div>
            </dl>
          </header>
          <div class="block-preview"><BlockPreview :block-id="block.id" /></div>
        </article>
      </div>
      <div v-if="!visibleBlocks.length" class="empty-library">
        <Search :size="22" /><strong>No matching blocks</strong>
      </div>
    </main>
  </div>
</template>

<style scoped>
.block-catalogue {
  max-width: var(--grid-max-width);
  margin-inline: auto;
  padding: 0 var(--grid-gutter) var(--spacing-2xl);
}
.block-filters {
  display: grid;
  gap: 0.5rem;
  margin-bottom: var(--spacing-m);
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-card);
  background: var(--theme-surface-raised);
  padding: 0.5rem;
}
.block-grid {
  display: grid;
  gap: var(--spacing-l);
}
.block-card {
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-block);
  background: var(--theme-surface-raised);
  box-shadow: var(--shadow-2);
}
.block-card > header {
  display: grid;
  gap: var(--spacing-s);
  padding: var(--spacing-s);
  border-bottom: 1px solid var(--theme-border);
}
.identity > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rank {
  color: var(--theme-primary);
  font: 700 0.55rem var(--font-family-mono);
}
.identity h2 {
  margin-top: 0.65rem;
  font-family: var(--font-family-b);
  font-size: var(--font-size-2);
}
.identity p {
  max-width: 36rem;
  margin-top: 0.25rem;
  color: var(--theme-text-muted);
  font-size: 0.68rem;
}
.block-card dl {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
  margin: 0;
}
.block-card dl div {
  border-left: 1px solid var(--theme-border);
  padding-left: 0.65rem;
}
.block-card dt {
  font: 600 0.48rem var(--font-family-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--theme-text-muted);
}
.block-card dd {
  margin: 0.2rem 0 0;
  font-size: 0.56rem;
}
.block-preview {
  --block-gutter: clamp(1rem, 4vw, 3rem);
  overflow: hidden;
}
.block-preview :deep(.block-grid-12) {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: var(--grid-gutter);
  row-gap: var(--spacing-s);
}
@media (min-width: 48rem) {
  .block-filters {
    grid-template-columns: minmax(16rem, 1fr) 12rem 10rem;
  }
  .block-card > header {
    grid-template-columns: minmax(18rem, 1fr) minmax(28rem, 0.9fr);
    align-items: end;
  }
}
@media (max-width: 760px) {
  .block-card dl {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
