import { ref, computed, readonly, watchEffect } from 'vue'
import { useArticleFilter } from '@/composables/useArticleFilter'
import { useArticleSort } from '@/composables/useArticleSort'
import { useNewsPaperJson } from '@/composables/useNewsPaperJson'
import { useStateMode } from '@/composables/useStateMode'
import type { Year, Month } from '@/types/dates'
import type { Media, NewsPaper } from '@/types/newsPaper'

type RequestType = 'latest' | 'designation'
type Conditions = {
  media: Media
  type?: RequestType
  year?: Year
  month?: Month
  limit?: number
  past?: boolean
}

export const useNewsPaper = (conditions: Conditions) => {
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

  // JSONのデータを取得する
  const { articles, error, isLoading, isFinished } = useNewsPaperJson(conditions.media, year.value)
  const filteredArticles = ref<NewsPaper[]>([])

  // 記事をフィルター・ソート
  const { sortDate, sortDateReverse } = useArticleSort()
  const { filterPeriod, filterBooking } = useArticleFilter()
  const { mode } = useStateMode()
  watchEffect(() => {
    if (articles.value) {
      let arr: NewsPaper[] = articles.value
      if (mode.value === 'public') {
        arr = filterBooking(arr) as NewsPaper[]
      }
      if (type.value === 'designation' && year.value && month.value) {
        arr = filterPeriod(arr, year.value, month.value) as NewsPaper[]
      }
      if (conditions.past) {
        arr = sortDateReverse(arr) as NewsPaper[]
      } else {
        arr = sortDate(arr) as NewsPaper[]
      }

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
