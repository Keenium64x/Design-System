<script setup>
import { MoreHorizontal, Plus } from "lucide-vue-next";
import { FrappeBadge, FrappeButton, FrappeListView } from "@/ui/frappe";

const columns = [
  { label: "Order", key: "name", width: "1fr" },
  { label: "Customer", key: "customer", width: "1.7fr" },
  { label: "Owner", key: "owner", width: "1fr" },
  { label: "Due", key: "due", width: ".8fr" },
  { label: "Status", key: "status", width: ".9fr" },
];
const rows = [
  {
    name: "ORD-2418",
    customer: "Aster Works",
    owner: "Maya Chen",
    due: "Today",
    status: "At risk",
  },
  {
    name: "ORD-2417",
    customer: "Common Field",
    owner: "Jon Bell",
    due: "14 Jul",
    status: "In progress",
  },
  {
    name: "ORD-2416",
    customer: "Northline",
    owner: "Alex Kim",
    due: "15 Jul",
    status: "Ready",
  },
  {
    name: "ORD-2415",
    customer: "Onda Studio",
    owner: "Maya Chen",
    due: "16 Jul",
    status: "Complete",
  },
];
</script>

<template>
  <section class="data-block block-grid-12 frappe-adapter">
    <header>
      <div>
        <span>Operational records</span>
        <h2>Orders</h2>
        <p>
          Select records to reveal bulk actions without hiding the list context.
        </p>
      </div>
      <div>
        <FrappeButton theme="gray" variant="ghost" aria-label="More options"
          ><MoreHorizontal :size="15" /></FrappeButton
        ><FrappeButton theme="blue" variant="solid"
          ><template #prefix><Plus :size="14" /></template>New
          order</FrappeButton
        >
      </div>
    </header>
    <div class="summary">
      <FrappeBadge label="248 total" theme="gray" /><FrappeBadge
        label="17 at risk"
        theme="orange"
      /><span>Last synced 18 seconds ago</span>
    </div>
    <div class="frappe-data-surface table">
      <FrappeListView
        :columns="columns"
        :rows="rows"
        row-key="name"
        :options="{ selectable: true, rowHeight: 46 }"
      />
    </div>
    <footer>
      <span>Showing 1–4 of 248</span>
      <div>
        <FrappeButton
          label="Previous"
          theme="gray"
          variant="outline"
          disabled
        /><FrappeButton label="Next" theme="gray" variant="outline" />
      </div>
    </footer>
  </section>
</template>

<style scoped>
.data-block {
  padding: var(--block-gutter);
  background: var(--theme-canvas);
}
.data-block > header,
.summary,
.table,
.data-block > footer {
  grid-column: 1/-1;
}
.data-block > header,
.data-block > footer {
  display: flex;
  align-items: end;
  justify-content: space-between;
}
.data-block > header > div:last-child,
.data-block > footer > div {
  display: flex;
  gap: 0.35rem;
}
.data-block > header span {
  color: var(--theme-primary);
  font: 0.48rem var(--font-family-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.data-block h2 {
  margin: 0.2rem 0;
  font-family: var(--font-family-b);
  font-size: 1.7rem;
}
.data-block p,
.summary span,
.data-block > footer {
  color: var(--theme-text-muted);
  font-size: 0.54rem;
}
.summary {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.summary span {
  margin-left: auto;
}
.table {
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-card);
  background: var(--theme-surface-raised);
}
.data-block > footer {
  align-items: center;
}
@media (max-width: 700px) {
  .data-block > header {
    align-items: start;
  }
  .data-block > header p {
    display: none;
  }
  .summary span {
    display: none;
  }
  .table {
    overflow: auto;
  }
}
</style>
