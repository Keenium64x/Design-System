<script setup>
import { CheckCircle2, Circle } from "lucide-vue-next";
import { ref } from "vue";
import {
  FrappeButton,
  FrappeCheckbox,
  FrappeFormControl,
  FrappeSelect,
} from "@/ui/frappe";

const name = ref("");
const owner = ref("Maya Chen");
const priority = ref("Standard");
const notify = ref(true);
const steps = [
  { label: "Order details", complete: true },
  { label: "Assignment", active: true },
  { label: "Review and save" },
];
</script>

<template>
  <section class="form-block block-grid-12 frappe-adapter">
    <aside>
      <span>New order</span>
      <h2>Create a dispatch request</h2>
      <p>Keep the user oriented through a focused, recoverable process.</p>
      <ol>
        <li
          v-for="step in steps"
          :key="step.label"
          :class="{ active: step.active, complete: step.complete }"
        >
          <component :is="step.complete ? CheckCircle2 : Circle" /><span>{{
            step.label
          }}</span>
        </li>
      </ol>
    </aside>
    <form @submit.prevent>
      <header>
        <div><strong>Assignment</strong><span>Step 2 of 3</span></div>
        <small>All fields are saved as a draft.</small>
      </header>
      <div class="fields">
        <FrappeFormControl
          v-model="name"
          label="Request name"
          description="Use a recognisable internal reference."
          type="text"
          variant="outline"
          placeholder="Cape Town priority dispatch"
        /><FrappeFormControl
          label="Customer"
          type="text"
          variant="outline"
          placeholder="Search customer…"
        />
        <div class="pair">
          <label
            >Owner<FrappeSelect
              v-model="owner"
              :options="['Maya Chen', 'Jon Bell', 'Alex Kim']"
              variant="outline" /></label
          ><label
            >Priority<FrappeSelect
              v-model="priority"
              :options="['Standard', 'Urgent', 'Critical']"
              variant="outline"
          /></label>
        </div>
        <FrappeFormControl
          label="Instructions"
          type="textarea"
          variant="outline"
          placeholder="Add handling notes, dependencies or constraints…"
        /><FrappeCheckbox
          v-model="notify"
          label="Notify the assigned owner when this request is created"
        />
      </div>
      <footer>
        <FrappeButton
          label="Save draft"
          theme="gray"
          variant="outline"
        /><FrappeButton
          label="Continue to review"
          theme="blue"
          variant="solid"
        />
      </footer>
    </form>
  </section>
</template>

<style scoped>
.form-block {
  padding: var(--block-gutter);
  background: var(--theme-canvas);
}
aside {
  grid-column: span 4;
  padding: 1.2rem;
  border-radius: var(--component-radius-card);
  background: var(--theme-surface);
}
aside > span {
  color: var(--theme-primary);
  font: 0.48rem var(--font-family-mono);
  text-transform: uppercase;
}
aside h2 {
  max-width: 10ch;
  margin: 0.7rem 0;
  font-family: var(--font-family-b);
  font-size: 2rem;
  font-weight: 400;
  line-height: 1;
}
aside p {
  color: var(--theme-text-muted);
  font-size: 0.58rem;
  line-height: 1.6;
}
ol {
  display: grid;
  gap: 0.85rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}
li {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--theme-text-muted);
  font-size: 0.57rem;
}
li svg {
  width: 0.85rem;
}
li.active {
  color: var(--theme-text);
  font-weight: 600;
}
li.complete {
  color: var(--theme-primary);
}
form {
  grid-column: 6/-1;
  overflow: hidden;
  border: 1px solid var(--theme-border);
  border-radius: var(--component-radius-card);
  background: var(--theme-surface-raised);
}
form > header,
form > footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-color: var(--theme-border);
}
form > header {
  border-bottom: 1px solid var(--theme-border);
}
form > header strong,
form > header span {
  display: block;
}
form > header strong {
  font-size: 0.72rem;
}
form > header span,
form > header small {
  margin-top: 0.15rem;
  color: var(--theme-text-muted);
  font-size: 0.48rem;
}
.fields {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}
.pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}
.pair label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.55rem;
  font-weight: 600;
}
form > footer {
  justify-content: flex-end;
  gap: 0.35rem;
  border-top: 1px solid var(--theme-border);
}
@media (max-width: 800px) {
  aside,
  form {
    grid-column: 1/-1;
  }
}
</style>
