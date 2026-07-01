<script setup lang="ts">
import Select from 'primevue/select'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
// import Search from '@primeicons/vue/search';

import type { SpriteFilters, SpriteVariant } from '@/types/sprite'

const selectPt = {
  root: { class: 'w-full bg-black/40 border border-white/10 rounded-xl text-sm text-white' },
  label: { class: 'text-sm text-white' },
  dropdown: { class: 'text-slate-300' },
  overlay: { class: 'bg-slate-900 border border-white/10 rounded-xl' },
  option: { class: 'text-sm text-slate-100' },
}

const variantOptions: Array<{ label: string; value: 'All' | SpriteVariant }> = [
  { label: 'All', value: 'All' },
  { label: 'Normal', value: 'Normal' },
  { label: 'Gold', value: 'Gold' },
  { label: 'Gummy', value: 'Gummy' },
  { label: 'Galaxy', value: 'Galaxy' },
  { label: 'Gem', value: 'Gem' },
  { label: 'Holofoil', value: 'Holofoil' },
]

const ownedStatusOptions: Array<{ label: string; value: SpriteFilters['ownedStatus'] }> = [
  { label: 'All', value: 'All' },
  { label: 'Owned', value: 'Owned' },
  { label: 'Not Owned', value: 'NotOwned' },
  { label: 'Mastered', value: 'Mastered' },
]

const rarityOptions: Array<{ label: string; value: SpriteFilters['rarity'] }> = [
  { label: 'All', value: 'All' },
  { label: 'Rare', value: 'Rare' },
  { label: 'Epic', value: 'Epic' },
  { label: 'Legendary', value: 'Legendary' },
  { label: 'Mythic', value: 'Mythic' },
  { label: 'Special', value: 'Special' },
]

const props = defineProps<{
  modelValue: SpriteFilters
}>()

const emit = defineEmits<{
  'update:modelValue': [value: SpriteFilters]
}>()

function handleVariantChange(newVariant: SpriteFilters['variant']) {
  console.log('Variant changed to:', newVariant)
  if (!newVariant) {
    newVariant = 'All'
  }
  const updatedFilters = { ...props.modelValue, variant: newVariant }
  if (newVariant === 'All') {
    updatedFilters.variant = 'All'
  }
  emit('update:modelValue', updatedFilters)
  // $emit('update:modelValue', { ...modelValue, variant: $event as 'All' | SpriteVariant })
}

function handleOwnedStatusChange(newOwnedStatus: SpriteFilters['ownedStatus']) {
  console.log('Owned status changed to:', newOwnedStatus)
  if (!newOwnedStatus) {
    newOwnedStatus = 'All'
  }
  const updatedFilters = { ...props.modelValue, ownedStatus: newOwnedStatus }
  if (newOwnedStatus === 'All') {
    updatedFilters.ownedStatus = 'All'
  }
  emit('update:modelValue', updatedFilters)
}

function handleRarityChange(newRarity: SpriteFilters['rarity']) {
  console.log('Rarity changed to:', newRarity)
  if (!newRarity) {
    newRarity = 'All'
  }
  const updatedFilters = { ...props.modelValue, rarity: newRarity }
  if (newRarity === 'All') {
    updatedFilters.rarity = 'All'
  }
  emit('update:modelValue', updatedFilters)
}
</script>

<template>
  <Card class="bg-slate-900/40">
    <template #content>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <!-- Búsqueda por texto -->
      <div class="relative w-full">
        <!-- <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <i class="pi pi-search text-slate-500"></i>
        </span> -->
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            :value="modelValue.search"
            @input="$emit('update:modelValue', { ...modelValue, search: ($event.target as HTMLInputElement).value })"
            placeholder="Search by name or type"
            class="w-full"
            showClear
          />
          <InputIcon v-if="modelValue.search" class="pi pi-times cursor-pointer" @click="modelValue.search = ''" />
        </IconField>
        <!-- <button
          v-if="modelValue.search"
          @click="$emit('update:modelValue', { ...modelValue, search: '' })"
          class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white cursor-pointer"
        >
          <i class="pi pi-times"></i>
        </button> -->
      </div>

      <!-- <div class="flex justify-center items-center gap-2">
        <ToggleSwitch v-model="modelValue.mastered" inputId="mode" />
        <label for="mode">Mastered</label>
      </div> -->

      <!-- Quick rarity buttons -->
      <!-- <div class="w-full lg:w-auto">
        <SelectButton
          class="w-full"
          :model-value="modelValue.rarity"
          :options="rarityOptions"
          option-label="label"
          option-value="value"
          @update:model-value="$emit('update:modelValue', { ...modelValue, rarity: $event as SpriteFilters['rarity'] })"
        />
      </div> -->
    </div>

    <!-- Secondary filters -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/40">
      <div>
        <!-- <label class="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
          Variante de Espíritu
        </label> -->
        <IftaLabel class="w-full">
          <Select
            :model-value="modelValue.variant"
            :options="variantOptions"
            option-label="label"
            option-value="value"
            :pt="selectPt"
            :showClear="modelValue.variant !== 'All'"
            @update:model-value="handleVariantChange"
          />
          <label for="over_label">Variant</label>
        </IftaLabel>
      </div>

      <div>
        <!-- <label class="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
          Filtro de Tu Inventario
        </label> -->
        <IftaLabel class="w-full">
          <Select
            :model-value="modelValue.ownedStatus"
            :options="ownedStatusOptions"
            option-label="label"
            option-value="value"
            :pt="selectPt"
            :showClear="modelValue.ownedStatus !== 'All'"
            @update:model-value="handleOwnedStatusChange"
          />
          <label for="over_label">Inventory</label>
        </IftaLabel>
      </div>

      <div>
        <!-- <label class="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
          Ordenar por
        </label> -->
        <IftaLabel class="w-full">
          <Select
            :model-value="modelValue.rarity"
            :options="rarityOptions"
            option-label="label"
            option-value="value"
            :pt="selectPt"
            :showClear="modelValue.rarity !== 'All'"
            @update:model-value="handleRarityChange"
          />
          <label for="over_label">Rarity</label>
        </IftaLabel>
      </div>
    </div>
    </template>
  </Card>
</template>

<style scoped>

.p-card {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}

:deep(.rarity-select .p-togglebutton) {
  text-transform: uppercase;
  border-color: transparent;
}

/* Todos */
:deep(.rarity-select .p-togglebutton:nth-child(1)) {
  background: rgb(15 23 42 / 0.5);
  color: rgb(148 163 184);
}

/* Rare */
:deep(.rarity-select .p-togglebutton:nth-child(2)) {
  background: rgb(15 23 42 / 0.5);
  color: rgb(96 165 250 / 0.9);
}

/* Epic */
:deep(.rarity-select .p-togglebutton:nth-child(3)) {
  background: rgb(15 23 42 / 0.5);
  color: rgb(192 132 252 / 0.9);
}

/* Legendary */
:deep(.rarity-select .p-togglebutton:nth-child(4)) {
  background: rgb(15 23 42 / 0.5);
  color: rgb(251 146 60 / 0.9);
}

/* Mythic */
:deep(.rarity-select .p-togglebutton:nth-child(5)) {
  background: rgb(15 23 42 / 0.5);
  color: rgb(250 204 21 / 0.9);
}

/* Special */
:deep(.rarity-select .p-togglebutton:nth-child(6)) {
  background: rgb(15 23 42 / 0.5);
  color: rgb(232 121 249 / 0.9);
}
</style>
