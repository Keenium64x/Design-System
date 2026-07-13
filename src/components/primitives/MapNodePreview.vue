<script setup>
import { onMounted, ref, watch } from "vue"

const props = defineProps({ primitive: { type: Object, required: true }, values: { type: Object, required: true } })
const inputCanvas = ref(null)
const outputCanvas = ref(null)
const W = 210
const H = 160

const seeded = (seed) => { let state = Number(seed || 17) * 999.91; return () => { state = Math.sin(state) * 43758.5453; return state - Math.floor(state) } }
const clamp = (value) => Math.max(0, Math.min(1, value))
const makeSource = (renderer = props.primitive.renderer) => {
  const data = new Float32Array(W * H)
  const random = seeded(props.values.seed)
  const scale = Number(props.values.scale ?? 4)
  const contrast = Number(props.values.contrast ?? .55)
  for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) {
    const nx = x / W, ny = y / H
    let value = .5
    if (renderer === "map-cellular") value = Math.abs(Math.sin(nx * scale * Math.PI) * Math.cos(ny * scale * Math.PI))
    else if (renderer === "map-fibre") value = .5 + Math.sin((x + y * Number(props.values.irregularity ?? .25)) * scale * .08) * .25 + (random() - .5) * .14
    else if (renderer === "map-speckle") value = random() > 1 - Number(props.values.density ?? 18) / 700 ? .85 + random() * .15 : .08
    else if (renderer === "map-scratch") value = random() > 1 - Number(props.values.density ?? 10) / 1000 && (x + y) % 9 < 2 ? .95 : .06
    else {
      const broad = .5 + (Math.sin(nx * scale * 5.2) + Math.sin(ny * scale * 4.4) + Math.sin((nx + ny) * scale * 3.1)) / 9
      value = broad * .76 + random() * .24
      if (renderer === "map-ridged-noise") value = 1 - Math.abs(value * 2 - 1)
      if (renderer === "map-cloud") value = broad * .9 + random() * .1
    }
    data[y * W + x] = clamp((value - .5) * contrast + .5)
  }
  return data
}
const applyModifier = (source) => {
  const out = new Float32Array(source)
  const id = props.primitive.renderer
  if (id === "modifier-levels") for (let i = 0; i < out.length; i += 1) out[i] = Math.pow(clamp((out[i] - Number(props.values.black)) / Math.max(.01, Number(props.values.white) - Number(props.values.black))), 1 / Number(props.values.gamma))
  if (id === "modifier-threshold") for (let i = 0; i < out.length; i += 1) { const t = Number(props.values.threshold), f = Math.max(.001, Number(props.values.feather)); out[i] = clamp((out[i] - t + f) / (f * 2)) }
  if (id === "modifier-blur" || id === "modifier-directional-stretch") {
    const copy = new Float32Array(source); const radius = Math.min(24, Math.max(1, Math.round(Number(props.values.radius ?? props.values.amount ?? 4))))
    const angle = Number(props.values.rotation ?? 0) * Math.PI / 180
    for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) { let sum = 0, count = 0; for (let k = -radius; k <= radius; k += 1) { const sx = Math.round(x + (id === "modifier-blur" ? k : Math.cos(angle) * k)); const sy = Math.round(y + (id === "modifier-blur" ? 0 : Math.sin(angle) * k)); if (sx >= 0 && sx < W && sy >= 0 && sy < H) { sum += copy[sy * W + sx]; count += 1 } } out[y * W + x] = sum / count }
  }
  if (id === "modifier-warp") { const copy = new Float32Array(source); const amount = Number(props.values.amount) / 8; for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) { const sx = Math.max(0, Math.min(W - 1, Math.round(x + Math.sin(y / 13) * amount))); out[y * W + x] = copy[y * W + sx] } }
  return out
}
const hex = (value, fallback) => { const match = /^#([\da-f]{6})$/i.exec(String(value)); const raw = match?.[1] ?? fallback; return [0, 2, 4].map((offset) => parseInt(raw.slice(offset, offset + 2), 16)) }
const draw = (canvas, data, applied = false, colored = false) => {
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext("2d"); const image = ctx.createImageData(W, H)
  const a = hex(props.values.color, "9a7b16"), b = hex(props.values.colorB, "297f91")
  for (let i = 0; i < data.length; i += 1) { const value = data[i]; const o = i * 4; const influence = applied ? .09 : 1; const base = 32
    if (colored) { image.data[o] = a[0] + (b[0] - a[0]) * value; image.data[o + 1] = a[1] + (b[1] - a[1]) * value; image.data[o + 2] = a[2] + (b[2] - a[2]) * value }
    else { const shade = applied ? base + value * 255 * influence : value * 255; image.data[o] = shade; image.data[o + 1] = shade; image.data[o + 2] = shade }
    image.data[o + 3] = 255
  }
  ctx.putImageData(image, 0, 0)
}
const render = () => {
  if (!inputCanvas.value || !outputCanvas.value) return
  const source = makeSource(props.primitive.nodeKind === "modifier" ? "map-fractal-noise" : props.primitive.renderer)
  if (props.primitive.nodeKind === "modifier") { draw(inputCanvas.value, source); const output = applyModifier(source); draw(outputCanvas.value, output, false, props.primitive.renderer === "modifier-color-ramp") }
  else { draw(inputCanvas.value, source); draw(outputCanvas.value, source, true) }
}
onMounted(render)
watch(() => props.values, render, { deep: true })
</script>

<template><div class="map-comparison"><figure><canvas ref="inputCanvas"/><figcaption>{{ primitive.nodeKind === 'modifier' ? 'Input map' : '0–1 data map' }}</figcaption></figure><span>→</span><figure><canvas ref="outputCanvas"/><figcaption>{{ primitive.nodeKind === 'modifier' ? 'Processed output' : 'Applied at 9%' }}</figcaption></figure></div></template>

<style scoped>.map-comparison{position:absolute;inset:0;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:.5rem;padding:.65rem;background:#111}.map-comparison>span{color:#aaa;font:600 .7rem var(--font-family-mono)}figure{display:grid;gap:.35rem;margin:0;min-width:0}canvas{display:block;width:100%;height:9rem;border:1px solid rgb(255 255 255/.16);border-radius:.35rem;background:#222}figcaption{color:#aaa;font:600 .52rem var(--font-family-mono);letter-spacing:.08em;text-align:center;text-transform:uppercase}</style>
