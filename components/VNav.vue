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
  <nav
    class="flex items-center md:justify-start lg:justify-center space-x-6 overflow-x-scroll md:overflow-hidden mt-3 lg:mt-0"
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
    <div class="border-l-1 border-gray pl-5 h-6 hidden md:inline-block">
      <div class="flex items-center justify-center">
        <div>
          <font-awesome-icon
            icon="fa-solid fa-user"
            size="lg"
            class="text-white cursor-pointer hover:text-gray"
            @click="() => router.push('/user')"
          />
        </div>
        <div class="ml-4 group">
          <p
            class="text-white hidden md:block ml-1 cursor-pointer group-hover:text-gray"
            @click="() => router.push('/myNews')"
          >
            <font-awesome-icon
              icon="fa-solid fa-heart"
              class="text-white group-hover:text-red-400 text-md"
            />
            我的新聞
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
