<script setup lang="ts">
  import { company } from '~/data/site'

  const description = company.description

  usePageSeo('Mobilmasszázs Pócsmegyeren és Surányban – kiszállásos masszázs', description)
</script>

<template>
  <main>
    <HeroSection />
    <WhyUsSection teaser />
    <TripsSection teaser />
    <AboutSection teaser />
    <GallerySection teaser :limit="4" />
    <TeamSection teaser />
    <ContactCta />
  </main>
</template>
