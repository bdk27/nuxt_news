import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { keyword = "" } = getQuery(event);
  const config = useRuntimeConfig();
  const apiKey = config.public.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    keyword as string
  )}&apiKey=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
});
