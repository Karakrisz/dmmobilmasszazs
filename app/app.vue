<script setup lang="ts">
  import { company, theme } from '~/data/site'

  useHead({
    htmlAttrs: { 'data-theme': theme },
    // A böngésző sávjának színe (mobilon) a témához igazodik
    meta: [{ name: 'theme-color', content: theme === 'dark' ? '#0b0b0b' : '#ffffff' }],
    titleTemplate: (titleChunk) =>
      titleChunk ? `${titleChunk} | ${company.name}` : company.name,
  })

  // Megosztási előnézet minden oldalon. A közösségi oldalak teljes webcímet kérnek,
  // ezért élesítéskor a NUXT_SITE_URL-ben meg kell adni a végleges domaint.
  const site = useSiteConfig()
  const route = useRoute()
  const absolute = (path: string) => (site.url ? new URL(path, site.url).href : path)
  const ogImage = absolute('/og-image.jpg')

  useSeoMeta({
    ogType: 'website',
    ogSiteName: company.name,
    ogLocale: 'hu_HU',
    ogUrl: () => absolute(route.path),
    ogImage,
    ogImageSecureUrl: ogImage,
    ogImageType: 'image/jpeg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: `${company.name} – ${company.description}`,
    twitterCard: 'summary_large_image',
    twitterImage: ogImage,
    twitterImageAlt: company.name,
  })

  useHead({
    link: [{ rel: 'canonical', href: () => absolute(route.path) }],
  })
</script>

<template>
  <div class="font-sans">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
