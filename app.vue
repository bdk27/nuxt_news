<script setup lang="ts">
const favoriteNewsStore = useFavoriteNewsStore();
const searchRecordsStore = useSearchRecordsStore();

onMounted(() => {
  getUserData();
});
// 取得user資料
async function getUserData() {
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    favoriteNewsStore.setUser(data.user);
    favoriteNewsStore.fetchArticles();
    searchRecordsStore.fetchSearchRecords(data.user.id);
  }
}
</script>

<template>
  <NuxtLayout />
</template>

<style></style>
