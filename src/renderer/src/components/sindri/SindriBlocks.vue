<template>
  <DialogRoot>
    <DialogTrigger as-child>
      <SindriButton variant="secondary">
        Add Block
      </SindriButton>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="border-2 bg-white border-primary data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[750px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          Add Block
        </DialogTitle>
        <DialogDescription class="text-mauve11 mt-[10px] mb-5 text-sm leading-normal">

          <TabsRoot
            class="flex flex-col w-full h-[50vh]"
            default-value="tab1"
          >
            <TabsList
              class="relative shrink-0 flex border-b border-mauve6"
              aria-label="Marketing"
            >
              <TabsIndicator class="absolute px-8 left-0 h-[2px] bottom-0 w-[--reka-tabs-indicator-size] translate-x-[--reka-tabs-indicator-position] translate-y-[1px] rounded-full transition-[width,transform] duration-300">
                <div class="bg-grass8 w-full h-full" />
              </TabsIndicator>
              <TabsTrigger
                class="px-5 h-[45px] flex-1 flex items-center justify-center text-sm leading-none text-mauve11 select-none  rounded-tl-md  hover:text-grass11 data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:text-grass11 outline-none cursor-default focus-visible:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black cursor-pointer"
                value="tab1"
              >
                Marketing
              </TabsTrigger>
              <TabsTrigger
                class="px-5 h-[45px] flex-1 flex items-center justify-center text-sm leading-none text-mauve11 select-none  rounded-tr-md hover:text-grass11 data-[state=active]:text-grass11 data-[state=active]:text-primary data-[state=active]:font-bold outline-none cursor-default focus-visible:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black cursor-pointer"
                value="tab2"
              >
                UI
              </TabsTrigger>
            </TabsList>
            <TabsContent
              class="grow p-5 rounded-b-md outline-none focus:shadow-[0_0_0_2px] grid grid-cols-2 sm:grid-cols-3 gap-4"
              value="tab1"
            >
              <div>
                <template v-for="block in blocks.marketing" :key="block">
                  <SindriBlock :category="'marketing'" :type="block" />
                </template>
              </div>
            </TabsContent>
            <TabsContent
              class="grow p-5 rounded-b-md outline-none focus:shadow-[0_0_0_2px]  grid grid-cols-2 sm:grid-cols-3 gap-4"
              value="tab2"
            >
              <p class="mb-5 !mt-0 text-mauve11 text-sm !leading-normal col-span-2 sm:col-span-3">
                Under construction
              </p>
            </TabsContent>
          </TabsRoot>
        </DialogDescription>

        <div class="mt-[25px] flex gap-4 justify-end">
          <DialogClose as-child>
            <SindriButton variant="primary-fulllight">
              Close
            </SindriButton>
          </DialogClose>
        </div>
        <DialogClose
          class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none cursor-pointer"
          aria-label="Close"
        >
          <Icon
            :icon="radixIcons.icons['cross-1']"
            class="w-4 h-4"
          />
        </DialogClose>
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
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import SindriButton from '@renderer/components/ui/SindriButton.vue'
import { Icon } from '@iconify/vue'
import radixIcons from '@iconify-json/radix-icons/icons.json'
import SindriBlock from '@renderer/components/sindri/SindriBlock.vue'

const blocks = {
  marketing: ['hero']
}

</script>
