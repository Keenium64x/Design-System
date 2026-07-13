<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { getPrimitiveDefaults } from "@/lib/visual-primitive-registry"
import MapNodePreview from "./MapNodePreview.vue"

const props = defineProps({
  primitive: { type: Object, required: true },
  values: { type: Object, default: null },
  showGuides: { type: Boolean, default: false },
})

const p = computed(() => ({ ...getPrimitiveDefaults(props.primitive), ...(props.values ?? {}) }))
const n = (key, fallback = 0) => Number(p.value[key] ?? fallback)
const color = (key, fallback) => p.value[key] ?? fallback
const point = computed(() => ({ x: n("originX", 50) * 4, y: n("originY", 38) * 2.4 }))
const textureCanvas = ref(null)
const maskImage = computed(() => ({
  none: "none",
  radial: `radial-gradient(circle at ${n("originX", 50)}% ${n("originY", 38)}%, black 8%, transparent ${n("falloff", 68)}%)`,
  left: "linear-gradient(90deg, black, transparent 78%)",
  right: "linear-gradient(-90deg, black, transparent 78%)",
  top: "linear-gradient(180deg, black, transparent 78%)",
  bottom: "linear-gradient(0deg, black, transparent 78%)",
  "safe-zone": "linear-gradient(90deg, black 0 16%, transparent 28% 78%, black 90%)",
}[p.value.mask] ?? "none"))

const cssStyle = computed(() => {
  const opacity = n("opacity", 0.3)
  const primary = color("color", "var(--theme-primary)")
  const secondary = color("colorB", "var(--theme-secondary)")
  const x = n("originX", 50)
  const y = n("originY", 38)
  const falloff = n("falloff", 68)
  const angle = n("rotation", 0)
  const intensity = n("intensity", opacity)
  const styles = {
    "tonal-linear": `linear-gradient(${angle + 135}deg, color-mix(in oklch, ${primary} ${Math.round(opacity * 100)}%, var(--theme-surface)), color-mix(in oklch, ${secondary} ${Math.round(opacity * 75)}%, var(--theme-canvas)))`,
    "tonal-radial": `radial-gradient(circle at ${x}% ${y}%, color-mix(in oklch, ${primary} ${Math.round(opacity * 100)}%, var(--theme-surface)), var(--theme-surface) ${falloff}%)`,
    "atmospheric-field": `radial-gradient(at ${x}% ${y}%, color-mix(in oklch, ${primary} ${Math.round(opacity * 100)}%, transparent), transparent ${falloff}%), radial-gradient(at ${100-x}% ${Math.min(y+32,100)}%, color-mix(in oklch, ${secondary} ${Math.round(opacity * 85)}%, transparent), transparent ${falloff}%)`,
    "split-material": `linear-gradient(${angle + 90}deg, ${primary} 0 ${n("split",64)}%, ${secondary} calc(${n("split",64)}% + .25%), ${secondary} 100%)`,
    "horizon-field": `linear-gradient(to bottom, color-mix(in oklch, ${primary} ${Math.round(opacity*65)}%, var(--theme-surface)) 0 ${y-5}%, color-mix(in oklch, ${primary} ${Math.round(opacity*100)}%, var(--theme-surface)) ${y}%, var(--theme-canvas) ${falloff}%)`,
    "vignette-field": `radial-gradient(ellipse at ${x}% ${y}%, transparent 25%, rgb(0 0 0 / ${opacity}) ${falloff}%)`,
    "focal-glow": `radial-gradient(circle at ${x}% ${y}%, color-mix(in oklch, ${primary} ${Math.round(intensity*100)}%, transparent), transparent ${n("radius",42)}%)`,
    "eclipse-glow": `radial-gradient(circle at ${x}% ${y}%, var(--theme-canvas) 0 ${n("radius",25)-5}%, color-mix(in oklch, ${primary} ${Math.round(intensity*100)}%, transparent) ${n("radius",25)}%, transparent ${n("radius",25)+22}%)`,
    "directional-beam": `linear-gradient(${angle+90}deg, transparent ${45-n("spread",26)/2}%, color-mix(in oklch, ${primary} ${Math.round(intensity*100)}%, transparent) 50%, transparent ${55+n("spread",26)/2}%)`,
    "edge-light": `${{top:"to bottom",right:"to left",bottom:"to top",left:"to right"}[p.value.edge] ?? "to bottom"}, color-mix(in oklch, ${primary} ${Math.round(intensity*100)}%, transparent), transparent 25%`,
    "reflected-wash": `radial-gradient(ellipse at ${x}% ${y}%, color-mix(in oklch, ${primary} ${Math.round(opacity*100)}%, transparent), transparent ${falloff}%)`,
    "map-radial-distance": `radial-gradient(circle at ${x}% ${y}%, white 0%, black ${n("radius",68)}%)`,
    "radial-region": `radial-gradient(circle at ${x}% ${y}%, color-mix(in oklch, var(--theme-primary) 28%, transparent) 0 ${n("inner",18)}%, transparent ${falloff}%)`,
    "directional-region": `linear-gradient(${angle+90}deg, color-mix(in oklch, var(--theme-primary) 26%, transparent) 0 ${n("start",28)}%, transparent ${falloff}%)`,
    "safe-zone-cutout": `linear-gradient(135deg, color-mix(in oklch, var(--theme-primary) 20%, transparent), color-mix(in oklch, var(--theme-secondary) 14%, transparent))`,
  }
  let backgroundImage = styles[props.primitive.renderer] ?? "none"
  if (props.primitive.renderer === "edge-light") backgroundImage = `linear-gradient(${backgroundImage})`
  const regionalMask = props.primitive.renderer === "safe-zone-cutout"
    ? `linear-gradient(black,black),linear-gradient(black,black)`
    : maskImage.value
  return { backgroundImage, opacity: props.primitive.category.includes("Foundation") ? 1 : undefined, maskImage: regionalMask, WebkitMaskImage: regionalMask, backgroundBlendMode: p.value.blendMode ?? props.primitive.defaultBlendMode }
})

const rings = computed(() => Array.from({ length: Math.min(n("density", 8), 12) }, (_, index) => (index + 1) * n("spacing", 32)))
const lines = computed(() => Array.from({ length: Math.min(n("density", 8), 18) }, (_, index) => index))

const seeded = (seed) => {
  let value = Math.sin(seed * 999.91) * 43758.5453
  return () => (value = Math.sin(value) * 43758.5453) - Math.floor(value)
}
const drawTexture = () => {
  if (!textureCanvas.value || !primitiveIsMap.value) return
  const canvas = textureCanvas.value
  const width = 420
  const height = 240
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  const image = ctx.createImageData(width, height)
  const random = seeded(n("seed", 17))
  const renderer = props.primitive.renderer
  const scale = Math.max(1, n("scale", 6))
  const contrast = n("contrast", 1)
  for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
    let value = .5
    const nx = x / width
    const ny = y / height
    if (renderer === "map-fractal-noise" || renderer === "map-cloud" || renderer === "map-ridged-noise") {
      const broad = (Math.sin(nx*scale*6.28)+Math.sin(ny*scale*5.4)+Math.sin((nx+ny)*scale*3.7))/6+.5
      value = renderer === "map-cloud" ? broad*.8+random()*.2 : broad*.55+random()*.45
      if (renderer === "map-ridged-noise") value = 1-Math.abs(value*2-1)
    } else if (renderer === "map-cellular") {
      value = Math.min(1, Math.abs(Math.sin(nx*scale*3.14)*Math.cos(ny*scale*3.14))*2)
    } else if (renderer === "map-fibre") {
      value = Math.min(1,Math.abs(Math.sin((x+y*n("irregularity",.35))*scale*.18))*.7+random()*.3)
    } else if (renderer === "map-speckle") value = random() > 1-n("density",36)/500 ? random() : 0
    else if (renderer === "map-scratch") value = random() > 1-n("density",22)/800 && (x+y)%Math.max(2,Math.round(n("length",28)/4)) < 2 ? 1 : 0
    value = Math.max(0,Math.min(1,(value-.5)*contrast+.5))
    const c = Math.round(value*255)
    const i = (y*width+x)*4
    image.data[i]=c;image.data[i+1]=c;image.data[i+2]=c;image.data[i+3]=255
  }
  ctx.putImageData(image,0,0)
}
const primitiveIsMap = computed(() => props.primitive.nodeKind === "source" && props.primitive.category === "Procedural maps")
watch([p, textureCanvas], drawTexture, { deep: true })
onMounted(drawTexture)
onBeforeUnmount(() => {})
</script>

<template>
  <div class="primitive-preview">
    <MapNodePreview v-if="primitive.category === 'Procedural maps' || primitive.category === 'Map modifiers'" :primitive="primitive" :values="p" />
    <canvas v-else-if="primitiveIsMap && ['canvas','svg-filter'].includes(primitive.renderingMethod)" ref="textureCanvas" class="texture-map" />
    <div v-else-if="primitive.renderingMethod === 'css'" class="css-layer" :style="cssStyle" />
    <svg v-else viewBox="0 0 400 240" preserveAspectRatio="none" :style="{ opacity: p.opacity ?? .24, maskImage, WebkitMaskImage: maskImage }" aria-hidden="true">
      <g :transform="`rotate(${p.rotation ?? 0} 200 120)`" fill="none" :stroke="p.color ?? 'var(--theme-primary)'" :stroke-width="p.lineWidth ?? 1">
        <template v-if="primitive.renderer === 'cartesian-grid'">
          <path v-for="x in Math.ceil(400/(p.spacing||32))" :key="`x${x}`" :d="`M${x*(p.spacing||32)} 0V240`" :class="{ major: x%(p.majorInterval||4)===0 }"/><path v-for="y in Math.ceil(240/(p.spacing||32))" :key="`y${y}`" :d="`M0 ${y*(p.spacing||32)}H400`" :class="{ major: y%(p.majorInterval||4)===0 }"/>
        </template>
        <template v-else-if="primitive.renderer === 'perspective-grid'">
          <path v-for="i in lines" :key="i" :d="`M${i*400/(lines.length-1)} 240L${point.x} ${point.y}`"/><path v-for="i in 8" :key="`h${i}`" :d="`M${200-i*i*3.5} ${point.y+i*i*2.2}H${200+i*i*3.5}`"/>
        </template>
        <template v-else-if="['polar-grid','concentric-rings'].includes(primitive.renderer)"><circle v-for="r in rings" :key="r" :cx="point.x" :cy="point.y" :r="r/2"/><path v-if="primitive.renderer==='polar-grid'" v-for="i in lines" :key="`r${i}`" :d="`M${point.x} ${point.y}L${point.x+260*Math.cos(i*Math.PI*2/lines.length)} ${point.y+260*Math.sin(i*Math.PI*2/lines.length)}`"/></template>
        <path v-else-if="primitive.renderer === 'construction-axis'" :d="`M${point.x} -80V320 M-80 ${point.y}H480`" stroke-dasharray="5 9"/>
        <template v-else-if="primitive.renderer === 'parallel-guides'"><path v-for="i in 14" :key="i" :d="`M${i*(p.spacing||32)-80} -60V300`"/></template>
        <template v-else-if="primitive.renderer === 'measurement-field'"><path d="M24 24H376V216H24Z"/><path v-for="i in 18" :key="i" :d="`M${24+i*20} 24v${i%(p.majorInterval||4)===0?12:6}`"/></template>
        <template v-else-if="primitive.renderer === 'radial-rays'"><path v-for="i in lines" :key="i" :d="`M${point.x+18*Math.cos(i*Math.PI*2/lines.length)} ${point.y+18*Math.sin(i*Math.PI*2/lines.length)}L${point.x+180*Math.cos(i*Math.PI*2/lines.length)} ${point.y+180*Math.sin(i*Math.PI*2/lines.length)}`"/></template>
        <template v-else-if="primitive.renderer === 'orbital-paths'"><ellipse v-for="(r,i) in rings.slice(0,6)" :key="r" :cx="point.x" :cy="point.y" :rx="r*.7" :ry="r*.32" :transform="`rotate(${i*13} ${point.x} ${point.y})`"/><circle :cx="point.x+60" :cy="point.y-18" r="3" fill="currentColor" stroke="none"/></template>
        <template v-else-if="primitive.renderer === 'deco-fan'"><path v-for="i in lines" :key="i" :d="`M${point.x} ${point.y}L${point.x+230*Math.cos((-1.1+i*2.2/(lines.length-1)))} ${point.y+230*Math.sin((-1.1+i*2.2/(lines.length-1)))}`"/><path v-for="r in [40,80,120,160]" :key="r" :d="`M${point.x+r*Math.cos(-1.1)} ${point.y+r*Math.sin(-1.1)}A${r} ${r} 0 0 1 ${point.x+r*Math.cos(1.1)} ${point.y+r*Math.sin(1.1)}`"/></template>
        <template v-else-if="primitive.renderer === 'guilloche-field'"><path v-for="i in lines" :key="i" :d="`M0 ${120+i*2} C100 ${20+i*8},300 ${220-i*8},400 ${120+i*2} S700 ${20+i*6},800 ${120+i*2}`"/></template>
        <template v-else-if="primitive.renderer === 'wave-interference'"><circle v-for="r in rings.slice(0,9)" :key="`a${r}`" cx="120" cy="120" :r="r/2"/><circle v-for="r in rings.slice(0,9)" :key="`b${r}`" cx="280" cy="120" :r="r/2"/></template>
        <template v-else-if="primitive.renderer === 'topographic-contours'"><path v-for="i in lines" :key="i" :d="`M${20+i*3} ${180-i*10}C${70+i*8} ${60+i*4},${190+i*5} ${230-i*7},${370-i*4} ${45+i*9}`"/></template>
        <template v-else-if="primitive.renderer === 'circuit-routes'"><path v-for="i in lines" :key="i" :d="`M20 ${25+i*24}H${90+i*15}V${45+i*17}H380`"/><circle v-for="i in lines" :key="`c${i}`" :cx="90+i*15" :cy="45+i*17" r="2"/></template>
        <template v-else-if="primitive.renderer === 'isometric-lattice'"><path v-for="i in 18" :key="i" :d="`M${i*28-80} 260L${i*28+80} -20 M${i*28-80} -20L${i*28+80} 260`"/><path v-for="i in 9" :key="`iso${i}`" :d="`M0 ${i*28}H400`"/></template>
        <template v-else-if="primitive.renderer === 'dot-matrix'"><circle v-for="i in 180" :key="i" :cx="(i%20)*20+10" :cy="Math.floor(i/20)*24+12" :r="p.dotSize||1.5" fill="currentColor" stroke="none"/></template>
        <template v-else-if="primitive.renderer === 'map-stipple'"><circle v-for="i in 300" :key="i" :cx="(i%25)*16+8" :cy="Math.floor(i/25)*20+10" :r="Math.max(.2,(p.size||1)*(1+(i%25)/25*(p.gradient||.4)))" fill="white" stroke="none"/></template>
        <template v-else-if="primitive.renderer === 'map-wave'"><path v-for="i in 16" :key="i" :d="`M0 ${i*16} Q100 ${i*16-(p.amplitude||18)} 200 ${i*16}T400 ${i*16}`"/></template>
        <rect v-else-if="primitive.renderer === 'inset-frame'" :x="p.inset||20" :y="p.inset||20" :width="400-2*(p.inset||20)" :height="240-2*(p.inset||20)"/>
        <template v-else-if="primitive.renderer === 'corner-brackets'"><path v-for="d in [`M20 ${20+(p.length||28)}V20H${20+(p.length||28)}`,`M${380-(p.length||28)} 20H380V${20+(p.length||28)}`,`M20 ${220-(p.length||28)}V220H${20+(p.length||28)}`,`M${380-(p.length||28)} 220H380V${220-(p.length||28)}`]" :key="d" :d="d"/></template>
        <path v-else-if="primitive.renderer === 'diagonal-seam'" :d="`M${120+(p.offset||0)} -40L${280+(p.offset||0)} 280`"/>
        <template v-else-if="primitive.renderer === 'registration-marks'"><path d="M20 32V20H32 M368 20H380V32 M20 208V220H32 M368 220H380V208 M190 20H210 M200 10V30"/></template>
      </g>
    </svg>
    <div v-if="primitiveIsMap && primitive.category !== 'Procedural maps'" class="map-label"><span>0</span><strong>GRAYSCALE MAP</strong><span>1</span></div>
    <div v-if="showGuides" class="guide-origin" :style="{ left: `${p.originX ?? 50}%`, top: `${p.originY ?? 38}%` }"/><div v-if="showGuides" class="safe-zone"/>
  </div>
</template>

<style scoped>
.primitive-preview{position:relative;min-height:12rem;overflow:hidden;border:1px solid var(--theme-border);border-radius:var(--radius-3);background:linear-gradient(145deg,var(--theme-surface-raised),var(--theme-surface));isolation:isolate}.css-layer,svg,.texture-map{position:absolute;inset:0;width:100%;height:100%}.texture-map{image-rendering:auto}svg{color:var(--theme-primary)}svg path,svg circle,svg rect,svg ellipse{vector-effect:non-scaling-stroke}.major{opacity:1;stroke-width:calc((v-bind('p.lineWidth') + 0.6) * 1px)}.guide-origin{position:absolute;width:.65rem;height:.65rem;border:1px solid var(--theme-error);border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 0 3px color-mix(in oklch,var(--theme-error) 20%,transparent)}.safe-zone{position:absolute;left:18%;top:42%;width:64%;height:38%;border:1px dashed color-mix(in oklch,var(--theme-success) 70%,transparent);background:color-mix(in oklch,var(--theme-success) 5%,transparent);pointer-events:none}.map-label{position:absolute;inset:auto .55rem .45rem;display:flex;justify-content:space-between;color:white;font:600 .52rem var(--font-family-mono);letter-spacing:.1em;text-shadow:0 1px 3px #000}.modifier-preview{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:.55rem;padding:1rem;font:600 .58rem var(--font-family-mono);color:var(--theme-text-muted)}.modifier-preview span,.modifier-preview strong{border:1px solid var(--theme-border);border-radius:var(--radius-2);padding:.55rem;background:var(--theme-surface-raised)}.modifier-preview strong{color:var(--theme-primary)}
</style>
