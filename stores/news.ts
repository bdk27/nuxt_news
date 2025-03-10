import { ref } from "vue";
import { defineStore } from "pinia";

export const useNewsStore = defineStore("news", () => {
  const articles = ref<Array<any>>([]);
  const loading = ref(false);
  const error = ref<null | string>(null);

  async function fetchNews(category = "general") {
    loading.value = true;
    error.value = null;
    try {
      const apiKey = "5f6d37a17372422c85dce09b898d6090";
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "ok") {
        articles.value = data.articles;
        console.log(articles.value);
      } else {
        error.value = data.message || "取得新聞失敗...";
      }
    } catch (err: any) {
      error.value = err.message || "取得新聞失敗...";
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
