<script setup lang="ts">
  import { company, homeLink, logo, navLinks } from '~/data/site'

  // A „Kezdőlap” menüpont csak aloldalakon látszik
  const route = useRoute()
  const links = computed(() =>
    route.path === '/' ? navLinks : [homeLink, ...navLinks],
  )

  const isMenuOpen = ref(false)

  const closeMenu = () => {
    isMenuOpen.value = false
  }
</script>

<template>
  <header class="sticky top-0 z-50">
    <div class="menu container flex items-center justify-between gap-6">
      <!-- Logó / márkanév -->
      <NuxtLink to="/" class="logo-link" :aria-label="company.name" @click="closeMenu">
        <LogoBadge :slogan="company.tagline" :image="logo" :monogram="company.monogram" />
      </NuxtLink>

      <!-- Asztali navigáció -->
      <nav class="hidden items-center gap-7 lg:flex xl:gap-10" aria-label="Főmenü">
        <template v-for="link in links" :key="link.label">
          <NuxtLink
            v-if="!link.isButton"
            :to="link.to"
            class="nav-link text-sm uppercase transition-colors duration-200 hover:text-accent"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink v-else :to="link.to" class="booking-button whitespace-nowrap text-sm uppercase">
            <span>{{ link.label }}</span>
          </NuxtLink>
        </template>
      </nav>

      <!-- Hamburger gomb (mobil) -->
      <button
        class="flex flex-col gap-1.5 p-2 focus:outline-none lg:hidden"
        :aria-expanded="isMenuOpen"
        aria-label="Menü"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="bar" :class="{ 'translate-y-2 rotate-45': isMenuOpen }"></span>
        <span class="bar" :class="{ 'opacity-0': isMenuOpen }"></span>
        <span class="bar" :class="{ '-translate-y-2 -rotate-45': isMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobil navigáció -->
    <div
      class="overflow-hidden transition-all duration-300 ease-out lg:hidden"
      :class="isMenuOpen ? 'max-h-96' : 'max-h-0'"
    >
      <nav class="flex flex-col border-t border-ink/10 bg-page" aria-label="Mobil menü">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="border-b border-ink/10 px-6 py-3 text-sm uppercase transition-colors duration-200 last:border-b-0"
          :class="
            link.isButton
              ? 'm-4 rounded-full bg-cta text-center font-semibold text-cta-ink'
              : 'font-light text-ink hover:bg-page-alt hover:text-accent'
          "
          @click="closeMenu"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  header {
    color: rgb(var(--c-header-ink));
    background-color: rgb(var(--c-header) / 0.9);
    backdrop-filter: blur(6px);
    box-shadow: 0 1px 0 rgb(var(--c-ink) / 0.08);
  }

  /* Kis térköz a logó fölött és alatt (a fejléc teljes magassága: 90px) */
  .menu {
    height: 90px;
    padding-block: 8px;
  }

  /* Logó-pecsét: a fejlécen belül marad, nem lóg ki */
  .logo-link {
    flex-shrink: 0;
    width: 66px;
    height: 66px;
    transition: transform 0.3s ease;
  }

  .logo-link:hover {
    transform: scale(1.05);
  }

  @media (max-width: 767px) {
    .logo-link {
      width: 62px;
      height: 62px;
    }
  }

  .nav-link {
    position: relative;
    font-weight: 300;
    letter-spacing: 0.04em;
  }

  /* Az aktuális aloldal menüpontja */
  .nav-link.router-link-exact-active,
  .nav-link.router-link-active:not([href='/']) {
    font-weight: 600;
    color: rgb(var(--c-accent-2));
  }

  .nav-link.router-link-active:not([href='/'])::after {
    content: '';
    position: absolute;
    inset: auto 0 -8px 0;
    height: 2px;
    background: linear-gradient(90deg, rgb(var(--c-accent)), rgb(var(--c-accent-2)));
    border-radius: 9999px;
  }

  .booking-button {
    display: inline-block;
    padding: 0.7rem 1.5rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: rgb(var(--c-cta-ink));
    background-color: rgb(var(--c-cta));
    border-radius: 9999px;
    transition: background-color 0.2s ease;
  }

  .booking-button:hover {
    background-color: rgb(var(--c-cta-hover));
  }

  .bar {
    width: 1.5rem;
    height: 2px;
    background: rgb(var(--c-header-ink));
    transform-origin: center;
    transition: all 0.3s ease-out;
  }
</style>
