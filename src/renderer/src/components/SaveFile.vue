<template>
  <a
    class="font-medium text-sm cursor-pointer"
    @click="emitSaveEvent"
  >
    Save
  </a>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

function emitSaveEvent(): void {
  window.dispatchEvent(new CustomEvent('sindri-save-file'))
}

function handleKeydown(event: KeyboardEvent): void {
  const isMac = navigator.platform.toLowerCase().includes('mac')
  const key = event.key.toLowerCase()

  const isSaveCombo =
    (isMac && event.metaKey && key === 's') ||
    (!isMac && event.ctrlKey && key === 's')

  if (isSaveCombo) {
    // Esto bloquea el diálogo nativo de "Guardar página como..."
    event.preventDefault()
    event.stopPropagation()

    emitSaveEvent()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown, { capture: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown, { capture: true })
})
</script>

<style scoped></style>
