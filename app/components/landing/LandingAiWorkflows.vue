<script setup lang="ts">
defineProps<{
  heading: string
  headingAccent: string
  description: string
  items: {
    title: string
    description: string
    tools?: string[]
    icon?: string
    link?: string
  }[]
}>()
</script>

<template>
  <section id="aiworkflows" class="scroll-mt-20 py-[92px] bg-stone-900">
    <div class="mx-auto max-w-[1120px] px-[28px]">
      <div class="flex items-center gap-2.5 mb-5">
        <span class="block size-[6px] rotate-45 bg-matcha-400" />
        <span
          class="text-xs uppercase tracking-[.14em] text-matcha-400"
          style="font-family: var(--font-mono)"
        >
          AI-Augmented Workflows
        </span>
      </div>

      <h2
        class="text-[clamp(26px,4vw,44px)] font-semibold leading-[1.15] tracking-[-0.025em] text-stone-100"
      >
        {{ heading }}
        <span class="text-matcha-400">{{ headingAccent }}</span>
      </h2>

      <p class="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-stone-400">
        {{ description }}
      </p>

      <div class="mt-10 grid gap-5 lg:grid-cols-3">
        <a
          v-for="item in items"
          :key="item.title"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col rounded-2xl border border-stone-800 bg-stone-900/80 p-6 transition-colors hover:border-stone-700"
        >
          <div class="flex size-[42px] items-center justify-center rounded-[10px] bg-matcha-500/10">
            <UIcon :name="item.icon" class="size-5 text-matcha-400" />
          </div>

          <h3 class="mt-4 text-lg font-semibold text-stone-100">
            {{ item.title }}
          </h3>

          <p class="mt-2 flex-1 text-[14.5px] leading-relaxed text-stone-400">
            {{ item.description }}
          </p>

          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="tool in item.tools"
              :key="tool"
              class="rounded-md border border-stone-800 bg-white/5 px-2 py-0.5 text-[11px] text-stone-400"
              style="font-family: var(--font-mono)"
            >
              {{ tool }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
