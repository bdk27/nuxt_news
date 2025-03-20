export const useFavoriteNewsStore = defineStore("favoriteNews", () => {
  // 收藏的新聞列表
  const favorites = ref<string[]>([]);

  // 使用者資料（登入後的資料）
  const user = ref<any>(null);
  // 更新使用者資料
  function setUser(userData: any) {
    user.value = userData;
  }

  function clearUser() {
    const yes = confirm("確定要登出嗎?");
    if (yes) {
      user.value = null;
      favorites.value = [];
    }
  }

  const fetchUser = async () => {
    const { data: user } = await supabase.auth.getUser();
    userId.value = user?.user?.id || "";
  };

  // 檢查是否已收藏
  const isFavorite = (title: string) => {
    return favorites.value.includes(title);
  };

  // 獲取收藏新聞
  // async function fetchFavorites() {
  //   const { data } = await getFavorites(userId.value);
  //   if (data) {
  //     favorites.value = data.map((item) => item.title);
  //   }
  // }

  // async function toggleFavorite(article: { title: string; url: string }) {
  //   if (isFavorite(article.title)) {
  //     // 取消收藏
  //     await removeFromFavorites(userId.value, article.title);
  //     favorites.value = favorites.value.filter((t) => t !== article.title);
  //   } else {
  //     // 加入收藏
  //     await saveToFavorites(userId.value, article);
  //     favorites.value.push(article.title);
  //   }
  // }

  return {
    favorites,
    user,
    isFavorite,
    setUser,
    clearUser,
    // fetchFavorites,
    // toggleFavorite,
  };
});
