export const useFavoriteNewsStore = defineStore(
  "favoriteNews",
  () => {
    // 收藏的新聞列表
    const favoriteArticles = ref<{ id: string; article: any }[]>([]);

    // 添加新聞到收藏
    function addFavoriteArticle(article: { id: string; article: any }) {
      // 檢查是否已經收藏過
      const exists = favoriteArticles.value.some(
        (fav) => fav.id === article.id
      );
      if (!exists) {
        favoriteArticles.value.push(article);
      }
    }

    // 從收藏中移除新聞
    function removeFavoriteArticle(articleId: string) {
      favoriteArticles.value = favoriteArticles.value.filter(
        (fav) => fav.id !== articleId
      );
    }

    // 檢查是否已收藏
    function isFavorite(articleId: string): boolean {
      return favoriteArticles.value.some((fav) => fav.id === articleId);
    }

    return {
      favoriteArticles,
      addFavoriteArticle,
      removeFavoriteArticle,
      isFavorite,
    };
  },
  {
    persist: true,
  }
);
