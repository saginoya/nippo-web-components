import { ref } from 'vue'
import { useParams } from './useParams'
import type { Year, Month } from '../types/dates'

export const useStateDate = () => {
  const year = ref<Year>('2022')
  const month = ref<Month>('4')

  const { year: getYear, month: getMonth } = useParams()
  const setDate = () => {
    year.value = getYear.value || String(new Date().getFullYear())
    month.value = getMonth.value || (String(new Date().getMonth() + 1) as Month)
  }
  setDate()

  const nextYear = () => {
    let number = Number(year.value)
    number++
    if (typeof number === 'number') {
      year.value = String(number)
    }
  }
  const prevYear = () => {
    let number = Number(year.value)
    number--
    if (typeof number === 'number') {
      year.value = String(number)
    }
  }

  const nextMonth = () => {
    let number = Number(month.value)
    number++
    if (number > 12) {
      nextYear()
      month.value = '1'
    } else {
      month.value = String(number) as Month
    }
  }

  const prevMonth = () => {
    let number = Number(month.value)
    number--
    if (number < 1) {
      prevYear()
      month.value = '12'
    } else {
      month.value = String(number) as Month
    }
  }

  return {
    year,
    month,
    setDate,
    nextYear,
    prevYear,
    nextMonth,
    prevMonth
  }
}
