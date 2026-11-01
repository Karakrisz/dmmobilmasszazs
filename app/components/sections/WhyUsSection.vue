<script setup lang="ts">
  import { whyUs } from '~/data/site'

  defineProps<{ teaser?: boolean }>()

  const root = ref<HTMLElement | null>(null)
  useScrollReveal(root)
</script>

<template>
  <section ref="root" class="why-us relative text-ink">
    <div class="container mx-auto py-16 lg:py-20">
      <div class="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
        <!-- Kiemelt szám -->
        <div class="reveal reveal-left text-center lg:text-left">
          <p class="percent heading-title">{{ whyUs.highlight.value }}</p>
          <p class="eyebrow mt-3">{{ whyUs.highlight.label }}</p>
        </div>

        <div class="reveal reveal-right">
          <h2 class="heading-title text-[26px] lg:text-[40px]">
            {{ whyUs.title }}
          </h2>
          <p class="mt-3 text-[18px] font-bold text-accent-2 lg:text-[22px]">
            {{ whyUs.lead }}
          </p>
          <p class="mt-4 max-w-3xl leading-relaxed text-ink/80">
            {{ whyUs.text }}
          </p>
        </div>
      </div>

      <div class="mt-12 grid gap-4 md:grid-cols-3">
        <article
          v-for="(benefit, i) in whyUs.benefits"
          :key="benefit.title"
          class="area reveal"
          :style="{ '--reveal-delay': `${i * 0.15}s` }"
        >
          <h3 class="heading-title text-[20px] text-accent-2">
            {{ benefit.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-ink/75">
            {{ benefit.description }}
          </p>
        </article>
      </div>

      <SectionMore v-if="teaser" to="/miert-mobilmasszazs" label="Miért mobilmasszázs?" />
    </div>
  </section>
</template>

<style scoped>
  .why-us {
    background:
      radial-gradient(900px 420px at 12% 46%, rgb(var(--c-accent) / 0.22), transparent 62%),
      rgb(var(--c-page-alt));
    border-bottom: 1px solid rgb(var(--c-accent) / 0.2);
  }

  .percent {
    font-size: clamp(6rem, 18vw, 12rem);
    line-height: 0.85;
    color: rgb(var(--c-accent));
    text-shadow: var(--heading-glow);
  }

  .area {
    padding: 1.5rem;
    background: rgb(var(--c-page) / 0.7);
    border: 1px solid rgb(var(--c-accent) / 0.25);
    border-radius: 1rem;
  }
</style>
