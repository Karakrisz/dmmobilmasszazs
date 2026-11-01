<script setup lang="ts">
  import { hero } from '~/data/site'

  const video = ref<HTMLVideoElement | null>(null)
  const { isPlaying } = useBackgroundVideo(video, hero.video)
</script>

<template>
  <section class="hero relative z-10 w-full overflow-hidden">
    <!-- Háttérvideó: előbb a poszterkép jelenik meg, a videó utólag töltődik rá -->
    <div v-if="hero.video" class="hero-media absolute inset-0">
      <NuxtImg
        :src="hero.video.poster"
        :alt="hero.image.alt"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
        format="webp"
        quality="80"
        loading="eager"
        fetchpriority="high"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref="video"
        class="hero-video absolute inset-0 h-full w-full object-cover"
        :class="{ 'is-playing': isPlaying }"
        muted
        loop
        playsinline
        preload="none"
        disablepictureinpicture
        aria-hidden="true"
        tabindex="-1"
      ></video>
    </div>

    <!-- Háttérkép helye, ha nincs videó -->
    <div v-else class="hero-media absolute inset-0">
      <ImageFrame :image="hero.image" variant="background" loading="eager" />
    </div>

    <!-- Sötétítő réteg a szöveg olvashatóságáért -->
    <div
      v-if="hero.video || !hero.image.isEmpty"
      class="overlay absolute inset-0"
    ></div>
    <div
      v-if="hero.video || !hero.image.isEmpty"
      class="text-vignette absolute inset-0"
    ></div>

    <div
      class="hero-content on-dark container relative z-10 flex h-full flex-col items-center justify-center text-center text-white"
    >
      <p class="welcome-text eyebrow mb-5">
        {{ hero.welcome }}
      </p>
      <h1 class="main-title heading-title mb-4 text-[48px] leading-none lg:text-[96px]">
        {{ hero.title }}
      </h1>
      <p class="subtitle heading-title mb-6 text-[22px] italic lg:text-[34px]">
        {{ hero.subtitle }}
      </p>
      <p class="lead max-w-2xl text-[16px] leading-relaxed lg:text-[18px]">
        {{ hero.lead }}
      </p>

      <!-- Kiemelt jelvény: a két fő helyszín, középen a márkajel -->
      <NuxtLink :to="hero.badge.to" class="pledge mt-10">
        <span class="pledge__bar">
          <span class="pledge__side pledge__side--left">
            <svg class="pledge__wave" viewBox="0 0 32 16" aria-hidden="true">
              <path d="M1 6c3.5 0 3.5-4 7-4s3.5 4 7 4 3.5-4 7-4 3.5 4 7 4M1 14c3.5 0 3.5-4 7-4s3.5 4 7 4 3.5-4 7-4 3.5 4 7 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            {{ hero.badge.left }}
          </span>
          <span class="pledge__seal">
            <BrandMark :monogram="hero.badge.monogram" />
          </span>
          <span class="pledge__side pledge__side--right">
            {{ hero.badge.right }}
            <svg class="pledge__wave" viewBox="0 0 32 16" aria-hidden="true">
              <path d="M1 6c3.5 0 3.5-4 7-4s3.5 4 7 4 3.5-4 7-4 3.5 4 7 4M1 14c3.5 0 3.5-4 7-4s3.5 4 7 4 3.5-4 7-4 3.5 4 7 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </span>
        </span>
        <span class="pledge__caption">{{ hero.badge.caption }}</span>
      </NuxtLink>

      <div class="cta mt-5">
        <NuxtLink to="/kapcsolat" class="btn-primary btn-press">
          <span>{{ hero.ctaLabel }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Fűsziluett: a videó „belenő” a következő szekcióba -->
    <GrassEdge size="lg" />
  </section>
</template>

<style scoped>
  .hero {
    min-height: 800px;
    height: 100vh;
    max-height: 960px;
    margin-top: -90px; /* a fejléc magassága */
    padding-top: 90px;
  }

  /* Amíg nincs háttérkép, a „Kép helye” felirat a díszsáv fölé kerül */
  .hero :deep(.image-placeholder--background) {
    padding-bottom: clamp(100px, 11vw, 165px);
  }

  /* A pálmasáv fölé emeli a tartalmat, hogy a gomb ne lógjon bele */
  .hero-content {
    padding-bottom: clamp(70px, 9vw, 130px);
  }

  /* Ovális, középre fókuszált sötétítés a szövegblokk mögött */
  .text-vignette {
    background: radial-gradient(
      ellipse 48% 42% at 50% 50%,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.3) 55%,
      rgba(0, 0, 0, 0) 100%
    );
    pointer-events: none;
  }

  .hero-video {
    opacity: 0;
    transition: opacity 1.2s ease;
  }

  .hero-video.is-playing {
    opacity: 1;
  }

  .overlay {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.42) 0%,
      rgba(0, 0, 0, 0.2) 40%,
      rgba(0, 0, 0, 0.3) 85%,
      rgba(0, 0, 0, 0.55) 100%
    );
  }

  .welcome-text,
  .main-title,
  .subtitle,
  .lead,
  .pledge,
  .cta {
    opacity: 0;
    animation: slideUp 0.9s ease-out forwards;
  }

  .welcome-text {
    animation-delay: 0.5s;
    font-weight: 700;
    text-shadow:
      0 1px 2px rgba(0, 0, 0, 0.9),
      0 0 14px rgba(0, 0, 0, 0.75);
  }

  .main-title {
    animation-delay: 0.7s;
    text-shadow:
      0 2px 4px rgba(0, 0, 0, 0.6),
      0 4px 24px rgba(0, 0, 0, 0.55);
  }

  .subtitle {
    animation-delay: 0.9s;
    text-shadow:
      0 1px 3px rgba(0, 0, 0, 0.8),
      0 2px 16px rgba(0, 0, 0, 0.6);
  }

  .lead {
    animation-delay: 1.1s;
    font-weight: 500;
    text-shadow:
      0 1px 2px rgba(0, 0, 0, 0.9),
      0 2px 14px rgba(0, 0, 0, 0.75);
  }

  .pledge {
    animation-delay: 1.3s;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 2.25rem; /* a zászló 1rem-rel kilóg: alatta így 1,25rem marad */
    max-width: 100%;
  }

  /* Üveghatású sáv, közepén a sávból kilógó érmével */
  .pledge__bar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    height: 3.4rem;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.55));
    border: 1px solid rgb(var(--c-on-dark-accent) / 0.45);
    border-radius: 9999px;
    backdrop-filter: blur(6px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .pledge:hover .pledge__bar {
    border-color: rgb(var(--c-on-dark-accent));
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.35),
      0 0 30px rgb(var(--c-on-dark-accent) / 0.35);
  }

  .pledge__side {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0 1.6rem;
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  }

  .pledge__side--left {
    justify-content: flex-end;
  }

  .pledge__wave {
    width: 1.6rem;
    height: 0.8rem;
    color: rgb(var(--c-on-dark-accent));
  }

  .pledge__seal {
    display: block;
    width: 5.4rem;
    height: 5.4rem;
    margin: -1rem 0;
    transition: transform 0.3s ease;
  }

  .pledge:hover .pledge__seal {
    transform: scale(1.06) rotate(-4deg);
  }

  /* Felirat a sáv alatt, két oldalt vékony vonallal */
  .pledge__caption {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: rgb(var(--c-on-dark-accent));
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  }

  .pledge__caption::before,
  .pledge__caption::after {
    content: '';
    width: 2.5rem;
    height: 1px;
    background: rgb(var(--c-on-dark-accent) / 0.7);
  }

  @media (max-width: 560px) {
    .pledge {
      gap: 2.05rem;
    }

    .pledge__bar {
      height: 2.9rem;
    }

    .pledge__side {
      padding: 0 0.8rem;
      font-size: 0.82rem;
    }

    .pledge__wave {
      display: none;
    }

    .pledge__seal {
      width: 4.4rem;
      height: 4.4rem;
      margin: -0.8rem 0;
    }

    .pledge__caption {
      font-size: 0.6rem;
      letter-spacing: 0.14em;
      white-space: nowrap;
    }

    .pledge__caption::before,
    .pledge__caption::after {
      width: 1.25rem;
    }
  }

  .cta {
    animation-delay: 1.5s;
  }

  /* „Nyomj meg” gomb: vastag alsó éle van, és időnként magától lenyomódik */
  .btn-press {
    position: relative;
    box-shadow:
      0 6px 0 rgb(var(--c-cta-edge)),
      0 14px 24px rgba(0, 0, 0, 0.45);
    animation: pressHint 2.8s ease-in-out 2.6s infinite;
    transition:
      transform 0.12s ease,
      box-shadow 0.12s ease,
      background-color 0.3s ease;
  }

  .btn-press:hover {
    animation: none;
    transform: translateY(-2px);
    box-shadow:
      0 8px 0 rgb(var(--c-cta-edge)),
      0 18px 28px rgba(0, 0, 0, 0.5);
  }

  .btn-press:active {
    animation: none;
    transform: translateY(6px);
    box-shadow:
      0 0 0 rgb(var(--c-cta-edge)),
      0 4px 10px rgba(0, 0, 0, 0.45);
  }

  @keyframes pressHint {
    0%,
    62%,
    100% {
      transform: translateY(0);
      box-shadow:
        0 6px 0 rgb(var(--c-cta-edge)),
        0 14px 24px rgba(0, 0, 0, 0.45);
    }
    72% {
      transform: translateY(5px);
      box-shadow:
        0 1px 0 rgb(var(--c-cta-edge)),
        0 5px 10px rgba(0, 0, 0, 0.45);
    }
    82% {
      transform: translateY(-1px);
      box-shadow:
        0 7px 0 rgb(var(--c-cta-edge)),
        0 16px 26px rgba(0, 0, 0, 0.45);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .welcome-text,
    .main-title,
    .subtitle,
    .lead,
    .pledge,
    .cta {
      animation: none;
      opacity: 1;
    }

    .btn-press {
      animation: none;
    }
  }
</style>
