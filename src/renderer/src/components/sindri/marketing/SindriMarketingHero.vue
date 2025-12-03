<template>
  <div>
    <h1 class="text-4xl font-bold">Sindri Marketing Hero</h1>
    Title: <input v-model="config.title.description" type="text" />
  </div>
</template>

<script setup lang="ts">

import {
  SindriMarketingHero
} from '@renderer/components/sindri/marketing/sindri_marketring'
import { onMounted } from 'vue'

const config = defineModel<SindriMarketingHero>({ required: true })

// const emit = defineEmits(['updated'])

/*function emitUpdatedEvent(): void {
  console.log('emitUpdatedEvent', config.value)

  emit('updated', config.value)
}*/

onMounted(() => {
  console.log('mounted', config)
})
</script>

<style scoped></style>
