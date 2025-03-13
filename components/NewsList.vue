<script setup lang="ts">
interface Article {
  title: string;
  urlToImage?: string;
  publishedAt: string;
}
const props = defineProps({
  category: {
    type: String,
    default: "general",
  },
  articles: {
    type: Array as PropType<Article[]>,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
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
    <div v-if="loading" class="text-white text-center text-lg">載入中...</div>
    <div v-if="error" class="text-white text-center text-lg">{{ error }}</div>
    <div v-if="!loading && !error">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          v-for="article in articles"
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
    </div>
  </div>
</template>

<style scoped></style>
