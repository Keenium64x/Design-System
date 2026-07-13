<script setup>
import { Moon, Sun } from "lucide-vue-next"
import { ref } from "vue"
import ComponentCatalogue from "./views/ComponentCatalogue.vue"
import BlockCatalogue from "./views/BlockCatalogue.vue"
import ControlDashboard from "./views/ControlDashboard.vue"
import ExampleSite from "./views/ExampleSite.vue"
import WebsiteTested from "./views/WebsiteTested.vue"
import { controls } from "./lib/design-system"

// =============================================================================
// region SHOWCASE ORCHESTRATION
// =============================================================================

const activeView = ref("dashboard")
const navigation = [
  { id: "dashboard", step: "01", label: "Configure", detail: "Set the system" },
  { id: "components", step: "02", label: "Components", detail: "Test the language" },
  { id: "blocks", step: "03", label: "Blocks", detail: "Compose sections" },
  { id: "example", step: "04", label: "Website", detail: "See it composed" },
  { id: "tested", step: "05", label: "Website Tested", detail: "Stress-test styles" },
]

const toggleTheme = () => {
  controls.theme = controls.theme === "dark" ? "light" : "dark"
}

// endregion SHOWCASE ORCHESTRATION
</script>

<template>
  <div class="min-h-screen bg-canvas text-content">
    <header class="app-shell">
      <button class="flex items-center gap-xs text-left" @click="activeView = 'dashboard'">
        <span class="grid size-9 place-items-center rounded-3 bg-brand font-mono text--1 font-bold text-white">DS</span>
        <span><strong class="block text--1">Design System Studio</strong><small class="block text--2 text-muted-foreground">Live implementation lab</small></span>
      </button>
      <div class="flex min-w-0 items-center gap-xs">
        <nav class="shell-navigation" aria-label="Showcase sections">
          <button
            v-for="item in navigation"
            :key="item.id"
            :class="['shell-tab', { 'shell-tab--active': activeView === item.id }]"
            @click="activeView = item.id"
          >
            <span class="font-mono text-[10px] opacity-60">{{ item.step }}</span>
            <span><strong>{{ item.label }}</strong><small>{{ item.detail }}</small></span>
          </button>
        </nav>
        <button class="theme-toggle" :aria-label="`Switch to ${controls.theme === 'dark' ? 'light' : 'dark'} mode`" @click="toggleTheme">
          <Sun v-if="controls.theme === 'dark'" :size="17" />
          <Moon v-else :size="17" />
          <span>{{ controls.theme === 'dark' ? 'Light' : 'Dark' }}</span>
        </button>
      </div>
    </header>

    <main>
      <ControlDashboard v-show="activeView === 'dashboard'" @navigate="activeView = $event" />
      <ComponentCatalogue v-show="activeView === 'components'" />
      <BlockCatalogue v-show="activeView === 'blocks'" />
      <ExampleSite v-show="activeView === 'example'" />
      <WebsiteTested v-show="activeView === 'tested'" />
    </main>
  </div>
</template>
