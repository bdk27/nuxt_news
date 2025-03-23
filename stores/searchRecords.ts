export interface SearchRecord {
  id: string;
  query: string;
  created_at: string;
  user_id: string;
}
export const useSearchRecordsStore = defineStore("searchRecords", () => {
  const records = ref<SearchRecord[]>([]);
  const userId = ref<string | null>(null);
  const error = ref("");

  // 當 userId 改變時，自動清空或抓取最新資料
  watch(userId, async (newVal, oldVal) => {
    if (newVal) {
      await fetchSearchRecords();
    } else {
      records.value = [];
    }
  });
  // 設定 userId，當設定時清空原有紀錄
  function setUserId(newUserId: string | null) {
    records.value = [];
    userId.value = newUserId;
  }
  // 取得搜尋紀錄
  async function fetchSearchRecords() {
    error.value = "";
    if (!userId.value) return;

    try {
      const { data, error: fetchError } = await supabase
        .from("nuxt-news-searchRecords")
        .select("id, query, created_at, user_id")
        .eq("user_id", userId.value)
        .order("created_at", { ascending: true });

      if (fetchError) {
        error.value = fetchError.message;
        return;
      } else {
        records.value = data as SearchRecord[];
      }
    } catch (err: any) {
      error.value = err.message;
    }
  }
  // 新增一筆搜尋紀錄
  async function insertSearchRecord(query: string) {
    error.value = "";
    try {
      const { data: existingRecords, error: selectError } = await supabase
        .from("nuxt-news-searchRecords")
        .select("id, created_at")
        .eq("user_id", userId.value)
        .order("created_at", { ascending: true });
      if (selectError) {
        error.value = selectError.message;
        return;
      }
      // 如果已有 10 筆或以上，先刪除最舊的一筆
      if (existingRecords && existingRecords.length >= 10) {
        const oldestRecordId = existingRecords[0].id;
        const { error: deleteError } = await supabase
          .from("nuxt-news-searchRecords")
          .delete()
          .eq("id", oldestRecordId);
        if (deleteError) {
          error.value = deleteError.message;
          return;
        }
        // 同步更新 store：刪除最舊的紀錄
        records.value.shift();
      }

      const { data: newRecord, error: insertError } = await supabase
        .from("nuxt-news-searchRecords")
        .insert([{ user_id: userId.value, query }])
        .select();

      if (insertError) {
        error.value = insertError.message;
      }
      if (newRecord && newRecord.length > 0) {
        // 將新紀錄加入 store
        records.value.push(newRecord[0] as SearchRecord);
      }
    } catch (err: any) {
      error.value = err.message;
    }
  }

  return {
    records,
    error,
    setUserId,
    fetchSearchRecords,
    insertSearchRecord,
  };
});
