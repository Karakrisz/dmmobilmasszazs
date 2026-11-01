<script setup lang="ts">
  import { company, logo } from '~/data/site'
  import { Company } from '~/models'
</script>

<template>
  <footer class="on-dark bg-footer py-12 text-white">
    <div
      class="container mx-auto flex flex-col items-start justify-between gap-12 md:flex-row"
    >
      <!-- Bal oszlop: logó és bemutatkozás -->
      <div class="flex-1">
        <NuxtLink to="/" class="block h-32 w-32" :aria-label="company.name">
          <LogoBadge :slogan="company.tagline" :image="logo" :monogram="company.monogram" />
        </NuxtLink>
        <p class="mt-4 max-w-md text-sm leading-relaxed">
          {{ company.description }}
        </p>
        <p class="mt-4 max-w-md text-sm font-semibold leading-relaxed text-on-dark">
          Időpont előzetes egyeztetéssel – Pócsmegyer és Surány kiemelt terület.
        </p>

        <div v-if="company.socials.length" class="mt-6 flex flex-wrap items-center gap-4">
          <a
            v-for="social in company.socials"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener"
            :aria-label="social.name"
            class="transition-opacity hover:opacity-75"
          >
            <NuxtImg v-if="social.icon" :src="social.icon" :alt="social.name" class="h-8 w-8" />
            <span v-else class="chip !text-white">{{ social.name }}</span>
          </a>
        </div>
      </div>

      <!-- Jobb oszlop: elérhetőségek -->
      <div class="flex-1">
        <h3 class="heading-title mb-4 text-[21px] lg:text-[32px]">Kapcsolat</h3>

        <div class="space-y-4 text-sm">
          <div v-for="office in company.offices" :key="office.label">
            <p class="font-semibold">{{ office.label }}:</p>
            <address class="not-italic leading-relaxed">{{ office.address }}</address>
          </div>
          <div>
            <p class="font-semibold">Telefon:</p>
            <a :href="company.phoneHref" class="text-on-dark transition-colors hover:text-white">{{ company.phone }}</a>
            <template v-if="company.whatsapp">
              <br />
              <a :href="company.whatsappHref()" target="_blank" rel="noopener" class="text-on-dark transition-colors hover:text-white">WhatsApp: {{ company.whatsapp }}</a>
            </template>
            <template v-for="phone in company.phones" :key="phone">
              <br />
              <a :href="Company.telHref(phone)" class="text-on-dark transition-colors hover:text-white">{{ phone }}</a>
            </template>
          </div>
          <div>
            <p class="font-semibold">Email:</p>
            <a
              :href="company.mailHref()"
              class="text-on-dark transition-colors hover:text-white"
            >
              {{ company.email }}
            </a>
          </div>
        </div>

        <div class="mt-8 text-xs opacity-70">
          <p>
            {{ company.copyright }}<br />
            Minden jog fenntartva.
          </p>
          <NuxtLink
            to="/adatvedelmi-tajekoztato"
            class="mt-2 inline-block underline hover:text-on-dark"
          >
            Adatvédelmi tájékoztató
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="container mx-auto mt-12 border-t border-white/15 pt-8">
      <div
        class="flex flex-col items-center justify-between text-xs opacity-60 sm:flex-row"
      >
        <p>Tervezés és fejlesztés</p>
        <a
          href="https://digitalseedstudio.com"
          target="_blank"
          rel="noopener"
          class="mt-4 opacity-75 transition-opacity hover:opacity-100 sm:mt-0"
        >
          <span class="text-on-dark">Digital Seed Studio</span>
        </a>
      </div>
    </div>
  </footer>
</template>
