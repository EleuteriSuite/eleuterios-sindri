<template>
  <div>
    <h1 class="text-2xl font-bold">Sindri UI Breadcrumbs</h1>
    <div v-for="(item, id) in config.items" :key="id" class="py-3">
      <div class="text-sm font-medium text-gray-700">Level <span v-html="id + 1" /></div>
      <SindriInput label="Title" v-model="item.title" />
      <SindriInput label="Subtitle" v-model="item.href" />
    </div>
    <div class="w-full grid grid-cols-2 gap-4 py-3">
      <SindriButton @click="addLevel">Add level</SindriButton>
      <SindriButton @click="subLevel">Sub level</SindriButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SindriUIBreadcrumbs } from '@renderer/components/sindri/ui/sindri_ui'
import { onMounted, ref, watch } from 'vue'
import SindriInput from '@renderer/components/ui/SindriInput.vue'
import SindriButton from '@renderer/components/ui/SindriButton.vue'

const config = defineModel<SindriUIBreadcrumbs>({ required: true })

const breadcrumbsLevels = ref(0)

watch(breadcrumbsLevels, () => {
  while (config.value.items.length < breadcrumbsLevels.value) {
    config.value.items.push({ title: 'Lorem ipsum', href: '#' })
  }
  while (config.value.items.length > breadcrumbsLevels.value) {
    config.value.items.pop()
  }
})

const addLevel = () => breadcrumbsLevels.value++
const subLevel = () => breadcrumbsLevels.value--

onMounted(() => {
  console.log('mounted', config)

  breadcrumbsLevels.value = config.value.items.length
})
</script>

<style scoped></style>
