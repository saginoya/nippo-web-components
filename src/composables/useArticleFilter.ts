import { useDate } from '@/composables/useDate'
import type { Year, Month } from '@/types/dates'
import type { Category } from '@/types/categories'

export const useArticleFilter = () => {
  type FilterPeriodItem = {
    date: string
    releaseDate?: string
  }
  const filterPeriod = (items: FilterPeriodItem[], year: Year, month: Month, latest?: boolean) => {
    return items.filter((item) => {
      const date = latest ? item.releaseDate || item.date : item.date
      const { withinPeriod } = useDate(date)
      return withinPeriod(year, month)
    })
  }

  type FilterBookingItem = {
    date: string
    releaseDate?: string
  }
  const filterBooking = (items: FilterBookingItem[]) => {
    return items.filter((item) => {
      const { release } = useDate(item.releaseDate || item.date)
      return release.value
    })
  }

  type FilterCategoryItem = {
    category: Category
  }
  const filterCategory = (items: FilterCategoryItem[], cat: Category) => {
    return items.filter((item) => {
      return item.category === cat
    })
  }

  return {
    filterPeriod,
    filterBooking,
    filterCategory
  }
}
