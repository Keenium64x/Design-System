<script setup>
import { ArrowUpRight } from "lucide-vue-next";
import {
  Badge as UiBadge,
  Card as UiCard,
  CardContent as UiCardContent,
} from "@/ui/shadcn";
const proofs = [
  { value: "31%", label: "less unplanned work", source: "Northstar Logistics" },
  { value: "4.6h", label: "saved each week", source: "Forge Operations" },
  { value: "99.98%", label: "model availability", source: "Last 90 days" },
];
</script>

<template>
  <section class="proof-block block-grid-12">
    <header>
      <UiBadge variant="outline">Measured in operation</UiBadge>
      <h2>Proof should sit beside the promise.</h2>
    </header>
    <div class="proof-grid">
      <UiCard v-for="proof in proofs" :key="proof.value"
        ><UiCardContent
          ><strong>{{ proof.value }}</strong
          ><span>{{ proof.label }}</span
          ><small>{{ proof.source }} <ArrowUpRight /></small></UiCardContent
      ></UiCard>
    </div>
  </section>
</template>

<style scoped>
.proof-block {
  align-items: end;
  padding: clamp(2.5rem, 6vw, 5rem) var(--block-gutter);
  border-block: 1px solid var(--theme-border);
}
header {
  grid-column: span 3;
}
header :deep(.border) {
  color: var(--theme-primary);
}
h2 {
  max-width: 14rem;
  margin-top: 0.9rem;
  font-family: var(--font-family-b);
  font-size: 1.35rem;
  line-height: 1.05;
}
.proof-grid {
  grid-column: 5/-1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
}
.proof-grid :deep(.rounded-\[var\(--component-radius-card\)\]) {
  box-shadow: none;
}
.proof-grid :deep(.p-6) {
  padding: 1.1rem;
}
.proof-grid strong,
.proof-grid span,
.proof-grid small {
  display: block;
}
.proof-grid strong {
  font-family: var(--font-family-b);
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 400;
  letter-spacing: -0.05em;
}
.proof-grid span {
  margin-top: 0.3rem;
  font-size: 0.68rem;
}
.proof-grid small {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--theme-border);
  color: var(--theme-text-muted);
  font-size: 0.53rem;
}
.proof-grid svg {
  width: 0.75rem;
}
@media (max-width: 760px) {
  .proof-block {
    display: block;
  }
  header {
    margin-bottom: 2rem;
  }
  .proof-grid {
    grid-template-columns: 1fr;
  }
}
</style>
