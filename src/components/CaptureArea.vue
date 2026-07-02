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
      /* background-color: #0c0d14; */
      color: #333333;
      padding: 2rem;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    "
  >
    <!-- Cabecera de la tarjeta exportable -->
    <!-- <div class="flex items-center justify-between border-b pb-6 mb-6" style="border-bottom-color: rgba(255, 255, 255, 0.1)">
      <div>
        <p class="text-4xl tracking-widest uppercase" style="color: #94a3b8">
          Sprite Tracker
        </p>
      </div>
      <div class="text-right">
        <div class="text-4xl uppercase font-bold" style="color: #94a3b8">Progress</div>
        <div class="text-2xl font-black" style="color: #34d399">{{ completionPercentage }}% Completed</div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 mb-6">
      <div
        class="border p-4 rounded-xl text-center"
        style="background-color: rgba(0, 0, 0, 0.4); border-color: rgba(255, 255, 255, 0.05)"
      >
        <span class="block text-2xl uppercase font-semibold" style="color: #94a3b8">Extracted</span>
        <span class="text-4xl font-bold" style="color: #34d399">{{ ownedCount }} / {{ totalCount }}</span>
      </div>
    </div> -->
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
      <!-- <div class="flex items-center text-xl">Generated automatically at <a class="ml-1" href="https://mac537.github.io/" target="_blank" rel="noopener noreferrer">https://mac537.github.io/</a></div> -->
    </div>
  
  </div>
</template>