<script setup>
import {
  Bell,
  Boxes,
  ChevronDown,
  LayoutDashboard,
  Search,
  Settings,
  Users,
} from "lucide-vue-next";
import {
  Avatar as UiAvatar,
  AvatarFallback as UiAvatarFallback,
  Badge as UiBadge,
  Button as UiButton,
} from "@/ui/shadcn";

const navigation = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Workspaces", icon: Boxes },
  { label: "People", icon: Users },
  { label: "Settings", icon: Settings },
];
</script>

<template>
  <section class="app-shell-block block-grid-12">
    <aside>
      <a class="brand" href="#" aria-label="Meridian home"><i />M</a>
      <nav aria-label="Application preview navigation">
        <a
          v-for="item in navigation"
          :key="item.label"
          :class="{ active: item.active }"
          href="#"
        >
          <component :is="item.icon" :size="15" /><span>{{ item.label }}</span>
        </a>
      </nav>
      <UiButton variant="ghost" size="icon" aria-label="Open account"
        ><UiAvatar><UiAvatarFallback>KM</UiAvatarFallback></UiAvatar></UiButton
      >
    </aside>
    <div class="workspace">
      <header>
        <div>
          <span>Workspace</span
          ><button type="button">
            Northstar operations <ChevronDown :size="14" />
          </button>
        </div>
        <div class="actions">
          <UiButton variant="ghost" size="icon" aria-label="Search"
            ><Search /></UiButton
          ><UiButton variant="ghost" size="icon" aria-label="Notifications"
            ><Bell /></UiButton
          ><UiButton size="sm">Create task</UiButton>
        </div>
      </header>
      <main>
        <div>
          <UiBadge variant="outline">Application frame</UiBadge>
          <h2>A stable shell lets the work change.</h2>
          <p>
            Global orientation stays quiet while each route owns the task in
            front of the user.
          </p>
        </div>
        <div class="route-map">
          <span>Persistent shell</span><i /><strong>Context header</strong
          ><i /><strong>Route workspace</strong>
        </div>
      </main>
    </div>
  </section>
</template>

<style scoped>
.app-shell-block {
  min-height: 27rem;
  background: var(--theme-canvas);
}
aside {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1rem;
  border-right: 1px solid var(--theme-border);
  background: var(--theme-surface);
}
.brand {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: var(--component-radius-button);
  background: var(--theme-primary);
  color: var(--theme-primary-foreground);
  font: 700 0.75rem var(--font-family-mono);
}
.brand i {
  display: none;
}
nav {
  display: grid;
  gap: 0.3rem;
  flex: 1;
}
nav a {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem;
  border-radius: var(--component-radius-field);
  color: var(--theme-text-muted);
  font-size: 0.62rem;
}
nav a.active {
  background: var(--theme-field);
  color: var(--theme-text);
  font-weight: 600;
}
aside :deep(.rounded-full) {
  width: 1.8rem;
  height: 1.8rem;
  font-size: 0.55rem;
}
.workspace {
  grid-column: span 10;
  min-width: 0;
}
.workspace > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid var(--theme-border);
  background: var(--theme-surface);
}
.workspace > header span {
  display: block;
  color: var(--theme-text-muted);
  font: 600 0.45rem var(--font-family-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.workspace > header button {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.15rem;
  font-size: 0.65rem;
  font-weight: 600;
}
.actions {
  display: flex;
  gap: 0.35rem;
}
.actions :deep(button) {
  font-size: 0.58rem;
}
.workspace main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(12rem, 0.8fr);
  gap: 2rem;
  align-items: end;
  padding: clamp(2rem, 5vw, 4rem);
}
h2 {
  max-width: 12ch;
  margin: 0.8rem 0;
  font-family: var(--font-family-b);
  font-size: clamp(2rem, 4vw, 3.8rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.055em;
}
p {
  max-width: 30rem;
  color: var(--theme-text-muted);
  font-size: 0.7rem;
  line-height: 1.65;
}
.route-map {
  display: grid;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-card);
  background: var(--theme-surface-raised);
}
.route-map span {
  color: var(--theme-primary);
  font: 600 0.48rem var(--font-family-mono);
  text-transform: uppercase;
}
.route-map strong {
  font-size: 0.65rem;
}
.route-map i {
  height: 1px;
  background: var(--theme-border);
}
@media (max-width: 800px) {
  .app-shell-block {
    display: block !important;
  }
  aside {
    display: none;
  }
  .workspace main {
    grid-template-columns: 1fr;
  }
  .workspace > header > div:first-child {
    display: none;
  }
}
</style>
