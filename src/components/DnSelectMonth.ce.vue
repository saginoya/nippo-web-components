<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDate } from '@/composables/useDate'
import { useLocation } from '@/composables/useLocation'
import { usePathGenerator } from '@/composables/usePathGenerator'

type Item = {
  id: string
  name: string
  value: string
}
const items = ref<Item[]>([])
const path = ref('')

const { pathname, search, setHref } = useLocation()
if (pathname !== '/' && pathname !== '/index.htm' && search) {
  path.value = pathname + search
}
watch(path, () => {
  setHref(path.value)
})

const {
  isSameOrAfter,
  subtractMonth,
  formatYYYYMMDD,
  formatYYYY,
  formatM,
  formatMM,
  formatJaYYYYM
} = useDate()
const { dailyNewsListPage, dailyNewsListPagePast } = usePathGenerator()

const dateToSwitchYear = '2022'
const dateToSwitchMonth = '4'
const dateToStopYear = '2011'
const dateToStopMonth = '9'

do {
  subtractMonth()
  const id = formatYYYYMMDD.value
  const name = formatJaYYYYM.value
  const value = isSameOrAfter(dateToSwitchYear, dateToSwitchMonth)
    ? dailyNewsListPage(formatYYYY.value, formatM.value)
    : dailyNewsListPagePast(formatYYYY.value, formatMM.value)
  items.value.push({ id, name, value })
} while (isSameOrAfter(dateToStopYear, dateToStopMonth))
</script>

<template>
  <select v-model="path" class="border border-black border-solid">
    <option value="" selected disabled>過去のニュースはこちらから</option>
    <option v-for="item in items" :key="item.id" :value="item.value">
      {{ item.name }}
    </option>
  </select>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
