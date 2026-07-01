export type SpriteType =
  | 'Water'
  | 'Earth'
  | 'Fire'
  | 'Fishy'
  | 'Duck'
  | 'Ghost'
  | 'Demon'
  | 'King'
  | 'Aura'
  | 'Striker'
  | 'Dream'
  | 'Punk'
  | 'Boss'
  | 'Grim'
  | 'Zero Point'
  | 'The Burnt Peanut'

export type SpriteRarity = 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Special'

export type SpriteVariant = 'Normal' | 'Gold' | 'Gummy' | 'Galaxy' | 'Gem' | 'Holofoil'

export type DiscordExportVariant = Extract<SpriteVariant, 'Normal' | 'Gold' | 'Gummy' | 'Galaxy'>

export const DISCORD_EXPORT_VARIANTS: readonly DiscordExportVariant[] = [
  'Normal',
  'Gold',
  'Gummy',
  'Galaxy',
] as const

export interface Sprite {
  id: number
  name: string
  type: SpriteType
  rarity: SpriteRarity
  variant: SpriteVariant
  description: string
  image_url: string
  price: number
  mastered: boolean
}

export interface SpriteFilters {
  search: string
  rarity: 'All' | SpriteRarity
  variant: 'All' | SpriteVariant
  ownedStatus: 'All' | 'Owned' | 'NotOwned' | 'Mastered'
  // mastered: boolean
  // sortBy: 'rarity-desc' | 'rarity-asc' | 'name-asc'
}

export interface TradingMatch {
  youCanGive: Sprite[]
  friendCanGive: Sprite[]
}

export interface ToastState {
  show: boolean
  title: string
  msg: string
  icon: string
}
