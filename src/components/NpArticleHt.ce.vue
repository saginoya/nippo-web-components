<script setup lang="ts">
import type { Ht } from '@/types/newsPaper'

defineProps<{
  article: Ht
}>()
</script>

<template>
  <article>
    <np-article-header
      :name="article.name"
      :releaseDate="article.releaseDate"
      :suspended="article.suspended"
      :message="article.message"
      :images="article.images"
      class="py-8"
    ></np-article-header>
    <div
      v-for="(page, indexP) in article.pages"
      :key="`page-${indexP}`"
      class="border-b border-gray-700 border-solid py-4"
    >
      <div v-if="page.pageTitle" class="text-green-700">＜{{ page.pageTitle }}＞</div>
      <np-article-content
        v-for="(content, indexC) in page.contents"
        :key="`content-${indexP}-${indexC}`"
        :content="content"
      ></np-article-content>
    </div>
  </article>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
