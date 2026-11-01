<script setup lang="ts">
  import { pages } from '~/data/site'

  const page = pages.miertMobil

  usePageSeo(page.title, page.lead)
</script>

<template>
  <main>
    <PageHero v-bind="page" />
    <WhyUsSection />
    <ContactCta />
  </main>
</template>
