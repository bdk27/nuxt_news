<script setup lang="ts">
const searchRecordsStore = useSearchRecordsStore();
const router = useRouter();

function handleRecordClick(record: string) {
  router.push({ path: "/search", query: { q: record } });
}
</script>

<template>
  <div class="flex flex-wrap items-center pt-3 lg:pt-0">
    <h3 class="text-sm text-gray mr-2">搜尋紀錄:</h3>
    <ul class="flex flex-wrap items-center">
      <li
        v-for="record in searchRecordsStore.records"
        :key="record.id"
        class="text-sm text-gray hover:text-white cursor-pointer mr-2 mb-2 md:mb-0"
        @click="handleRecordClick(record.query)"
      >
        {{ record.query }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
