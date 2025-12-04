<template>
  <a
    class="inline-block rounded border-2 px-5 py-3 font-medium shadow-sm transition-colors text-center"
    :class="`text-${text_color} bg-${variant} border-${hover_variant} hover:text-${text_color_variant} hover:bg-${hover_variant} hover:border-${variant}`"
    :href="href"
  >
    <slot></slot>
  </a>
</template>
<script setup lang="ts">
const { variant = 'primary', href = '#' } = defineProps<{
    variant: 'black' | 'white' | 'primary' | 'primary-light' | 'primary-fulllight' | 'secondary'
    href: string
  }>()

const hover_variant_options = {
  'black': 'white',
  'primary': 'secondary',
  'white': 'black',
  'primary-light': 'secondary',
  'primary-fulllight': 'black',
  'secondary': 'primary'
}

const hover_variant = hover_variant_options[variant];

const variant_options_dark = ['black', 'primary']
const variant_options_light = ['white', 'primary-light', 'primary-fulllight', 'secondary']

const text_color: 'black' | 'white' = variant_options_dark.includes(variant)
  ? 'white'
  : 'black'
const text_color_variant: 'black' | 'white' = variant_options_light.includes(hover_variant)
  ? 'black'
  : 'white'
</script>
