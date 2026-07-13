<script setup>
import { Menu, Orbit } from "lucide-vue-next";
import { Button as UiButton } from "@/ui/shadcn";
</script>

<template>
  <section class="nav-block block-grid-12">
    <a class="brand" href="#"><Orbit /> Meridian</a>
    <nav>
      <a href="#platform">Platform</a><a href="#solutions">Solutions</a
      ><a href="#stories">Stories</a><a href="#company">Company</a>
    </nav>
    <div class="actions">
      <UiButton variant="ghost" size="sm">Sign in</UiButton
      ><UiButton size="sm">See Meridian</UiButton
      ><UiButton
        class="menu"
        variant="outline"
        size="icon-sm"
        aria-label="Open navigation"
        ><Menu
      /></UiButton>
    </div>
  </section>
</template>

<style scoped>
.nav-block {
  min-height: 5rem;
  align-items: center;
  padding: 1rem var(--block-gutter);
}
.brand {
  grid-column: span 3;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-weight: 800;
  letter-spacing: -0.025em;
}
.brand svg {
  width: 1.1rem;
  color: var(--theme-primary);
}
nav {
  grid-column: span 6;
  display: flex;
  justify-content: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  color: var(--theme-text-muted);
  font-size: 0.7rem;
}
.actions {
  grid-column: span 3;
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
}
.actions :deep(button) {
  font-size: 0.66rem;
}
.menu {
  display: none;
}
@media (max-width: 760px) {
  .nav-block {
    grid-template-columns: 1fr auto;
  }
  .brand,
  .actions {
    grid-column: auto;
  }
  nav,
  .actions > button:not(.menu) {
    display: none;
  }
  .menu {
    display: inline-flex;
  }
}
</style>
