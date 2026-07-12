<script setup>
import { Background } from "@vue-flow/background"
import { Controls } from "@vue-flow/controls"
import { VueFlow } from "@vue-flow/core"

const nodes = [
  { id: "1", position: { x: 30, y: 110 }, data: { label: "Tokens" }, class: "system-flow-node" },
  { id: "2", position: { x: 230, y: 30 }, data: { label: "Components" }, class: "system-flow-node" },
  { id: "3", position: { x: 230, y: 190 }, data: { label: "Composition" }, class: "system-flow-node" },
  { id: "4", position: { x: 450, y: 110 }, data: { label: "Website" }, class: "system-flow-node system-flow-node--accent" },
]

const edges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-4", source: "2", target: "4", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
]
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init class="h-80">
    <Background :gap="20" :size="1.2" pattern-color="var(--theme-border)" />
    <Controls />
  </VueFlow>
</template>
