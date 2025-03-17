<script setup lang="ts"></script>

<template>
  <div class="relative">
    <input
      type="text"
      class="bg-gray-dark p-2 pr-10 outline-none text-white w-full"
      placeholder="搜尋"
    />
    <button class="absolute right-2 top-1/2 transform -translate-y-1/2">
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        size="lg"
        class="text-gray cursor-pointer"
      />
    </button>
  </div>
</template>

<style scoped></style>
