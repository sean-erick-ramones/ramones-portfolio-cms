<script setup lang="ts">
const props = defineProps<{
  person: { name: string; title: string }
  headline: string
  headlineAccent: string
  roles: string[]
  description: string
  meetingLink: string
  resumeLink: {
    label: string
    to?: string
    target?: string
    download?: string
    color?: string
    variant?: string
    icon?: string
  }
}>()

// Duplicate the first role at the end so the column can roll back to the
// start without a visible jump (matches the handoff's continuous upward roll).
const items = computed(() => [...props.roles, props.roles[0]])
const step = computed(() => 100 / items.value.length)

const active = ref(0)
const animate = ref(true)

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  timer = setInterval(() => {
    active.value++
    if (active.value === props.roles.length) {
      // Showing the duplicated first role — after the slide settles, snap the
      // column back to index 0 with transitions off, then re-enable them.
      setTimeout(() => {
        animate.value = false
        active.value = 0
        requestAnimationFrame(() => requestAnimationFrame(() => (animate.value = true)))
      }, 500)
    }
  }, 2400)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section class="py-[92px]">
    <div class="mx-auto max-w-[1120px] px-[28px]">
      <div class="flex flex-col items-start gap-2.5 mb-5 md:flex-row md:items-center">
        <span
          class="text-xs uppercase tracking-[.14em] text-matcha-700 dark:text-matcha-400"
          style="font-family: var(--font-mono)"
        >
          {{ person.name }}
        </span>
        <span class="block shrink-0 w-[22px] h-px bg-matcha-600 dark:bg-matcha-400" />
        <span
          class="text-xs uppercase tracking-[.14em] text-matcha-700 dark:text-matcha-400"
          style="font-family: var(--font-mono)"
        >
          {{ person.title }}
        </span>
      </div>

      <h1
        class="text-[clamp(38px,6vw,74px)] font-semibold leading-[1.02] tracking-[-0.035em] max-w-[15ch] text-stone-900 dark:text-stone-100"
      >
        {{ headline }}
        <span class="text-matcha-700 dark:text-matcha-400">{{ headlineAccent }}</span>
      </h1>

      <div
        class="mt-4 flex flex-col items-start gap-x-1 sm:flex-row sm:items-center text-[clamp(13px,3.2vw,18px)]"
        style="font-family: var(--font-mono)"
      >
        <span class="flex items-center gap-1">
          <span class="text-stone-400 dark:text-stone-500">$</span>
          <span class="text-stone-900 dark:text-stone-100">whoami</span>
        </span>
        <span class="sr-role max-w-full sm:ml-1.5 text-matcha-700 dark:text-matcha-400">
          <span
            class="sr-roll-col"
            :class="{ 'sr-roll-animate': animate }"
            :style="{ transform: `translateY(-${active * step}%)` }"
          >
            <!-- Caret lives inside each item so it trails whichever role is
                 rolled into view instead of parking at a fixed offset. -->
            <span v-for="(role, i) in items" :key="i" class="sr-roll-item">
              <span class="whitespace-nowrap">{{ role }}</span>
              <span class="sr-caret bg-matcha-600 dark:bg-matcha-400" />
            </span>
          </span>
        </span>
      </div>

      <p
        class="mt-6 max-w-[60ch] text-[clamp(16px,2vw,19px)] leading-relaxed text-stone-600 dark:text-stone-400 text-pretty"
      >
        {{ description }}
      </p>

      <div class="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <UButton
          :to="resumeLink.to"
          :target="resumeLink.target"
          :download="resumeLink.download"
          size="sm"
          class="rounded-lg font-semibold !text-stone-900 dark:!text-stone-950 hover:brightness-[.94]"
          style="font-family: var(--font-mono); font-size: 13px"
          color="neutral"
          :ui="{
            base: 'bg-matcha-500 dark:bg-matcha-400 hover:bg-matcha-600 dark:hover:bg-matcha-500'
          }"
        >
          {{ resumeLink.label }}
        </UButton>
        <UButton
          :to="meetingLink"
          target="_blank"
          size="sm"
          variant="outline"
          class="rounded-lg bg-white dark:bg-transparent hover:border-matcha-500 hover:text-matcha-700 dark:hover:border-matcha-400 dark:hover:text-matcha-400"
          style="font-family: var(--font-mono); font-size: 13px"
          color="neutral"
        >
          Let's talk
        </UButton>
      </div>
    </div>
  </section>
</template>

<style>
@keyframes sr-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.sr-caret {
  display: inline-block;
  flex: none;
  width: 0.5em;
  height: 1.1em;
  animation: sr-blink 1.1s step-end infinite;
}

.sr-role {
  display: inline-block;
  height: 1.5em;
  overflow: hidden;
  vertical-align: bottom;
}

.sr-roll-col {
  display: flex;
  flex-direction: column;
}

.sr-roll-animate {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.sr-roll-item {
  display: flex;
  align-items: center;
  gap: 0.15em;
  height: 1.5em;
  line-height: 1.5em;
}
</style>
