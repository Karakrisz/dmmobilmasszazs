import type { HeroVideo } from './HeroVideo'
import type { ImageSlot } from './ImageSlot'

/** Egy lépés a menetben (pl. egyeztetés, kiszállás, kezelés). */
export class TripDay {
  constructor(
    readonly number: number,
    readonly title: string,
    readonly description: string[],
    /** Kép a lépéshez; ha nincs, a lépés kép nélkül, teljes szélességben jelenik meg. */
    readonly image: ImageSlot | null = null,
    /** Szállás aznap éjszakára. */
    readonly overnight: string = '',
    /** Étkezések, pl. „reggeli, ebéd, vacsora”. */
    readonly meals: string = '',
    /** Időpont vagy címke, pl. „7:30” – ha üres, „1. nap”. */
    readonly time: string = '',
  ) {}

  get label(): string {
    return this.time || `${this.number}. nap`
  }
}

export interface TripProgramProps {
  slug: string
  title: string
  /** Rövid típusmegjelölés, pl. „Masszázs”. */
  kind: string
  summary: string
  highlights: string[]
  /** Időtartam szövegesen, pl. „kb. 4,5 óra”; ha üres, a napok számából számolja. */
  duration?: string
  /** Induló ár fejenként (felnőtt). */
  priceFrom: number
  currency: string
  priceNote: string
  /** További árak, pl. gyerekár. */
  priceDetails?: string[]
  image: ImageSlot
  /** Háttérvideó az aloldal fejlécébe. */
  video?: HeroVideo
  days: TripDay[]
  included: string[]
  notIncluded?: string[]
  /** Mit hozz magaddal. */
  bring?: string[]
  /** Fontos tudnivalók. */
  goodToKnow?: string[]
  /** Online foglalás (pl. FareHarbor). */
  bookingUrl?: string
}

/** Szolgáltatás (pl. masszázsfajta) lépésenkénti menettel, árral és tudnivalókkal. */
export class TripProgram {
  readonly slug: string
  readonly title: string
  readonly kind: string
  readonly summary: string
  readonly highlights: string[]
  readonly duration: string
  readonly priceFrom: number
  readonly currency: string
  readonly priceNote: string
  readonly priceDetails: string[]
  readonly image: ImageSlot
  readonly video: HeroVideo | null
  readonly days: TripDay[]
  readonly included: string[]
  readonly notIncluded: string[]
  readonly bring: string[]
  readonly goodToKnow: string[]
  readonly bookingUrl: string

  constructor(props: TripProgramProps) {
    this.slug = props.slug
    this.title = props.title
    this.kind = props.kind
    this.summary = props.summary
    this.highlights = props.highlights
    this.duration = props.duration ?? ''
    this.priceFrom = props.priceFrom
    this.currency = props.currency
    this.priceNote = props.priceNote
    this.priceDetails = props.priceDetails ?? []
    this.image = props.image
    this.video = props.video ?? null
    this.days = props.days
    this.included = props.included
    this.notIncluded = props.notIncluded ?? []
    this.bring = props.bring ?? []
    this.goodToKnow = props.goodToKnow ?? []
    this.bookingUrl = props.bookingUrl ?? ''
  }

  get to(): string {
    return `/szolgaltatasok/${this.slug}`
  }

  get durationLabel(): string {
    return this.duration || `${this.days.length} nap`
  }

  get priceLabel(): string {
    // Ha még nincs ár megadva, helykitöltő jelenik meg
    if (this.priceFrom <= 0) return `[ár] ${this.currency}`
    const amount = new Intl.NumberFormat('hu-HU').format(this.priceFrom)
    return `${amount} ${this.currency}-tól`
  }
}
