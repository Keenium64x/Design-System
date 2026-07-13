<script setup>
import { Download, Filter, Search, SlidersHorizontal } from "lucide-vue-next";
import { ref } from "vue";
import { FrappeButton, FrappeSelect, FrappeTextInput } from "@/ui/frappe";

const query = ref("");
const status = ref("All statuses");
const owner = ref("All owners");
</script>

<template>
  <section class="command-block block-grid-12 frappe-adapter">
    <div class="context"><span>Orders</span><strong>248 records</strong></div>
    <div class="search-control">
      <FrappeTextInput
        v-model="query"
        variant="outline"
        size="md"
        placeholder="Search order, customer or reference…"
        ><template #prefix><Search :size="15" /></template
      ></FrappeTextInput>
    </div>
    <div class="select-control">
      <FrappeSelect
        v-model="status"
        :options="['All statuses', 'Open', 'At risk', 'Complete']"
        variant="outline"
        size="md"
      />
    </div>
    <div class="select-control">
      <FrappeSelect
        v-model="owner"
        :options="['All owners', 'Maya Chen', 'Jon Bell', 'Alex Kim']"
        variant="outline"
        size="md"
      />
    </div>
    <div class="actions">
      <FrappeButton theme="gray" variant="outline"
        ><template #prefix><Filter :size="14" /></template>Filters
        <kbd>3</kbd></FrappeButton
      ><FrappeButton theme="gray" variant="ghost" aria-label="View settings"
        ><SlidersHorizontal :size="15" /></FrappeButton
      ><FrappeButton theme="gray" variant="ghost" aria-label="Export"
        ><Download :size="15" /></FrappeButton
      ><FrappeButton label="New order" theme="blue" variant="solid" />
    </div>
    <div class="active-filters">
      <span>Active scope</span><button type="button">Region: Cape Town ×</button
      ><button type="button">Due: This week ×</button
      ><button type="button">Clear all</button>
    </div>
  </section>
</template>

<style scoped>
.command-block {
  align-items: end;
  padding: 1rem var(--block-gutter);
  border-block: 1px solid var(--theme-border);
  background: var(--theme-surface);
}
.context {
  grid-column: span 2;
}
.context span,
.context strong {
  display: block;
}
.context span {
  font-size: 0.72rem;
  font-weight: 700;
}
.context strong {
  margin-top: 0.2rem;
  color: var(--theme-text-muted);
  font: 0.48rem var(--font-family-mono);
}
.search-control {
  grid-column: span 3;
}
.select-control {
  grid-column: span 2;
}
.actions {
  grid-column: span 3;
  display: flex;
  justify-content: flex-end;
  gap: 0.3rem;
}
.actions :deep(button) {
  font-size: 0.56rem;
}
.actions kbd {
  display: inline-grid;
  min-width: 1rem;
  height: 1rem;
  place-items: center;
  border-radius: 999px;
  background: var(--theme-field);
  font: 0.45rem var(--font-family-mono);
}
.active-filters {
  grid-column: 3/-1;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.15rem;
}
.active-filters span {
  margin-right: 0.3rem;
  color: var(--theme-text-muted);
  font: 0.46rem var(--font-family-mono);
  text-transform: uppercase;
}
.active-filters button {
  padding: 0.25rem 0.45rem;
  border: 1px solid var(--theme-border);
  border-radius: 999px;
  background: var(--theme-field);
  font-size: 0.48rem;
}
.active-filters button:last-child {
  border: 0;
  background: transparent;
  color: var(--theme-primary);
}
@media (max-width: 900px) {
  .command-block {
    display: flex !important;
    flex-wrap: wrap;
  }
  .context {
    width: 100%;
  }
  .search-control,
  .select-control {
    flex: 1;
    min-width: 9rem;
  }
  .actions {
    width: 100%;
  }
  .active-filters {
    width: 100%;
  }
}
</style>
