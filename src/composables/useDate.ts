import { ref, computed, readonly } from 'vue'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import type { Year, Month, MonthTwoDigit } from '@/types/dates'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export const useDate = (date?: string) => {
  // 基本となる日時
  const base = ref(dayjs(date))
  const setDate = (date?: string) => {
    base.value = dayjs(date)
  }

  // 現在の日時
  const now = computed(() => {
    return dayjs()
  })
  const thisYear = computed(() => {
    return now.value.format('YYYY')
  })
  const thisMonth = computed(() => {
    return now.value.format('M')
  })

  // 基本日が引数の範囲内か
  const withinPeriod = (year: Year, month: Month): boolean => {
    const period = dayjs(`${year}-${month}-01`)
    const start = period.startOf('month')
    const end = period.endOf('month')
    return base.value.isSameOrAfter(start) && base.value.isSameOrBefore(end)
  }
  // 基本日が引数の以後か
  const isSameOrAfter = (year: Year, month: Month): boolean => {
    const period = dayjs(`${year}-${month}-01`)
    return base.value.isSameOrAfter(period)
  }
  // 基本日が引数の以前か
  const isSameOrBefore = (year: Year, month: Month): boolean => {
    const period = dayjs(`${year}-${month}-01`)
    return base.value.isSameOrBefore(period)
  }

  // 基本日時が現在の日時以前か
  const release = computed<boolean>(() => {
    return base.value.isSameOrBefore(now.value)
  })

  // 基本日時を一カ月前にする
  const subtractMonth = () => {
    base.value = base.value.subtract(1, 'M')
  }

  // 基本日時をフォーマット
  const formatYYYYMMDD = computed<string>(() => {
    return `${base.value.format('YYYY')}-${base.value.format('MM')}-${base.value.format('DD')}`
  })
  const formatYYYY = computed<Year>(() => {
    return base.value.format('YYYY')
  })
  const formatM = computed<Month>(() => {
    return base.value.format('M') as Month
  })
  const formatMM = computed<MonthTwoDigit>(() => {
    return base.value.format('MM') as MonthTwoDigit
  })
  const formatMMDD = computed<string>(() => {
    return `${base.value.format('MM')}/${base.value.format('DD')}`
  })
  const formatMD = computed<string>(() => {
    return `${base.value.format('M')}/${base.value.format('D')}`
  })
  const formatJaMDHm = computed<string>(() => {
    return `${base.value.format('M')}月${base.value.format('D')}日${base.value.format(
      'HH'
    )}:${base.value.format('mm')}`
  })
  const formatJaYYYYM = computed<string>(() => {
    return `${base.value.format('YYYY')}年${base.value.format('M')}月`
  })
  const formatJaMD = computed<string>(() => {
    return `${base.value.format('M')}月${base.value.format('D')}日`
  })

  return {
    base: readonly(base),
    setDate,
    now: readonly(now),
    thisYear: readonly(thisYear),
    thisMonth: readonly(thisMonth),
    withinPeriod,
    isSameOrAfter,
    isSameOrBefore,
    release: readonly(release),
    subtractMonth,
    formatYYYYMMDD,
    formatYYYY,
    formatM,
    formatMM,
    formatMMDD,
    formatMD,
    formatJaMDHm,
    formatJaYYYYM,
    formatJaMD
  }
}
