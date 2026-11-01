<script setup lang="ts">
  /**
   * Logó: a márkajel, körülötte szorosan egy vékony arany karika,
   * a szlogen pedig a karikán kívül, a teljes kört körbefutva (kétszer, pöttyel elválasztva).
   */
  import type { ImageSlot } from '~/models'

  const props = defineProps<{
    slogan: string
    /** Saját logó; amíg üres, a fehér-arany monogramos márkajel látszik. */
    image?: ImageSlot
    /** Monogram a márkajelben, amíg nincs saját logó. */
    monogram?: string
  }>()

  const uid = useId()
  // A teljes körre: a szlogen kétszer, pöttyel elválasztva
  const ringText = computed(() => `${props.slogan} • ${props.slogan} • `)
  // A szöveg alapvonala: a karika (r = 31) + kétszeres rés
  const R = 39.5
  const circumference = 2 * Math.PI * R
</script>

<template>
  <span class="badge">
    <svg class="badge__ring" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <!-- Teljes kör a bal oldalról indulva, az óramutató irányában (betűk kifelé) -->
        <path
          :id="`${uid}-circle`"
          :d="`M ${50 - R} 50 A ${R} ${R} 0 1 1 ${50 + R} 50 A ${R} ${R} 0 1 1 ${50 - R} 50`"
          fill="none"
        />
        <linearGradient :id="`${uid}-gold`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f3dc94" />
          <stop offset="0.5" stop-color="#c09937" />
          <stop offset="1" stop-color="#7d5f22" />
        </linearGradient>
      </defs>
      <!-- Arany karika, kis réssel az embléma körül -->
      <circle cx="50" cy="50" r="31" fill="none" :stroke="`url(#${uid}-gold)`" stroke-width="1.6" />
      <text class="badge__text">
        <textPath :href="`#${uid}-circle`" :textLength="circumference - 1" lengthAdjust="spacing">
          {{ ringText }}
        </textPath>
      </text>
    </svg>
    <span class="badge__mark">
      <ImageFrame v-if="image && !image.isEmpty" :image="image" variant="mini" loading="eager" />
      <BrandMark v-else :monogram="monogram" />
    </span>
  </span>
</template>

<style scoped>
  .badge {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }

  .badge__ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .badge__text {
    fill: #fff;
    font-family: Montserrat, sans-serif;
    font-size: 7.2px;
    font-weight: 800;
    text-transform: uppercase;
  }

  /* Az embléma a karika közepén, sugara 27 – a karikáig kb. 1 mm rés marad */
  .badge__mark {
    position: absolute;
    top: 23%;
    left: 23%;
    width: 54%;
    height: 54%;
  }

  .badge__mark :deep(.flag) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }
</style>
