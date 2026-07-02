import { ref, computed } from 'vue'
import type { SpriteFilters } from '@/types/sprite'
import { useSprites } from './useSprites'

const DEFAULT_FILTERS: SpriteFilters = {
  search: '',
  rarity: [],
  variant: [],
  ownedStatus: 'All',
  // sortBy: 'rarity-asc',
  // mastered: false,
}

const filters = ref<SpriteFilters>({ ...DEFAULT_FILTERS })

// const RARITY_WEIGHT: Record<string, number> = {
//   Rare: 1,
//   Epic: 2,
//   Legendary: 3,
//   Mythic: 4,
//   Special: 5,
// }

export function useFilters() {
  const { sprites, ownedIds, masteredIds } = useSprites()

  function resetFilters() {
    filters.value = { ...DEFAULT_FILTERS }
  }

  const filteredSprites = computed(() => {
    let list = [...sprites.value]

    if (filters.value.search) {
      const query = filters.value.search.toLowerCase()
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.type.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query),
      )
    }

    if (filters.value.rarity.length > 0) {
      list = list.filter((s) => filters.value.rarity.includes(s.rarity))
    }

    if (filters.value.variant.length > 0) {
      list = list.filter((s) => filters.value.variant.includes(s.variant))
    }

    if (filters.value.ownedStatus === 'Owned') {
      list = list.filter((s) => ownedIds.value.includes(s.id))
    } else if (filters.value.ownedStatus === 'NotOwned') {
      list = list.filter((s) => !ownedIds.value.includes(s.id))
    } else if (filters.value.ownedStatus === 'Mastered') {
      list = list.filter((s) => masteredIds.value.includes(s.id))
    }

    // if (filters.value.mastered) {
    //   list = list.filter((s) => masteredIds.value.includes(s.id))
    // }

    // if (filters.value.sortBy === 'name-asc') {
    //   list.sort((a, b) => a.name.localeCompare(b.name))
    // } else {
    //   list.sort((a, b) => {
    //     const wA = RARITY_WEIGHT[a.rarity] ?? 0
    //     const wB = RARITY_WEIGHT[b.rarity] ?? 0
    //     return filters.value.sortBy === 'rarity-desc' ? wB - wA : wA - wB
    //   })
    // }

    return list
  })

  return { filters, filteredSprites, resetFilters }
}
