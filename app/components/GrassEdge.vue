<script setup lang="ts">
  /**
   * Lágy hullám- és levélsziluett egy kép vagy szekció alsó szélére. A szülő legyen
   * `position: relative`; a színt a `color` adja (alapból a következő szekció
   * háttere, így a kép „belenő” a fűbe).
   */
  withDefaults(
    defineProps<{
      color?: string
      /** Halvány arany fűréteg a sziluett mögött. */
      glow?: boolean
      size?: 'sm' | 'md' | 'lg'
    }>(),
    { color: 'rgb(var(--edge-front))', glow: true, size: 'md' },
  )
</script>

<template>
  <div class="grass-edge" :class="`grass-edge--${size}`" aria-hidden="true">
    <span v-if="glow" class="grass-edge__layer grass-edge__layer--back"></span>
    <span class="grass-edge__layer" :style="{ backgroundColor: color }"></span>
  </div>
</template>

<style scoped>
  .grass-edge {
    position: absolute;
    inset: auto 0 -1px 0;
    z-index: 5;
    height: 130px;
    pointer-events: none;
  }

  .grass-edge--sm {
    height: 60px;
  }

  .grass-edge--lg {
    height: clamp(100px, 11vw, 165px);
  }

  .grass-edge__layer {
    position: absolute;
    inset: 0;
    -webkit-mask: url('/img/decor/waves.svg') repeat-x left bottom / auto 100%;
    mask: url('/img/decor/waves.svg') repeat-x left bottom / auto 100%;
  }

  /* Hátsó, arany réteg: kicsit magasabb és eltolt, ettől lesz mélysége */
  .grass-edge__layer--back {
    inset: -22% 0 0 0;
    background: var(--edge-back);
    opacity: 0.55;
    -webkit-mask-position: 37% bottom;
    mask-position: 37% bottom;
    transform: scaleX(-1);
  }
</style>
