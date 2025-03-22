<script setup lang="ts">
const router = useRouter();
const favoriteNewsStore = useFavoriteNewsStore();

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
const errorMsg = ref("");

// onMounted(() => {
//   favoriteNewsStore.fetchFavorites();
// });

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
//收藏(取消)文章
async function toggleFavorite(article: Article) {
  // 查無資料
  if (!article || !article.title) {
    return;
  }
  // 如果尚未登入，導向登入頁
  if (!favoriteNewsStore.user) {
    router.push("/user");
    return;
  }

  // 查詢資料庫中是否存在該收藏記錄
  if (favoriteNewsStore.isFavorite(article.title)) {
    // 如果已收藏，則刪除該筆記錄 (從 DB)
    const { error: deleteError } = await supabase
      .from("nuxt-news-favorite")
      .delete()
      .eq("user_id", favoriteNewsStore.user.id)
      .eq("title", article.title);
    if (deleteError) {
      errorMsg.value = deleteError.message;
      return;
    }
    // 從 store 移除該收藏
    favoriteNewsStore.removeFavorite(article.title);
    alert("已取消收藏！");
  } else {
    // 如果尚未收藏，則插入新記錄 (到 DB)
    const { data: insertData, error: insertError } = await supabase
      .from("nuxt-news-favorite")
      .insert([
        {
          user_id: favoriteNewsStore.user.id,
          title: article.title,
          published_at: article.publishedAt,
          source: article.source.name,
          author: article.author || "anonymous",
          url: article.url,
          description: article.description || "more...",
          urlToImage: article.urlToImage,
        },
      ]);
    if (insertError) {
      errorMsg.value = insertError.message;
      return;
    }
    // 將整個 article 物件存入 store 收藏列表
    favoriteNewsStore.addFavorite(article);
    alert("收藏成功！");
  }
}
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="flex items-center justify-center text-white text-center text-lg"
    >
      <svg
        class="w-5 h-5 animate-spin mr-3 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
      載入中...
    </div>
    <div v-if="error" class="text-white text-center text-lg">{{ error }}</div>
    <div v-if="!loading && !error">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="article in articles"
          :key="article.title"
          class="bg-black-dark rounded-md flex flex-col cursor-pointer shadow hover:shadow-gray transition-shadow group"
          @click="navigateToArticle(article.url)"
        >
          <div class="relative h-48 overflow-hidden rounded-t-md">
            <img
              :src="article.urlToImage || '/default-image.jpg'"
              :alt="article.title"
              loading="lazy"
              class="rounded-t-md w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
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
                class="text-gray hover:text-amber-300"
                @click.stop="toggleFavorite(article)"
              >
                <font-awesome-icon
                  icon="fa-solid fa-star"
                  size="lg"
                  class="hover:text-amber-300 cursor-pointer"
                  :class="
                    favoriteNewsStore.isFavorite(article.title)
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
