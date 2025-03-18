export const useHeadlinesNewsStore = defineStore("headlinesNews", () => {
  const headlinesArticles = ref<{ [key: string]: any[] }>({});
  const loading = ref(false);
  const error = ref<null | string>(null);

  async function fetchHeadlinesNews(categories: string[]) {
    loading.value = true;
    error.value = null;
    try {
      const requests = categories.map(async (category) => {
        if (!headlinesArticles.value[category]) {
          const url = `/api/headlines?category=${encodeURIComponent(category)}`;
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

  return {
    headlinesArticles,
    loading,
    error,
    fetchHeadlinesNews,
  };
});
