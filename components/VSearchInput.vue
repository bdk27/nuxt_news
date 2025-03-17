<script setup lang="ts">
const router = useRouter();

const keywords = ref("");

function handleBtnClick() {
  // 判斷關鍵字是否為空
  if (!keywords.value.trim()) return;
  router
    .push({ path: "/search", query: { q: keywords.value.trim() } })
    .then(() => {
      keywords.value = "";
    });
}
</script>

<template>
  <div class="relative">
    <input
      type="text"
      v-model="keywords"
      class="bg-gray-dark p-2 pr-10 outline-none text-white w-full"
      placeholder="搜尋"
    />
    <button
      class="absolute right-2 top-1/2 transform -translate-y-1/2"
      @click="handleBtnClick"
    >
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        size="lg"
        class="text-gray cursor-pointer"
      />
    </button>
  </div>
</template>

<style scoped></style>
