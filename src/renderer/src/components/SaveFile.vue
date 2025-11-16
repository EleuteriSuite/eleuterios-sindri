<template>
  <a
    class="font-medium text-sm cursor-pointer"
    @click="emitSaveEvent"
  >
    Guardar
  </a>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

function emitSaveEvent(): void {
  window.dispatchEvent(new CustomEvent('sindri-save-file'))
}

onMounted(() => {
  // SaveFile no escucha el guardado ya que se sobrentiende que lo hace SaveAsFile
})

onUnmounted(() => {
  // No hay remove para onFileSaved porque internamente limpiamos listeners antes de añadir
})
</script>

<style scoped></style>
