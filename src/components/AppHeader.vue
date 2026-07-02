<script setup lang="ts">
import { ref, watchEffect } from "vue";
import NormalSpriteIcon from "@/assets/normal.svg";
import GoldSpriteIcon from "@/assets/gold.svg";
import GummySpriteIcon from "@/assets/gummy.svg";
import GalaxySpriteIcon from "@/assets/galaxy.svg";
import { useSprites } from '@/composables/useSprites'

const {
  sprites,
  ownedIds
} = useSprites()

type TrackedVariant = 'Normal' | 'Gold' | 'Gummy' | 'Galaxy';

const cards = ref([
  { label: 'Normal', color: '#3795F5', value: 0, displayValue: 0, variant: NormalSpriteIcon },
  { label: 'Gold', color: '#e2ac08', value: 0, displayValue: 0, variant: GoldSpriteIcon, class: 'glow-special-gold' },
  { label: 'Gummy', color: '#ff5762', value: 0, displayValue: 0, variant: GummySpriteIcon, class: 'glow-special-gummy' },
  { label: 'Galaxy', color: '#7c4eca', value: 0, displayValue: 0, variant: GalaxySpriteIcon, class: 'glow-special-galaxy' }
]);
defineProps<{
  ownedCount: number
  totalCount: number
  completionPercentage: number
}>()

watchEffect(() => {
  const totalSprites = sprites.value.length;

  cards.value.forEach((card) => {
    const variantSprites = sprites.value.filter((sprite) => sprite.variant === card.label as TrackedVariant);
    const ownedVariantSprites = variantSprites.filter((sprite) => ownedIds.value.includes(sprite.id));
    const variantCompletion = variantSprites.length > 0
      ? (ownedVariantSprites.length / variantSprites.length) * 100
      : 0;
    const weightedContribution = totalSprites > 0
      ? (ownedVariantSprites.length / totalSprites) * 100
      : 0;

    card.displayValue = Number(variantCompletion.toFixed(2));
    card.value = Number(weightedContribution.toFixed(2));
  });
});

</script>

<template>
  <Fieldset>
    <template #legend>
        <div class="flex items-center pl-2">
            <img src="@/assets/portable_extractor.webp" alt="Portable Extractor" class="w-12 h-12" />
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-pink-400 uppercase">
              Sprite Tracker
            </h1>
        </div>
    </template>
    <MeterGroup :value="cards" labelPosition="start" :max="100">
      <template #label="{ value }">
        <div class="flex flex-wrap gap-4">
          <template v-for="val of value" :key="val.label">
            <Card class="flex-1 border border-surface shadow-none" :class="val.class">
              <template #content>
                <div class="flex justify-between gap-8">
                  <div class="flex flex-col gap-1">
                    <span class="text-white text-md">{{ val.label }}</span>
                    <span class="font-bold text-lg">{{ val.displayValue }}%</span>
                  </div>
                  <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center bg-white">
                    <img :src="val.variant" :alt="val.label" class="w-5 h-5" />
                  </span>
                </div>
              </template>
            </Card>
          </template>
        </div>
      </template>
      <template #meter="slotProps">
        <span :class="slotProps.class" :style="{ background: slotProps.value.color, width: slotProps.size }" />
      </template>
      <template #start="{ totalPercent }">
        <div class="flex justify-between mt-4 mb-2 relative">
          <span>Completion {{ ownedCount }}/{{ totalCount }} ({{totalPercent}}%)</span>
          <span class="font-medium">100%</span>
        </div>
      </template>
    </MeterGroup>
  </Fieldset>
</template>