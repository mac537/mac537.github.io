<script setup lang="ts">
import { computed } from 'vue'
import type { Sprite } from '@/types/sprite'
import SpriteCard from '@/components/SpriteCard.vue'
// import AppHeader from '@/components/AppHeader.vue'
import { useSprites } from '@/composables/useSprites'
import { useFilters } from '@/composables/useFilters'

const MAX_CAPTURE_COLUMNS = 6

const { filteredSprites } = useFilters()

const captureColumns = computed(() =>
  Math.max(2, Math.min(MAX_CAPTURE_COLUMNS, filteredSprites.value.length))
)

const {
  // sprites,
  // ownedCount,
  // completionPercentage,
  isOwned,
  isMastered
} = useSprites()

const props = defineProps<{
  sprites: Sprite[]
  ownedIds: number[]
  ownedCount: number
  totalCount: number
  completionPercentage: number
}>()

</script>

<template>
  <!-- Área oculta exclusiva para exportar como imagen -->
  <div
    id="capture-area"
    style="
      position: fixed;
      top: 0;
      left: -9999px;
      width: 1200px;
      color: #333333;
      padding: 2rem;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    "
  >
    <div class="grid gap-y-6">
      <!-- <AppHeader
        :owned-count="ownedCount"
        :total-count="sprites.length"
        :completion-percentage="completionPercentage"
        :sprites="sprites"
      /> -->

      <div
        :style="{
          display: 'grid',
          gridTemplateColumns: `repeat(${captureColumns}, minmax(0, 1fr))`,
          gap: '1rem'
        }"
      >
        <SpriteCard
          v-for="s in filteredSprites"
          :key="s.id"
          :sprite="s"
          :owned="isOwned(s.id)"
          :mastered="isMastered(s.id)"
          :exported="true"
        />
      </div>

      <div class="text-xl font-semibold text-gray-500">Generated automatically at https://mac537.github.io</div>
    </div>
  
  </div>
</template>