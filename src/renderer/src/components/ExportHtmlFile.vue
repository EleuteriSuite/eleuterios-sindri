<template>
  <a
    class="font-medium text-sm cursor-pointer"
    @click="emitExportHtmlEvent"
  >
    Export HTML
  </a>
</template>

<script setup lang="ts">
function emitExportHtmlEvent(): void {
  window.dispatchEvent(new CustomEvent('sindri-export-html'))
}
</script>

<style scoped></style>
