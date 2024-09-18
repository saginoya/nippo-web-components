import { ref, computed, watch, watchEffect } from 'vue'
import { useJson } from '@/composables/useJson'
import { useDate } from '@/composables/useDate'
import { usePathGenerator } from '@/composables/usePathGenerator'
import type { DailyNews } from '@/types/dailyNews'

export const useDailyNewsJson = (year?: string) => {
  const { dailyNewsJson } = usePathGenerator()
  const { thisYear } = useDate()

  // 処理の状況
  const isLoading = ref(true)
  const isFinished = ref(false)
  const startLoading = () => {
    isLoading.value = true
    isFinished.value = false
  }
  const completionLoading = () => {
    isLoading.value = false
    isFinished.value = true
  }

  // 記事の一覧
  const articles = ref<DailyNews[]>([])

  // 引数に西暦が指定されていれば年指定モード
  // 引数がなければlatestモード
  const latest = ref<boolean>(Boolean(!year))

  // 本年のJSONを取得
  const baseYear = computed(() => year || thisYear.value)
  const { data, error, getJson } = useJson()
  startLoading()
  getJson(dailyNewsJson(baseYear.value))

  // 昨年のJSONを取得（本年のデータがまだないか少ない場合）
  const lastYear = computed(() => {
    return String(Number(baseYear.value) - 1)
  })
  const lastYearData = useJson()
  watch([data, error], () => {
    if (latest.value && (!data.value || data.value.length < 20)) {
      startLoading()
      lastYearData.getJson(dailyNewsJson(lastYear.value))
    }
  })

  // 取得したデータを記事の一覧に格納
  watchEffect(() => {
    articles.value = []
    if (data.value) {
      articles.value = articles.value.concat(data.value)
      completionLoading()
    }
    if (lastYearData.data.value) {
      articles.value = articles.value.concat(lastYearData.data.value)
      completionLoading()
    }
  })
  return {
    articles,
    error,
    isLoading,
    isFinished
  }
}
