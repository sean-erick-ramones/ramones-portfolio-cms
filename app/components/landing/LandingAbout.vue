<script setup lang="ts">
defineProps<{
  heading: string
  bioParas: string[]
  checklist: string[]
  currentlyItems: string[]
  quickFacts: { label: string; value: string }[]
}>()
</script>

<template>
  <section id="about" class="scroll-mt-20 py-[92px]">
    <div class="mx-auto max-w-[1120px] px-[28px]">
      <div class="flex items-center gap-2.5 mb-5">
        <span class="block size-[6px] rotate-45 bg-matcha-600 dark:bg-matcha-400" />
        <span
          class="text-xs uppercase tracking-[.14em] text-matcha-700 dark:text-matcha-400"
          style="font-family: var(--font-mono)"
        >
          About
        </span>
      </div>

      <div class="grid gap-14 lg:grid-cols-[1.35fr_1fr] items-start">
        <div>
          <h2
            class="text-[clamp(24px,3vw,34px)] font-semibold leading-[1.2] tracking-[-0.025em] max-w-[20ch] text-stone-900 dark:text-stone-100"
          >
            {{ heading }}
          </h2>

          <div class="mt-5 space-y-3 max-w-[58ch]">
            <p
              v-for="(para, i) in bioParas"
              :key="i"
              class="text-[15px] leading-relaxed text-stone-600 dark:text-stone-400"
              v-html="para"
            />
          </div>

          <div class="mt-6 grid grid-cols-2 gap-x-7 gap-y-3">
            <div v-for="(item, i) in checklist" :key="i" class="flex items-start gap-2">
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-4 shrink-0 text-matcha-600 dark:text-matcha-400"
              />
              <span class="text-[15px] text-stone-700 dark:text-stone-300">
                {{ item }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-[18px]">
          <div
            class="rounded-[14px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-5 py-[22px]"
          >
            <div class="flex items-center gap-2 mb-4">
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex size-full animate-ping rounded-full opacity-75 bg-matcha-500 dark:bg-matcha-400"
                />
                <span
                  class="relative inline-flex size-2 rounded-full bg-matcha-500 dark:bg-matcha-400"
                />
              </span>
              <span
                class="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400"
                style="font-family: var(--font-mono)"
              >
                Currently
              </span>
            </div>

            <div class="space-y-3">
              <div v-for="(item, i) in currentlyItems" :key="i" class="flex items-start gap-2.5">
                <UIcon
                  :name="
                    ['i-lucide-arrow-right', 'i-lucide-zap', 'i-lucide-globe', 'i-lucide-server'][i]
                  "
                  class="mt-0.5 size-4 shrink-0 text-stone-400 dark:text-stone-500"
                />
                <span class="text-[14.5px] leading-relaxed text-stone-700 dark:text-stone-300">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>

          <div
            class="rounded-[14px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-5 py-[22px]"
          >
            <div
              v-for="(fact, i) in quickFacts"
              :key="i"
              class="flex items-center justify-between"
              :class="i > 0 ? 'border-t border-stone-100 dark:border-stone-800 pt-3 mt-3' : ''"
            >
              <span
                class="text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500"
                style="font-family: var(--font-mono)"
              >
                {{ fact.label }}
              </span>
              <span class="text-[15px] font-semibold text-stone-800 dark:text-stone-200">
                {{ fact.value }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
