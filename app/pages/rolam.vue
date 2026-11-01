<script setup lang="ts">
  import { pages } from '~/data/site'

  const page = pages.rolam

  usePageSeo(page.title, page.lead)
</script>

<template>
  <main>
    <PageHero v-bind="page" />
    <AboutSection />
    <TeamSection />
    <ContactCta />
  </main>
</template>
