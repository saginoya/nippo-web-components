import { ref, readonly } from 'vue'

export const useJson = () => {
  const data = ref()
  const error = ref()

  const getJson = (url: string) => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))
    } catch (error) {
      console.error(`Error: ${error}`)
      data.value = undefined
    }
  }

  return {
    data,
    error: readonly(error),
    getJson
  }
}
