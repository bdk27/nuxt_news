<script setup lang="ts">
const favoriteNewsStore = useFavoriteNewsStore();

onMounted(() => {
  favoriteNewsStore.fetchArticles();
});
</script>

<template>
  <div class="p-5">
    <div
      v-if="favoriteNewsStore.favorites.length === 0"
      class="text-white text-center text-2xl"
    >
      尚未收藏任何新聞
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold text-white my-5">
        我的收藏 ({{ favoriteNewsStore.favorites.length }}篇)
      </h1>
      <VNewsList
        :articles="favoriteNewsStore.favorites"
        :loading="false"
        :error="favoriteNewsStore.error"
      />
    </div>
  </div>
</template>

<style scoped></style>
