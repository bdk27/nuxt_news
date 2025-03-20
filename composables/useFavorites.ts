import { supabase } from "~/utils/supabase";

// 儲存收藏新聞
export const saveToFavorites = async (
  userId: string,
  newsItem: { title: string; url: string }
) => {
  const { data, error } = await supabase.from("nuxt-news-favorites").insert([
    {
      user_id: userId,
      title: newsItem.title,
      url: newsItem.url,
    },
  ]);
  return { data, error };
};

// 取消收藏新聞
// export const removeFromFavorites = async (userId: string, title: string) => {
//   const { data, error } = await supabase
//     .from("nuxt-news-favorites")
//     .delete()
//     .eq("user_id", userId)
//     .eq("title", title);
//   return { data, error };
// };

// 取得收藏新聞列表
// export const getFavorites = async (userId: string) => {
//   const { data, error } = await supabase
//     .from("nuxt-news-favorites")
//     .select("*")
//     .eq("user_id", userId);
//   return { data, error };
// };
