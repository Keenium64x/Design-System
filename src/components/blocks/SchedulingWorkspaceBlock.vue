<script setup>
import { CalendarDays, ChevronRight, Plus } from "lucide-vue-next";
import CalendarShowcase from "@/components/CalendarShowcase.vue";
import { FrappeBadge, FrappeButton } from "@/ui/frappe";

const agenda = [
  {
    time: "09:00",
    title: "Dispatch stand-up",
    meta: "Operations · 30 min",
    tone: "green",
  },
  {
    time: "11:30",
    title: "Aster Works review",
    meta: "Dock 04 · 45 min",
    tone: "orange",
  },
  {
    time: "14:00",
    title: "Capacity planning",
    meta: "Planning room · 60 min",
    tone: "blue",
  },
];
</script>

<template>
  <section class="schedule-block block-grid-12 frappe-adapter">
    <header>
      <div>
        <span>Schedule</span>
        <h2>Team calendar</h2>
      </div>
      <FrappeButton theme="blue" variant="solid"
        ><template #prefix><Plus :size="14" /></template>New event</FrappeButton
      >
    </header>
    <div class="calendar"><CalendarShowcase /></div>
    <aside>
      <header>
        <div><CalendarDays /><strong>Today</strong></div>
        <span>3 events</span>
      </header>
      <div class="agenda">
        <article v-for="item in agenda" :key="item.time">
          <time>{{ item.time }}</time
          ><i :class="item.tone" />
          <div>
            <strong>{{ item.title }}</strong
            ><span>{{ item.meta }}</span>
          </div>
          <ChevronRight />
        </article>
      </div>
      <footer>
        <FrappeBadge label="2 slots available" theme="green" /><button
          type="button"
        >
          Open agenda
        </button>
      </footer>
    </aside>
  </section>
</template>

<style scoped>
.schedule-block {
  padding: var(--block-gutter);
  background: var(--theme-canvas);
}
.schedule-block > header {
  grid-column: 1/-1;
  display: flex;
  align-items: end;
  justify-content: space-between;
}
.schedule-block > header span {
  color: var(--theme-primary);
  font: 0.48rem var(--font-family-mono);
  text-transform: uppercase;
}
.schedule-block h2 {
  margin-top: 0.2rem;
  font-family: var(--font-family-b);
  font-size: 1.7rem;
}
.calendar {
  grid-column: span 9;
  min-width: 0;
  max-height: 31rem;
  overflow: auto;
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-card);
  background: var(--theme-surface-raised);
}
.calendar :deep(.frappe-calendar-surface) {
  min-width: 38rem;
}
.calendar :deep(.frappe-adapter) {
  border: 0;
}
aside {
  grid-column: span 3;
  align-self: start;
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-card);
  background: var(--theme-surface-raised);
}
aside > header,
aside > footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
}
aside > header {
  border-bottom: 1px solid var(--theme-border);
}
aside > header div {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.62rem;
}
aside > header svg {
  width: 0.9rem;
  color: var(--theme-primary);
}
aside > header span {
  color: var(--theme-text-muted);
  font-size: 0.48rem;
}
.agenda article {
  display: grid;
  grid-template-columns: 2.5rem 0.35rem 1fr 0.8rem;
  gap: 0.4rem;
  align-items: center;
  padding: 0.8rem;
  border-bottom: 1px solid var(--theme-border);
}
.agenda time {
  font: 0.48rem var(--font-family-mono);
}
.agenda i {
  width: 0.3rem;
  height: 1.7rem;
  border-radius: 999px;
  background: var(--theme-primary);
}
.agenda i.green {
  background: var(--theme-success);
}
.agenda i.orange {
  background: var(--theme-warning);
}
.agenda strong,
.agenda span {
  display: block;
  font-size: 0.5rem;
}
.agenda span {
  margin-top: 0.16rem;
  color: var(--theme-text-muted);
}
.agenda svg {
  width: 0.7rem;
  color: var(--theme-text-muted);
}
aside > footer button {
  color: var(--theme-primary);
  font-size: 0.48rem;
}
@media (max-width: 900px) {
  .calendar,
  aside {
    grid-column: 1/-1;
  }
  .calendar {
    max-height: 24rem;
  }
}
</style>
