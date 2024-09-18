import { ref, computed, watch, watchEffect } from 'vue'
import { useJson } from '@/composables/useJson'
import { useDate } from '@/composables/useDate'
import { usePathGenerator } from '@/composables/usePathGenerator'
import type { NewsPaper, Media } from '@/types/newsPaper'

export const useNewsPaperJson = (media: Media, year?: string) => {
  const { newsPaperJson } = usePathGenerator()
  const { thisYear, thisMonth } = useDate()

  // 処理の状況
  const isLoading = ref<boolean>(true)
  const isFinished = ref<boolean>(false)
  const startLoading = () => {
    isLoading.value = true
    isFinished.value = false
  }
  const conmpletionLoading = () => {
    isLoading.value = false
    isFinished.value = true
  }

  // 記事の一覧
  const articles = ref<NewsPaper[]>([])

  // 引数に西暦が指定されていれば年指定モード
  // 引数がなければlatestモード
  const latest = ref<boolean>(Boolean(!year))

  // 本年のJSONを取得
  const baseYear = computed(() => year || thisYear.value)
  const { data, error, getJson } = useJson()
  startLoading()
  getJson(newsPaperJson(media, baseYear.value))

  // 昨年のJSONを取得（本年のデータがまだないか少ない場合）
  const lastYear = computed(() => {
    return String(Number(baseYear.value) - 1)
  })
  const lastYearData = useJson()
  watch([data, error], () => {
    if (latest.value && (!data.value || data.value.length < 5)) {
      startLoading()
      lastYearData.getJson(newsPaperJson(media, lastYear.value))
    }
  })

  // 来年のJSONを取得（年末の場合）
  const nextYear = computed(() => {
    return String(Number(baseYear.value) + 1)
  })
  const nextYearData = useJson()
  if (latest.value && thisMonth.value === '12') {
    startLoading()
    nextYearData.getJson(newsPaperJson(media, nextYear.value))
  }

  // 取得したデータを記事の一覧に格納
  watchEffect(() => {
    articles.value = []
    if (data.value) {
      articles.value = articles.value.concat(data.value)
      conmpletionLoading()
    }
    if (lastYearData.data.value) {
      articles.value = articles.value.concat(lastYearData.data.value)
      conmpletionLoading()
    }
    if (nextYearData.data.value) {
      articles.value = articles.value.concat(nextYearData.data.value)
      conmpletionLoading()
    }
  })
  return {
    articles,
    error,
    isLoading,
    isFinished
  }
}
