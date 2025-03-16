<script setup lang="ts">
const route = useRoute();
const newsStore = useEverythingNewsStore();

const category = computed<string>(() => route.params.id as string);
const categories = {
  general: { name: "綜合", icon: "fa-location-dot", color: "#007BFF" },
  business: { name: "商業", icon: "fa-briefcase", color: "#FF8C00" },
  entertainment: { name: "娛樂", icon: "fa-ticket", color: "#E91E63" },
  health: { name: "健康", icon: "fa-syringe", color: "#28A745" },
  science: { name: "科學", icon: "fa-flask", color: "#6F42C1" },
  sports: { name: "體育", icon: "fa-basketball", color: "#DC3545" },
  technology: { name: "科技", icon: "fa-microchip", color: "#17A2B8" },
};

onMounted(() => {
  newsStore.fetchEverythingNews(category.value);
});
</script>

<template>
  <div>
    <div class="flex items-center px-3">
      <div
        class="mr-1 rounded-full text-white flex items-center justify-center w-[30px] h-[30px]"
        :style="{ background: categories[category as keyof typeof categories]?.color }"
      >
        <font-awesome-icon
          :icon="categories[category as keyof typeof categories]?.icon"
          size="lg"
        />
      </div>

      <h1 class="text-2xl font-bold text-white my-5">
        {{ categories[category as keyof typeof categories]?.name }}
      </h1>
    </div>

    <VNewsList
      :category="category"
      :articles="newsStore.articles[category]"
      :loading="newsStore.loading"
      :error="newsStore.error ?? undefined"
    />
  </div>
</template>

<style scoped></style>
