import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { category = "general" } = getQuery(event);
  const config = useRuntimeConfig();
  const apiKey = config.public.NEWS_API_KEY;

  // 正式環境使用假資料
  if (process.env.NODE_ENV !== "development") {
    const articles = [];
    for (let i = 1; i <= 12; i++) {
      articles.push({
        title: `Mock Article ${i}`,
        urlToImage: "/default-image.jpg",
        publishedAt: new Date().toISOString(),
        author: `Mock Author ${i}`,
        source: { name: `Mock Source ${i}` },
        description: "這是一篇假資料文章，僅供開發練習用。",
        content: `這裡是模擬內容 ${i}...`,
        url: `https://example.com/mock${i}`,
      });
    }
    return {
      status: "ok",
      totalResults: 6,
      articles,
    };
  }

  // 組成 NewsAPI 的 URL
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    category as string
  )}&apiKey=${apiKey}`;

  // 從 NewsAPI 取得資料
  const res = await fetch(url);
  const data = await res.json();
  return data;
});
