<script setup lang="ts">
const router = useRouter();
const favoriteNewsStore = useFavoriteNewsStore();
const searchRecordsStore = useSearchRecordsStore();

const keywords = ref("");

async function handleBtnClick() {
  // 判斷關鍵字是否為空
  if (!keywords.value.trim()) return;
  if (favoriteNewsStore.user) {
    await searchRecordsStore.insertSearchRecord(
      favoriteNewsStore.user.id,
      keywords.value.trim()
    );
  }
  router.push({ path: "/search", query: { q: keywords.value.trim() } });
  keywords.value = "";
}
</script>

<template>
  <div class="relative w-full md:w-auto">
    <input
      type="text"
      v-model="keywords"
      class="bg-gray-dark p-2 pr-10 outline-none text-white w-full"
      placeholder="搜尋"
      @keydown.enter="handleBtnClick"
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
