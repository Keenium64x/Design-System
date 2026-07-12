<script setup>
import Gantt from "frappe-gantt"
import { nextTick, onMounted, ref, watch } from "vue"
import { controls } from "../lib/design-system"

const ganttElement = ref(null)
let gantt

const tasks = [
  { id: "1", name: "Brand direction", start: "2026-07-01", end: "2026-07-05", progress: 100 },
  { id: "2", name: "Token system", start: "2026-07-04", end: "2026-07-10", progress: 80, dependencies: "1" },
  { id: "3", name: "Component adapters", start: "2026-07-09", end: "2026-07-17", progress: 55, dependencies: "2" },
  { id: "4", name: "Composition pass", start: "2026-07-16", end: "2026-07-24", progress: 20, dependencies: "3" },
]

const renderGantt = async () => {
  await nextTick()
  if (!ganttElement.value) return
  ganttElement.value.innerHTML = ""
  gantt = new Gantt(ganttElement.value, tasks, {
    view_mode: "Day",
    readonly: true,
    container_height: 330,
  })
}

watch(controls, renderGantt, { deep: true })
onMounted(renderGantt)
</script>

<template>
  <div ref="ganttElement" class="system-gantt min-h-80 overflow-x-auto" />
</template>
