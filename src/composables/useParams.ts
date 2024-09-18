import { computed } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'
import type { Year, Month } from '../types/dates'
import type { Mode } from '../types/modes'

export const useParams = () => {
  const params = useUrlSearchParams('history')

  const mode = computed<Mode>(() => {
    if (params.mode === 'private') {
      return 'private'
    } else {
      return 'public'
    }
  })
  const year = computed<Year | undefined>(() => {
    if (!params.year) {
      return undefined
    } else if (typeof params.year === 'string') {
      return params.year
    } else {
      return undefined
    }
  })
  const month = computed<Month | undefined>(() => {
    if (!params.month) {
      return undefined
    } else if (
      params.month === '1' ||
      params.month === '2' ||
      params.month === '3' ||
      params.month === '4' ||
      params.month === '5' ||
      params.month === '6' ||
      params.month === '7' ||
      params.month === '8' ||
      params.month === '9' ||
      params.month === '10' ||
      params.month === '11' ||
      params.month === '12'
    ) {
      return params.month
    } else {
      return undefined
    }
  })

  return {
    mode,
    year,
    month
  }
}
