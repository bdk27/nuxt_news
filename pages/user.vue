<script setup lang="ts">
const newsStore = useFavoriteNewsStore();
</script>

<template>
  <div class="p-5">
    <div
      v-if="newsStore.favoriteArticles.length === 0"
      class="text-white text-center text-2xl"
    >
      尚未收藏任何新聞
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold text-white my-5">
        我的收藏 ({{ newsStore.favoriteArticles.length }}篇)
      </h1>
      <NewsList
        :articles="newsStore.favoriteArticles.map((fav: any) => fav.article)"
        :loading="false"
        :error="undefined"
      />
    </div>
  </div>
</template>

<style scoped></style>
