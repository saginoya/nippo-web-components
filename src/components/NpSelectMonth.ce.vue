<script setup lang="ts">
import { computed } from 'vue'
import { usePathGenerator } from '@/composables/usePathGenerator'
import { useDate } from '@/composables/useDate'
import type { Year, Month } from '@/types/dates'
import type { Media } from '@/types/newsPaper'

const { newsPaperArticlePage } = usePathGenerator()
const { thisYear, thisMonth } = useDate()

const props = defineProps<{
  media: Media
}>()

const startYear = 2022
const yearList = computed<Year[]>(() => {
  let yearList = []
  for (let i = startYear; i <= Number(thisYear.value); i++) {
    yearList.unshift(i)
  }
  return yearList.map(String)
})

const bnrClass = computed(() => {
  const classHt = 'bg-[#CC99CC]'
  const classJk = 'bg-[#99CC00]'
  return props.media === 'ht' ? classHt : classJk
})

const monthList: Month[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const undisclosed = (year: Year, month: Month): boolean => {
  return thisYear.value === year && Number(thisMonth.value) < Number(month)
}
</script>

<template>
  <div v-for="year in yearList" :key="year" class="mb-2">
    <p class="p-1" :class="bnrClass">{{ year }}年バックナンバー</p>
    <ul class="grid grid-cols-6 gap-1">
      <li v-for="month in monthList" :key="`&{year}-${month}`">
        <div v-show="!undisclosed(year, month)">
          <a :href="newsPaperArticlePage(year, month)" class="text-[#0000ff]">■{{ month }}月度</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
