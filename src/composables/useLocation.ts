import { useBrowserLocation } from '@vueuse/core'

export const useLocation = () => {
  const location = useBrowserLocation()

  const href = location.value.href
  const pathname = location.value.pathname
  const search = location.value.search
  const hash = location.value.hash

  const setHref = (href: string) => {
    location.value.href = href
  }

  return {
    href,
    pathname,
    search,
    hash,
    setHref
  }
}
