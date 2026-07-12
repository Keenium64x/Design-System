<script setup>
import { Asterisk, Check, Quote, Search } from "lucide-vue-next"
import { computed, reactive } from "vue"
import SystemButton from "@/components/SystemButton.vue"
import { blockCategories, blockRegistry, filterBlocks } from "@/lib/block-registry"
import { FrappeBadge, FrappeSelect, FrappeTextInput } from "@/ui/frappe"

// =============================================================================
// region BLOCK CATALOGUE
// =============================================================================

const filters = reactive({ query: "", category: "All", sort: "Name" })
const visibleBlocks = computed(() => filterBlocks(blockRegistry, filters))

// endregion BLOCK CATALOGUE
</script>

<template>
  <div class="studio-page">
    <header class="page-intro"><div><p class="section-kicker">Blocks</p><h1 class="display-heading text-4">Compose with reusable sections.</h1></div><p class="max-w-xl text--1 text-muted-foreground">Every block is a 12-column composition made from the same component and spacing system.</p></header>
    <main class="block-catalogue">
      <div class="block-filters frappe-adapter"><FrappeTextInput v-model="filters.query" variant="outline" size="md" placeholder="Search headers, testimonials, footers…"><template #prefix><Search :size="15" /></template></FrappeTextInput><FrappeSelect v-model="filters.category" :options="blockCategories" variant="outline" size="md" /><FrappeSelect v-model="filters.sort" :options="['Name','Category']" variant="outline" size="md" /></div>
      <div class="block-grid">
        <article v-for="block in visibleBlocks" :key="block.id" class="block-card">
          <header><div><FrappeBadge class="frappe-adapter" :label="block.category" theme="gray" /><h2>{{ block.name }}</h2><p>{{ block.description }}</p></div><code>{{ block.columns }}</code></header>
          <div class="block-preview grid-12">
            <template v-if="block.id === 'header'"><strong class="col-span-3 flex items-center gap-2"><Asterisk class="text-brand" /> Northstar</strong><nav class="col-span-6 flex justify-center gap-s text--2"><span>Work</span><span>About</span><span>Contact</span></nav><div class="col-span-3 flex justify-end"><SystemButton size="sm">Start project</SystemButton></div></template>
            <template v-else-if="block.id === 'hero'"><div class="col-span-7"><span class="section-kicker">Independent studio</span><h3 class="mt-xs display-heading text-4">Make complex ideas feel obvious.</h3><p class="mt-xs text--1 text-muted-foreground">A flexible hero for a focused proposition.</p></div><div class="col-span-5 block-art"><Asterisk /></div></template>
            <template v-else-if="block.id === 'logo-cloud'"><div class="col-span-12 flex flex-wrap justify-between gap-s font-mono text--1 text-muted-foreground"><strong>ACME</strong><strong>ORBIT</strong><strong>CANOPY</strong><strong>NORTH</strong><strong>FIELD</strong></div></template>
            <template v-else-if="block.id === 'features'"><div v-for="(item,index) in ['Clear foundations','Real components','Reusable blocks']" :key="item" class="col-span-4 mini-block"><span>0{{ index+1 }}</span><strong>{{ item }}</strong><p>One responsibility, connected through shared tokens.</p></div></template>
            <template v-else-if="block.id === 'testimonial'"><blockquote class="col-span-8"><Quote class="text-brand" /><p class="mt-s display-heading text-2">“The system gave us consistency without removing the character from the work.”</p></blockquote><div class="col-span-4 self-end"><strong>Maya Chen</strong><small>Product design lead</small></div></template>
            <template v-else-if="block.id === 'stats'"><div v-for="stat in [['84%','Coverage'],['53','Components'],['6','Color ramps'],['12','Columns']]" :key="stat[1]" class="col-span-3 metric-block"><strong>{{ stat[0] }}</strong><span>{{ stat[1] }}</span></div></template>
            <template v-else-if="block.id === 'pricing'"><div v-for="(plan,index) in ['Start','Grow','Scale']" :key="plan" :class="['col-span-4 pricing-block',{featured:index===1}]"><span>{{ plan }}</span><strong>{{ ['R4k','R9k','Custom'][index] }}</strong><p><Check :size="13" /> Core system included</p></div></template>
            <template v-else-if="block.id === 'faq'"><div class="col-span-4"><span class="section-kicker">FAQ</span><h3 class="mt-xs display-heading text-3">Useful answers.</h3></div><div class="col-span-8 faq-list"><p v-for="item in ['How does the system adapt?','Can components be extended?','What controls the layout?']" :key="item">{{ item }} <span>+</span></p></div></template>
            <template v-else-if="block.id === 'cta'"><div class="col-span-8"><span class="section-kicker">Ready?</span><h3 class="mt-xs display-heading text-3">Build the next thing from one clear system.</h3></div><div class="col-span-4 flex items-end justify-end"><SystemButton>Start a project</SystemButton></div></template>
            <template v-else-if="block.id === 'footer'"><div class="col-span-4"><strong class="flex items-center gap-2"><Asterisk class="text-brand" /> Northstar</strong><p class="mt-xs text--2 text-muted-foreground">Designing useful clarity.</p></div><div v-for="group in ['Work','Studio','Social','Legal']" :key="group" class="col-span-2"><strong>{{ group }}</strong><small>Overview<br>Details<br>Contact</small></div></template>
          </div>
        </article>
      </div>
      <div v-if="!visibleBlocks.length" class="empty-library"><Search :size="22" /><strong>No matching blocks</strong></div>
    </main>
  </div>
</template>

<style scoped>
.block-catalogue{max-width:var(--grid-max-width);margin-inline:auto;padding:0 var(--grid-gutter) var(--spacing-2xl)}.block-filters{display:grid;gap:.5rem;margin-bottom:var(--spacing-m);border:1px solid var(--theme-border);border-radius:var(--component-radius-card);background:var(--theme-surface-raised);padding:.5rem}.block-grid{display:grid;gap:var(--spacing-m)}.block-card{overflow:hidden;border:1px solid var(--theme-border);border-radius:var(--component-radius-block);background:var(--theme-surface-raised);box-shadow:var(--shadow-2)}.block-card>header{display:flex;align-items:start;justify-content:space-between;gap:var(--spacing-s);border-bottom:1px solid var(--theme-border);padding:var(--spacing-s)}.block-card h2{margin-top:.55rem;font-family:var(--font-family-b);font-size:var(--font-size-2)}.block-card header p{margin-top:.25rem;color:var(--theme-text-muted);font-size:.7rem}.block-card code{color:var(--theme-primary);font-size:.62rem}.block-preview{padding:var(--spacing-m);min-height:13rem;align-items:center}.block-art{display:grid;min-height:9rem;place-items:center;border-radius:var(--component-radius-card);background:var(--theme-primary);color:var(--theme-primary-foreground)}.block-art svg{width:3rem;height:3rem}.mini-block,.metric-block,.pricing-block{height:100%;border:1px solid var(--theme-border);border-radius:var(--component-radius-card);background:var(--theme-surface);padding:var(--spacing-s)}.mini-block span{color:var(--theme-primary);font-family:var(--font-family-mono);font-size:.62rem}.mini-block strong,.mini-block p,.metric-block strong,.metric-block span,.pricing-block span,.pricing-block strong{display:block}.mini-block strong{margin-top:var(--spacing-s);font-size:.8rem}.mini-block p,.pricing-block p{margin-top:.35rem;color:var(--theme-text-muted);font-size:.65rem}.metric-block strong,.pricing-block strong{font-family:var(--font-family-b);font-size:var(--font-size-3)}.metric-block span{color:var(--theme-text-muted);font-size:.65rem}.pricing-block.featured{border-color:var(--theme-primary);background:color-mix(in oklch,var(--theme-primary) 8%,var(--theme-surface-raised))}.pricing-block p{display:flex;align-items:center;gap:.3rem}.faq-list p{display:flex;justify-content:space-between;border-bottom:1px solid var(--theme-border);padding:var(--spacing-s) 0}.block-preview small{display:block;margin-top:.4rem;color:var(--theme-text-muted);font-size:.63rem;line-height:1.7}@media(min-width:48rem){.block-filters{grid-template-columns:minmax(16rem,1fr) 12rem 10rem}}
</style>
