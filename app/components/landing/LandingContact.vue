<script setup lang="ts">
defineProps<{
  heading: string
  ctaLabel: string
  openToText: string
  email: string
  meetingLink: string
  year: number
  snsLinks: {
    icon?: string
    to?: string
    target?: string
    'aria-label'?: string
    label?: string
  }[]
  contactName: string
  contactTitle: string
  availabilityLabel: string
  linkedinUrl: string
  contactImage?: { src: string; alt: string }
}>()
</script>

<template>
  <section id="contact" class="scroll-mt-20 bg-stone-900">
    <div class="mx-auto max-w-[1120px] px-[28px] pt-[92px] pb-10">
      <div class="flex items-center gap-2.5 mb-6">
        <span class="relative flex size-2">
          <span
            class="absolute inline-flex size-full animate-ping rounded-full opacity-75 bg-matcha-400"
          />
          <span class="relative inline-flex size-2 rounded-full bg-matcha-400" />
        </span>
        <span class="text-xs text-matcha-400" style="font-family: var(--font-mono)">
          {{ openToText }}
        </span>
      </div>

      <h2
        class="text-[clamp(30px,5vw,56px)] font-semibold leading-[1.1] tracking-[-0.025em] text-stone-100"
      >
        {{ heading }}
      </h2>

      <div class="mt-8 flex flex-wrap gap-3">
        <UButton
          :to="`mailto:${email}`"
          size="sm"
          class="rounded-lg font-semibold !text-stone-900 dark:!text-stone-950 hover:brightness-[.94]"
          style="font-family: var(--font-mono); font-size: 13px"
          color="neutral"
          :ui="{
            base: 'bg-matcha-500 dark:bg-matcha-400 hover:bg-matcha-600 dark:hover:bg-matcha-500'
          }"
        >
          {{ email }}
        </UButton>
        <UButton
          :to="meetingLink"
          target="_blank"
          size="sm"
          variant="outline"
          class="rounded-lg bg-transparent hover:border-matcha-400 hover:text-matcha-400"
          style="font-family: var(--font-mono); font-size: 13px"
          color="neutral"
          :ui="{ base: 'border-stone-700 text-stone-200' }"
        >
          {{ ctaLabel }} &nearr;
        </UButton>
      </div>
    </div>

    <div class="border-t border-stone-800">
      <div class="mx-auto max-w-[1120px] px-[28px] py-[52px]">
        <div class="flex items-center gap-2.5 mb-6">
          <span class="block size-[6px] rotate-45 bg-matcha-400" />
          <span
            class="text-xs uppercase tracking-[.14em] text-matcha-400"
            style="font-family: var(--font-mono)"
          >
            Contact
          </span>
        </div>

        <h3 class="text-2xl font-semibold text-stone-100">
          {{ contactName }}
        </h3>
        <p class="mt-1 text-[15px] text-stone-400">
          {{ contactTitle }}
        </p>

        <div class="mt-3 flex items-center gap-2">
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full opacity-75 bg-matcha-400"
            />
            <span class="relative inline-flex size-2 rounded-full bg-matcha-400" />
          </span>
          <span class="text-[14.5px] text-stone-300">
            {{ availabilityLabel }}
          </span>
        </div>

        <NuxtImg
          v-if="contactImage?.src"
          :src="contactImage.src"
          :alt="contactImage.alt"
          width="160"
          height="160"
          format="webp"
          loading="lazy"
          class="mt-6 size-40 rounded-2xl object-cover"
        />

        <div class="mt-6 flex items-center gap-2.5">
          <a
            :href="`mailto:${email}`"
            aria-label="Email Sean"
            class="flex size-11 items-center justify-center rounded-xl border border-matcha-800 text-matcha-400 transition-colors hover:bg-matcha-500/10"
          >
            <UIcon name="i-lucide-mail" class="size-4" />
          </a>
          <a
            :href="linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sean on LinkedIn"
            class="flex size-11 items-center justify-center rounded-xl border border-matcha-800 text-matcha-400 transition-colors hover:bg-matcha-500/10"
          >
            <UIcon name="i-simple-icons-linkedin" class="size-4" />
          </a>
          <a
            :href="meetingLink"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a call with Sean"
            class="flex size-11 items-center justify-center rounded-xl border border-matcha-800 text-matcha-400 transition-colors hover:bg-matcha-500/10"
          >
            <UIcon name="i-lucide-calendar" class="size-4" />
          </a>
        </div>
      </div>
    </div>

    <div class="border-t border-stone-800">
      <div class="mx-auto max-w-[1120px] px-[28px] py-5 flex items-center justify-between">
        <span class="text-xs text-stone-500" style="font-family: var(--font-mono)">
          &copy; {{ year }} Sean Erick Ramones &middot; Built with intention.
        </span>

        <div class="flex items-center gap-1">
          <a
            v-for="link in snsLinks"
            :key="link.to || link.label"
            :href="link.to"
            :target="link.target"
            :aria-label="link['aria-label']"
            class="flex size-[38px] items-center justify-center rounded-lg border border-stone-800 text-stone-400 transition-colors hover:border-matcha-400 hover:text-matcha-400"
          >
            <UIcon :name="link.icon" class="size-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
