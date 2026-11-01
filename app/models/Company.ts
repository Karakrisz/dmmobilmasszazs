export interface SocialLink {
  name: string
  url: string
  /** Ikon a public/ mappában; ha nincs, a név jelenik meg. */
  icon?: string
}

export interface Office {
  label: string
  address: string
}

export interface CompanyProps {
  name: string
  /** Hivatalos cégnév, pl. a szerzői jogi sorhoz. */
  legalName?: string
  tagline: string
  /** Monogram a márkajelben (amíg nincs saját logó), pl. „DM”. */
  monogram?: string
  description: string
  phone: string
  /** WhatsApp-szám (nemzetközi formátumban). */
  whatsapp?: string
  /** További telefonszámok. */
  phones?: string[]
  email: string
  offices: Office[]
  socials?: SocialLink[]
}

/** A cég alapadatai és elérhetőségei. */
export class Company {
  readonly name: string
  readonly legalName: string
  readonly tagline: string
  readonly monogram: string
  readonly description: string
  readonly phone: string
  readonly whatsapp: string
  readonly phones: string[]
  readonly email: string
  readonly offices: Office[]
  readonly socials: SocialLink[]

  constructor(props: CompanyProps) {
    this.name = props.name
    this.legalName = props.legalName ?? props.name
    this.tagline = props.tagline
    this.monogram = props.monogram ?? ''
    this.description = props.description
    this.phone = props.phone
    this.whatsapp = props.whatsapp ?? ''
    this.phones = props.phones ?? []
    this.email = props.email
    this.offices = props.offices
    this.socials = props.socials ?? []
  }

  static telHref(phone: string): string {
    return `tel:${phone.replace(/[^+\d]/g, '')}`
  }

  get phoneHref(): string {
    return Company.telHref(this.phone)
  }

  whatsappHref(message = ''): string {
    const number = this.whatsapp.replace(/[^\d]/g, '')
    const text = message ? `?text=${encodeURIComponent(message)}` : ''
    return `https://wa.me/${number}${text}`
  }

  mailHref(subject = ''): string {
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : ''
    return `mailto:${this.email}${query}`
  }

  get copyright(): string {
    return `© ${new Date().getFullYear()} ${this.legalName}.`
  }
}
