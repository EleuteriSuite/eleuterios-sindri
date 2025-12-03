<template>
  <div>
    <h1 class="text-2xl font-bold">Sindri Marketing Hero</h1>
    <SindriInput label="Title" v-model="config.title.description" />
    <SindriInput label="Subtitle" v-model="config.subtitle.description" />
    <SindriInput label="Action" v-model="config.action.description" />
    <SindriSelect label="Variant" v-model="config.action.variant">
      <option value="primary">Primary</option>
      <option value="secondary">Secondary</option>
    </SindriSelect>
  </div>
</template>

<script setup lang="ts">

import {
  SindriMarketingHero
} from '@renderer/components/sindri/marketing/sindri_marketring'
import { onMounted } from 'vue'
import SindriInput from '@renderer/components/ui/SindriInput.vue'
import SindriSelect from '@renderer/components/ui/SindriSelect.vue'

const config = defineModel<SindriMarketingHero>({ required: true })

onMounted(() => {
  console.log('mounted', config)
})
</script>

<style scoped></style>
