<script setup lang="ts">
// import { useNewsStore } from "~/stores/news";

const newsStore = useNewsStore();

if (!newsStore.articles.length) {
  newsStore.fetchNews();
  console.log("fetching news: ", newsStore.articles);
}
</script>

<template>
  <NuxtLayout />
</template>

<style></style>
