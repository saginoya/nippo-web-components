import { ref, readonly } from 'vue'
import { useParams } from '@/composables/useParams'
import type { Mode } from '@/types/modes'

export const useStateMode = () => {
  const mode = ref<Mode>('public')

  const setMode = () => {
    const { mode: getMode } = useParams()
    mode.value = getMode.value
  }
  setMode()

  return {
    mode: readonly(mode),
    setMode
  }
}
