<script setup lang="ts">
  import type { TripProgram } from '~/models'

  defineProps<{ program: TripProgram }>()

  const root = ref<HTMLElement | null>(null)
  useScrollReveal(root)
</script>

<template>
  <section ref="root" class="itinerary text-ink">
    <div class="container mx-auto py-16">
      <SectionHeading
        title="A program menete"
        :lead="program.summary"
      />

      <ol class="timeline">
        <li
          v-for="(day, i) in program.days"
          :key="day.number"
          class="day grid items-stretch"
          :class="{ 'md:grid-cols-2': day.image }"
        >
          <!-- Kép helye: váltakozva bal és jobb oldalon -->
          <div
            v-if="day.image"
            class="day__image reveal"
            :class="i % 2 ? 'reveal-right md:order-2' : 'reveal-left'"
          >
            <div class="absolute inset-0">
              <ImageFrame :image="day.image!" />
            </div>
          </div>

          <div
            class="reveal flex flex-col justify-center p-6 lg:px-10 lg:py-8"
            :class="i % 2 ? 'reveal-left' : 'reveal-right'"
            style="--reveal-delay: 0.12s"
          >
            <div class="flex items-center gap-4">
              <span class="day__seal heading-title">{{ day.number }}</span>
              <div>
                <p v-if="day.time || !program.duration" class="eyebrow">{{ day.label }}</p>
                <h3 class="heading-title text-[24px] lg:text-[30px]">
                  {{ day.title }}
                </h3>
              </div>
            </div>

            <p
              v-for="(paragraph, j) in day.description"
              :key="j"
              class="mt-4 leading-relaxed text-ink/80"
            >
              {{ paragraph }}
            </p>

            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-if="day.overnight" class="chip">Szállás: {{ day.overnight }}</li>
              <li v-if="day.meals" class="chip">Étkezés: {{ day.meals }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
  .itinerary {
    background:
      radial-gradient(900px 500px at 10% 5%, rgb(var(--c-accent) / 0.14), transparent 60%),
      rgb(var(--c-page));
  }

  .timeline {
    display: grid;
    gap: 1rem;
  }

  .day {
    overflow: hidden;
    background: linear-gradient(135deg, rgb(var(--c-accent) / 0.12), rgb(var(--c-ink) / 0.02));
    border: 1px solid rgb(var(--c-accent) / 0.35);
    border-radius: 1.25rem;
  }

  .day__image {
    position: relative;
    min-height: 260px;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .day__image {
      min-height: 340px;
    }
  }

  .day__seal {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: rgb(var(--c-seal-ink));
    background: var(--seal-gradient);
    border-radius: 50%;
  }
</style>
