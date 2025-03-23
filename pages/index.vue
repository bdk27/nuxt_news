<script setup lang="ts">
const headlinesNewsStore = useHeadlinesNewsStore();
const router = useRouter();

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
  headlinesNewsStore.fetchHeadlinesNews(Object.keys(categories));
});
// 跳轉其他頁面
function navigateToCategory(categoryKey: string) {
  router.push(`/news/${categoryKey}`);
}
</script>

<template>
  <div>
    <VSearchRecords />
    <div
      v-for="(categoryName, categoryKey) in categories"
      :key="categoryKey"
      class="my-5"
    >
      <h2 class="text-2xl font-bold text-white capitalize mb-1">
        {{ categoryName }}
      </h2>
      <VNewsList
        :category="categoryKey"
        :articles="headlinesNewsStore.headlinesArticles[categoryKey]"
        :loading="headlinesNewsStore.loading"
        :error="headlinesNewsStore.error ?? undefined"
      />
      <div class="text-center">
        <VButton @click="navigateToCategory(categoryKey)" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
