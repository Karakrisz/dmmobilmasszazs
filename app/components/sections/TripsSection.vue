<script setup lang="ts">
  import { programs, trips } from '~/data/site'

  const props = defineProps<{
    /** Főoldali változat: címsorral, kevesebb szolgáltatással és „összes” linkkel. */
    teaser?: boolean
  }>()

  const shownPrograms = computed(() => (props.teaser ? programs.slice(0, 3) : programs))

  const root = ref<HTMLElement | null>(null)
  useScrollReveal(root)
</script>

<template>
  <section ref="root" class="trips relative text-ink">
    <div class="container mx-auto py-16">
      <SectionHeading v-if="teaser" :title="trips.title" :lead="trips.lead" />

      <div class="space-y-10">
        <!-- Szolgáltatások -->
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(program, i) in shownPrograms"
            :key="program.slug"
            class="destination reveal group flex flex-col"
            :style="{ '--reveal-delay': `${(i % 3) * 0.12}s` }"
          >
            <NuxtLink :to="program.to" class="destination__image" :aria-label="program.title">
              <div class="absolute inset-0">
                <ImageFrame
                  :image="program.image"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
              </div>
              <span class="trip-card__badge">{{ program.durationLabel }}</span>
            </NuxtLink>
            <div class="flex flex-1 flex-col p-6">
              <p class="eyebrow !text-[11px]">{{ program.kind }}</p>
              <h3 class="heading-title mt-1 text-[24px]">{{ program.title }}</h3>
              <p class="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
                {{ program.summary }}
              </p>
              <div class="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p class="heading-title text-[24px] leading-none text-accent-2">
                    {{ program.priceLabel }}
                  </p>
                  <p class="mt-1 text-xs text-ink/60">{{ program.priceNote }}</p>
                </div>
                <NuxtLink :to="program.to" class="btn-outline !px-5 !py-2">Részletek</NuxtLink>
              </div>
            </div>
          </article>
        </div>

        <!-- Egyéni szervezés -->
        <article class="trip-card trip-card--custom reveal grid md:grid-cols-2">
          <div class="flex flex-col justify-center p-6 md:order-1 lg:p-12">
            <p class="eyebrow">{{ trips.custom.kind }}</p>
            <h3 class="heading-title mt-2 text-[28px] lg:text-[40px]">
              {{ trips.custom.title }}
            </h3>
            <p
              v-for="(paragraph, i) in trips.custom.text"
              :key="i"
              class="mt-4 leading-relaxed text-ink/80"
            >
              {{ paragraph }}
            </p>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="option in trips.custom.options" :key="option" class="chip">
                {{ option }}
              </li>
            </ul>
            <div class="mt-8">
              <NuxtLink to="/kapcsolat" class="btn-outline">
                {{ trips.custom.ctaLabel }}
              </NuxtLink>
            </div>
          </div>

          <div class="trip-card__image md:order-2">
            <div class="absolute inset-0">
              <ImageFrame :image="trips.custom.image" />
            </div>
            <GrassEdge size="sm" :glow="false" />
          </div>
        </article>
      </div>

      <SectionMore v-if="teaser" to="/szolgaltatasok" label="Minden szolgáltatás" />
    </div>
  </section>
</template>

<style scoped>
  .trips {
    background:
      radial-gradient(900px 500px at 85% 0%, rgb(var(--c-accent) / 0.14), transparent 60%),
      rgb(var(--c-page));
  }

  .trip-card {
    overflow: hidden;
    background: linear-gradient(135deg, rgb(var(--c-accent) / 0.14), rgb(var(--c-ink) / 0.02));
    border: 1px solid rgb(var(--c-accent) / 0.4);
    border-radius: 1.25rem;
  }

  .trip-card--custom {
    background: linear-gradient(225deg, rgb(var(--c-accent) / 0.1), rgb(var(--c-ink) / 0.02));
    border-style: dashed;
  }

  .trip-card__image {
    position: relative;
    display: block;
    min-height: 300px;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .trip-card__image {
      min-height: 440px;
    }
  }

  .trip-card__image :deep(img) {
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .trip-card:hover .trip-card__image :deep(img) {
    transform: scale(1.05);
  }

  .destination {
    overflow: hidden;
    background: linear-gradient(160deg, rgb(var(--c-accent) / 0.12), rgb(var(--c-ink) / 0.02));
    border: 1px solid rgb(var(--c-accent) / 0.35);
    border-radius: 1.25rem;
  }

  .destination__image {
    position: relative;
    height: 240px;
    overflow: hidden;
  }

  .destination__image :deep(img) {
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .destination:hover .destination__image :deep(img) {
    transform: scale(1.05);
  }

  .trip-card__badge {
    position: absolute;
    top: 1.25rem;
    left: 1.25rem;
    z-index: 6;
    padding: 0.4rem 1rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgb(var(--c-seal-ink));
    background: var(--seal-gradient);
    border-radius: 9999px;
  }
</style>
