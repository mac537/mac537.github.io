<script setup lang="ts">
defineProps<{
  copiedLink: boolean
  isExporting: boolean
}>()

defineEmits<{
  copyShareLink: []
  exportAsImage: []
  exportForDiscord: []
  openDiscordModal: []
  clearSelection: []
}>()
</script>

<template>
  <Card>
    <template #title>
      <div class="flex justify-between items-center flex-wrap gap-4">
        <h2 class="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
          <img src="@/assets/sprite.webp" alt="Sprite" class="w-8 h-8" />
          <span>Share Your Collection</span>
        </h2>
        <Button
          label="Clear Selection"
          severity="danger"
          icon="pi pi-undo"
          @click="$emit('clearSelection')"
        />
      </div>
    </template>
    <template #subtitle>
      <p class="text-white">Generate an instant link or download an image of your progress. The link encodes your inventory dynamically: no databases or registrations required!</p>
    </template>
    <template #footer>
      <div class="flex flex-col sm:flex-row gap-3">
        <Button size="large" :label="copiedLink ? 'Link Copied!' : 'Copy Collection Link'" :icon="copiedLink ? 'pi pi-check' : 'pi pi-link'" @click="$emit('copyShareLink')" severity="warn" />
        <Button size="large" :label="isExporting ? 'Generating Image...' : 'Export as Image'" :icon="isExporting ? 'pi pi-spin pi-spinner' : 'pi pi-image'" @click="$emit('exportAsImage')" severity="help" />
        <Button size="large" label="Export for Discord" icon="pi pi-discord" @click="$emit('exportForDiscord')" severity="info" />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.p-card {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}
.p-card span {
  font-size: 1.6rem;
}
</style>