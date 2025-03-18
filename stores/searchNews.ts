export const useSearchNewsStore = defineStore("searchNews", () => {
  const articles = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<null | string>(null);

  async function fetchSearchNews(keyword: string) {
    if (loading.value) return; // 防止重複請求

    loading.value = true;
    error.value = null;
    articles.value = [];

    try {
      const url = `/api/search?keyword=${encodeURIComponent(keyword)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "ok") {
        articles.value = [...data.articles];
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
    fetchSearchNews,
  };
});
