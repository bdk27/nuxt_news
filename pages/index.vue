<script setup lang="ts">
const favoriteNewsStore = useFavoriteNewsStore();
const headlinesNewsStore = useHeadlinesNewsStore();
const router = useRouter();

const categories = {
  general: "綜合",
  business: "商業",
  entertainment: "娛樂",
  health: "健康",
  science: "科學",
  sports: "體育",
  technology: "科技",
};

onMounted(() => {
  fetchArticles();
  headlinesNewsStore.fetchHeadlinesNews(Object.keys(categories));
});

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
// 跳轉其他頁面
function navigateToCategory(categoryKey: string) {
  router.push(`/news/${categoryKey}`);
}
</script>

<template>
  <div>
    <div
      v-for="(categoryName, categoryKey) in categories"
      :key="categoryKey"
      class="my-5"
    >
      <h2 class="text-2xl font-bold text-white capitalize mb-1">
        {{ categoryName }}
      </h2>
      <VNewsList
        :category="categoryKey"
        :articles="headlinesNewsStore.headlinesArticles[categoryKey]"
        :loading="headlinesNewsStore.loading"
        :error="headlinesNewsStore.error ?? undefined"
      />
      <div class="text-center">
        <VButton @click="navigateToCategory(categoryKey)" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
