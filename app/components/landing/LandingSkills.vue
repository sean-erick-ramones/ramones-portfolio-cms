<script setup lang="ts">
defineProps<{
  categories: { name: string; skills: string[] }[]
}>()
</script>

<template>
  <section
    id="skills"
    class="scroll-mt-20 py-[84px] bg-stone-100 dark:bg-stone-900 border-y border-stone-200 dark:border-stone-800"
  >
    <div class="mx-auto max-w-[1120px] px-[28px]">
      <div class="flex items-center gap-2.5 mb-5">
        <span class="block size-[6px] rotate-45 bg-matcha-600 dark:bg-matcha-400" />
        <span
          class="text-xs uppercase tracking-[.14em] text-matcha-700 dark:text-matcha-400"
          style="font-family: var(--font-mono)"
        >
          Skills
        </span>
      </div>

      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="category in categories" :key="category.name">
          <h4 class="mb-3 text-sm font-semibold text-stone-800 dark:text-stone-200">
            {{ category.name }}
          </h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in category.skills"
              :key="skill"
              class="rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-3 py-1.5 text-[13px] text-stone-600 dark:text-stone-300"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
