<script setup lang="ts">
  import { pages } from '~/data/site'

  const page = pages.galeria

  usePageSeo(page.title, page.lead)
</script>

<template>
  <main>
    <PageHero v-bind="page" />
    <GallerySection />
    <ContactCta />
  </main>
</template>
