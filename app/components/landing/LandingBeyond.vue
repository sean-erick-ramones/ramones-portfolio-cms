<script setup lang="ts">
defineProps<{
  items: string[]
}>()
</script>

<template>
  <section class="py-[92px]">
    <div class="mx-auto max-w-[1120px] px-[28px]">
      <div class="flex items-center gap-2.5 mb-5">
        <span class="block size-[6px] rotate-45 bg-matcha-600 dark:bg-matcha-400" />
        <span
          class="text-xs uppercase tracking-[.14em] text-matcha-700 dark:text-matcha-400"
          style="font-family: var(--font-mono)"
        >
          Beyond the Code
        </span>
      </div>

      <div class="flex flex-wrap gap-3 max-w-[820px]">
        <span
          v-for="item in items"
          :key="item"
          class="inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-[18px] py-[11px] text-[14.5px] text-stone-700 dark:text-stone-300"
        >
          <span class="size-[7px] rounded-full bg-matcha-500 dark:bg-matcha-400 shrink-0" />
          {{ item }}
        </span>
      </div>
    </div>
  </section>
</template>
