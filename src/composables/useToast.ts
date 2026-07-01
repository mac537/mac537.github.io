import { ref } from 'vue'
import type { ToastState } from '@/types/sprite'

// Singleton a nivel de módulo para que todos los composables compartan el mismo toast
const toast = ref<ToastState>({ show: false, title: '', msg: '', icon: 'pi-check' })
let toastTimer: ReturnType<typeof setTimeout> | null = null

export function useToast() {
  const showToast = (title: string, msg: string, icon = 'pi-check') => {
    if (toastTimer) clearTimeout(toastTimer)
    toast.value = { show: true, title, msg, icon }
    toastTimer = setTimeout(() => {
      toast.value.show = false
    }, 3000)
  }

  return { toast, showToast }
}
