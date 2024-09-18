<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'
import { useDailyNews } from '@/composables/useDailyNews'
import { useStateDate } from '@/composables/useStateDate'
import { useLocation } from '@/composables/useLocation'
import type { Category } from '@/types/categories'

type Type = 'summary' | 'subsummary' | 'details'
const props = defineProps<{
  category?: Category
  type?: Type
  limit?: number
  latest?: boolean
}>()

const { year, month } = useStateDate()
const { articles, error, isLoading, isFinished } = useDailyNews({
  type: props.latest ? 'latest' : 'designation',
  year: year.value,
  month: month.value,
  category: props.category,
  limit: props.limit
})

const articleFormat = computed(() => {
  switch (props.type) {
    case 'details':
      return 'dn-article'
    case 'subsummary':
      return 'dn-sub-summary'
    default:
      return 'dn-summary'
  }
})

// Hashを取得して同じIDまでスクロールさせる
const { hash } = useLocation()
const targetId = hash?.slice(1)
const sample = ref()
const scrollToId = () => {
  if (targetId && props.type === 'details' && sample.value) {
    for (const elem of sample.value) {
      if (elem.id === targetId) {
        console.log(elem)
        elem.scrollIntoView(true)
      }
    }
  }
}
onUpdated(() => {
  setTimeout(() => scrollToId(), 1000)
})
</script>

<template>
  <p v-if="isLoading">読み込み中...</p>
  <ul v-else-if="isFinished && articles.length > 0">
    <li v-for="article in articles" :key="article.id" :id="article.id" ref="sample">
      <component :is="articleFormat" :article="article"></component>
    </li>
  </ul>
  <p v-else-if="isFinished && articles.length === 0">記事がありません。</p>
  <p v-else-if="error">記事の読み込みに失敗しました。</p>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
