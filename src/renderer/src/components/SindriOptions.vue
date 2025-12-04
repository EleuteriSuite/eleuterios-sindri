<template>
  <div>
    <SindriBlocks />
    <SindriInput label="Title" v-model="config.title" class="mt-3" />
    <SindriInput label="Slug" v-model="config.slug" class="mt-3" />

    <div class="text-sm font-medium text-gray-700 mt-3">
      Publication Date
    </div>
    <CalendarRoot
      v-slot="{ weekDays, grid }"
      :is-date-unavailable="isDateUnavailable"
      :default-value="date"
      class="rounded-xl bg-white p-4 shadow-sm border"
      fixed-weeks
    >
      <CalendarHeader class="flex items-center justify-between">
        <CalendarPrev
          class="inline-flex items-center cursor-pointer text-black justify-center rounded-md bg-transparent w-7 h-7 hover:bg-stone-50 active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
        >
          <Icon
            :icon="radixIcons.icons['chevron-left']"
            class="w-4 h-4"
          />
        </CalendarPrev>
        <CalendarHeading class="text-sm text-black font-medium" />

        <CalendarNext
          class="inline-flex items-center cursor-pointer justify-center text-black rounded-md bg-transparent w-7 h-7 hover:bg-stone-50 active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
        >
          <Icon
            :icon="radixIcons.icons['chevron-right']"
            class="w-4 h-4"
          />
        </CalendarNext>
      </CalendarHeader>
      <div
        class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
      >
        <CalendarGrid
          v-for="month in grid"
          :key="month.value.toString()"
          class="w-full border-collapse select-none space-y-1"
        >
          <CalendarGridHead>
            <CalendarGridRow class="mb-1 grid w-full grid-cols-7">
              <CalendarHeadCell
                v-for="day in weekDays"
                :key="day"
                class="rounded-md text-xs text-green8"
              >
                {{ day }}
              </CalendarHeadCell>
            </CalendarGridRow>
          </CalendarGridHead>
          <CalendarGridBody class="grid">
            <CalendarGridRow
              v-for="(weekDates, index) in month.rows"
              :key="`weekDate-${index}`"
              class="grid grid-cols-7"
            >
              <CalendarCell
                v-for="weekDate in weekDates"
                :key="weekDate.toString()"
                :date="weekDate"
                class="relative text-center text-sm"
              >
                <CalendarCellTrigger
                  :day="weekDate"
                  :month="month.value"
                  class="relative flex items-center justify-center rounded-full whitespace-nowrap text-sm font-normal text-black w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[outside-view]:text-black/30 data-[selected]:!bg-green10 data-[selected]:text-white hover:bg-green5 data-[highlighted]:bg-green5 data-[unavailable]:pointer-events-none data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-green9 "
                />
              </CalendarCell>
            </CalendarGridRow>
          </CalendarGridBody>
        </CalendarGrid>
      </div>
    </CalendarRoot>

    <div class="text-sm font-medium text-gray-700 mt-3">
      State: Draft
    </div>
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

import type { CalendarRootProps } from 'reka-ui'
import { Icon } from '@iconify/vue'
import radixIcons from '@iconify-json/radix-icons/icons.json'
import { CalendarDate } from '@internationalized/date'
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNext, CalendarPrev, CalendarRoot } from 'reka-ui'
import SindriButton from '@renderer/components/ui/SindriButton.vue'
import SindriBlocks from '@renderer/components/sindri/SindriBlocks.vue'

const currentDate = new Date()
const date = new CalendarDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay())

const isDateUnavailable: CalendarRootProps['isDateUnavailable'] = (date) => {
  return date.day === 17 || date.day === 18
}
</script>
