import type { SpriteRarity, SpriteType, SpriteVariant } from '@/types/sprite'

export function getGlowClass(
  rarity: SpriteRarity,
  variant: SpriteVariant = 'Normal',
): string {
  if (rarity === 'Special') {
    const specialVariantMap: Partial<Record<SpriteVariant, string>> = {
      Gold: 'glow-special-gold border-yellow-400/25',
      Gummy: 'glow-special-gummy border-pink-400/25',
      Galaxy: 'glow-special-galaxy border-indigo-400/30',
    }

    return (
      specialVariantMap[variant] ??
      'glow-special-galaxy border-fuchsia-400/25'
    )
  }

  const map: Record<SpriteRarity, string> = {
    Rare: 'glow-rare border-blue-500/20',
    Epic: 'glow-epic border-purple-500/20',
    Legendary: 'glow-legendary border-orange-500/20',
    Mythic: 'glow-mythic border-yellow-500/30',
    Special: 'glow-special-galaxy border-fuchsia-400/25',
  }
  return map[rarity] ?? 'border-white/5 bg-slate-900'
}

// export function getRarityBadgeClass(
//   rarity: SpriteRarity,
//   _variant: SpriteVariant = 'Normal',
// ): string {
//   if (rarity === 'Special') {
//     return 'bg-[linear-gradient(135deg,#ef4444_0%,#f59e0b_18%,#eab308_36%,#22c55e_54%,#3b82f6_72%,#8b5cf6_86%,#ec4899_100%)] border-white/35 text-black shadow-[0_0_14px_rgba(255,255,255,0.2)]'
//   }

//   const map: Record<SpriteRarity, string> = {
//     Rare: 'bg-blue-600/20 border-blue-400/30 text-blue-400',
//     Epic: 'bg-purple-600/20 border-purple-400/30 text-purple-400',
//     Legendary: 'bg-orange-600/20 border-orange-400/30 text-orange-400',
//     Mythic: 'bg-yellow-600/30 border-yellow-400/40 text-yellow-300',
//     Special: 'bg-fuchsia-600/20 border-fuchsia-400/30 text-fuchsia-300',
//   }
//   return map[rarity] ?? 'bg-slate-800 text-slate-300'
// }

export function getVariantBadgeClass(variant: SpriteVariant): string {
  const map: Record<SpriteVariant, string> = {
    Normal: '!bg-[var(--p-rarity-common)] !text-black/80',
    Gold:
      '!bg-[var(--p-rarity-gold)] !text-white',
    Gummy:
      '!bg-[var(--p-rarity-gummy)] !text-white',
    Galaxy:
      '!bg-[var(--p-rarity-galaxy)] !text-white',
    Gem:
      '!bg-[var(--p-rarity-gem)] !text-white',
    Holofoil:
      '!bg-[var(--p-rarity-holofoil)] !text-white',
  }

  return map[variant] ?? map.Normal
}

export function getRarityBadgeClass(rarity: SpriteRarity): string {
  const map: Record<SpriteRarity, string> = {
    Rare: '!bg-blue-500 !text-white',
    Epic: '!bg-purple-500 !text-white',
    Legendary: '!bg-orange-500 !text-white',
    Mythic: '!bg-yellow-500 !text-white',
    Special: '!bg-fuchsia-500 !text-white',
  }
  return map[rarity] ?? '!bg-slate-500 !text-white'
}

export function getCircleGlowBg(
  rarity: SpriteRarity,
  variant: SpriteVariant = 'Normal',
): string {
  if (rarity === 'Special') {
    const specialVariantMap: Partial<Record<SpriteVariant, string>> = {
      Gold: '!bg-yellow-500 !text-white',
      Gummy: '!bg-pink-500 !text-white',
      Galaxy: '!bg-indigo-500 !text-white',
      Gem: '!bg-yellow-500 !text-white',
      Holofoil: '!bg-cyan-500 !text-white',
    }

    return specialVariantMap[variant] ?? '!bg-fuchsia-500 !text-white'
  }

  const map: Record<SpriteRarity, string> = {
    Rare: '!bg-blue-500 !text-white',
    Epic: '!bg-purple-500 !text-white',
    Legendary: '!bg-orange-500 !text-white',
    Mythic: '!bg-yellow-500 !text-white',
    Special: '!bg-fuchsia-500 !text-white',
  }
  return map[rarity] ?? '!bg-slate-500 !text-white'
}

export function getSpriteColorGradient(
  type: SpriteType,
  variant: SpriteVariant,
): { start: string; end: string } {
  if (variant === 'Gold') return { start: '#fbbf24', end: '#d97706' }
  if (variant === 'Gummy') return { start: '#f472b6', end: '#ec4899' }

  const colors: Partial<Record<SpriteType, { start: string; end: string }>> = {
    Aura: { start: '#c084fc', end: '#db2777' },
    Boss: { start: '#f97316', end: '#b91c1c' },
    Water: { start: '#60a5fa', end: '#2563eb' },
    Earth: { start: '#34d399', end: '#059669' },
    Fire: { start: '#f87171', end: '#dc2626' },
    Fishy: { start: '#22d3ee', end: '#0ea5e9' },
    Duck: { start: '#fbbf24', end: '#eab308' },
    Ghost: { start: '#a78bfa', end: '#7c3aed' },
    Grim: { start: '#64748b', end: '#0f172a' },
    Demon: { start: '#4b5563', end: '#1f2937' },
    King: { start: '#fb7185', end: '#e11d48' },
    Punk: { start: '#2dd4bf', end: '#0d9488' },
    Striker: { start: '#facc15', end: '#f97316' },
    Dream: { start: '#f472b6', end: '#8b5cf6' },
    'Zero Point': { start: '#818cf8', end: '#4f46e5' },
    'The Burnt Peanut': { start: '#b45309', end: '#78350f' },
  }

  return colors[type] ?? { start: '#94a3b8', end: '#475569' }
}

export function getSpritePath(type: SpriteType): string {
  const paths: Partial<Record<SpriteType, string>> = {
    Water: 'M 50 15 Q 75 40 75 70 Q 50 90 25 70 Q 25 40 50 15 Z',
    Fire: 'M 50 15 Q 65 35 60 55 Q 75 60 70 80 Q 50 95 30 80 Q 25 60 40 55 Z',
    Ghost: 'M 50 15 Q 75 15 75 60 Q 75 85 50 90 Q 25 85 25 60 Q 25 15 50 15 Z',
    'Zero Point':
      'M 50 15 A 35 35 0 1 0 50 85 A 35 35 0 1 0 50 15 M 50 25 A 25 25 0 1 1 50 75 A 25 25 0 1 1 50 25',
    Earth: 'M 50 15 Q 85 30 75 65 Q 50 90 25 65 Q 15 30 50 15 Z',
  }
  return paths[type] ?? 'M 50 15 C 80 15 80 85 50 85 C 20 85 20 15 50 15 Z'
}
