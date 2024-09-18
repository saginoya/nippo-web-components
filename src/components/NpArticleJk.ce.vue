<script setup lang="ts">
import type { Jk } from '@/types/newsPaper'

defineProps<{
  article: Jk
}>()
</script>

<template>
  <article class="py-8">
    <np-article-header
      :name="article.name"
      :releaseDate="article.releaseDate"
      :suspended="article.suspended"
      :message="article.message"
      :images="article.images"
    ></np-article-header>
    <np-article-content
      v-for="(content, index) in article.contents"
      :key="index"
      :content="content"
      class="border-b border-gray-700 border-solid py-4"
    ></np-article-content>
  </article>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
