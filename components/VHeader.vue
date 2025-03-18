<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <div
    class="fixed z-10 top-0 left-0 bg-black-dark w-full px-3 py-3 md:px-0 border-b-[0.5px] border-gray"
  >
    <div class="container mx-auto">
      <div class="flex items-center justify-between">
        <h1 class="hidden md:block text-2xl text-white md:text-center">
          <span class="font-bold">News</span> 新聞網
        </h1>
        <VNav class="hidden lg:block" />
        <VSearchInput />
        <div class="md:hidden block">
          <font-awesome-icon
            icon="fa-solid fa-user"
            size="lg"
            class="text-white cursor-pointer hover:text-gray ml-5"
            @click="() => router.push('/user')"
          />
        </div>
      </div>

      <VNav class="lg:hidden" />
    </div>
  </div>

  <!-- 占位元素，為 Header 留出空間 -->
  <div class="h-[100px] lg:h-[72px]"></div>
</template>

<style scoped></style>
