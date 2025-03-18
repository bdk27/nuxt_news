<script setup lang="ts">
const route = useRoute();
const searchNews = useSearchNewsStore();

// 當前搜尋關鍵字
const keywords = ref(typeof route.query.q === "string" ? route.query.q : "");

watch(
  () => route.query.q,
  (newQuery) => {
    if (typeof newQuery === "string") {
      keywords.value = newQuery.trim();
      fetchSearchResults();
    }
  },
  { immediate: true }
);

function fetchSearchResults() {
  if (!keywords.value.trim()) return;
  searchNews.fetchSearchNews(keywords.value);
}
</script>

<template>
  <div class="my-5">
    <h1 class="text-2xl font-bold text-white mb-4">
      搜尋結果({{ searchNews.articles.length }}篇)
    </h1>

    <VNewsList
      :articles="searchNews.articles"
      :loading="searchNews.loading"
      :error="searchNews.error ?? undefined"
    />
  </div>
</template>

<style scoped></style>
