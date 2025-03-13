<script setup lang="ts">
const newsStore = useNewsStore();

const categories = {
  general: "綜合",
  business: "商業",
  entertainment: "娛樂",
  health: "健康",
  science: "科學",
  sports: "體育",
  technology: "科技",
};

onMounted(() => {
  Object.keys(categories).forEach((category) => {
    newsStore.fetchHeadlinesNews(category);
  });
});
</script>

<template>
  <div>
    <div
      v-for="(categoryName, categoryKey) in categories"
      :key="categoryKey"
      class="my-5"
    >
      <h2 class="text-2xl font-bold text-white capitalize mb-1">
        {{ categoryName }}
      </h2>
      <NewsList
        :category="categoryKey"
        :articles="newsStore.headlinesArticles[categoryKey]"
        :loading="newsStore.loading"
        :error="newsStore.error ?? undefined"
      />
      <div class="text-center">
        <button
          class="text-gray mt-3 text-center text-lg hover:text-white cursor-pointer"
        >
          查看更多文章
          <font-awesome-icon icon="fa-solid fa-caret-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
