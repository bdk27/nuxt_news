// server/api/news.ts
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  // 取得 URL 查詢參數，預設 category 為 general
  const { category = "general" } = getQuery(event);

  // 從 runtime config 取得私有的 API key
  const config = useRuntimeConfig();
  const apiKey = config.newsApiKey;

  // 組合 NewsAPI 請求 URL（這裡以台灣為例）
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  // 發送請求到 NewsAPI
  const res = await fetch(url);
  if (!res.ok) {
    // 若請求失敗，可直接拋出錯誤
    throw new Error(`News API error: ${res.statusText}`);
  }
  const data = await res.json();

  // 將結果返回給前端
  return data;
});
