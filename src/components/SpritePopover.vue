<template>
<Popover ref="op">
  <div v-if="currentSprite" class="flex items-center gap-2">
    <img :src="currentSprite.image_url" :alt="currentSprite.name" class="w-16 h-16" />
    <div class="font-bold">{{ currentSprite.name }}</div>
    <Tag :value="currentSprite.rarity" :pt="{ root: { class: getRarityBadgeClass(currentSprite.rarity) } }" />
    <Tag v-if="currentSprite.variant !== 'Normal'" :value="currentSprite.variant" :pt="{ root: { class: getVariantBadgeClass(currentSprite.variant) } }" />
  </div>
</Popover>  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSprites } from '@/composables/useSprites'
import type { Sprite } from '@/types/sprite'
import {
  getRarityBadgeClass,
  getVariantBadgeClass,
} from '@/utils/spriteVisuals'

const { getSpriteById } = useSprites()

const op = ref();
const currentSprite = ref<Sprite | null>(null)

function showPopover(id: number) {
  const sprite = getSpriteById(id)
  if (sprite) {
    // Implement the logic to show the popover for the given sprite
    currentSprite.value = sprite
    op.value.toggle(event);
  }
}

function hidePopover() {
  // Implement the logic to hide the popover
  currentSprite.value = null
  op.value.hide();
}

defineExpose({
  showPopover,
  hidePopover
})
</script>