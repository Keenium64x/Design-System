<script setup>
import * as echarts from "echarts"
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { controls } from "../lib/design-system"

const chartElement = ref(null)
let chart

const readToken = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

const renderChart = async () => {
  await nextTick()
  if (!chartElement.value) return
  chart ||= echarts.init(chartElement.value)
  chart.setOption({
    backgroundColor: "transparent",
    color: [readToken("--theme-primary"), readToken("--theme-secondary"), readToken("--theme-accent")],
    textStyle: { color: readToken("--theme-text"), fontFamily: readToken("--font-family-a") },
    tooltip: { trigger: "axis" },
    grid: { left: 24, right: 18, top: 24, bottom: 22, containLabel: true },
    xAxis: {
      type: "category",
      data: ["Discover", "Define", "Design", "Build", "Polish"],
      axisLine: { lineStyle: { color: readToken("--theme-border") } },
      axisLabel: { color: readToken("--theme-text-muted") },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: readToken("--theme-border") } },
      axisLabel: { color: readToken("--theme-text-muted") },
    },
    series: [
      { type: "bar", data: [18, 34, 58, 82, 96], barWidth: 24, itemStyle: { borderRadius: [8, 8, 2, 2] } },
      { type: "line", data: [12, 27, 49, 72, 91], smooth: true, symbolSize: 8 },
    ],
  }, true)
}

watch(controls, renderChart, { deep: true })
onMounted(() => {
  renderChart()
  window.addEventListener("resize", renderChart)
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", renderChart)
  chart?.dispose()
})
</script>

<template>
  <div ref="chartElement" class="h-80 w-full" aria-label="Design process chart" />
</template>
