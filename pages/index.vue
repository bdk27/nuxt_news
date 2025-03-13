<script setup lang="ts">
const newsStore = useNewsStore();

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
  Object.keys(categories).forEach((category) => {
    newsStore.fetchHeadlinesNews(category);
  });
});

//調整時間格式
function formatDate(data: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(data)
    .toLocaleDateString("zh-TW", options)
    .replace(/\//g, "-");
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
      <div v-if="newsStore.loading" class="text-white">載入中...</div>
      <div v-if="newsStore.error" class="text-white">{{ newsStore.error }}</div>
      <div v-if="!newsStore.loading && !newsStore.error">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="article in newsStore.headlinesArticles[categoryKey]"
            :key="article.title"
            class="bg-black-dark rounded-md flex flex-col"
          >
            <div class="relative h-48">
              <img
                :src="article.urlToImage"
                :alt="article.title"
                loading="lazy"
                class="rounded-t-md w-full h-full object-cover"
              />
            </div>
            <div class="p-3 flex-grow">
              <p class="text-gray text-xs mb-2">
                {{ formatDate(article.publishedAt) }}
              </p>
              <h2 class="text-white font-bold text-sm">
                {{ article.title }}
              </h2>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button
            class="text-gray mt-3 text-center text-lg hover:text-white cursor-pointer"
          >
            查看更多文章
            <font-awesome-icon icon="fa-solid fa-caret-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
