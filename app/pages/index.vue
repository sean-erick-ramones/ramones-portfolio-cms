<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('index').first())

const { data: aboutData } = await useAsyncData('about', () => queryCollection('about').first())

const { data: projects } = await useAsyncData('projects', () => queryCollection('projects').all())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { global } = useAppConfig()

const siteUrl = 'https://www.seancramones.com'
const title = page.value.seo?.title || page.value.title || 'Sean Erick C. Ramones'
const description =
  page.value.seo?.description ||
  page.value.description ||
  'AI-Augmented Full-stack Engineer building modern web apps with Vue/Nuxt, Node.js, FastAPI, Claude Code, MCP, and agentic workflows.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${siteUrl}/og-image.png`,
  ogUrl: siteUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/og-image.png`,
  twitterSite: '@ramones_sean'
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@300..700&display=swap'
    }
  ]
})

const experience = computed(() =>
  (page.value?.experience?.items || [])
    .slice()
    .toSorted((a: { index: number }, b: { index: number }) => a.index - b.index)
)

const sortedProjects = computed(() =>
  (projects.value || []).toSorted(
    (a: { date: string }, b: { date: string }) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  )
)

function parseMarkdownBio(content: string): string[] {
  if (!content) return []
  const parts = content.split('###')
  const intro = parts[0] || ''
  return intro
    .split('\n\n')
    .filter(Boolean)
    .map((p) =>
      p
        .replace(/^[\s\n]+/, '')
        .trim()
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-stone-900 dark:text-stone-100">$1</strong>')
    )
}

const bioParas = computed(() => {
  const content = aboutData.value?.content as string | undefined
  return content ? parseMarkdownBio(content) : []
})

const currentlyItems = computed(() => (aboutData.value?.now?.currently as string[]) || [])

const openToText = computed(() => {
  const openTo = (page.value?.now?.openTo as string[]) || []
  return openTo.length > 0
    ? 'Available for ' + openTo.join(' \u00B7 ') + ' (UTC+8 overlap)'
    : 'Available'
})

const skillsCategories = computed(() => page.value?.skills?.categories || [])

const snsLinks = computed(() => page.value?.snsLinks ?? [])

const linkedinUrl = computed(
  () =>
    snsLinks.value.find((link: { icon?: string }) => link.icon === 'i-simple-icons-linkedin')?.to ||
    ''
)
</script>

<template>
  <div v-if="page">
    <LandingHero
      :person="page.person"
      :headline="page.hero?.headline || ''"
      :headline-accent="page.hero?.headlineAccent || ''"
      :roles="page.hero?.roles || []"
      :description="page.description"
      :meeting-link="global.meetingLink"
      :resume-link="page.hero?.resumeLink"
    />

    <LandingAbout
      :heading="page.about?.heading || ''"
      :bio-paras="bioParas"
      :checklist="page.about?.checklist || []"
      :currently-items="currentlyItems"
      :quick-facts="page.about?.quickFacts || []"
    />

    <LandingExperience :items="experience" />

    <LandingSkills :categories="skillsCategories" />

    <LandingAiWorkflows
      :heading="page.aiWorkflows?.heading || ''"
      :heading-accent="page.aiWorkflows?.headingAccent || ''"
      :description="page.aiWorkflows?.description || ''"
      :items="page.aiWorkflows?.items || []"
    />

    <LandingProjects :heading="page.projects?.heading || ''" :items="sortedProjects" />

    <LandingTestimonials :items="page.testimonials?.items || []" />

    <LandingBeyond :items="page.beyond?.items || []" />

    <LandingContact
      :heading="page.contact?.heading || ''"
      :cta-label="page.contact?.ctaLabel || ''"
      :open-to-text="openToText"
      :email="global.email"
      :meeting-link="global.meetingLink"
      :year="new Date().getFullYear()"
      :sns-links="snsLinks"
      :contact-name="page.person?.name || ''"
      :contact-title="page.person?.title || ''"
      :availability-label="aboutData?.now?.availability || ''"
      :linkedin-url="linkedinUrl"
      :contact-image="aboutData?.profileImage"
    />
  </div>
</template>
