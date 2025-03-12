<script setup lang="ts">
const route = useRoute();
const newsStore = useNewsStore();

const category = computed<string>(() => route.params.id as string);
const categories: Record<string, { name: string; icon: string }> = {
  business: { name: "商業", icon: "fa-briefcase" },
  entertainment: { name: "娛樂", icon: "fa-ticket" },
  general: { name: "綜合", icon: "fa-location-dot" },
  health: { name: "健康", icon: "fa-syringe" },
  science: { name: "科學", icon: "fa-flask" },
  sports: { name: "體育", icon: "fa-basketball" },
  technology: { name: "科技", icon: "fa-microchip" },
  // test: { name: "測試", icon: "/icons/test.png" },
};

onMounted(() => {
  newsStore.fetchNews(category.value);
  console.log("fetching news: ", newsStore.articles);
});

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
    <div class="flex items-center px-3">
      <font-awesome-icon
        :icon="categories[category]?.icon"
        size="lg"
        class="text-gray mr-1"
      />
      <h1 class="text-2xl font-bold text-white my-5">
        {{ categories[category]?.name }}
      </h1>
    </div>

    <div v-if="newsStore.loading" class="text-white">載入中...</div>
    <div v-if="newsStore.error">{{ newsStore.error }}</div>
    <div v-if="!newsStore.loading && !newsStore.error">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          v-for="article in newsStore.articles[category]"
          :key="article.title"
        >
          <div class="bg-black-dark rounded-md">
            <div class="h-48">
              <img
                :src="article.urlToImage"
                :alt="article.title"
                loading="lazy"
                class="rounded-t-md w-full h-full object-cover"
              />
            </div>
            <div class="p-3">
              <p class="text-gray text-xs mb-2">
                {{ formatDate(article.publishedAt) }}
              </p>
              <h2 class="text-white font-bold text-sm">
                {{ article.title }}
              </h2>
            </div>
          </div>

          <!-- <p class="text-gray">{{ article.description }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
