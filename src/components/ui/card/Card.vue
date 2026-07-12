<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
});
</script>

<template>
  <div
    :class="
      cn('rounded-[var(--component-radius-card)] border bg-card text-card-foreground shadow', props.class)
    "
  >
    <slot />
  </div>
</template>
