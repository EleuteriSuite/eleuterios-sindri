<template>
  <DialogRoot>
    <DialogTrigger as-child="true">
      <SindriButton class="w-full">
        Add Block
      </SindriButton>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle />
        <DialogDescription />
        <DialogClose />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
<script setup>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import SindriButton from '@renderer/components/ui/SindriButton.vue'
</script>
