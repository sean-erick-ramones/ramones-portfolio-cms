<script setup lang="ts">
const { navHidden } = useScrollHide()
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <header
    class="sticky top-0 z-50 h-16 transition-transform duration-[.38s] ease-[cubic-bezier(.4,0,.2,1)]"
    :class="[
      navHidden ? '-translate-y-full' : 'translate-y-0',
      isDark
        ? 'bg-stone-950/85 backdrop-saturate-[180%] backdrop-blur-xl border-stone-800'
        : 'bg-[#FAFAF9]/85 backdrop-saturate-[180%] backdrop-blur-xl border-stone-200'
    ]"
    :style="{ borderBottomWidth: '1px' }"
  >
    <div class="mx-auto flex h-full max-w-[1120px] items-center justify-between px-[28px]">
      <div class="flex items-center gap-3">
        <div
          class="flex size-[30px] items-center justify-center rounded-lg bg-stone-900 text-xs font-semibold"
          :class="isDark ? 'text-matcha-400' : 'text-matcha-500'"
          style="font-family: var(--font-mono)"
        >
          SR
        </div>
        <span class="text-[15px] font-semibold text-stone-900 dark:text-stone-100">
          Sean Ramones
        </span>
      </div>

      <nav class="hidden md:flex items-center gap-6">
        <a
          v-for="link in ['About', 'Work', 'AI Workflows', 'Projects']"
          :key="link"
          :href="`#${link.toLowerCase().replace(/\s+/g, '')}`"
          class="text-[12.5px] tracking-normal transition-colors hover:text-matcha-600 dark:hover:text-matcha-400"
          :class="isDark ? 'text-stone-400' : 'text-stone-600'"
          style="font-family: var(--font-mono)"
        >
          {{ link }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2">
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full opacity-75"
              :class="isDark ? 'bg-matcha-400' : 'bg-matcha-500'"
            />
            <span
              class="relative inline-flex size-2 rounded-full"
              :class="isDark ? 'bg-matcha-400' : 'bg-matcha-500'"
            />
          </span>
          <span
            class="text-xs tracking-normal"
            :class="isDark ? 'text-matcha-400' : 'text-matcha-700'"
            style="font-family: var(--font-mono)"
          >
            Available
          </span>
        </div>

        <a
          href="/documents/sean-ramones-resume.pdf"
          class="hidden sm:inline-block rounded-lg border px-3 py-1.5 text-xs transition-colors hover:border-matcha-500 hover:text-matcha-700 dark:hover:border-matcha-400 dark:hover:text-matcha-400"
          :class="isDark ? 'border-stone-700 text-stone-300' : 'border-stone-300 text-stone-600'"
          style="font-family: var(--font-mono)"
        >
          Resume
        </a>

        <button
          :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
          class="rounded-lg p-1.5 transition-colors hover:bg-stone-100 dark:hover:bg-stone-800"
          @click="toggleColorMode"
        >
          <UIcon
            :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
            class="size-4 text-stone-600 dark:text-stone-300"
          />
        </button>

        <UContentSearchButton variant="ghost" class="rounded-lg" />
      </div>
    </div>
  </header>
</template>
