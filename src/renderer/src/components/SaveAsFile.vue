<template>
  <a
    class="font-medium text-sm cursor-pointer"
    @click="emitSaveAsEvent"
  >
    Save as
  </a>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const lastFile = ref<SindriFilePayload | null>(null)

function emitSaveAsEvent(): void {
  window.dispatchEvent(new CustomEvent('sindri-save-as-file'))
}

function handleFileSaved(payload: SindriFilePayload): void {
  lastFile.value = payload
  // Reemite un evento global para que otras partes de la app puedan reaccionar de forma desacoplada
  window.dispatchEvent(new CustomEvent('sindri-file-saved', { detail: payload }))
}

onMounted(() => {
  if (window?.sindriFiles?.onFileSaved) {
    window.sindriFiles.onFileSaved(handleFileSaved)
  }
})

onUnmounted(() => {
  // No hay remove para onFileSaved porque internamente limpiamos listeners antes de añadir
})
</script>

<style scoped></style>
