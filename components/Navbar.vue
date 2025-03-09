<script setup lang="ts">
const router = [
  { name: "首頁", path: "/" },
  { name: "商業", path: "/news/business" },
  { name: "娛樂", path: "/news/entertainment" },
  { name: "綜合", path: "/news/general" },
  { name: "健康", path: "/news/health" },
  { name: "科學", path: "/news/science" },
  { name: "體育", path: "/news/sports" },
  { name: "科技", path: "/news/technology" },
  { name: "測試", path: "/news/test" },
];
</script>

<template>
  <div class="container mx-auto shadow p-3">
    <h1 class="text-xl">News新聞網</h1>
    <nav class="flex justify-start space-x-4 overflow-x-scroll mt-3">
      <NuxtLink
        v-for="item in router"
        :key="item.name"
        :to="item.path"
        class="whitespace-nowrap font-bold"
        >{{ item.name }}</NuxtLink
      >
      <!-- <NuxtLink to="/view/123">View 123</NuxtLink> -->
    </nav>
  </div>
</template>

<style scoped></style>
