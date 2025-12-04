<template>
  <div
    class="inline-block rounded border-1 border-primary hover:border-secondary p-2 font-medium shadow-sm transition-colors text-center cursor-pointer"
  >
    <img :src="`/src/assets/sindri/blocks/${category}/${type}.jpg`">
  </div>
</template>
<script setup lang="ts">
const { category = 'marketing', type = 'hero'} = defineProps<{
    category: 'marketing' | 'ui',
    type: 'hero' | 'test'
  }>()
</script>
