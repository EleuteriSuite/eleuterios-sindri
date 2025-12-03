<template>
  <label :for="props.label">
    <span class="text-sm font-medium text-gray-700" v-html="props.label" />

    <div class="relative">
      <input v-model="inputData" :type="type" :id="props.label" class="mt-0.5 w-full rounded border-gray-300 pe-8 shadow-sm sm:text-sm">

      <span class="absolute inset-y-0 right-0 grid w-8 place-content-center text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"></path>
        </svg>
      </span>
    </div>
  </label>
</template>
<script setup lang="ts">

const inputData = defineModel({ required: true })

const props = defineProps({
  'label': { type: String, required: true },
  'type': { type: String, default: 'text' }
})

</script>
