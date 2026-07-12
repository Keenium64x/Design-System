<script setup>
import { Button } from "@/ui/shadcn"

defineProps({
  variant: { type: String, default: "solid" },
  size: { type: String, default: "md" },
})

const variants = {
  solid: "border-brand bg-brand text-white hover:brightness-110",
  secondary: "border-brand-secondary bg-brand-secondary text-white hover:brightness-110",
  outline: "border-theme-border bg-surface-raised text-content hover:bg-surface",
  ghost: "border-transparent bg-transparent text-content hover:bg-surface",
  destructive: "border-error-600 bg-error-600 text-white hover:bg-error-700",
}

const sizes = {
  sm: "sm",
  md: "default",
  lg: "lg",
}

const mappedVariants = { solid: "default", secondary: "secondary", outline: "outline", ghost: "ghost", destructive: "destructive" }
</script>

<template>
  <Button :variant="mappedVariants[variant]" :size="sizes[size]">
    <slot />
  </Button>
</template>
