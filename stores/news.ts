import { ref } from "vue";
import { defineStore } from "pinia";

export const useNewsStore = defineStore("news", () => {
  // 所有文章列表
  const articles = ref<{ [key: string]: any[] }>({});
  // 頭條文章列表
  const headlinesArticles = ref<{ [key: string]: any[] }>({});
  // 當前文章
  const currentArticle = ref<{ id: string; article: any } | null>(null);

  const loading = ref(false);
  const error = ref<null | string>(null);
  const apiKey = "5f6d37a17372422c85dce09b898d6090";

  // fetch所有新聞
  async function fetchEverythingNews(category = "general") {
    if (articles.value[category]) {
      return; // 如果已經有資料，則不再發送請求
    }

    loading.value = true;
    error.value = null;
    try {
      const url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}`;
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
  // fetch熱門新聞
  async function fetchHeadlinesNews(categories: string[]) {
    loading.value = true;
    error.value = null;
    try {
      const requests = categories.map(async (category) => {
        if (!headlinesArticles.value[category]) {
          const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&pageSize=6`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.status === "ok") {
            headlinesArticles.value[category] = data.articles;
          } else {
            throw new Error(data.message || "取得新聞失敗，請稍後再試...");
          }
        }
      });
      await Promise.all(requests);
    } catch (err: any) {
      error.value = err.message || "取得新聞失敗，請稍後再試...";
    } finally {
      loading.value = false;
    }
  }
  // 暫存當前文章
  function setCurrentArticle(data: { id: string; article: any }) {
    currentArticle.value = data;
  }

  return {
    articles,
    headlinesArticles,
    currentArticle,
    loading,
    error,
    fetchEverythingNews,
    fetchHeadlinesNews,
    setCurrentArticle,
  };
});
