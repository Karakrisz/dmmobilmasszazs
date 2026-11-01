<script setup lang="ts">
  import { company, cta } from '~/data/site'

  const root = ref<HTMLElement | null>(null)
  useScrollReveal(root)
</script>

<template>
  <section ref="root" class="cta relative text-ink">
    <GrassEdge size="sm" :glow="false" class="cta-grass" />
    <div class="container mx-auto py-16 text-center">
      <h2 class="heading-title reveal text-[24px] lg:text-[36px]">
        {{ cta.title }}
      </h2>
      <p
        class="reveal mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed"
        style="--reveal-delay: 0.2s"
      >
        {{ cta.text }}
      </p>
      <div
        class="reveal mt-8 flex flex-col justify-center gap-6 sm:flex-row"
        style="--reveal-delay: 0.4s"
      >
        <a
          v-if="company.whatsapp"
          :href="company.whatsappHref(cta.whatsappMessage)"
          target="_blank"
          rel="noopener"
          class="btn-primary sm:px-16"
        >
          <span>WhatsApp</span>
        </a>
        <a v-else :href="company.phoneHref" class="btn-primary sm:px-16">
          <span>Hívj fel</span>
        </a>
        <a :href="company.mailHref(cta.mailSubject)" class="btn-primary sm:px-16">
          <span>Írj emailt</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .cta {
    background:
      radial-gradient(700px 300px at 50% 100%, rgb(var(--c-accent) / 0.25), transparent 70%),
      rgb(var(--c-page-alt));
  }

  /* Arany fűsáv a szekció tetején, az előző szekció aljára ültetve */
  .cta .cta-grass {
    inset: auto 0 100% 0;
    opacity: 0.75;
  }
</style>
