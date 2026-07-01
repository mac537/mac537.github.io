<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import SpriteCard from '@/components/SpriteCard.vue'
import SpritePopover from '@/components/SpritePopover.vue'
import SpriteFiltersBar from '@/components/SpriteFiltersBar.vue'
import SharingPanel from '@/components/SharingPanel.vue'
import CaptureArea from '@/components/CaptureArea.vue'
import type { SpriteFilters } from '@/types/sprite'
import { useSprites } from '@/composables/useSprites'
import { useFilters } from '@/composables/useFilters'
import { useSharing } from '@/composables/useSharing'
// import { useSharing } from '@/composables/useSharing'
// import DiscordModal from '@/components/DiscordModal.vue'

// import type { ToastState } from '@/types/sprite'


const { filters, filteredSprites } = useFilters()

const {
  copiedLink,
  isExporting,
  copyShareLink,
  toggleDiscordModal,
  exportDiscordTable,
  exportAsImage,
} = useSharing(filters)

const {
  sprites,
  ownedIds,
  ownedCount,
  completionPercentage,
  isOwned,
  isMastered,
  inWishlist,
  toggleOwned,
  toggleMastered,
  clearSelection,
  initFromStorage,
} = useSprites()

const rarityValues: Array<SpriteFilters['rarity']> = [
  'All',
  'Rare',
  'Epic',
  'Legendary',
  'Mythic',
  'Special',
]

const variantValues: Array<SpriteFilters['variant']> = [
  'All',
  'Normal',
  'Gold',
  'Gummy',
  'Galaxy',
  'Gem',
  'Holofoil',
]

const ownedStatusValues: Array<SpriteFilters['ownedStatus']> = [
  'All',
  'Owned',
  'NotOwned',
  'Mastered',
]

const spritePopoverRef = ref<InstanceType<typeof SpritePopover> | null>(null)

// watch(() => isExporting, (newVal) => {
//   debugger
//   if (newVal) {
//     toast.value = {
//       message: 'Exporting image...',
//       type: 'info',
//       duration: 3000,
//     }
//   } else {
//     toast.value = {
//       message: 'Image exported successfully!',
//       type: 'success',
//       duration: 3000,
//     }
//   }
// }, { immediate: true })

function handleShowPopover(id: number) {
  if (spritePopoverRef.value) {
    spritePopoverRef.value.showPopover(id)
  }
}

function handleHidePopover() {
  if (spritePopoverRef.value) {
    spritePopoverRef.value.hidePopover()
  }
}

function initFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const search = params.get('search')
  const rarity = params.get('rarity')
  const variant = params.get('variant')
  const ownedStatus = params.get('ownedStatus')

  if (search !== null) {
    filters.value.search = search
  }

  if (rarity && rarityValues.includes(rarity as SpriteFilters['rarity'])) {
    filters.value.rarity = rarity as SpriteFilters['rarity']
  }

  if (variant && variantValues.includes(variant as SpriteFilters['variant'])) {
    filters.value.variant = variant as SpriteFilters['variant']
  }

  if (ownedStatus && ownedStatusValues.includes(ownedStatus as SpriteFilters['ownedStatus'])) {
    filters.value.ownedStatus = ownedStatus as SpriteFilters['ownedStatus']
  }
}

onMounted(() => {
  initFromStorage()
  initFiltersFromUrl()
})
</script>

<template>
  <div class="grid gap-y-6">
    <AppHeader
      :owned-count="ownedCount"
      :total-count="sprites.length"
      :completion-percentage="completionPercentage"
      :sprites="sprites"
    />
    <SpriteFiltersBar v-model="filters" @clear-selection="clearSelection" />
    <SharingPanel
      :copied-link="copiedLink"
      :is-exporting="isExporting"
      @copy-share-link="copyShareLink"
      @export-as-image="exportAsImage"
      @export-for-discord="exportDiscordTable"
      @open-discord-modal="toggleDiscordModal"
    />
    <main
      v-if="filteredSprites.length > 0"
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2"
    >
      <SpriteCard
        v-for="s in filteredSprites"
        :key="s.id"
        :sprite="s"
        :owned="isOwned(s.id)"
        :mastered="isMastered(s.id)"
        :wishlisted="inWishlist(s.id)"
        @toggle-owned="toggleOwned(s.id)"
        @toggle-mastered="toggleMastered(s.id)"
        @show-popover="handleShowPopover(s.id)"
        @hide-popover="handleHidePopover"
      />
    </main>
  </div>
  <SpritePopover ref="spritePopoverRef" />

  <CaptureArea
    :sprites="sprites"
    :owned-ids="ownedIds"
    :owned-count="ownedCount"
    :total-count="sprites.length"
    :completion-percentage="completionPercentage"
  />

  <!-- TOAST -->
  <Toast position="bottom-right" mode="stacked" />
</template>
