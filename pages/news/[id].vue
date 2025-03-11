<script setup lang="ts">
const route = useRoute();
const newsStore = useNewsStore();

const category = computed(() => route.params.id as string);

onMounted(() => {
  newsStore.fetchNews(category.value);
  console.log("fetching news: ", newsStore.articles);
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-red-500">
      News Category: {{ category }}
    </h1>
    <div v-if="newsStore.loading">Loading...</div>
    <div v-if="newsStore.error">{{ newsStore.error }}</div>
    <div v-if="!newsStore.loading && !newsStore.error">
      <div v-for="article in newsStore.articles[category]" :key="article.title">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
