<script setup>
import { Check, FileText, MessageSquare, ShieldAlert } from "lucide-vue-next";
import {
  Avatar as UiAvatar,
  AvatarFallback as UiAvatarFallback,
  Badge as UiBadge,
  Card as UiCard,
  CardContent as UiCardContent,
} from "@/ui/shadcn";

const events = [
  {
    initials: "MC",
    icon: ShieldAlert,
    title: "Exception escalated",
    copy: "Maya moved ORD-2418 to the priority dispatch queue.",
    time: "12 min",
    tone: "risk",
  },
  {
    initials: "JB",
    icon: MessageSquare,
    title: "Comment added",
    copy: "Jon confirmed receiving capacity with the Cape Town team.",
    time: "38 min",
  },
  {
    initials: "AK",
    icon: FileText,
    title: "Manifest attached",
    copy: "Alex uploaded the revised dispatch manifest.",
    time: "1h",
  },
  {
    initials: "SY",
    icon: Check,
    title: "Validation complete",
    copy: "The routing policy passed all automated checks.",
    time: "2h",
  },
];
</script>

<template>
  <section class="activity-block block-grid-12">
    <div class="copy">
      <UiBadge variant="outline">Audit trail</UiBadge>
      <h2>History should answer what happens next.</h2>
      <p>
        Events form one readable narrative: actor, meaningful change, time and
        consequence.
      </p>
      <dl>
        <div>
          <dt>Retention</dt>
          <dd>365 days</dd>
        </div>
        <div>
          <dt>Sources</dt>
          <dd>7 connected</dd>
        </div>
        <div>
          <dt>Last event</dt>
          <dd>12 minutes</dd>
        </div>
      </dl>
    </div>
    <UiCard class="feed"
      ><UiCardContent
        ><header>
          <strong>Recent activity</strong
          ><button type="button">View full history</button>
        </header>
        <article v-for="event in events" :key="event.title">
          <div class="avatar">
            <UiAvatar
              ><UiAvatarFallback>{{
                event.initials
              }}</UiAvatarFallback></UiAvatar
            ><i :class="event.tone"><component :is="event.icon" /></i>
          </div>
          <div>
            <strong>{{ event.title }}</strong>
            <p>{{ event.copy }}</p>
          </div>
          <time>{{ event.time }}</time>
        </article></UiCardContent
      ></UiCard
    >
  </section>
</template>

<style scoped>
.activity-block {
  align-items: center;
  padding: clamp(2rem, 5vw, 4rem) var(--block-gutter);
  background: var(--theme-surface);
}
.copy {
  grid-column: span 4;
}
.copy h2 {
  max-width: 12ch;
  margin: 0.8rem 0;
  font-family: var(--font-family-b);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.055em;
}
.copy > p {
  color: var(--theme-text-muted);
  font-size: 0.65rem;
  line-height: 1.65;
}
.copy dl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin: 1.2rem 0 0;
}
.copy dt {
  color: var(--theme-text-muted);
  font: 0.43rem var(--font-family-mono);
  text-transform: uppercase;
}
.copy dd {
  margin: 0.2rem 0 0;
  font-size: 0.56rem;
  font-weight: 600;
}
.feed {
  grid-column: 6/-1;
}
.feed :deep(.p-6) {
  padding: 0;
}
.feed header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--theme-border);
  font-size: 0.62rem;
}
.feed header button {
  color: var(--theme-primary);
  font-size: 0.5rem;
}
.feed article {
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  gap: 0.75rem;
  align-items: start;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--theme-border);
}
.feed article:last-child {
  border: 0;
}
.avatar {
  position: relative;
}
.avatar :deep(.rounded-full) {
  width: 1.8rem;
  height: 1.8rem;
  font-size: 0.48rem;
}
.avatar i {
  position: absolute;
  right: -0.15rem;
  bottom: -0.1rem;
  display: grid;
  width: 0.85rem;
  height: 0.85rem;
  place-items: center;
  border: 2px solid var(--theme-surface-raised);
  border-radius: 999px;
  background: var(--theme-field);
  color: var(--theme-primary);
}
.avatar i.risk {
  background: var(--theme-destructive);
  color: var(--theme-destructive-foreground);
}
.avatar i svg {
  width: 0.45rem;
}
.feed article strong {
  font-size: 0.58rem;
}
.feed article p {
  margin: 0.2rem 0 0;
  color: var(--theme-text-muted);
  font-size: 0.52rem;
  line-height: 1.5;
}
.feed time {
  color: var(--theme-text-muted);
  font: 0.44rem var(--font-family-mono);
}
@media (max-width: 800px) {
  .copy,
  .feed {
    grid-column: 1/-1;
  }
  .feed {
    margin-top: 1rem;
  }
}
</style>
