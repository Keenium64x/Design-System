<script setup>
import {
  Badge as UiBadge,
  Accordion as UiAccordion,
  AccordionContent as UiAccordionContent,
  AccordionItem as UiAccordionItem,
  AccordionTrigger as UiAccordionTrigger,
} from "@/ui/shadcn";
const questions = [
  {
    q: "How quickly can Meridian connect our systems?",
    a: "Most teams begin with two high-value sources, prove the model, then expand without redesigning the operating view.",
  },
  {
    q: "Does the model replace operational judgment?",
    a: "No. Every recommendation shows its source signals so experienced teams can validate, adjust, or reject it.",
  },
  {
    q: "What happens when data is incomplete?",
    a: "Confidence and missing inputs remain visible. Meridian does not hide uncertainty behind a polished score.",
  },
];
</script>

<template>
  <section class="faq-block block-grid-12">
    <header>
      <UiBadge variant="outline">Questions at the decision</UiBadge>
      <h2>Clarity includes the difficult answers.</h2>
      <p>
        Objections are grouped near the action they affect, not hidden in a
        generic help page.
      </p>
    </header>
    <UiAccordion class="questions" type="single" collapsible default-value="q-0"
      ><UiAccordionItem
        v-for="(item, index) in questions"
        :key="item.q"
        :value="`q-${index}`"
        ><UiAccordionTrigger
          ><span
            ><small>0{{ index + 1 }}</small
            >{{ item.q }}</span
          ></UiAccordionTrigger
        ><UiAccordionContent>{{ item.a }}</UiAccordionContent></UiAccordionItem
      ></UiAccordion
    >
  </section>
</template>

<style scoped>
.faq-block {
  padding: clamp(3rem, 7vw, 6rem) var(--block-gutter);
}
header {
  grid-column: span 4;
}
header :deep(.border) {
  color: var(--theme-primary);
}
h2 {
  max-width: 12ch;
  margin: 1rem 0 0;
  font-family: var(--font-family-b);
  font-size: clamp(2.2rem, 4vw, 4rem);
  font-weight: 400;
  letter-spacing: -0.06em;
  line-height: 0.93;
}
header > p {
  max-width: 24rem;
  margin-top: 1.2rem;
  color: var(--theme-text-muted);
  font-size: 0.7rem;
  line-height: 1.7;
}
.questions {
  grid-column: 6/-1;
}
.questions :deep(button) {
  padding: 1.2rem 0;
  text-align: left;
  text-decoration: none;
  font-family: var(--font-family-b);
  font-size: clamp(0.9rem, 1.5vw, 1.15rem);
}
.questions :deep(button span) {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.questions small {
  color: var(--theme-primary);
  font: 600 0.52rem var(--font-family-mono);
}
.questions :deep([data-state="open"] + div > div) {
  max-width: 34rem;
  color: var(--theme-text-muted);
  font-size: 0.68rem;
  line-height: 1.7;
}
@media (max-width: 760px) {
  .faq-block {
    display: block;
  }
  .questions {
    margin-top: 2rem;
  }
}
</style>
