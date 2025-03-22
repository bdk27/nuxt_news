<script setup lang="ts">
const favoriteNewsStore = useFavoriteNewsStore();

onMounted(() => {
  getUserData();
});
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
