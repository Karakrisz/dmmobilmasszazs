import {
  Benefit,
  Company,
  ContentBlock,
  GalleryItem,
  HeroVideo,
  ImageSlot,
  NavLink,
  TeamMember,
  TripDay,
  TripProgram,
  VideoSource,
} from '~/models'

/*
 * Az oldal teljes tartalma itt szerkeszthető.
 *
 * KÉPEK: minden ImageSlot utolsó paramétere a kép útvonala. Amíg ez hiányzik,
 * az oldalon „Kép helye” helykitöltő látszik. Kép feltöltése:
 *   1. másold a fájlt a public/ mappába a javasolt helyre,
 *   2. add meg ugyanazt az útvonalat utolsó paraméterként, pl.
 *      new ImageSlot('Főkép', 'Masszázs', '/img/hero/hero.jpg', '1920×1080', '/img/hero/hero.jpg')
 *
 * FOTÓK több méretben: ImageSlot.photo('/img/galeria/kep', 'leírás', [600, 1200])
 * a kep-600.webp és kep-1200.webp fájlokat használja.
 *
 * A [szögletes zárójeles] szövegek kitöltendő helykitöltők.
 */

/** Színtéma: 'light' = világos, 'dark' = fekete-arany. A színek: app/assets/css/main.css */
export const theme: 'light' | 'dark' = 'dark'

export const company = new Company({
  name: 'DM Mobilmasszázs',
  // Szöveg a logó körül (fejléc, lábléc)
  tagline: 'dmmobilmasszazs',
  monogram: 'DM',
  description:
    'Kiszállásos masszázs Pócsmegyeren és Surányban – otthonodban, nyaralóban vagy a szállásodon.',
  phone: '[+36 00 000 0000]',
  // WhatsApp-szám (ha van): ekkor a gombok WhatsAppra is mutatnak
  whatsapp: '',
  email: '[info@pelda.hu]',
  offices: [
    { label: 'Kiszállás', address: 'Pócsmegyer, Surány – további helyszínek egyeztetés alapján' },
  ],
  socials: [
    { name: 'Facebook', url: 'https://www.facebook.com', icon: '/img/facebook.png' },
    { name: 'Instagram', url: 'https://www.instagram.com', icon: '/img/insta.png' },
  ],
})

export const navLinks = [
  new NavLink('Szolgáltatások', '/szolgaltatasok'),
  new NavLink('Miért mobil?', '/miert-mobilmasszazs'),
  new NavLink('Rólam', '/rolam'),
  new NavLink('Galéria', '/galeria'),
  new NavLink('Időpontot kérek', '/kapcsolat', true),
]

/** Csak aloldalakon jelenik meg a menü elején. */
export const homeLink = new NavLink('Kezdőlap', '/')

export const logo = new ImageSlot('Logó', `${company.name} logó`, '/img/logo.png', '512×512')

export const hero = {
  welcome: 'Kiszállásos masszázs',
  title: 'Mobilmasszázs',
  subtitle: 'Pócsmegyeren és Surányban',
  lead: 'Professzionális masszázs kiszállással: otthonodban, nyaralóban vagy szállásodon. Te pihensz, én viszem az asztalt, a higiéniai eszközöket és a nyugalmat.',
  ctaLabel: 'Időpontot kérek',
  // Kiemelt jelvény a cím alatt: a két fő helyszín, középen a márkajel
  badge: {
    monogram: company.monogram,
    left: 'Pócsmegyer',
    right: 'Surány',
    caption: 'Kiszállás · a saját környezetedben',
    to: '/kapcsolat',
  },
  // A videó változatai a forras/video/hero.mov-ból (4K) készültek
  video: new HeroVideo('/video/hero-poster.jpg', [
    new VideoSource('/video/hero-720-av1.mp4', 720, 'av1'),
    new VideoSource('/video/hero-1080-av1.mp4', 1080, 'av1'),
    new VideoSource('/video/hero-1440-av1.mp4', 1440, 'av1'),
    new VideoSource('/video/hero-2160-av1.mp4', 2160, 'av1'),
    new VideoSource('/video/hero-720-h264.mp4', 720, 'h264'),
    new VideoSource('/video/hero-1080-h264.mp4', 1080, 'h264'),
  ]),
  // Csak akkor látszik, ha nincs videó (video: null).
  image: new ImageSlot(
    'Főoldali nagy háttérkép',
    'Nyugodt, otthoni masszázskezelés',
    '/img/hero/hero.jpg',
    '1920×1080',
  ),
}

/* ---------- Miért mobilmasszázs? ---------- */

export const whyUs = {
  title: 'Miért működik a mobilmasszázs?',
  lead: 'Kevesebb szervezés, több pihenés.',
  highlight: {
    value: '20%',
    label: 'kedvezmény az első alkalomra',
  },
  text: 'Nem kell utaznod, parkolnod, várakoznod. A kezelés után pedig azonnal maradhatsz nyugalomban – ez a regeneráció egyik kulcsa.',
  benefits: [
    new Benefit(
      'Kényelmes kiszállás',
      'Masszázságy, olajok és higiénia biztosítva – te pihensz, a többit én viszem.',
    ),
    new Benefit(
      'Rugalmas helyszín',
      'Otthon, iroda, nyaraló vagy vendégház (előzetes egyeztetéssel). Pócsmegyer és Surány a fő terület.',
    ),
    new Benefit(
      'Személyre szabott kezelés',
      'Állapotfelmérés, az igények egyeztetése és a nyomáserősség beállítása – a cél a valódi megkönnyebbülés.',
    ),
  ],
}

/* ---------- Rólam ---------- */

export const about = {
  title: 'A minőségi masszázs ott kezdődik, ahol te vagy',
  subtitle: 'Kényelmesen, ismerős környezetben – ugyanazzal a gondos, szakmai kezeléssel.',
  blocks: [
    new ContentBlock(
      'rolam-mobil',
      'Kiszállásos mobilmasszázs',
      [
        'Mobilmasszázsnál nem neked kell utaznod és alkalmazkodnod. Kényelmesen, ismerős környezetben kapod meg ugyanazt a gondos, szakmai kezelést.',
        'A masszázs célja: a *feszültség csökkentése*, a *keringés támogatása* és a *közérzet javítása*.',
        'A masszázs akkor a leghatékonyabb, ha *rendszeres* és jól illeszkedik a napirendedhez. Ezért viszem házhoz: te időt nyersz, a tested pedig megkönnyebbül.',
      ],
      new ImageSlot('Masszázs hangulatkép', 'Kiszállásos masszázs otthon', '/img/rolam/mobil.jpg', '1200×900'),
    ),
    new ContentBlock(
      'rolam-minoseg',
      'Bizalom, higiénia, minőség',
      [
        'A biztonságos, tiszta környezet és a szakmai alapok nem „extra”, hanem alap. Mindig *friss textil*, *fertőtlenített eszközök* és nyugodt, tiszteletteljes jelenlét.',
        'A masszázshoz minimális hely kell – segítek a gyors előkészítésben. Elég egy *törölköző vagy lepedő*, egy *nyugodt sarok* és egy *pohár víz*. A többit viszem én.',
      ],
      new ImageSlot('Masszázsasztal, olajok, előkészített tér', 'Előkészített masszázskezelés', '/img/rolam/minoseg.jpg', '1200×900'),
      true,
    ),
  ],
}

/* ---------- Galéria ---------- */

const galleryPhoto = (n: number, label: string, size = '1200×1600') =>
  new ImageSlot(`Galéria ${n}. – ${label}`, `Mobilmasszázs – ${label}`, `/img/galeria/galeria-${n}.jpg`, size)

export const gallery = {
  title: 'Hangulat és környezet',
  lead: 'A cél egy nyugodt, rendezett tér, ahol könnyű ellazulni.',
  // A sorrend számít: négyesével (álló, széles, álló, széles) hézag nélkül tölti ki a rácsot.
  items: [
    new GalleryItem(galleryPhoto(1, 'melegköves masszázs'), 'Melegköves masszázs'),
    new GalleryItem(galleryPhoto(2, 'kikapcsolódás otthon', '1600×740'), 'Relaxáló masszázs – kikapcsolódás otthon', 'wide'),
    new GalleryItem(galleryPhoto(3, 'aromás masszázs'), 'Aromás masszázs'),
    new GalleryItem(galleryPhoto(4, 'relax és regeneráció', '1600×740'), 'Melegköves masszázs – relax és regeneráció', 'wide'),
    new GalleryItem(galleryPhoto(5, 'olajok és kényelem'), 'Frissítő masszázs'),
    new GalleryItem(galleryPhoto(6, 'regeneráció', '1600×740'), 'Relaxáló masszázs – regeneráció', 'wide'),
    new GalleryItem(galleryPhoto(7, 'aroma kiegészítés'), 'Aroma kiegészítés'),
    new GalleryItem(galleryPhoto(8, 'izomlazítás', '1600×740'), 'Mélyszöveti masszázs – izomlazítás', 'wide'),
  ],
}

/* ---------- A masszőr ---------- */

export const team = {
  title: 'Ismerj meg',
  lead: 'Rólam, aki a kezelést végzi – és akihez időpontért fordulhatsz.',
  members: [
    new TeamMember(
      '[Masszőr neve]',
      'Masszőr',
      [
        '[Bemutatkozás: ki vagy, mióta masszírozol, milyen képzettséged van.]',
        '[Miért szereted ezt a munkát – személyes hangvételű 2–3 mondat.]',
      ],
      new ImageSlot('A masszőr portréfotója', 'A masszőr portréja', '/img/rolam/portre.jpg', '800×1000'),
    ),
  ],
}

export const cta = {
  title: 'Időpontot kérnél vagy kérdésed van?',
  text: 'Kérj időpontot 1 perc alatt, és élvezd a masszázst a saját környezetedben. Hívj, vagy írj, és hamarosan jelentkezem.',
  mailSubject: 'Időpontkérés – mobilmasszázs',
  whatsappMessage: 'Szia! Időpontot szeretnék kérni masszázsra.',
}

/* ---------- Szolgáltatások ---------- */

const servicePhoto = (slug: string, label: string) =>
  new ImageSlot(label, label, `/img/szolgaltatasok/${slug}.jpg`, '1600×1000')

// A kezelés menete minden masszázsnál ugyanaz
const steps = [
  new TripDay(1, 'Egyeztetés', ['Írj vagy hívj, és röviden átbeszéljük a panaszokat, a helyszínt és az ideális időtartamot.'], null, '', '', 'Előtte'),
  new TripDay(2, 'Kiszállás és előkészítés', ['Viszem a masszázsasztalt, az olajokat és a higiéniai eszközöket. Neked elég egy törölköző vagy lepedő, egy nyugodt sarok és egy pohár víz.']),
  new TripDay(3, 'Állapotfelmérés', ['Egyeztetjük az igényeidet, és beállítjuk a nyomáserősséget – mindig hozzád igazítva.']),
  new TripDay(4, 'A kezelés', ['A választott masszázs, a te célodhoz igazított fogásokkal.']),
  new TripDay(5, 'Pihenés utána', ['Nem kell sehová indulnod: a kezelés után azonnal maradhatsz nyugalomban – ez a regeneráció egyik kulcsa.'], null, '', '', 'Utána'),
]

const included = ['Kiszállás Pócsmegyeren és Surányban', 'Masszázságy', 'Olajok', 'Friss textil', 'Fertőtlenített eszközök']
const bring = ['Egy törölköző vagy lepedő', 'Egy nyugodt sarok', 'Egy pohár víz']
const goodToKnow = [
  'Időpont előzetes egyeztetéssel.',
  'Más környékbeli helyszínre előzetes egyeztetéssel megyek.',
  'Első kezelésnél rövid állapotfelméréssel indítunk.',
]

// Az árak még hiányoznak: a priceFrom 0 → „[ár] Ft” jelenik meg. Új szolgáltatás:
// újabb TripProgram a listában, automatikusan saját aloldalt kap (/szolgaltatasok/<slug>).
const service = (props: {
  slug: string
  title: string
  duration: string
  summary: string
  highlights: string[]
  priceDetails?: string[]
}) =>
  new TripProgram({
    ...props,
    kind: 'Masszázs',
    priceFrom: 0,
    currency: 'Ft',
    priceNote: '/ alkalom',
    image: servicePhoto(props.slug, props.title),
    days: steps,
    included,
    bring,
    goodToKnow,
  })

export const programs = [
  service({
    slug: 'hat-nyak-vall',
    title: 'Hát–nyak–váll masszázs',
    duration: '60 perc',
    summary:
      'Ideális ülőmunka, vezetés vagy sport utáni letapadásokra. Célzott fogások a vállöv és a lapocka környékén – a cél a mozgástartomány javítása és a kellemetlen feszülés csökkentése.',
    highlights: ['Ülőmunka után', 'Vállöv, lapocka', 'Feszülés oldása'],
  }),
  service({
    slug: 'relaxalo',
    title: 'Relaxáló masszázs',
    duration: '60 perc',
    summary:
      'Nyugodt tempójú, hosszabb fogások a teljes kikapcsolódásért. Különösen ajánlott túlterheltség, alvásproblémák vagy tartós stressz esetén.',
    highlights: ['Stresszoldás', 'Teljes ellazulás', 'Jobb alvás'],
  }),
  service({
    slug: 'sved-frissito',
    title: 'Svéd / frissítő masszázs',
    duration: '50 perc',
    summary: 'Általános közérzetjavítás, a fáradtság csökkentése és könnyedebb izomérzet.',
    highlights: ['Közérzetjavítás', 'Fáradtság ellen', 'Frissülés'],
    priceDetails: ['Frissítő hátmasszázs: 40 perc'],
  }),
  service({
    slug: 'melyszoveti',
    title: 'Mélyszöveti masszázs',
    duration: '45 / 55 perc',
    summary:
      'A mélyen fekvő izmok és szövetek kezelése. Hatékonyan oldja a feszültségeket és a görcsöket.',
    highlights: ['Mély izmok', 'Görcsoldás', 'Feszültségoldás'],
  }),
  service({
    slug: 'melegkoves',
    title: 'Melegköves masszázs',
    duration: '55 / 70 perc',
    summary:
      'Mély, kellemes meleggel támogatott ellazulás – különösen jó hidegebb időben. Segít oldani a feszülést és támogatja a regenerációt.',
    highlights: ['Meleg kövek', 'Mély ellazulás', 'Regeneráció'],
  }),
  service({
    slug: 'aromas-relax',
    title: 'Aromás relax',
    duration: '50 perc',
    summary:
      'Finom illatok és nyugtató fogások a teljes kikapcsolódásért. Ha stresszes vagy, vagy nehezen lazulsz el, az illatok finoman támogatják a relaxációt.',
    highlights: ['Aromaterápia', 'Illóolajok', 'Nyugtató fogások'],
  }),
  service({
    slug: 'kombinalt',
    title: 'Kombinált masszázs',
    duration: '60 perc',
    summary: '[Rövid leírás: mely technikákat kombinálja, kinek ajánlott.]',
    highlights: ['A céljaidhoz igazítva'],
  }),
]

export const trips = {
  title: 'Válassz masszázst a célod szerint',
  lead: 'Nem „egyféle masszázs” létezik. Más kell a fáradtságra, más az izomfeszülésre – segítek kiválasztani a számodra megfelelő típust és időtartamot.',
  custom: {
    kind: 'Első alkalom',
    title: 'Kényelmesen, kiszállással',
    text: [
      'Ha először próbálod a mobilmasszázst, segítek gyorsan kiválasztani a számodra ideális típust.',
      'Első kezelésnél rövid állapotfelméréssel indítunk, hogy valóban azt kapd, amire a testednek szüksége van – most 20% kedvezménnyel.',
    ],
    options: ['20% első alkalomra', 'Állapotfelmérés', 'Pócsmegyer · Surány'],
    ctaLabel: 'Én is kipróbálom',
    image: new ImageSlot('Első alkalom – hangulatkép', 'Első masszázskezelés', '/img/szolgaltatasok/elso-alkalom.jpg', '1600×1000'),
  },
}

export const travelInfo = {
  title: 'Nyitvatartás és kiszállás',
  text: [
    'Időpont előzetes egyeztetéssel. Írj vagy hívj, és röviden átbeszéljük a panaszokat, a helyszínt (Pócsmegyer/Surány) és az ideális időtartamot.',
    'Pócsmegyer és Surány az elsődleges terület, de előzetes egyeztetéssel más környékbeli helyszínre is megyek.',
  ],
  seasons: [
    { label: 'Hétfő – Péntek', value: '9:00 – 19:00' },
    { label: 'Szombat', value: '9:00 – 18:00' },
    { label: 'Vasárnap', value: 'zárva' },
  ],
}

/* ---------- Aloldalak fejlécei ---------- */

const pageImage = (page: string, label: string) =>
  new ImageSlot(`${label} – oldal fejléc háttérképe`, label, `/img/fejlec/${page}.jpg`, '1920×700')

export const pages = {
  szolgaltatasok: {
    eyebrow: 'Masszázsfajták',
    title: 'Szolgáltatások',
    lead: 'Válassz masszázst a célod szerint – kiszállással, a saját környezetedben.',
    image: pageImage('szolgaltatasok', 'Szolgáltatások'),
  },
  miertMobil: {
    eyebrow: 'Kevesebb szervezés, több pihenés',
    title: 'Miért mobilmasszázs?',
    lead: 'Nem kell utaznod, parkolnod, várakoznod – a kezelés után azonnal pihenhetsz.',
    image: pageImage('miert-mobilmasszazs', 'Miért mobilmasszázs?'),
  },
  rolam: {
    eyebrow: 'Bizalom, higiénia, minőség',
    title: 'Rólam',
    lead: 'A minőségi masszázs ott kezdődik, ahol te vagy.',
    image: pageImage('rolam', 'Rólam'),
  },
  galeria: {
    eyebrow: 'Hangulat és környezet',
    title: 'Galéria',
    lead: 'Nyugodt, rendezett tér, ahol könnyű ellazulni.',
    image: pageImage('galeria', 'Galéria'),
  },
  kapcsolat: {
    eyebrow: 'Időpontfoglalás',
    title: 'Kapcsolat',
    lead: 'Írj vagy hívj, és röviden átbeszéljük a panaszokat, a helyszínt és az ideális időtartamot.',
    image: pageImage('kapcsolat', 'Kapcsolat'),
  },
}
