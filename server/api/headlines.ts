// server/api/headlines.ts
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { category = "general" } = getQuery(event);
  const config = useRuntimeConfig();
  const apiKey = config.public.NEWS_API_KEY;

  // 這裡設 country 為 us、pageSize 為 6，可根據需求調整
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${encodeURIComponent(
    category as string
  )}&apiKey=${apiKey}&pageSize=6`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
});
