<script setup lang="ts">
import { computed } from 'vue'

import Checkbox from 'primevue/checkbox'
import Select from 'primevue/select'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'

import type { SpriteFilters, SpriteRarity, SpriteVariant } from '@/types/sprite'
import { OWNED_STATUS_OPTIONS, RARITY_OPTIONS, VARIANT_OPTIONS } from '@/constants/spriteFilters'

const selectPt = {
  root: { class: 'w-full bg-black/40 border border-white/10 rounded-xl text-sm text-white' },
  label: { class: 'text-sm text-white' },
  dropdown: { class: 'text-slate-300' },
  overlay: { class: 'bg-slate-900 border border-white/10 rounded-xl' },
  option: { class: 'text-sm text-slate-100' },
}

const props = defineProps<{
  modelValue: SpriteFilters
}>()

const emit = defineEmits<{
  'update:modelValue': [value: SpriteFilters]
  'resetFilters': []
}>()

const allVariantValues = VARIANT_OPTIONS.map((option) => option.value)
const allRarityValues = RARITY_OPTIONS.map((option) => option.value)

const allVariantsSelected = computed(() => props.modelValue.variant.length === allVariantValues.length)
const variantIndeterminate = computed(() => props.modelValue.variant.length > 0 && !allVariantsSelected.value)

const allRaritiesSelected = computed(() => props.modelValue.rarity.length === allRarityValues.length)
const rarityIndeterminate = computed(() => props.modelValue.rarity.length > 0 && !allRaritiesSelected.value)

function handleVariantChange(newVariant: SpriteVariant[] | null) {
  emit('update:modelValue', { ...props.modelValue, variant: newVariant ?? [] })
}

function handleOwnedStatusChange(newOwnedStatus: SpriteFilters['ownedStatus'] | null) {
  emit('update:modelValue', { ...props.modelValue, ownedStatus: newOwnedStatus ?? 'All' })
}

function handleRarityChange(newRarity: SpriteRarity[] | null) {
  emit('update:modelValue', { ...props.modelValue, rarity: newRarity ?? [] })
}

function toggleAllVariants(checked: boolean | undefined) {
  handleVariantChange(checked ? [...allVariantValues] : [])
}

function toggleAllRarities(checked: boolean | undefined) {
  handleRarityChange(checked ? [...allRarityValues] : [])
}

function clearSearch() {
  emit('update:modelValue', { ...props.modelValue, search: '' })
}
</script>

<template>
  <Card class="bg-slate-900/40">
    <template #content>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <!-- Búsqueda por texto -->
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          :value="modelValue.search"
          @input="$emit('update:modelValue', { ...modelValue, search: ($event.target as HTMLInputElement).value })"
          placeholder="Search by name or type"
          class="w-full"
          showClear
        />
        <InputIcon v-if="modelValue.search" class="pi pi-times cursor-pointer" @click="clearSearch" />
      </IconField>
      <div class="flex justify-end sm:col-start-2 md:col-start-3">
        <Button
          label="Reset Filters" severity="danger" icon="pi pi-undo" @click="$emit('resetFilters')"
        />
      </div>
    </div>

    <!-- Secondary filters -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/40">
      <IftaLabel class="w-full">
        <Select
          :model-value="modelValue.ownedStatus"
          :options="OWNED_STATUS_OPTIONS"
          option-label="label"
          option-value="value"
          :pt="selectPt"
          :showClear="modelValue.ownedStatus !== 'All'"
          @update:model-value="handleOwnedStatusChange"
        />
        <label for="over_label">Inventory</label>
      </IftaLabel>
      <IftaLabel class="w-full">
        <Select
          :model-value="modelValue.variant"
          :options="VARIANT_OPTIONS"
          option-label="label"
          option-value="value"
          multiple
          :pt="selectPt"
          :showClear="modelValue.variant.length > 0"
          placeholder="All"
          @update:model-value="handleVariantChange"
        >
          <template #header>
            <div class="p-2 border-b border-white/10">
              <Checkbox
                :modelValue="allVariantsSelected"
                binary
                :indeterminate="variantIndeterminate"
                @update:modelValue="toggleAllVariants"
                label="Select All"
                class="ml-1.5"
              />
            </div>
          </template>
          <template #option="slotProps">
            <div class="flex items-center gap-2">
              <Checkbox :modelValue="slotProps.selected" binary readonly />
              <span>{{ slotProps.option.label }}</span>
            </div>
          </template>
        </Select>
        <label for="over_label">Variant</label>
      </IftaLabel>
      <IftaLabel class="w-full">
        <Select
          :model-value="modelValue.rarity"
          :options="RARITY_OPTIONS"
          option-label="label"
          option-value="value"
          multiple
          :pt="selectPt"
          :showClear="modelValue.rarity.length > 0"
          placeholder="All"
          @update:model-value="handleRarityChange"
        >
          <template #header>
            <div class="p-2 border-b border-white/10">
              <Checkbox
                :modelValue="allRaritiesSelected"
                binary
                :indeterminate="rarityIndeterminate"
                @update:modelValue="toggleAllRarities"
                label="Select All"
                class="ml-1.5"
              />
            </div>
          </template>
          <template #option="slotProps">
            <div class="flex items-center gap-2">
              <Checkbox :modelValue="slotProps.selected" binary readonly />
              <span>{{ slotProps.option.label }}</span>
            </div>
          </template>
        </Select>
        <label for="over_label">Rarity</label>
      </IftaLabel>
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
