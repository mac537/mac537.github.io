<script setup lang="ts">
import type { Sprite } from '@/types/sprite'
import {
  getGlowClass
} from '@/utils/spriteVisuals'

const props = defineProps<{
  sprite: Sprite
  owned: boolean
  mastered: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleOwned'): void
  (e: 'toggleMastered'): void
  (e: 'showPopover', id: number): void
  (e: 'hidePopover'): void
}>()

const cycleCardState = () => {
  emit('toggleOwned')
}

const checkAsMastered = () => {
  emit('toggleMastered')
}

const handleMouseOver = () => {
  emit('showPopover', props.sprite.id)
}

const handleMouseLeave = () => {
  emit('hidePopover')
}

const cardStateClass = () => {
  if (props.owned) {
    return 'ring-2 ring-emerald-400/70 shadow-[0_0_18px_rgba(16,185,129,0.25)]'
  }

  return ''
}
</script>

<template>
  <Card
    :class="[getGlowClass(sprite.rarity, sprite.variant), cardStateClass(), 'relative', 'cursor-pointer']"
    @click="cycleCardState"
    @keydown.enter.prevent="cycleCardState"
    @keydown.space.prevent="cycleCardState"
    @mouseenter="handleMouseOver"
    @mouseleave="handleMouseLeave">
    <template #header>
      <div class="flex justify-between items-start absolute p-2 w-full">
        <Tag v-if="owned" severity="success" value="Collected" class="uppercase" />
        <i
          v-if="owned" 
          class="pi pi-crown text-gray-500"
          :class="{ 'text-yellow-400': mastered }"
          style="font-size: 2rem; font-weight: bold;"
          @click.stop="checkAsMastered"
        />
      </div>
    </template>
    <template #content>
      <img :alt="sprite.name" :src="sprite.image_url" />
    </template>
  </Card>
</template>

<style scoped>
.p-card {
  --p-card-body-padding: 0 10px 10px;
  --p-card-body-gap: 0;
}

:deep(.p-card-content) {
  padding-top: 10px;
}
</style>
