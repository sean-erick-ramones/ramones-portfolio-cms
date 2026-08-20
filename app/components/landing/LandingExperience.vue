<script setup lang="ts">
defineProps<{
  items: {
    position: string
    date: string
    company: { name: string; url: string }
    description: string
    index: number
  }[]
}>()
</script>

<template>
  <section id="work" class="scroll-mt-20 py-[92px]">
    <div class="mx-auto max-w-[1120px] px-[28px]">
      <div class="flex items-center gap-2.5 mb-5">
        <span class="block size-[6px] rotate-45 bg-matcha-600 dark:bg-matcha-400" />
        <span
          class="text-xs uppercase tracking-[.14em] text-matcha-700 dark:text-matcha-400"
          style="font-family: var(--font-mono)"
        >
          Experience
        </span>
      </div>

      <div class="max-w-[760px]">
        <div
          class="flex flex-col gap-[46px] border-l-[1.5px] border-stone-200 dark:border-stone-800 pl-[34px]"
        >
          <div v-for="(item, idx) in items" :key="idx" class="relative">
            <div
              class="absolute -left-[42px] top-1 size-[15px] rounded-full"
              :class="
                idx === 0
                  ? 'bg-matcha-500 dark:bg-matcha-400'
                  : 'bg-white dark:bg-stone-950 border-[1.5px] border-stone-300 dark:border-stone-700'
              "
            />

            <span
              class="text-xs tracking-normal text-stone-400 dark:text-stone-500"
              style="font-family: var(--font-mono)"
            >
              {{ item.date }}
            </span>

            <h3 class="mt-0.5 text-xl font-semibold text-stone-900 dark:text-stone-100">
              {{ item.position }}
            </h3>

            <a
              v-if="item.company?.url"
              :href="item.company.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[13px] transition-colors hover:text-matcha-600 dark:hover:text-matcha-400 text-matcha-700 dark:text-matcha-400 inline-flex items-center gap-0.5"
              style="font-family: var(--font-mono)"
            >
              {{ item.company.name }} <span class="text-[10px]">&nearr;</span>
            </a>

            <p
              class="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-stone-600 dark:text-stone-400"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
