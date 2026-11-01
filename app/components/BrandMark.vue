<script setup lang="ts">
  /**
   * Márkajel: kör alakú, fehér-arany érme a monogrammal (pl. „DM”).
   * Fényes felület és arany perem – ugyanabban a stílusban, mint az oldal többi arany eleme.
   */
  withDefaults(defineProps<{ monogram?: string }>(), { monogram: 'DM' })
  const uid = useId()
</script>

<template>
  <span class="mark" role="img" :aria-label="monogram">
    <svg viewBox="0 0 100 100" class="mark__svg">
      <defs>
        <linearGradient :id="`${uid}-bg`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff" />
          <stop offset="0.55" stop-color="#f3e7c4" />
          <stop offset="1" stop-color="#d8b45a" />
        </linearGradient>
        <linearGradient :id="`${uid}-gold`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#d8b45a" />
          <stop offset="0.5" stop-color="#a07a2e" />
          <stop offset="1" stop-color="#6e521c" />
        </linearGradient>
        <linearGradient :id="`${uid}-ring`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f3dc94" />
          <stop offset="0.5" stop-color="#c09937" />
          <stop offset="1" stop-color="#7d5f22" />
        </linearGradient>
        <linearGradient :id="`${uid}-gloss`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity="0.5" />
          <stop offset="0.48" stop-color="#fff" stop-opacity="0.05" />
          <stop offset="0.5" stop-color="#fff" stop-opacity="0" />
        </linearGradient>
        <clipPath :id="`${uid}-c`"><circle cx="50" cy="50" r="46" /></clipPath>
      </defs>
      <g :clip-path="`url(#${uid}-c)`">
        <rect width="100" height="100" :fill="`url(#${uid}-bg)`" />
        <!-- Finom hullámvonalak a háttérben: nyugalom, áramlás -->
        <g fill="none" :stroke="`url(#${uid}-gold)`" stroke-opacity="0.22" stroke-width="1.2">
          <path d="M0 72c12-6 25-6 37 0s25 6 37 0 19-5 26-2" />
          <path d="M0 80c12-6 25-6 37 0s25 6 37 0 19-5 26-2" />
        </g>
        <text
          x="50"
          y="50"
          text-anchor="middle"
          dominant-baseline="central"
          class="mark__text"
          :fill="`url(#${uid}-gold)`"
        >{{ monogram }}</text>
        <rect width="100" height="100" :fill="`url(#${uid}-gloss)`" />
      </g>
      <circle cx="50" cy="50" r="47" fill="none" :stroke="`url(#${uid}-ring)`" stroke-width="2.5" />
    </svg>
  </span>
</template>

<style scoped>
  .mark {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
  }

  .mark__svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .mark__text {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -1px;
  }
</style>
