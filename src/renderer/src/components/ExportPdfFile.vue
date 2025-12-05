<template>
  <a
    class="font-medium text-sm cursor-pointer"
    @click="emitExportPdfEvent"
  >
    Export PDF
  </a>
</template>

<script setup lang="ts">
function emitExportPdfEvent(): void {
  window.dispatchEvent(new CustomEvent('sindri-export-pdf'))
}
</script>

<style scoped></style>
