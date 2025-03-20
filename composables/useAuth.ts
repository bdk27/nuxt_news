import { supabase } from "~/utils/supabase";

export const userId = ref<string | null>(null);

//獲取當前登入的使用者
export async function fetchUser() {
  const { data } = await supabase.auth.getUser();
  userId.value = data?.user?.id ?? null;
}

//使用信箱登入
export async function signInWithEmailLink(email: string) {
  if (email === "") return;
  const { error } = await supabase.auth.signInWithOtp({ email: email });
  if (error) {
    console.error("登入失敗:", error.message);
  } else {
    console.log("請檢查你的信箱以取得登入連結");
  }
}

//使用 Google 登入
export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) console.error("登入失敗:", error.message);
}

//登出
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("登出失敗:", error.message);
  userId.value = null;
}
