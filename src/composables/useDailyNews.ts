import { ref, computed, readonly, watchEffect } from 'vue'
import { useArticleFilter } from '@/composables/useArticleFilter'
import { useArticleSort } from '@/composables/useArticleSort'
import { useDailyNewsJson } from '@/composables/useDailyNewsJson'
import { useStateMode } from '@/composables/useStateMode'
import type { Category } from '@/types/categories'
import type { Year, Month } from '@/types/dates'
import type { DailyNews } from '@/types/dailyNews'

type RequestType = 'latest' | 'designation'
type Conditions = {
  type?: RequestType
  year?: Year
  month?: Month
  limit?: number
  category?: Category
}

export const useDailyNews = (conditions: Conditions) => {
  // 記事のフィルターの条件
  const type = ref<RequestType>(conditions.type || 'designation')
  const year = computed<Year | undefined>(() => {
    if (type.value === 'latest') {
      return undefined
    } else {
      return conditions.year
    }
  })
  const month = computed<Month | undefined>(() => {
    if (type.value === 'latest') {
      return undefined
    } else {
      return conditions.month
    }
  })
  const limit = computed<number | undefined>(() => {
    if (type.value === 'latest' && !conditions.limit) {
      return 31
    } else {
      return conditions.limit
    }
  })
  const category = ref<Category | undefined>(conditions.category)

  // JSONのデータを取得する
  const { articles, error, isLoading, isFinished } = useDailyNewsJson(year.value)
  const filteredArticles = ref<DailyNews[]>([])

  // 記事をフィルター・ソート
  const { sortDate } = useArticleSort()
  const { filterPeriod, filterBooking, filterCategory } = useArticleFilter()
  const { mode } = useStateMode()
  watchEffect(() => {
    if (articles.value) {
      let arr: DailyNews[] = articles.value
      if (mode.value === 'public') {
        arr = filterBooking(arr) as DailyNews[]
      }
      if (type.value === 'designation' && year.value && month.value) {
        arr = filterPeriod(arr, year.value, month.value) as DailyNews[]
      }
      if (category.value) {
        arr = filterCategory(arr, category.value) as DailyNews[]
      }
      arr = sortDate(arr) as DailyNews[]
      if (limit.value) {
        arr = arr.slice(0, limit.value)
      }
      filteredArticles.value = arr
    }
  })

  return {
    articles: readonly(filteredArticles),
    error,
    isLoading,
    isFinished
  }
}
