<script setup lang="ts">
defineProps<{
  items: {
    quote: string
    author: {
      name: string
      description?: string
      avatar?: { src?: string }
    }
  }[]
}>()
</script>

<template>
  <section class="border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
    <div class="mx-auto max-w-[1120px] px-[28px] py-[84px]">
      <div class="flex items-center gap-2.5 mb-5">
        <span class="block size-[6px] rotate-45 bg-matcha-600 dark:bg-matcha-400" />
        <span
          class="text-xs uppercase tracking-[.14em] text-matcha-700 dark:text-matcha-400"
          style="font-family: var(--font-mono)"
        >
          Testimonials
        </span>
      </div>

      <div class="grid gap-[22px] sm:grid-cols-2">
        <figure
          v-for="item in items"
          :key="item.author.name"
          class="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-[30px] pb-[26px]"
        >
          <span
            class="block text-4xl leading-none text-matcha-500 dark:text-matcha-400 font-serif select-none"
          >
            &ldquo;
          </span>

          <blockquote
            class="mt-1 text-base leading-relaxed text-stone-700 dark:text-stone-300 whitespace-pre-line"
          >
            {{ item.quote }}
          </blockquote>

          <figcaption class="mt-5 flex items-center gap-3">
            <img
              v-if="item.author.avatar?.src"
              :src="item.author.avatar.src"
              :alt="item.author.name"
              class="size-10 rounded-full object-cover"
              loading="lazy"
            />
            <div
              v-else
              class="flex size-10 items-center justify-center rounded-full bg-stone-900 dark:bg-stone-100 text-sm font-bold text-matcha-400 dark:text-matcha-700"
              style="font-family: var(--font-mono)"
            >
              {{ item.author.name.charAt(0) }}
            </div>

            <div>
              <div class="text-[14.5px] font-semibold text-stone-800 dark:text-stone-200">
                {{ item.author.name }}
              </div>
              <div class="text-[12.5px] text-stone-500 dark:text-stone-400">
                {{ item.author.description }}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
