<script setup lang="ts">
const favoriteNewsStore = useFavoriteNewsStore();
const searchRecordsStore = useSearchRecordsStore();

onMounted(() => {
  getUserData();
});
watch(
  () => favoriteNewsStore.user,
  async (newUser, oldUser) => {
    if (newUser) {
      searchRecordsStore.setUserId(newUser.id);
      await searchRecordsStore.fetchSearchRecords();
    }
  },
  { immediate: true }
);
// 取得user資料
async function getUserData() {
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    favoriteNewsStore.setUser(data.user);
    favoriteNewsStore.fetchArticles();
  }
}
</script>

<template>
  <NuxtLayout />
</template>

<style></style>
