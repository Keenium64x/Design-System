<script setup>
import { ArrowUpRight, Orbit } from "lucide-vue-next";
import { Button as UiButton, Separator as UiSeparator } from "@/ui/shadcn";
const groups = [
  { name: "Platform", links: ["Detect", "Coordinate", "Forecast"] },
  { name: "Solutions", links: ["Logistics", "Manufacturing", "Field teams"] },
  { name: "Company", links: ["About", "Stories", "Careers"] },
  { name: "Resources", links: ["Journal", "Security", "Contact"] },
];
</script>

<template>
  <footer class="footer-block">
    <div class="footer-grid block-grid-12">
      <div class="brand">
        <a href="#"><Orbit /> Meridian</a>
        <p>
          Operational intelligence for teams moving real things through complex
          systems.
        </p>
        <UiButton variant="outline" size="sm"
          >Talk to the team <ArrowUpRight
        /></UiButton>
      </div>
      <nav v-for="group in groups" :key="group.name">
        <strong>{{ group.name }}</strong
        ><a v-for="link in group.links" :key="link" href="#">{{ link }}</a>
      </nav>
    </div>
    <UiSeparator />
    <div class="legal">
      <span>Meridian Systems © 2026</span>
      <div>
        <a href="#">Privacy</a><a href="#">Terms</a><a href="#">LinkedIn</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-block {
  padding: clamp(3rem, 6vw, 5rem) var(--block-gutter) 1rem;
  background: var(--theme-surface);
}
.footer-grid {
  padding-bottom: clamp(3rem, 6vw, 5rem);
}
.brand {
  grid-column: span 4;
}
.brand > a {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-weight: 800;
}
.brand svg {
  width: 1rem;
  color: var(--theme-primary);
}
.brand p {
  max-width: 20rem;
  margin: 1rem 0;
  color: var(--theme-text-muted);
  font-size: 0.66rem;
  line-height: 1.7;
}
.brand :deep(button) {
  font-size: 0.62rem;
}
.footer-grid nav {
  grid-column: span 2;
  display: grid;
  align-content: start;
  gap: 0.55rem;
  font-size: 0.62rem;
}
.footer-grid nav strong {
  margin-bottom: 0.35rem;
  font-family: var(--font-family-mono);
  font-size: 0.52rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-primary);
}
.footer-grid nav a {
  color: var(--theme-text-muted);
}
.legal {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  color: var(--theme-text-muted);
  font: 500 0.5rem var(--font-family-mono);
}
.legal div {
  display: flex;
  gap: 1.2rem;
}
@media (max-width: 760px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2.5rem;
  }
  .brand {
    grid-column: 1/-1;
  }
  .footer-grid nav {
    grid-column: span 1;
  }
}
</style>
