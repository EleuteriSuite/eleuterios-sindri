<template>
  <div
    class="w-full text-center inline-block rounded border-1 border-primary hover:border-secondary p-2 font-medium shadow-sm transition-colors text-center cursor-pointer"
  >

    <div>
      <span v-html="type" />
    </div>
    <div>
      <img v-if="category === 'marketing'" :src="`/src/assets/sindri/blocks/${category}/sindri${category}${type}.jpg`">
    </div>
  </div>
</template>
<script setup lang="ts">
const { category = 'marketing', type = 'hero'} = defineProps<{
    category: 'marketing' | 'ui',
    type: 'hero' | 'test'
  }>()
</script>
