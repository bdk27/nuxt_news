<script setup lang="ts">
const route = useRoute();
const newsStore = useNewsStore();

const category = computed<string>(() => route.params.id as string);
const categories = {
  general: { name: "綜合", icon: "fa-location-dot" },
  business: { name: "商業", icon: "fa-briefcase" },
  entertainment: { name: "娛樂", icon: "fa-ticket" },
  health: { name: "健康", icon: "fa-syringe" },
  science: { name: "科學", icon: "fa-flask" },
  sports: { name: "體育", icon: "fa-basketball" },
  technology: { name: "科技", icon: "fa-microchip" },
};

onMounted(() => {
  newsStore.fetchEverythingNews(category.value);
  console.log("fetching news: ", newsStore.articles);
});
</script>

<template>
  <div>
    <div class="flex items-center px-3">
      <font-awesome-icon
        :icon="categories[category as keyof typeof categories]?.icon"
        size="lg"
        class="text-gray mr-1"
      />
      <h1 class="text-2xl font-bold text-white my-5">
        {{ categories[category as keyof typeof categories]?.name }}
      </h1>
    </div>

    <NewsList
      :category="category"
      :articles="newsStore.articles[category]"
      :loading="newsStore.loading"
      :error="newsStore.error ?? undefined"
    />
  </div>
</template>

<style scoped></style>
