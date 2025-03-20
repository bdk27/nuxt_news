export const useFavoriteNewsStore = defineStore("favoriteNews", () => {
  // 收藏的新聞列表
  const favorites = ref<string[]>([]);
  const userId = ref<string>("");

  const fetchUser = async () => {
    const { data: user } = await supabase.auth.getUser();
    userId.value = user?.user?.id || "";
  };

  // 檢查是否已收藏
  const isFavorite = (title: string) => {
    return favorites.value.includes(title);
  };

  // 獲取收藏新聞
  // const fetchFavorites = async () => {
  //   const { data } = await getFavorites(userId.value);
  //   if (data) {
  //     favorites.value = data.map((item) => item.title);
  //   }
  // };

  // const toggleFavorite = async (article: { title: string; url: string }) => {
  //   if (isFavorite(article.title)) {
  //     // 取消收藏
  //     await removeFromFavorites(userId.value, article.title);
  //     favorites.value = favorites.value.filter((t) => t !== article.title);
  //   } else {
  //     // 加入收藏
  //     await saveToFavorites(userId.value, article);
  //     favorites.value.push(article.title);
  //   }
  // };

  // onMounted(async () => {
  //   await fetchUser();
  //   await fetchFavorites();
  // });

  return {
    favorites,
    isFavorite,
    // fetchFavorites,
    // toggleFavorite,
  };
});
