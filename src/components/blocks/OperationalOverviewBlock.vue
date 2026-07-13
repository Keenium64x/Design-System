<script setup>
import {
  ArrowDownRight,
  ArrowUpRight,
  CircleAlert,
  PackageCheck,
} from "lucide-vue-next";
import { Card as UiCard, CardContent as UiCardContent } from "@/ui/shadcn";
import { FrappeBadge, FrappeButton, FrappeProgress } from "@/ui/frappe";

const metrics = [
  { label: "Orders on plan", value: "92.4%", delta: "+4.1%", up: true },
  { label: "Open exceptions", value: "17", delta: "-6 today", up: false },
  { label: "Dock utilisation", value: "74%", delta: "+8.2%", up: true },
  { label: "Median cycle", value: "3.8h", delta: "-24m", up: false },
];
</script>

<template>
  <section class="overview-block block-grid-12 frappe-adapter">
    <header>
      <div>
        <span>Monday · 13 July</span>
        <h2>Operational overview</h2>
      </div>
      <FrappeButton label="Review exceptions" theme="blue" variant="solid" />
    </header>
    <div class="metrics">
      <UiCard v-for="metric in metrics" :key="metric.label"
        ><UiCardContent
          ><span>{{ metric.label }}</span
          ><strong>{{ metric.value }}</strong
          ><small :class="{ good: !metric.up }"
            ><component :is="metric.up ? ArrowUpRight : ArrowDownRight" />{{
              metric.delta
            }}</small
          ></UiCardContent
        ></UiCard
      >
    </div>
    <UiCard class="flow"
      ><UiCardContent
        ><header>
          <div><PackageCheck /><span>Fulfilment flow</span></div>
          <FrappeBadge label="Healthy" theme="green" />
        </header>
        <div
          v-for="item in [
            { label: 'Received', value: 88 },
            { label: 'Allocated', value: 76 },
            { label: 'Dispatched', value: 61 },
          ]"
          :key="item.label"
          class="progress"
        >
          <div>
            <span>{{ item.label }}</span
            ><strong>{{ item.value }}%</strong>
          </div>
          <FrappeProgress :value="item.value" /></div></UiCardContent
    ></UiCard>
    <UiCard class="exception"
      ><UiCardContent
        ><header>
          <div><CircleAlert /><span>Needs attention</span></div>
          <FrappeBadge label="3 critical" theme="red" />
        </header>
        <strong>Dock 04 is above safe capacity.</strong>
        <p>Six inbound loads need reassignment before 14:30.</p>
        <FrappeButton
          label="Open exception"
          theme="gray"
          variant="outline" /></UiCardContent
    ></UiCard>
  </section>
</template>

<style scoped>
.overview-block {
  padding: var(--block-gutter);
  background: var(--theme-canvas);
}
.overview-block > header {
  grid-column: 1/-1;
  display: flex;
  align-items: end;
  justify-content: space-between;
}
.overview-block > header span {
  color: var(--theme-text-muted);
  font: 0.52rem var(--font-family-mono);
  text-transform: uppercase;
}
.overview-block h2 {
  margin-top: 0.3rem;
  font-family: var(--font-family-b);
  font-size: 1.8rem;
  font-weight: 500;
}
.metrics {
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--grid-gutter);
}
.metrics :deep(.p-6),
.flow :deep(.p-6),
.exception :deep(.p-6) {
  padding: 1rem;
}
.metrics span {
  display: block;
  color: var(--theme-text-muted);
  font-size: 0.56rem;
}
.metrics strong {
  display: block;
  margin: 0.55rem 0;
  font: 600 1.5rem var(--font-family-mono);
}
.metrics small {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: var(--theme-primary);
  font-size: 0.5rem;
}
.metrics small.good {
  color: var(--theme-success);
}
.metrics svg {
  width: 0.7rem;
}
.flow {
  grid-column: span 8;
}
.exception {
  grid-column: span 4;
}
.flow header,
.exception header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.1rem;
}
.flow header div,
.exception header div {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.62rem;
  font-weight: 600;
}
.flow header svg,
.exception header svg {
  width: 1rem;
  color: var(--theme-primary);
}
.progress {
  display: grid;
  gap: 0.35rem;
  margin-top: 0.8rem;
}
.progress > div {
  display: flex;
  justify-content: space-between;
  font-size: 0.55rem;
}
.exception > div > strong {
  display: block;
  font-size: 0.82rem;
}
.exception p {
  margin: 0.5rem 0 1rem;
  color: var(--theme-text-muted);
  font-size: 0.58rem;
  line-height: 1.6;
}
@media (max-width: 800px) {
  .metrics {
    grid-template-columns: repeat(2, 1fr);
  }
  .flow,
  .exception {
    grid-column: 1/-1;
  }
}
</style>
