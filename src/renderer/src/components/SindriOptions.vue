<template>
  <div>
    <SindriInput label="Title" v-model="config.title" />
    <SindriInput label="Slug" v-model="config.slug" />
    Fecha publicación<br />
    Estado: no publicado<br />
  </div>
</template>
<script setup lang="ts">
import {
  SindriOptions
} from '@renderer/components/sindri_options'
import { ref } from 'vue'
import SindriInput from '@renderer/components/ui/SindriInput.vue'

const config = ref<SindriOptions>({
  title: ''
})
</script>
