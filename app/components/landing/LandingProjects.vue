<script setup lang="ts">
defineProps<{
  heading: string
  items: {
    title: string
    description: string
    image: string
    url: string
    tags: string[]
    date: string
  }[]
}>()
</script>

<template>
  <section id="projects" class="scroll-mt-20 py-[92px]">
    <div class="mx-auto max-w-[1120px] px-[28px]">
      <div class="flex items-center gap-2.5 mb-5">
        <span class="block size-[6px] rotate-45 bg-matcha-600 dark:bg-matcha-400" />
        <span
          class="text-xs uppercase tracking-[.14em] text-matcha-700 dark:text-matcha-400"
          style="font-family: var(--font-mono)"
        >
          Featured Projects
        </span>
      </div>

      <h2
        class="text-[clamp(24px,3vw,34px)] font-semibold leading-[1.2] tracking-[-0.025em] text-stone-900 dark:text-stone-100"
      >
        {{ heading }}
      </h2>

      <div class="mt-10 max-w-[760px] divide-y divide-stone-100 dark:divide-stone-800">
        <div
          v-for="project in items"
          :key="project.title"
          class="flex gap-5 py-6 first:pt-0 last:pb-0"
        >
          <NuxtImg
            :src="project.image"
            :alt="project.title"
            width="96"
            height="72"
            class="h-[72px] w-24 shrink-0 rounded-lg object-cover"
            loading="lazy"
            format="webp"
          />

          <div class="min-w-0 flex-1">
            <a
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-lg font-semibold text-stone-900 dark:text-stone-100 transition-colors hover:text-matcha-600 dark:hover:text-matcha-400"
            >
              {{ project.title }}
              <UIcon
                name="i-lucide-arrow-up-right"
                class="size-3.5 shrink-0 text-stone-400 dark:text-stone-500"
              />
            </a>

            <p class="mt-1 text-[14.5px] leading-relaxed text-stone-600 dark:text-stone-400">
              {{ project.description }}
            </p>

            <div class="mt-2.5 flex flex-wrap gap-1.5">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-md border px-2 py-0.5 text-[11px] border-matcha-200 dark:border-matcha-800 bg-matcha-50 dark:bg-matcha-950 text-matcha-700 dark:text-matcha-400"
                style="font-family: var(--font-mono)"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
