<script setup lang="ts">
const newsStore = useFavoriteNewsStore();

interface Article {
  title: string;
  urlToImage?: string;
  publishedAt: string;
  author?: string;
  source: {
    name: string;
  };
  description?: string;
  content?: string;
  url: string;
}
const { articles, loading, error } = defineProps({
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
// 調整日期格式(例: 2025-01-01 下午12:00)
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
// 查看完整文章
function navigateToArticle(url: string) {
  window.open(url, "_blank");
}
// (取消)收藏文章
function toggleFavorite(article: Article) {
  const articleData = { id: article.title, article };
  if (newsStore.isFavorite(article.title)) {
    confirm("確定要取消收藏嗎？") &&
      newsStore.removeFavoriteArticle(article.title);
  } else {
    newsStore.addFavoriteArticle(articleData);
  }
}
</script>

<template>
  <div>
    <div v-if="loading" class="text-white text-center text-lg">載入中...</div>
    <div v-if="error" class="text-white text-center text-lg">{{ error }}</div>
    <div v-if="!loading && !error">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="article in articles"
          :key="article.title"
          class="bg-black-dark rounded-md flex flex-col cursor-pointer shadow hover:shadow-gray transition-shadow"
          @click="navigateToArticle(article.url)"
        >
          <div class="relative h-48">
            <img
              :src="article.urlToImage || '/default-image.jpg'"
              :alt="article.title"
              loading="lazy"
              class="rounded-t-md w-full h-full object-cover"
            />
          </div>
          <div class="p-4 flex-grow">
            <div class="mb-3 flex items-center justify-between">
              <div>
                <p class="text-gray text-xs">
                  {{ formatDate(article.publishedAt) }}
                </p>
                <p class="text-xs text-gray">
                  {{ article.source.name }} /
                  {{ article.author || "anonymous" }}
                </p>
              </div>
              <button
                @click.stop="toggleFavorite(article)"
                class="text-gray hover:text-amber-300"
              >
                <font-awesome-icon
                  icon="fa-solid fa-star"
                  size="lg"
                  class="hover:text-amber-300 cursor-pointer"
                  :class="
                    newsStore.isFavorite(article.title)
                      ? 'text-amber-300'
                      : 'text-gray'
                  "
                />
              </button>
            </div>
            <h2 class="text-white font-bold text-md lg:text-lg mb-3">
              {{ article.title }}
            </h2>
            <p class="text-xs md:text-sm text-gray mb-3">
              {{ article.description || "more..." }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
