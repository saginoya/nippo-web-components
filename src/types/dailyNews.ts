import type { Category, SubCategory } from '@/types/categories'

export type Image = {
  url: string
  caption: string
  width: string
}

export type DailyNews = {
  id: string
  date: string
  category: Category
  subcategory: SubCategory
  title: string
  organization: string
  sentence: string
  forMoreInformation: string
  imagePositionBottom?: boolean
  images?: Image[]
  straddlingCaption?: string
}
