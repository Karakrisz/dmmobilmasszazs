<script setup lang="ts">
  import { pages } from '~/data/site'

  const page = pages.szolgaltatasok

  usePageSeo(page.title, page.lead)
</script>

<template>
  <main>
    <PageHero v-bind="page" />
    <TripsSection />
    <TravelInfoSection />
    <ContactCta />
  </main>
</template>
