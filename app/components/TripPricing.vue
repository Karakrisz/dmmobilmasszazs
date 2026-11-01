<script setup lang="ts">
  import { company, cta } from '~/data/site'
  import type { TripProgram } from '~/models'

  const props = defineProps<{ program: TripProgram }>()

  const root = ref<HTMLElement | null>(null)
  useScrollReveal(root)

  const whatsapp = computed(() =>
    company.whatsappHref(`Szia! Érdeklődnék: ${props.program.title}`),
  )

  // Egy kártya-lista: [cím, tételek, ikon]
  const lists = computed(() =>
    [
      { title: 'Az ár tartalmazza', items: props.program.included, kind: 'yes' },
      { title: 'Az ár nem tartalmazza', items: props.program.notIncluded, kind: 'no' },
      { title: 'Mit hozz magaddal?', items: props.program.bring, kind: 'bring' },
      { title: 'Jó tudni', items: props.program.goodToKnow, kind: 'info' },
    ].filter((list) => list.items.length),
  )
</script>

<template>
  <section ref="root" class="bg-page-alt text-ink">
    <div class="container mx-auto py-16">
      <SectionHeading title="Ár és tudnivalók" />

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Ár és foglalás -->
        <div class="card card--price reveal">
          <p class="eyebrow">{{ program.durationLabel }} · {{ program.kind }}</p>
          <p class="heading-title mt-3 text-[40px] leading-none text-accent-2">
            {{ program.priceLabel }}
          </p>
          <p class="mt-2 text-sm text-ink/75">{{ program.priceNote }}</p>
          <ul v-if="program.priceDetails.length" class="mt-4 space-y-1 text-sm text-ink/80">
            <li v-for="detail in program.priceDetails" :key="detail">{{ detail }}</li>
          </ul>
          <a
            v-if="program.bookingUrl"
            :href="program.bookingUrl"
            target="_blank"
            rel="noopener"
            class="btn-primary mt-8 w-full"
          >
            Foglalás most
          </a>
          <NuxtLink v-else to="/kapcsolat" class="btn-primary mt-8 w-full">
            Időpontot kérek
          </NuxtLink>
          <a v-if="company.whatsapp" :href="whatsapp" target="_blank" rel="noopener" class="btn-outline mt-3 w-full justify-center">
            Kérdezz WhatsAppon
          </a>
          <a v-else :href="company.phoneHref" class="btn-outline mt-3 w-full justify-center">
            Hívj: {{ company.phone }}
          </a>
        </div>

        <div
          v-for="(list, i) in lists"
          :key="list.title"
          class="card reveal"
          :style="{ '--reveal-delay': `${(i + 1) * 0.12}s` }"
        >
          <h3 class="heading-title text-[22px]">{{ list.title }}</h3>
          <ul class="mt-4 space-y-3">
            <li
              v-for="item in list.items"
              :key="item"
              class="item"
              :class="{ 'text-ink/80': list.kind === 'no' }"
            >
              <svg class="item__icon" :class="list.kind === 'no' ? 'text-ink/50' : 'text-accent-2'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path v-if="list.kind === 'yes'" d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round" />
                <path v-else-if="list.kind === 'no'" d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
                <circle v-else-if="list.kind === 'bring'" cx="12" cy="12" r="3" />
                <path v-else d="M12 8v.5M12 11v5" stroke-linecap="round" />
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <p class="reveal mt-10 text-center text-sm text-ink/60">
        Kérdésed van a kezelésről? Írj nekünk: <a :href="company.mailHref(cta.mailSubject)" class="text-accent-2 underline">{{ company.email }}</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
  .card {
    padding: 2rem;
    background: rgb(var(--c-ink) / 0.04);
    border: 1px solid rgb(var(--c-accent) / 0.35);
    border-radius: 1.25rem;
  }

  .card--price {
    background: linear-gradient(160deg, rgb(var(--c-accent) / 0.22), rgb(var(--c-ink) / 0.02));
    border-color: rgb(var(--c-accent-2) / 0.6);
  }

  .item {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .item__icon {
    flex-shrink: 0;
    width: 1.1rem;
    height: 1.1rem;
    margin-top: 0.2rem;
  }
</style>
