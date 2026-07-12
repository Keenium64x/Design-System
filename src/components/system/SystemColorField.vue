<script setup>
// =============================================================================
// region SYSTEM COLOR FIELD
// =============================================================================

defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, required: true },
  description: { type: String, default: "500 anchor" },
})
defineEmits(["update:modelValue"])

// endregion SYSTEM COLOR FIELD
</script>

<template>
  <label class="system-color-field">
    <input type="color" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <span><strong>{{ label }}</strong><small>{{ description }}</small></span>
    <code>{{ modelValue.toUpperCase() }}</code>
  </label>
</template>

<style scoped>
.system-color-field{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.7rem;border:1px solid var(--theme-border);border-radius:var(--component-radius-field);background:var(--theme-surface-raised);padding:.55rem}.system-color-field input{width:2.25rem;height:2.25rem;overflow:hidden;border:0;border-radius:calc(var(--component-radius-field) - 2px);padding:0;background:transparent;cursor:pointer}.system-color-field span,.system-color-field strong,.system-color-field small{display:block}.system-color-field strong{font-size:.72rem}.system-color-field small{margin-top:.08rem;color:var(--theme-text-muted);font-size:.6rem}.system-color-field code{color:var(--theme-text-muted);font-size:.58rem}
</style>
