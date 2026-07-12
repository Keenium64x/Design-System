<script setup>
import { computed } from "vue"
import { FrappeSlider } from "@/ui/frappe"

// =============================================================================
// region SYSTEM RANGE FIELD ADAPTER
// =============================================================================

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: Number, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  step: { type: Number, default: 1 },
  displayValue: { type: String, default: "" },
})
const emit = defineEmits(["update:modelValue"])

const sliderValue = computed({
  get: () => [props.modelValue],
  set: (value) => emit("update:modelValue", value[0]),
})

// endregion SYSTEM RANGE FIELD ADAPTER
</script>

<template>
  <label class="system-range-field frappe-adapter">
    <span>{{ label }} <code>{{ displayValue || modelValue }}</code></span>
    <FrappeSlider v-model="sliderValue" :min="min" :max="max" :step="step" />
  </label>
</template>

<style scoped>
.system-range-field{display:grid;gap:.65rem;margin-top:.9rem;font-size:.75rem;color:var(--theme-text-muted)}
.system-range-field>span{display:flex;justify-content:space-between;gap:1rem}.system-range-field code{color:var(--theme-text)}
</style>
