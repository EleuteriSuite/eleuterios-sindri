<template>
  <a
    class="font-medium text-sm cursor-pointer"
    @click="emitOpenEvent"
  >
    Open
  </a>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const lastFile = ref<SindriFilePayload | null>(null)

function emitOpenEvent(): void {
  window.dispatchEvent(new CustomEvent('sindri-open-file'))
}

function handleFileContent(payload: SindriFilePayload): void {
  lastFile.value = payload
  // Reemite un evento global para que otras partes de la app puedan reaccionar de forma desacoplada
  window.dispatchEvent(new CustomEvent('sindri-file-opened', { detail: payload }))
}

onMounted(() => {
  if (window?.sindriFiles?.onFileContent) {
    window.sindriFiles.onFileContent(handleFileContent)
  }
})

onUnmounted(() => {
  // No hay remove para onFileContent porque internamente limpiamos listeners antes de añadir
})
</script>

<style scoped></style>
