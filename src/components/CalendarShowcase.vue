<script setup>
import { FrappeCalendar } from "@/ui/frappe"

const month = new Date().toISOString().slice(0, 7)
const config = { defaultMode: "Month", disableModes: ["Day"], isEditMode: false, enableShortcuts: true, weekends: ["sunday"] }
const events = [
  { id: "design-review", title: "Design review", fromDate: `${month}-06`, toDate: `${month}-06`, fromTime: "09:00", toTime: "10:00", color: "blue" },
  { id: "component-audit", title: "Component audit", fromDate: `${month}-12`, toDate: `${month}-14`, fromTime: "10:00", toTime: "16:00", color: "violet" },
  { id: "launch-pass", title: "Launch pass", fromDate: `${month}-23`, toDate: `${month}-23`, fromTime: "13:00", toTime: "14:00", color: "green" },
]
</script>

<template>
  <div class="frappe-adapter frappe-calendar-surface"><FrappeCalendar :events="events" :config="config" /></div>
</template>
