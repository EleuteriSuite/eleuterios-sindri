<template>
  <label :for="props.label">
    <span class="text-sm font-medium text-gray-700" v-html="props.label" />

    <select v-model="inputData" :id="props.label" :name="props.label" class="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm">
      <slot></slot>
    </select>
  </label>
</template>
<script setup lang="ts">

const inputData = defineModel({ required: true })

const props = defineProps({
  'label': { type: String, required: true }
})

</script>
