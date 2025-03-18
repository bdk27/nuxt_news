import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { category = "general" } = getQuery(event);
  const config = useRuntimeConfig();
  const apiKey = config.public.NEWS_API_KEY;

  // 組成 NewsAPI 的 URL
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    category as string
  )}&apiKey=${apiKey}`;

  // 從 NewsAPI 取得資料
  const res = await fetch(url);
  const data = await res.json();
  return data;
});
