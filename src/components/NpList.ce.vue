<script setup lang="ts">
import { useNewsPaper } from '@/composables/useNewsPaper'
import { useStateDate } from '@/composables/useStateDate'
import type { Media } from '@/types/newsPaper'

const props = defineProps<{
  media: Media
  limit?: number
  latest?: boolean
  past?: boolean
}>()

const { year, month } = useStateDate()
const { articles, error, isLoading, isFinished } = useNewsPaper({
  media: props.media,
  type: props.latest ? 'latest' : 'designation',
  year: year.value,
  month: month.value,
  limit: props.limit,
  past: props.past
})
</script>

<template>
  <p v-if="isLoading">読み込み中...</p>
  <ul v-else-if="isFinished && articles.length > 0">
    <li v-for="item in articles" :key="item.id">
      <component
        :is="media === 'jk' ? 'np-article-jk' : 'np-article-ht'"
        :article="item"
      ></component>
    </li>
  </ul>
  <p v-else-if="isFinished && articles.length === 0">記事がありません。</p>
  <p v-else-if="error">記事の読み込みに失敗しました。</p>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
