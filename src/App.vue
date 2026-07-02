<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import SpriteCard from '@/components/SpriteCard.vue'
import SpritePopover from '@/components/SpritePopover.vue'
import SpriteFiltersBar from '@/components/SpriteFiltersBar.vue'
import SharingPanel from '@/components/SharingPanel.vue'
import CaptureArea from '@/components/CaptureArea.vue'
import { useSprites } from '@/composables/useSprites'
import { useFilters } from '@/composables/useFilters'
import { useSharing } from '@/composables/useSharing'
import { isOwnedStatus, isSpriteRarity, isSpriteVariant } from '@/constants/spriteFilters'
// import { useSharing } from '@/composables/useSharing'
// import DiscordModal from '@/components/DiscordModal.vue'

// import type { ToastState } from '@/types/sprite'
const { filters, filteredSprites, resetFilters } = useFilters()

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

  if (rarity) {
    const parsed = rarity.split('.').filter(isSpriteRarity)
    if (parsed.length > 0) filters.value.rarity = parsed
  }

  if (variant) {
    const parsed = variant.split('.').filter(isSpriteVariant)
    if (parsed.length > 0) filters.value.variant = parsed
  }

  if (ownedStatus && isOwnedStatus(ownedStatus)) {
    filters.value.ownedStatus = ownedStatus
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
    <SpriteFiltersBar v-model="filters" @reset-filters="resetFilters" />
    <SharingPanel
      :copied-link="copiedLink"
      :is-exporting="isExporting"
      @copy-share-link="copyShareLink"
      @export-as-image="exportAsImage"
      @export-for-discord="exportDiscordTable"
      @open-discord-modal="toggleDiscordModal"
      @clear-selection="clearSelection"
    />
    <main
      v-if="filteredSprites.length > 0"
      class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2"
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
