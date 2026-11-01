<script setup lang="ts">
  import type { HeroVideo, ImageSlot } from '~/models'

  const props = defineProps<{
    title: string
    eyebrow?: string
    lead?: string
    image?: ImageSlot
    /** Háttérvideó; ha van, ez fut a kép helyett. */
    video?: HeroVideo | null
  }>()

  const videoEl = ref<HTMLVideoElement | null>(null)
  const { isPlaying } = useBackgroundVideo(videoEl, props.video ?? null)
</script>

<template>
  <section class="page-hero on-dark relative overflow-hidden text-white">
    <!-- Fejléc háttérképének helye -->
    <!-- Háttérvideó: előbb az állókép, a videó utólag töltődik rá -->
    <template v-if="video">
      <div class="absolute inset-0">
        <img :src="video.poster" alt="" class="absolute inset-0 h-full w-full object-cover" />
        <video
          ref="videoEl"
          class="page-hero__video absolute inset-0 h-full w-full object-cover"
          :class="{ 'is-playing': isPlaying }"
          muted
          loop
          playsinline
          preload="none"
          aria-hidden="true"
          tabindex="-1"
        ></video>
      </div>
      <div class="page-hero__overlay absolute inset-0"></div>
    </template>

    <!-- Háttérkép, ha van; amíg nincs, az arany színátmenetes háttér látszik -->
    <template v-else-if="image && !image.isEmpty">
      <div class="absolute inset-0">
        <ImageFrame :image="image" loading="eager" sizes="100vw" />
      </div>
      <div class="page-hero__overlay absolute inset-0"></div>
    </template>

    <div
      class="container relative z-10 flex h-full flex-col items-center justify-center text-center"
    >
      <p v-if="eyebrow" class="eyebrow mb-4">{{ eyebrow }}</p>
      <h1 class="heading-title text-[40px] leading-none lg:text-[68px]">
        {{ title }}
      </h1>
      <p v-if="lead" class="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed lg:text-[18px]">
        {{ lead }}
      </p>
      <slot />
    </div>

    <GrassEdge />
  </section>
</template>

<style scoped>
  .page-hero {
    height: 460px;
    margin-top: -90px; /* a fejléc magassága */
    padding-top: 90px;
    padding-bottom: 3rem;
    background:
      radial-gradient(900px 400px at 50% 0%, rgb(var(--c-accent) / 0.45), transparent 70%),
      rgb(var(--c-footer));
  }

  .page-hero__video {
    opacity: 0;
    transition: opacity 1.2s ease;
  }

  .page-hero__video.is-playing {
    opacity: 1;
  }

  .page-hero__overlay {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.45) 50%, rgba(0, 0, 0, 0.7));
  }

  h1 {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  }

  p {
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
  }
</style>
