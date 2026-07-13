<script setup>
import { ArrowUpRight } from "lucide-vue-next";
import { Badge as UiBadge, Button as UiButton } from "@/ui/shadcn";
</script>

<template>
  <section class="case-block block-grid-12">
    <div class="media" aria-label="Abstract logistics route visualization">
      <span>Northstar / Network 04</span>
      <div class="route"><i /><i /><i /><i /></div>
      <strong>31%</strong><small>less unplanned work</small>
    </div>
    <div class="copy">
      <UiBadge variant="outline">Customer outcome</UiBadge>
      <blockquote>
        “We stopped reacting to yesterday and started planning the week ahead.”
      </blockquote>
      <p>
        Northstar connected six facilities through Meridian, exposing capacity
        pressure fourteen days before delivery risk.
      </p>
      <div class="person">
        <strong>Ana Ribeiro</strong><span>VP Operations · Northstar</span>
      </div>
      <UiButton variant="outline"
        >Read the case study <ArrowUpRight
      /></UiButton>
    </div>
  </section>
</template>

<style scoped>
.case-block {
  padding: clamp(3rem, 7vw, 6rem) var(--block-gutter);
  background: var(--theme-surface);
}
.media {
  position: relative;
  grid-column: span 7;
  min-height: 28rem;
  overflow: hidden;
  border-radius: var(--component-radius-block);
  background: linear-gradient(
    145deg,
    color-mix(in oklch, var(--theme-primary) 42%, var(--theme-canvas)),
    var(--theme-canvas)
  );
  color: var(--theme-text);
  padding: 1.2rem;
}
.media > span {
  font: 600 0.53rem var(--font-family-mono);
  letter-spacing: 0.1em;
}
.media > strong,
.media > small {
  position: absolute;
  left: 1.2rem;
}
.media > strong {
  bottom: 3rem;
  font: 400 clamp(3rem, 6vw, 5.5rem) var(--font-family-b);
  letter-spacing: -0.05em;
}
.media > small {
  bottom: 1.5rem;
  color: var(--theme-text-muted);
}
.route {
  position: absolute;
  inset: 14% 10% 18%;
  border: 1px solid color-mix(in oklch, var(--theme-primary) 45%, transparent);
  border-radius: 50%;
  transform: rotate(-12deg);
}
.route:before,
.route:after {
  content: "";
  position: absolute;
  border: 1px dashed color-mix(in oklch, var(--theme-text) 22%, transparent);
  border-radius: 50%;
}
.route:before {
  inset: 15%;
}
.route:after {
  inset: 31%;
}
.route i {
  position: absolute;
  width: 0.55rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--theme-primary);
  box-shadow: 0 0 16px var(--theme-primary);
}
.route i:nth-child(1) {
  left: 8%;
  top: 48%;
}
.route i:nth-child(2) {
  left: 40%;
  top: 3%;
}
.route i:nth-child(3) {
  right: 7%;
  top: 42%;
}
.route i:nth-child(4) {
  left: 46%;
  bottom: 2%;
}
.copy {
  grid-column: 8/-1;
  align-self: center;
}
.copy :deep(.border) {
  color: var(--theme-primary);
}
blockquote {
  margin: 1.2rem 0 0;
  font-family: var(--font-family-b);
  font-size: clamp(1.7rem, 3.3vw, 3.1rem);
  letter-spacing: -0.045em;
  line-height: 1.03;
}
.copy > p {
  margin: 1.2rem 0;
  color: var(--theme-text-muted);
  font-size: 0.72rem;
  line-height: 1.7;
}
.person {
  display: grid;
  margin-bottom: 1.3rem;
  padding-top: 0.7rem;
  border-top: 1px solid var(--theme-border);
  font-size: 0.6rem;
}
.person span {
  color: var(--theme-text-muted);
}
.copy :deep(button) {
  font-size: 0.65rem;
}
@media (max-width: 800px) {
  .case-block {
    display: block;
  }
  .copy {
    margin-top: 2.5rem;
  }
}
</style>
