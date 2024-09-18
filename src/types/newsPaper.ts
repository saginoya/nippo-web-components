export type Media = 'ht' | 'jk'

export type Image = string

export type Content = {
  project: string | undefined
  title: string | undefined
  subtitles: string[] | undefined
  organization: string | string[] | undefined
  sentence?: string
}

export type HtPage = {
  pageTitle: string
  contents: Content[]
}

export type Ht = {
  id: string
  name: string
  date: string
  releaseDate: string
  pages: HtPage[]
  suspended?: string
  message?: string
  images?: Image[]
}

export type Jk = {
  id: string
  name: string
  date: string
  releaseDate: string
  contents: Content[]
  suspended?: string
  message?: string
  images?: Image[]
}

export type NewsPaper = Ht | Jk
