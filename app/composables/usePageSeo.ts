import { company } from '~/data/site'

/**
 * Egy oldal címe és leírása mindenhová: böngészőfül, Google-találat, és a megosztási
 * előnézet (Facebook, Messenger, WhatsApp, Viber, LinkedIn, X, Slack, iMessage).
 * A megosztási kép közös: public/og-image.jpg (1200×630).
 */
export function usePageSeo(title: string, description: string) {
  const fullTitle = title ? `${title} | ${company.name}` : company.name

  useSeoMeta({
    title,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    twitterTitle: fullTitle,
    twitterDescription: description,
  })
}
