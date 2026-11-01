<script setup lang="ts">
  import { company, cta, pages, travelInfo } from '~/data/site'
  import { Company } from '~/models'

  const page = pages.kapcsolat

  usePageSeo(page.title, page.lead)

  const root = ref<HTMLElement | null>(null)
  useScrollReveal(root)

  const channels = [
    company.whatsapp
      ? { label: 'WhatsApp', value: company.whatsapp, extra: company.phones, href: company.whatsappHref(cta.whatsappMessage), action: 'Írj WhatsAppon', external: true }
      : { label: 'Telefon', value: company.phone, extra: company.phones, href: company.phoneHref, action: 'Hívj fel', external: false },
    { label: 'Email', value: company.email, extra: [] as string[], href: company.mailHref(cta.mailSubject), action: 'Írj emailt', external: false },
  ]
</script>

<template>
  <main>
    <PageHero v-bind="page" />

    <section ref="root" class="contact text-ink">
      <div class="container mx-auto py-16">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(channel, i) in channels"
            :key="channel.label"
            class="card reveal"
            :style="{ '--reveal-delay': `${i * 0.12}s` }"
          >
            <p class="eyebrow">{{ channel.label }}</p>
            <p class="heading-title mt-3 break-words text-[24px]">{{ channel.value }}</p>
            <p v-for="phone in channel.extra" :key="phone" class="mt-1 text-sm text-ink/70">
              Telefon: <a :href="Company.telHref(phone)" class="underline">{{ phone }}</a>
            </p>
            <a
              :href="channel.href"
              :target="channel.external ? '_blank' : undefined"
              rel="noopener"
              class="btn-primary mt-6"
            >{{ channel.action }}</a>
          </div>

          <div class="card reveal" style="--reveal-delay: 0.24s">
            <p class="eyebrow">Kiszállás és nyitvatartás</p>
            <div v-for="office in company.offices" :key="office.label" class="mt-3">
              <p class="font-semibold">{{ office.label }}</p>
              <address class="not-italic text-sm leading-relaxed text-ink/80">{{ office.address }}</address>
            </div>
            <ul class="mt-4 space-y-1 text-sm text-ink/80">
              <li v-for="item in travelInfo.seasons" :key="item.label">
                <span class="font-semibold">{{ item.label }}:</span> {{ item.value }}
              </li>
            </ul>
            <NuxtLink to="/szolgaltatasok" class="btn-outline mt-6">Szolgáltatások</NuxtLink>
          </div>
        </div>

        <p class="reveal mx-auto mt-12 max-w-2xl text-center font-semibold text-accent">
          Írj vagy hívj, és röviden átbeszéljük a panaszokat, a helyszínt és
          az ideális időtartamot.
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
  .contact {
    background:
      radial-gradient(900px 500px at 50% 0%, rgb(var(--c-accent) / 0.14), transparent 60%),
      rgb(var(--c-page));
  }

  .card {
    padding: 2rem;
    background: linear-gradient(135deg, rgb(var(--c-accent) / 0.14), rgb(var(--c-ink) / 0.02));
    border: 1px solid rgb(var(--c-accent) / 0.4);
    border-radius: 1.25rem;
  }
</style>
