<script setup>
import { ArrowRight, Asterisk, Play } from "lucide-vue-next"
import SystemButton from "@/components/SystemButton.vue"

const principles = [
  { number: "01", title: "Begin with intent", text: "Every choice earns its place by making the experience clearer, calmer, or more useful." },
  { number: "02", title: "Build one language", text: "Tokens connect the smallest control to the largest composition without losing character." },
  { number: "03", title: "Leave room to live", text: "A system should guide expression—not flatten it into identical boxes." },
]
</script>

<template>
  <div class="website-proof bg-canvas text-content">
    <section class="site-hero">
      <div class="site-orbit site-orbit--one" /><div class="site-orbit site-orbit--two" />
      <nav class="website-grid site-nav">
        <a class="col-span-3 flex items-center gap-2 font-bold"><Asterisk class="text-brand" /> Northstar</a>
        <div class="col-span-6 hidden justify-center gap-l text--1 text-muted-foreground md:flex"><a href="#principles">Principles</a><a href="#story">Story</a><a href="#contact">Contact</a></div>
        <div class="col-span-9 flex justify-end md:col-span-3"><SystemButton size="sm">Start a project</SystemButton></div>
      </nav>
      <div class="website-grid site-hero-content">
        <div class="col-span-12"><p class="section-kicker">Independent design practice · Cape Town</p><h1 class="mt-m display-heading text-[clamp(4.25rem,11vw,10.5rem)] leading-[.82]">Ideas made<br><em class="font-c font-normal text-brand">inevitable.</em></h1></div>
        <p class="col-span-12 mt-l text-1 text-muted-foreground md:col-span-7">We turn complex ambitions into identities, products, and digital places people immediately understand.</p>
        <div class="col-span-12 mt-l flex items-end md:col-span-5 md:justify-end"><button class="site-play"><Play :size="20" fill="currentColor" /><span><small>Play our reel</small><strong>01:24 minutes</strong></span></button></div>
      </div>
      <div class="website-grid site-marquee"><span v-for="item in ['Strategy','Identity','Digital','Experience']" :key="item" class="col-span-6 md:col-span-3">{{ item }} <Asterisk /></span></div>
    </section>

    <section id="principles" class="website-grid site-section">
      <div class="col-span-12 site-section-heading md:col-span-5"><p class="section-kicker">What guides us</p><h2 class="display-heading text-4">A system for making bold things feel simple.</h2></div>
      <div class="col-span-12 principle-grid md:col-start-7 md:col-span-6"><article v-for="principle in principles" :key="principle.number"><span>{{ principle.number }}</span><div><h3 class="display-heading text-2">{{ principle.title }}</h3><p class="mt-xs text--1 text-muted-foreground">{{ principle.text }}</p></div></article></div>
    </section>

    <section id="story" class="website-grid story-section">
      <div class="col-span-12 story-art md:col-span-7"><span class="story-disc" /><span class="story-word">FORM</span><span class="story-index">04—26</span></div>
      <div class="col-span-12 story-copy md:col-start-9 md:col-span-4"><p class="section-kicker">Selected story</p><h2 class="mt-m display-heading text-4">Reframing growth as a shared direction.</h2><p class="mt-s text-0 text-muted-foreground">For a new generation of climate builders, we created a flexible identity with the confidence to hold technical depth and human optimism at once.</p><SystemButton class="mt-m" variant="outline">View the case study <ArrowRight :size="17" /></SystemButton><dl class="mt-l flex flex-wrap gap-s border-t border-theme-border pt-s text--1"><div class="flex-1"><dt class="text-muted-foreground">Discipline</dt><dd>Brand + Digital</dd></div><div class="flex-1"><dt class="text-muted-foreground">Released</dt><dd>Spring 2026</dd></div></dl></div>
    </section>

    <section id="contact" class="site-cta"><div class="website-grid"><div class="col-span-12 md:col-span-9"><p class="section-kicker text-black/60">Have something ambitious?</p><h2 class="mt-s display-heading text-[clamp(3.4rem,8vw,8rem)] leading-[.85] text-black">Let’s make it<br>feel obvious.</h2></div><div class="col-span-12 flex items-end md:col-span-3 md:justify-end"><a class="mt-l inline-flex items-center gap-xs border-b-2 border-black pb-2 font-bold text-black">hello@northstar.studio <ArrowRight /></a></div></div></section>
    <footer class="website-grid site-footer"><strong class="col-span-4">Northstar®</strong><span class="col-span-5">Built from the live 12-column system</span><span class="col-span-3 text-right">© 2026</span></footer>
  </div>
</template>
