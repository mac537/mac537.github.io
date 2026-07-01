<script setup lang="ts">
import { watch } from 'vue'
import type { ToastState } from '@/types/sprite'
import { useToast } from 'primevue/usetoast';
const toast = useToast();

defineProps<{
  toast: ToastState
}>()

</script>

<template>
  <Toast />
</template>
