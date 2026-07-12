<script setup>
import { computed } from "vue"
import { getPrimitiveStyle } from "@/lib/visual-primitive-registry"

const props = defineProps({ primitive: { type: Object, required: true } })
const style = computed(() => getPrimitiveStyle(props.primitive))
</script>

<template>
  <div class="primitive-preview" :style="style" />
</template>

<style scoped>
.primitive-preview {
  min-height: 10rem;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--theme-border) 72%, transparent);
  border-radius: var(--radius-3);
  background-color: var(--theme-surface);
  isolation: isolate;
}
</style>
