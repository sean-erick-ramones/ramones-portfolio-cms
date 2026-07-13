<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})

const { data: projects } = await useAsyncData('featured-projects', () => {
  return queryCollection('projects').all()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

const siteUrl = 'https://www.seancramones.com'
const title = page.value?.seo?.title || page.value?.title || 'Sean Erick C. Ramones'
const description =
  page.value?.seo?.description ||
  page.value?.description ||
  'AI-Augmented Full-stack Engineer building modern web apps with Vue/Nuxt, Node.js, FastAPI, Claude Code, MCP, and agentic workflows.'
const ogImage = `${siteUrl}/og-image.png`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogUrl: siteUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterSite: '@ramones_sean'
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }]
})

const sortedProjects = computed(() =>
  (projects.value || []).toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

const sortedExperience = computed(() =>
  (page.value?.experience?.items || []).slice().toSorted((a, b) => a.index - b.index)
)

const snsLinks = computed(() => page.value?.snsLinks ?? [])

const skillCategories = [
  {
    name: 'Frontend',
    skills: ['Vue.js', 'Nuxt', 'React', 'Angular', 'Vite', 'TypeScript', 'Tailwind CSS']
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'FastAPI', 'PostgreSQL', 'Supabase', 'Hono', 'Express']
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Vercel', 'Cloudflare', 'Docker', 'GitHub Actions', 'Netlify', 'AWS']
  },
  {
    name: 'AI & Agentic',
    skills: [
      'Claude Code',
      'Claude Design',
      'Claude Agent SDK',
      'Anthropic API',
      'MCP',
      'GitHub Copilot'
    ]
  },
  {
    name: 'Tools',
    skills: ['Git', 'Figma', 'Jira', 'Notion', 'ESLint', 'Oxlint']
  }
]
</script>

<template>
  <div v-if="page" class="min-h-screen">
    <!-- ============================================================ -->
    <!-- Hero                                                            -->
    <!-- ============================================================ -->
    <section class="pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p class="text-xs font-mono uppercase tracking-widest text-[var(--ui-text-muted)] mb-4">
          AI-Augmented Full-stack Engineer
        </p>

        <div class="flex justify-center mb-6">
          <NuxtImg
            :src="page.profileImage.src"
            :alt="page.profileImage.alt"
            class="size-20 rounded-full ring-2 ring-[var(--ui-border)] ring-offset-4 ring-offset-[var(--ui-bg)]"
            width="80"
            height="80"
            loading="eager"
          />
        </div>

        <h1
          class="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-[var(--ui-text)] leading-tight"
        >
          {{ page.hero.titlePrefix }}
        </h1>

        <p
          class="mt-4 text-[var(--ui-text-muted)] text-sm sm:text-base leading-relaxed max-w-lg mx-auto"
        >
          {{ page.description }}
        </p>

        <!-- Status + Availability -->
        <div class="mt-6 flex items-center justify-center gap-3">
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex rounded-full opacity-75 size-full bg-[var(--ui-primary)] animate-ping"
            />
            <span
              class="relative inline-flex scale-90 rounded-full size-2 bg-[var(--ui-primary)]"
            />
          </span>
          <span class="text-xs font-medium text-[var(--ui-primary)]">
            Available for new projects
          </span>
        </div>

        <!-- Open to tags -->
        <div v-if="page.now?.openTo?.length" class="mt-4 flex flex-wrap justify-center gap-2">
          <span
            v-for="item in page.now.openTo"
            :key="item"
            class="px-2.5 py-0.5 rounded-full text-xs bg-[var(--ui-elevated)] text-[var(--ui-text-muted)]"
          >
            {{ item }}
          </span>
        </div>

        <!-- CTA + Socials -->
        <div class="mt-6 flex items-center justify-center gap-2">
          <UButton v-for="link in page.hero.links" :key="link.label" v-bind="link" size="sm" />
        </div>

        <div class="mt-5 flex items-center justify-center gap-3">
          <UButton
            v-for="(link, idx) in snsLinks"
            :key="`hero-social-${idx}`"
            v-bind="link"
            size="sm"
            color="neutral"
            variant="ghost"
          />
        </div>
      </div>
    </section>

    <USeparator class="max-w-2xl mx-auto" />

    <!-- ============================================================ -->
    <!-- About                                                           -->
    <!-- ============================================================ -->
    <section id="about" class="py-16 sm:py-20">
      <div class="max-w-2xl mx-auto px-4 sm:px-6">
        <p class="text-xs font-mono uppercase tracking-widest text-[var(--ui-text-muted)] mb-6">
          About
        </p>
        <p class="text-sm sm:text-base leading-relaxed text-[var(--ui-text-muted)]">
          {{ page.about.description }}
        </p>
      </div>
    </section>

    <USeparator class="max-w-2xl mx-auto" />

    <!-- ============================================================ -->
    <!-- Projects                                                        -->
    <!-- ============================================================ -->
    <section id="projects" class="py-16 sm:py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <p class="text-xs font-mono uppercase tracking-widest text-[var(--ui-text-muted)] mb-8">
          Projects
        </p>

        <div class="grid gap-6 sm:grid-cols-2">
          <article
            v-for="project in sortedProjects"
            :key="project.title"
            class="group relative rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg)] overflow-hidden transition-all duration-200 hover:border-[var(--ui-border-accented)] hover:shadow-sm"
          >
            <NuxtImg
              :src="project.image"
              :alt="project.title"
              class="w-full h-44 object-cover"
              loading="lazy"
              format="webp"
            />
            <div class="p-4">
              <div class="flex items-center justify-between gap-2 mb-2">
                <h3 class="text-sm font-semibold text-[var(--ui-text)] truncate">
                  {{ project.title }}
                </h3>
                <span class="shrink-0 text-xs text-[var(--ui-text-muted)]">
                  {{ new Date(project.date).getFullYear() }}
                </span>
              </div>
              <p class="text-xs text-[var(--ui-text-muted)] leading-relaxed line-clamp-2">
                {{ project.description }}
              </p>
              <div v-if="project.tags?.length" class="flex flex-wrap gap-1.5 mt-3">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-2 py-0.5 rounded-full text-[10px] font-medium"
                  :class="
                    tag === 'AI-Augmented'
                      ? 'bg-[var(--ui-primary)]/10 text-[var(--ui-primary)]'
                      : 'bg-[var(--ui-elevated)] text-[var(--ui-text-muted)]'
                  "
                >
                  {{ tag }}
                </span>
              </div>
              <UButton
                :to="project.url"
                target="_blank"
                size="xs"
                variant="link"
                color="neutral"
                class="mt-3 px-0 gap-1"
                trailing-icon="i-lucide-arrow-up-right"
              >
                View Project
              </UButton>
            </div>
          </article>
        </div>
      </div>
    </section>

    <USeparator class="max-w-2xl mx-auto" />

    <!-- ============================================================ -->
    <!-- Experience                                                      -->
    <!-- ============================================================ -->
    <section id="experience" class="py-16 sm:py-20">
      <div class="max-w-2xl mx-auto px-4 sm:px-6">
        <p class="text-xs font-mono uppercase tracking-widest text-[var(--ui-text-muted)] mb-8">
          Experience
        </p>

        <div class="space-y-8">
          <div
            v-for="(item, idx) in sortedExperience"
            :key="item.company.name + item.position"
            class="relative pl-6 border-l border-[var(--ui-border)]"
          >
            <div
              class="absolute -left-1 top-1 size-2 rounded-full"
              :class="idx === 0 ? 'bg-[var(--ui-primary)]' : 'bg-[var(--ui-border)]'"
            />
            <div class="text-xs text-[var(--ui-text-muted)] mb-0.5 font-mono">
              {{ item.date }}
            </div>
            <h3 class="text-sm font-semibold text-[var(--ui-text)]">
              {{ item.position }}
              <span v-if="item.company?.name" class="text-[var(--ui-text-muted)] font-normal">
                @ {{ item.company.name }}
              </span>
            </h3>
            <p class="text-xs text-[var(--ui-text-muted)] mt-1 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <USeparator class="max-w-2xl mx-auto" />

    <!-- ============================================================ -->
    <!-- Skills                                                          -->
    <!-- ============================================================ -->
    <section id="skills" class="py-16 sm:py-20">
      <div class="max-w-2xl mx-auto px-4 sm:px-6">
        <p class="text-xs font-mono uppercase tracking-widest text-[var(--ui-text-muted)] mb-8">
          Skills
        </p>

        <div class="grid gap-6 sm:grid-cols-2">
          <div v-for="category in skillCategories" :key="category.name">
            <h4 class="text-xs font-semibold text-[var(--ui-text)] mb-3">
              {{ category.name }}
            </h4>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="skill in category.skills"
                :key="skill"
                class="px-2.5 py-1 rounded-full text-xs bg-[var(--ui-elevated)] text-[var(--ui-text-muted)]"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <USeparator class="max-w-2xl mx-auto" />

    <!-- ============================================================ -->
    <!-- Contact                                                         -->
    <!-- ============================================================ -->
    <section class="py-16 sm:py-20">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p class="text-xs font-mono uppercase tracking-widest text-[var(--ui-text-muted)] mb-6">
          Contact
        </p>

        <div class="flex justify-center mb-4">
          <NuxtImg
            :src="page.profileImage.src"
            :alt="page.profileImage.alt"
            class="size-16 rounded-full ring-2 ring-[var(--ui-border)]"
            width="64"
            height="64"
            loading="lazy"
          />
        </div>

        <h3 class="text-sm font-semibold text-[var(--ui-text)]">Sean Erick Ramones</h3>
        <p class="text-xs text-[var(--ui-text-muted)] mt-0.5">AI-Augmented Full-stack Engineer</p>

        <div class="mt-3 flex items-center justify-center gap-2">
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex rounded-full opacity-75 size-full bg-[var(--ui-primary)] animate-ping"
            />
            <span
              class="relative inline-flex scale-90 rounded-full size-2 bg-[var(--ui-primary)]"
            />
          </span>
          <span class="text-xs text-[var(--ui-primary)] font-medium"> Available for projects </span>
        </div>

        <div class="mt-6 flex items-center justify-center gap-2">
          <UButton
            :to="`mailto:${global.email}`"
            label="Email"
            size="sm"
            color="neutral"
            variant="outline"
            icon="i-lucide-mail"
          />
          <UButton
            to="https://www.linkedin.com/in/sean-erick-ramones-102a64192"
            target="_blank"
            label="LinkedIn"
            size="sm"
            color="neutral"
            variant="outline"
            icon="i-simple-icons-linkedin"
          />
          <UButton
            :to="global.meetingLink"
            target="_blank"
            label="Schedule a call"
            size="sm"
            color="neutral"
            variant="outline"
            icon="i-lucide-calendar"
          />
        </div>

        <div class="mt-6 flex items-center justify-center gap-3">
          <UButton
            v-for="(link, idx) in snsLinks"
            :key="`contact-social-${idx}`"
            v-bind="link"
            size="sm"
            color="neutral"
            variant="ghost"
          />
        </div>
      </div>
    </section>
  </div>
</template>
