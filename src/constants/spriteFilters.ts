import type { SpriteFilters, SpriteRarity, SpriteVariant } from '@/types/sprite'

type SelectOption<T> = {
  label: string
  value: T
}

export const VALID_RARITIES = ['Rare', 'Epic', 'Legendary', 'Mythic', 'Special'] as const satisfies readonly SpriteRarity[]

export const VALID_VARIANTS = ['Normal', 'Gold', 'Gummy', 'Galaxy', 'Gem', 'Holofoil'] as const satisfies readonly SpriteVariant[]

export const OWNED_STATUS_VALUES = ['All', 'Owned', 'NotOwned', 'Mastered'] as const satisfies readonly SpriteFilters['ownedStatus'][]

const OWNED_STATUS_LABELS: Record<SpriteFilters['ownedStatus'], string> = {
  All: 'All',
  Owned: 'Owned',
  NotOwned: 'Not Owned',
  Mastered: 'Mastered',
}

export const RARITY_OPTIONS: Array<SelectOption<SpriteRarity>> = VALID_RARITIES.map((value) => ({
  label: value,
  value,
}))

export const VARIANT_OPTIONS: Array<SelectOption<SpriteVariant>> = VALID_VARIANTS.map((value) => ({
  label: value,
  value,
}))

export const OWNED_STATUS_OPTIONS: Array<SelectOption<SpriteFilters['ownedStatus']>> = OWNED_STATUS_VALUES.map((value) => ({
  label: OWNED_STATUS_LABELS[value],
  value,
}))

export function isSpriteRarity(value: string): value is SpriteRarity {
  return VALID_RARITIES.includes(value as SpriteRarity)
}

export function isSpriteVariant(value: string): value is SpriteVariant {
  return VALID_VARIANTS.includes(value as SpriteVariant)
}

export function isOwnedStatus(value: string): value is SpriteFilters['ownedStatus'] {
  return OWNED_STATUS_VALUES.includes(value as SpriteFilters['ownedStatus'])
}