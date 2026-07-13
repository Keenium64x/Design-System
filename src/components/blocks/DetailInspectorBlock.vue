<script setup>
import {
  Building2,
  Clock3,
  Mail,
  MoreHorizontal,
  Phone,
  UserRound,
} from "lucide-vue-next";
import {
  Avatar as UiAvatar,
  AvatarFallback as UiAvatarFallback,
  Badge as UiBadge,
  Button as UiButton,
  Card as UiCard,
  CardContent as UiCardContent,
  Separator as UiSeparator,
} from "@/ui/shadcn";

const records = [
  { id: "ORD-2418", company: "Aster Works", status: "At risk", active: true },
  { id: "ORD-2417", company: "Common Field", status: "In progress" },
  { id: "ORD-2416", company: "Northline", status: "Ready" },
  { id: "ORD-2415", company: "Onda Studio", status: "Complete" },
];
</script>

<template>
  <section class="inspector-block block-grid-12">
    <div class="master">
      <header>
        <div><span>Orders</span><strong>4 recent records</strong></div>
        <UiButton variant="ghost" size="icon" aria-label="More list actions"
          ><MoreHorizontal
        /></UiButton>
      </header>
      <button
        v-for="record in records"
        :key="record.id"
        type="button"
        :class="{ active: record.active }"
      >
        <div>
          <strong>{{ record.company }}</strong
          ><span>{{ record.id }}</span>
        </div>
        <UiBadge
          :variant="record.status === 'At risk' ? 'destructive' : 'outline'"
          >{{ record.status }}</UiBadge
        >
      </button>
    </div>
    <UiCard class="detail"
      ><UiCardContent
        ><header>
          <div>
            <UiBadge variant="destructive">At risk</UiBadge
            ><span>Updated 12 min ago</span>
          </div>
          <UiButton variant="ghost" size="icon" aria-label="More record actions"
            ><MoreHorizontal
          /></UiButton>
        </header>
        <h2>Aster Works</h2>
        <p class="reference">Order ORD-2418 · Priority dispatch</p>
        <UiSeparator />
        <dl>
          <div>
            <dt><Building2 />Account</dt>
            <dd>Aster Works Ltd.</dd>
          </div>
          <div>
            <dt><UserRound />Owner</dt>
            <dd>Maya Chen</dd>
          </div>
          <div>
            <dt><Clock3 />Due</dt>
            <dd>Today, 14:30</dd>
          </div>
        </dl>
        <div class="contact">
          <UiAvatar><UiAvatarFallback>TM</UiAvatarFallback></UiAvatar>
          <div><strong>Tariq Molefe</strong><span>Operations lead</span></div>
          <UiButton variant="outline" size="icon" aria-label="Email contact"
            ><Mail /></UiButton
          ><UiButton variant="outline" size="icon" aria-label="Phone contact"
            ><Phone
          /></UiButton>
        </div>
        <footer>
          <UiButton variant="outline">Reassign</UiButton
          ><UiButton>Resolve exception</UiButton>
        </footer></UiCardContent
      ></UiCard
    >
  </section>
</template>

<style scoped>
.inspector-block {
  padding: var(--block-gutter);
  background: var(--theme-canvas);
}
.master {
  grid-column: span 8;
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-card);
  background: var(--theme-surface-raised);
}
.master > header,
.master > button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
}
.master > header {
  border-bottom: 1px solid var(--theme-border);
}
.master > header span,
.master > header strong {
  display: block;
}
.master > header span {
  font-size: 0.72rem;
  font-weight: 700;
}
.master > header strong {
  margin-top: 0.15rem;
  color: var(--theme-text-muted);
  font-size: 0.5rem;
}
.master > button {
  width: 100%;
  border-bottom: 1px solid var(--theme-border);
  text-align: left;
}
.master > button:last-child {
  border: 0;
}
.master > button.active {
  background: color-mix(in oklch, var(--theme-primary) 8%, var(--theme-field));
}
.master > button.active:before {
  content: "";
  width: 2px;
  align-self: stretch;
  margin-left: -1rem;
  background: var(--theme-primary);
}
.master > button > div {
  margin-right: auto;
}
.master > button strong,
.master > button span {
  display: block;
}
.master > button strong {
  font-size: 0.62rem;
}
.master > button span {
  margin-top: 0.2rem;
  color: var(--theme-text-muted);
  font: 0.48rem var(--font-family-mono);
}
.detail {
  grid-column: span 4;
}
.detail :deep(.p-6) {
  padding: 1rem;
}
.detail header,
.detail header > div,
.detail footer,
.contact {
  display: flex;
  align-items: center;
}
.detail header {
  justify-content: space-between;
}
.detail header > div {
  gap: 0.4rem;
}
.detail header span {
  color: var(--theme-text-muted);
  font-size: 0.46rem;
}
.detail h2 {
  margin: 1.25rem 0 0.15rem;
  font-family: var(--font-family-b);
  font-size: 1.65rem;
}
.reference {
  color: var(--theme-text-muted);
  font-size: 0.54rem;
}
.detail :deep([data-orientation="horizontal"]) {
  margin: 1rem 0;
}
.detail dl {
  display: grid;
  gap: 0.7rem;
}
.detail dl div {
  display: flex;
  justify-content: space-between;
  font-size: 0.54rem;
}
.detail dt {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--theme-text-muted);
}
.detail dt svg {
  width: 0.75rem;
}
.detail dd {
  margin: 0;
  font-weight: 600;
}
.contact {
  gap: 0.55rem;
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: var(--component-radius-field);
  background: var(--theme-field);
}
.contact > div {
  margin-right: auto;
}
.contact strong,
.contact span {
  display: block;
  font-size: 0.5rem;
}
.contact span {
  margin-top: 0.15rem;
  color: var(--theme-text-muted);
}
.contact :deep(.rounded-full) {
  width: 1.75rem;
  height: 1.75rem;
  font-size: 0.5rem;
}
.detail footer {
  justify-content: flex-end;
  gap: 0.35rem;
  margin-top: 1rem;
}
@media (max-width: 800px) {
  .master,
  .detail {
    grid-column: 1/-1;
  }
}
</style>
