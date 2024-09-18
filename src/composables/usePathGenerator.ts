import { useDate } from '@/composables/useDate'
import type { Year, Month, MonthTwoDigit } from '@/types/dates'
import type { Category } from '@/types/categories'
import type { Media } from '@/types/newsPaper'

export const usePathGenerator = () => {
  // Utils
  const useQuery = (year: Year, month: Month) => {
    return `?year=${year}&month=${month}`
  }

  const useHash = (id: string) => {
    return `#${id}`
  }

  // Daily news
  const dailyNewsJson = (year: Year) => {
    return `/json/daily-news/${year}.json`
  }

  const dailyNewsArticlePage = (cat: Category, date?: string, id?: string) => {
    const { formatYYYY, formatM } = useDate(date)
    const query = date ? useQuery(formatYYYY.value, formatM.value) : undefined
    const hash = id ? useHash(id) : undefined
    return `/dn/daily-news-${cat}.htm${query}${hash}`
  }

  const dailyNewsListPage = (year: Year, month: Month) => {
    const query = useQuery(year, month)
    return `/dn/index.htm${query}`
  }
  const dailyNewsListPagePast = (year: Year, month: MonthTwoDigit) => {
    return `/dn/${year}${month}n.htm`
  }

  // News paper
  const newsPaperJson = (media: Media, year: Year) => {
    return `/json/news-paper/${media}${year}.json`
  }
  const newsPaperArticlePage = (year: Year, month: Month) => {
    const query = useQuery(year, month)
    return `back-number.htm${query}`
  }

  return {
    dailyNewsJson,
    dailyNewsArticlePage,
    dailyNewsListPage,
    dailyNewsListPagePast,
    newsPaperJson,
    newsPaperArticlePage
  }
}
