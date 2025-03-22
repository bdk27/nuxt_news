export const useFavoriteNewsStore = defineStore("favoriteNews", () => {
  // 收藏的新聞列表
  const favorites = ref<Article[]>([]);
  // 使用者資料（登入後的資料）
  const user = ref<any>(null);
  const error = ref("");

  // 更新使用者資料
  function setUser(userData: any) {
    user.value = userData;
  }
  // 刪除資料
  function clearUser() {
    const yes = confirm("確定要登出嗎?");
    if (yes) {
      user.value = null;
      favorites.value = [];
    }
  }
  // 檢查是否已收藏
  function isFavorite(title: string): boolean {
    return favorites.value.some((article) => article.title === title);
  }
  // 新增收藏：將 article 存進 favorites
  function addFavorite(article: Article) {
    favorites.value.push(article);
  }
  // 移除收藏：根據 title 移除收藏文章
  function removeFavorite(title: string) {
    favorites.value = favorites.value.filter(
      (article) => article.title !== title
    );
  }
  // 取得收藏文章
  async function fetchArticles() {
    error.value = "";
    try {
      // 如果有登入，則只抓取該使用者的收藏
      if (user.value) {
        const { data, error: fetchError } = await supabase
          .from("nuxt-news-favorite")
          .select("*")
          .eq("user_id", user.value.id);
        if (fetchError) {
          error.value = fetchError.message;
        } else {
          favorites.value = data as Article[];
        }
      }
    } catch (err: any) {
      error.value = err.message;
    }
  }

  return {
    favorites,
    user,
    error,
    setUser,
    isFavorite,
    clearUser,
    addFavorite,
    removeFavorite,
    fetchArticles,
  };
});
