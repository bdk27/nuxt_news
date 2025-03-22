<script setup lang="ts">
const favoriteNewsStore = useFavoriteNewsStore();

// 取的收藏文章
const error = ref("");
async function fetchArticles() {
  error.value = "";
  try {
    const { data, error: fetchError } = await supabase
      .from("nuxt-news-favorite")
      .select("*");
    console.log("data", data);

    if (fetchError) {
      console.log("error-msg", fetchError.message);

      error.value = fetchError.message;
    } else {
      favoriteNewsStore.favorites = data as Article[];
      console.log("favorites", favoriteNewsStore.favorites);
    }
  } catch (err: any) {
    error.value = err.message;
  }
}
fetchArticles();
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
        :error="error"
      />
    </div>
  </div>
</template>

<style scoped></style>
