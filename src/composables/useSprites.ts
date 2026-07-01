import { ref, computed } from 'vue'
import type { Sprite, SpriteRarity, SpriteType, SpriteVariant } from '@/types/sprite'
import spritesDataJson from '@/data/sprites.json'
// import { useToast } from './useToast'
import { useToast } from 'primevue/usetoast';

type RawSprite = Omit<Sprite, 'price' | 'image_url'> & { image_url: string }

const spriteImageModules = import.meta.glob('/src/assets/sprites/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolveImageUrl(imageUrl: string): string {
  const fileName = imageUrl.split('/').pop()
  if (!fileName) return imageUrl

  const resolved = spriteImageModules[`/src/assets/sprites/${fileName}`]
  return resolved ?? imageUrl
}

function getSpritePrice(rarity: SpriteRarity, type: SpriteType, variant: SpriteVariant): number {
  if (rarity === 'Mythic') return 7500

  if (rarity === 'Special') {
    if (type === 'Water' || type === 'Earth' || type === 'Fire') return 4000
    if (type === 'Duck' || type === 'Ghost' || type === 'Demon') return 6000
    if (type === 'King' || type === 'Punk' || type === 'Dream') return 10000
    return 7500
  }

  if (rarity === 'Rare') {
    return variant === 'Normal' ? 100 : 4000
  }

  if (rarity === 'Epic') {
    return variant === 'Normal' ? 3000 : 6000
  }

  return variant === 'Normal' ? 5000 : 10000
}

const SPRITES_DATA: Sprite[] = (spritesDataJson as RawSprite[]).map((sprite) => ({
  ...sprite,
  image_url: resolveImageUrl(sprite.image_url),
  price: getSpritePrice(sprite.rarity, sprite.type, sprite.variant),
}))

// Estado singleton a nivel de módulo
const sprites = ref<Sprite[]>(SPRITES_DATA)
const ownedIds = ref<number[]>([])
const masteredIds = ref<number[]>([])
const wishlistIds = ref<number[]>([])

function persistOwned() {
  localStorage.setItem('fortnite-sprites-owned', JSON.stringify(ownedIds.value))
}

function persistMastered() {
  localStorage.setItem('fortnite-sprites-mastered', JSON.stringify(masteredIds.value))
}

export function useSprites() {
  // const { showToast } = useToast()
  const toast = useToast();

  const ownedCount = computed(() => ownedIds.value.length)

  const completionPercentage = computed(() => {
    if (sprites.value.length === 0) return 0
    return Math.round((ownedCount.value / sprites.value.length) * 100)
  })

  const totalSpriteDust = computed(() =>
    sprites.value
      .filter((s) => ownedIds.value.includes(s.id))
      .reduce((total, s) => total + s.price, 0),
  )

  const isOwned = (id: number) => ownedIds.value.includes(id)
  const isMastered = (id: number) => masteredIds.value.includes(id)
  const inWishlist = (id: number) => wishlistIds.value.includes(id)

  const toggleOwned = (id: number) => {
    const idx = ownedIds.value.indexOf(id)
    if (idx > -1) {
      ownedIds.value.splice(idx, 1)
      toast.add({
        summary: 'Sprite Archived',
        detail: 'The sprite has been removed from your inventory.',
        severity: 'success',
        icon: 'pi pi-info-circle',
        // icon: markRaw({
        //     render: () => h(Spinner, { spin: true })
        // }),
        life: 3000
      });
      // showToast('Sprite Archived', 'The sprite has been removed from your inventory.', 'pi-info-circle')
    } else {
      ownedIds.value.push(id)
      const wishIdx = wishlistIds.value.indexOf(id)
      if (wishIdx > -1) wishlistIds.value.splice(wishIdx, 1)
      toast.add({
        summary: 'Sprite Extracted!',
        detail: 'It has been successfully added to your collection.',
        severity: 'success',
        icon: 'pi pi-check-circle',
        life: 3000
      });
    }
    persistOwned()
    // persistWishlist()
  }

  const toggleMastered = (id: number) => {
    const idx = masteredIds.value.indexOf(id)
    if (idx > -1) {
      masteredIds.value.splice(idx, 1)
      toast.add({ summary: 'Sprite Unmastered', detail: 'The sprite has been removed from your mastered collection.', severity: 'success', icon: 'pi pi-crown', life: 3000 });
    } else {
      masteredIds.value.push(id)
      // const wishIdx = wishlistIds.value.indexOf(id)
      // if (wishIdx > -1) wishlistIds.value.splice(wishIdx, 1)
      toast.add({ summary: 'Sprite Mastered!', detail: 'It has been successfully added to your mastered collection.', severity: 'success', icon: 'pi pi-crown', life: 3000 });
    }
    persistMastered()
  }

  const getSpriteById = (id: number): Sprite | undefined => {
    return sprites.value.find((sprite) => sprite.id === id)
  }

  const initFromStorage = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const sharedOwned = urlParams.get('owned')
    const sharedMastered = urlParams.get('mastered')

    if (sharedOwned || sharedMastered) {
      if (sharedOwned) ownedIds.value = sharedOwned.split('.').map(Number).filter((n) => !isNaN(n))
      if (sharedMastered) masteredIds.value = sharedMastered.split('.').map(Number).filter((n) => !isNaN(n))
      toast.add({ summary: 'Collection Loaded', detail: 'You are viewing a configuration shared via URL.', severity: 'info', life: 3000 });
    } else {
      const savedOwned = localStorage.getItem('fortnite-sprites-owned')
      const savedMastered = localStorage.getItem('fortnite-sprites-mastered')
      if (savedOwned) ownedIds.value = JSON.parse(savedOwned)
      if (savedMastered) masteredIds.value = JSON.parse(savedMastered)
    }
  }

  return {
    sprites,
    ownedIds,
    masteredIds,
    wishlistIds,
    ownedCount,
    completionPercentage,
    totalSpriteDust,
    isOwned,
    isMastered,
    inWishlist,
    toggleOwned,
    toggleMastered,
    initFromStorage,
    getSpriteById
  }
}
