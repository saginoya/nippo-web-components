<script setup lang="ts">
import { computed } from 'vue'
import TagRecycle from '@/assets/images/tag-recycle.gif'
import TagGwp from '@/assets/images/tag-gwp.gif'
import TagEco from '@/assets/images/tag-eco.gif'
import TagSogo from '@/assets/images/tag-sogo.gif'
import TagHsangyo from '@/assets/images/tag-hsangyo.gif'
import TagPackage from '@/assets/images/tag-package.gif'
import type { SubCategory } from '@/types/categories'

const props = defineProps<{
  cat: SubCategory
}>()

const image = computed(() => {
  switch (props.cat) {
    case 'recycle':
      return TagRecycle
    case 'gwp':
      return TagGwp
    case 'eco':
      return TagEco
    case 'sogo':
      return TagSogo
    case 'hsangyo':
      return TagHsangyo
    case 'package':
      return TagPackage
    default:
      return TagRecycle
  }
})
</script>

<template>
  <span>
    <img :src="image" alt="" width="16" height="16" />
  </span>
</template>
