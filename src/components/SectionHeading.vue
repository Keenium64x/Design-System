<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
})
</script>

<template>
  <header class="mb-m max-w-3xl">
    <p class="mb-2 font-mono text--1 font-semibold uppercase tracking-[0.16em] text-brand">{{ eyebrow }}</p>
    <h2 class="font-b text-3 font-bold tracking-tight text-content">{{ title }}</h2>
    <p class="mt-xs text-0 text-muted-foreground">{{ description }}</p>
  </header>
</template>
