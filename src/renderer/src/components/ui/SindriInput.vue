<template>
  <div>
    <label :for="props.label">
      <span class="text-sm font-medium text-gray-700" v-html="props.label" />

      <div class="relative">
        <input v-model="inputData" :type="type" :id="props.label" class="mt-0.5 w-full rounded border-gray-300 p-3 shadow-sm sm:text-sm">

        <span class="absolute inset-y-0 right-0 grid w-8 place-content-center text-gray-700">
          <Icon
            :icon="radixIcons.icons[props.icon]"
            class="w-4 h-4"
          />
        </span>
      </div>
    </label>
  </div>
</template>
<script setup lang="ts">

import radixIcons from '@iconify-json/radix-icons/icons.json'
import { Icon } from '@iconify/vue'

const inputData = defineModel({ required: true })

const props = defineProps({
  'label': { type: String, required: true },
  'type': { type: String, default: 'text' },
  'icon': { type: String, default: 'input' }
})

</script>
