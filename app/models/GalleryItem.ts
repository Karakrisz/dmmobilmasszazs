import type { ImageSlot } from './ImageSlot'

export type GalleryShape = 'portrait' | 'wide' | 'big'

/** Egy galériakép, opcionálisan vendég-visszajelzéssel. */
export class GalleryItem {
  constructor(
    readonly image: ImageSlot,
    /** Rövid leírás a kép alján, pl. „Naplemente San Blason”. */
    readonly caption: string,
    /** A csempe alakja a rácsban: álló, széles vagy nagy (2×2). */
    readonly shape: GalleryShape = 'portrait',
    /** Utas véleménye – ha később megérkezik, a kép alján jelenik meg. */
    readonly quote: string = '',
    readonly guestName: string = '',
  ) {}
}
