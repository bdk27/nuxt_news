<script setup lang="ts">
const router = useRouter();

const categoryRouter = [
  { name: "首頁", path: "/" },
  { name: "綜合", path: "/news/general" },
  { name: "商業", path: "/news/business" },
  { name: "娛樂", path: "/news/entertainment" },
  { name: "健康", path: "/news/health" },
  { name: "科學", path: "/news/science" },
  { name: "體育", path: "/news/sports" },
  { name: "科技", path: "/news/technology" },
];
</script>

<template>
  <div class="bg-black-dark w-full px-3 py-3 md:px-0">
    <div class="container mx-auto">
      <div class="flex items-center justify-between md:justify-center">
        <h1 class="text-2xl text-white md:text-center">
          <span class="font-bold">News</span> 新聞網
        </h1>
        <div class="md:hidden">
          <font-awesome-icon
            icon="fa-solid fa-user"
            size="lg"
            class="text-white"
            @click="() => router.push('/user')"
          />
        </div>
      </div>

      <nav
        class="flex justify-start space-x-6 overflow-x-scroll md:overflow-hidden mt-3 md:justify-center"
      >
        <NuxtLink
          v-for="item in categoryRouter"
          :key="item.name"
          :to="item.path"
          class="whitespace-nowrap font-bold text-gray hover:text-white"
          :class="{
            'border-white border-b-2 text-white': $route.path === item.path,
          }"
          >{{ item.name }}</NuxtLink
        >
        <div class="hidden md:block border-l-1 border-gray pl-5 h-6">
          <font-awesome-icon
            icon="fa-solid fa-user"
            size="lg"
            class="text-white cursor-pointer hover:text-gray"
            @click="() => router.push('/user')"
          />
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped></style>
