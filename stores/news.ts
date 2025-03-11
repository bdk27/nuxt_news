import { ref } from "vue";
import { defineStore } from "pinia";

export const useNewsStore = defineStore("news", () => {
  const articles = ref<{ [key: string]: any[] }>({});
  const loading = ref(false);
  const error = ref<null | string>(null);

  async function fetchNews(category = "general") {
    if (articles.value[category]) {
      return; // 如果已經有資料，則不再發送請求
    }

    loading.value = true;
    error.value = null;
    try {
      const apiKey = "5f6d37a17372422c85dce09b898d6090";
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "ok") {
        articles.value[category] = data.articles;
      } else {
        error.value = data.message || "取得新聞失敗，請稍後再試...";
      }
    } catch (err: any) {
      error.value = err.message || "取得新聞失敗，請稍後再試...";
    } finally {
      loading.value = false;
    }
  }

  return {
    articles,
    loading,
    error,
    fetchNews,
  };
});
