<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <div class="bg-black-dark w-full px-3 py-3 md:px-0">
    <div class="container mx-auto">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl text-white md:text-center">
          <span class="font-bold">News</span> 新聞網
        </h1>
        <VNav class="hidden lg:block" />
        <VSearchInput class="hidden md:block" />
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
</template>

<style scoped></style>
