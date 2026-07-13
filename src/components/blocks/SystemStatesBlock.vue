<script setup>
import { Inbox, LockKeyhole, RefreshCw, SearchX } from "lucide-vue-next";
import { Button as UiButton, Skeleton as UiSkeleton } from "@/ui/shadcn";
import { FrappeAlert } from "@/ui/frappe";
</script>

<template>
  <section class="states-block block-grid-12 frappe-adapter">
    <article>
      <header><span>Empty</span><strong>No orders yet</strong></header>
      <div class="state">
        <Inbox />
        <p>Create the first order or import existing records.</p>
        <UiButton size="sm">Create order</UiButton>
      </div>
    </article>
    <article>
      <header><span>No results</span><strong>Nothing matched</strong></header>
      <div class="state">
        <SearchX />
        <p>Try a broader search or clear the active filters.</p>
        <UiButton size="sm" variant="outline">Clear filters</UiButton>
      </div>
    </article>
    <article>
      <header><span>Loading</span><strong>Preserve the layout</strong></header>
      <div class="skeletons">
        <UiSkeleton class="h-3 w-2/3" /><UiSkeleton
          class="h-8 w-full"
        /><UiSkeleton class="h-8 w-full" /><UiSkeleton class="h-8 w-4/5" />
      </div>
    </article>
    <article>
      <header><span>Permission</span><strong>Access required</strong></header>
      <div class="state">
        <LockKeyhole />
        <p>Ask the workspace owner for dispatch access.</p>
        <UiButton size="sm" variant="outline">Request access</UiButton>
      </div>
    </article>
    <FrappeAlert
      class="error"
      title="The records could not be refreshed"
      description="Your previous results are still visible. Check the connection and try again."
      theme="red"
      :dismissable="false"
      ><template #footer
        ><UiButton size="sm" variant="outline"
          ><RefreshCw />Retry</UiButton
        ></template
      ></FrappeAlert
    >
  </section>
</template>

<style scoped>
.states-block {
  padding: var(--block-gutter);
  background: var(--theme-canvas);
}
article {
  grid-column: span 3;
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-card);
  background: var(--theme-surface-raised);
}
article header {
  padding: 0.75rem;
  border-bottom: 1px solid var(--theme-border);
}
article header span,
article header strong {
  display: block;
}
article header span {
  color: var(--theme-primary);
  font: 0.43rem var(--font-family-mono);
  text-transform: uppercase;
}
article header strong {
  margin-top: 0.2rem;
  font-size: 0.6rem;
}
.state {
  display: flex;
  min-height: 10rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
}
.state > svg {
  width: 1.4rem;
  color: var(--theme-text-muted);
}
.state p {
  max-width: 14rem;
  margin: 0.65rem 0;
  color: var(--theme-text-muted);
  font-size: 0.5rem;
  line-height: 1.55;
}
.state :deep(button) {
  font-size: 0.5rem;
}
.skeletons {
  display: grid;
  align-content: center;
  gap: 0.55rem;
  min-height: 10rem;
  padding: 1rem;
}
.error {
  grid-column: 1/-1;
  margin-top: 0.25rem;
}
@media (max-width: 850px) {
  article {
    grid-column: span 6;
  }
}
@media (max-width: 520px) {
  article {
    grid-column: 1/-1;
  }
}
</style>
