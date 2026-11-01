<script setup lang="ts">
  import { programs } from '~/data/site'

  const route = useRoute()
  const program = programs.find((item) => item.slug === route.params.slug)

  if (!program) {
    throw createError({ statusCode: 404, statusMessage: 'A szolgáltatás nem található' })
  }

  usePageSeo(program.title, program.summary)
</script>

<template>
  <main>
    <PageHero
      :eyebrow="`${program.kind} · ${program.durationLabel}`"
      :title="program.title"
      :image="program.image"
      :video="program.video"
    >
      <ul class="mt-6 flex flex-wrap justify-center gap-2">
        <li v-for="item in program.highlights" :key="item" class="chip bg-black/50 !text-white">
          {{ item }}
        </li>
      </ul>
    </PageHero>

    <TripItinerary :program="program" />
    <TripPricing :program="program" />
    <TravelInfoSection />

    <div class="bg-page pb-4 text-center">
      <NuxtLink to="/szolgaltatasok" class="btn-outline">Vissza a szolgáltatásokhoz</NuxtLink>
    </div>
    <ContactCta />
  </main>
</template>
