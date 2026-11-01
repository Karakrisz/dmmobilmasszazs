import type { ImageSlot } from './ImageSlot'

/** A csapat egy tagja (pl. a masszőr). */
export class TeamMember {
  constructor(
    readonly name: string,
    readonly role: string,
    readonly bio: string[],
    readonly photo: ImageSlot,
    readonly facts: string[] = [],
  ) {}

  /** Ha a név még nincs meg, a szerepkör áll a helyén. */
  get displayName(): string {
    return this.name || this.role
  }
}
