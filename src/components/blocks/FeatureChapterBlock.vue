<script setup>
import { ref } from "vue";
import {
  Badge as UiBadge,
  Card as UiCard,
  CardContent as UiCardContent,
  Tabs as UiTabs,
  TabsList as UiTabsList,
  TabsTrigger as UiTabsTrigger,
} from "@/ui/shadcn";
const active = ref("route");
const steps = [
  {
    id: "route",
    number: "02.1",
    name: "Route",
    copy: "Direct work to the team with the clearest capacity and context.",
  },
  {
    id: "balance",
    number: "02.2",
    name: "Balance",
    copy: "Resolve pressure before it becomes delay or hidden overtime.",
  },
  {
    id: "explain",
    number: "02.3",
    name: "Explain",
    copy: "Keep every recommendation traceable to its source signals.",
  },
];
</script>

<template>
  <section class="chapter-block block-grid-12">
    <div class="copy">
      <UiBadge variant="outline">02 / Coordinate</UiBadge>
      <h2>One stable chapter. Three meaningful states.</h2>
      <p>
        The block repeats its anatomy so the visitor learns the system while the
        actual workflow changes.
      </p>
      <UiTabs v-model="active"
        ><UiTabsList
          ><UiTabsTrigger
            v-for="step in steps"
            :key="step.id"
            :value="step.id"
            >{{ step.name }}</UiTabsTrigger
          ></UiTabsList
        ></UiTabs
      >
    </div>
    <div class="visual">
      <UiCard
        v-for="step in steps"
        :key="step.id"
        :class="{ active: active === step.id }"
        @mouseenter="active = step.id"
        ><UiCardContent
          ><span>{{ step.number }}</span
          ><strong>{{ step.name }}</strong>
          <p>{{ step.copy }}</p>
          <div class="flow"><i /><i /><i /></div></UiCardContent
      ></UiCard>
    </div>
  </section>
</template>

<style scoped>
.chapter-block {
  align-items: center;
  padding: clamp(3rem, 7vw, 6rem) var(--block-gutter);
  overflow: hidden;
}
.copy {
  grid-column: span 5;
}
.copy :deep(.border) {
  color: var(--theme-primary);
}
h2 {
  max-width: 13ch;
  margin: 1rem 0 0;
  font-family: var(--font-family-b);
  font-size: clamp(2.5rem, 5vw, 4.7rem);
  font-weight: 400;
  letter-spacing: -0.065em;
  line-height: 0.92;
}
.copy > p {
  max-width: 30rem;
  margin: 1.3rem 0 1.5rem;
  color: var(--theme-text-muted);
  font-size: 0.75rem;
  line-height: 1.7;
}
.copy :deep([role="tablist"]) {
  width: max-content;
}
.copy :deep([role="tab"]) {
  font-size: 0.62rem;
}
.visual {
  grid-column: 7/-1;
  display: grid;
  gap: 0.55rem;
  perspective: 1000px;
}
.visual > div {
  opacity: 0.62;
  transform: translateX(1rem);
  transition:
    opacity 0.25s,
    transform 0.25s,
    border-color 0.25s;
}
.visual > div.active {
  opacity: 1;
  transform: none;
  border-color: color-mix(
    in oklch,
    var(--theme-primary) 48%,
    var(--theme-border)
  );
  box-shadow: var(--shadow-3);
}
.visual :deep(.p-6) {
  position: relative;
  display: grid;
  grid-template-columns: 3rem 6rem 1fr 8rem;
  align-items: center;
  gap: 0.7rem;
  padding: 1rem;
}
.visual span {
  color: var(--theme-primary);
  font: 600 0.53rem var(--font-family-mono);
}
.visual strong {
  font-family: var(--font-family-b);
  font-size: 1.05rem;
}
.visual p {
  color: var(--theme-text-muted);
  font-size: 0.62rem;
}
.flow {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.flow i {
  height: 0.35rem;
  flex: 1;
  border-radius: 999px;
  background: var(--theme-border);
}
.active .flow i:first-child,
.active .flow i:nth-child(2) {
  background: var(--theme-primary);
}
@media (max-width: 800px) {
  .chapter-block {
    display: block;
  }
  .visual {
    margin-top: 3rem;
  }
  .visual :deep(.p-6) {
    grid-template-columns: 2.5rem 5rem 1fr;
  }
  .flow {
    display: none;
  }
}
</style>
