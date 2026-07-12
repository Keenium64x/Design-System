<script setup>
import { FrappeFormControl } from "@/ui/frappe"

// =============================================================================
// region SYSTEM SELECT FIELD ADAPTER
// =============================================================================

defineProps({
  label: { type: String, required: true },
  modelValue: { type: [String, Number], required: true },
  options: { type: Array, required: true },
})
defineEmits(["update:modelValue"])

// endregion SYSTEM SELECT FIELD ADAPTER
</script>

<template>
  <FrappeFormControl
    class="system-select-field frappe-adapter"
    type="select"
    variant="outline"
    size="md"
    :label="label"
    :options="options"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<style scoped>
.system-select-field{margin-top:.9rem}
</style>
