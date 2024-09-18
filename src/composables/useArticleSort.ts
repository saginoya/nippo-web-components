import type { DailyNews } from '@/types/dailyNews'
import type { NewsPaper } from '@/types/newsPaper'

type Items = (DailyNews | NewsPaper)[]

export const useArticleSort = () => {
  const sortDate = (array: Items) => {
    return array.sort(function (a, b) {
      return a.date < b.date ? 1 : -1
    })
  }

  const sortDateReverse = (array: Items) => {
    return array.sort(function (a, b) {
      return a.date > b.date ? 1 : -1
    })
  }

  return {
    sortDate,
    sortDateReverse
  }
}
