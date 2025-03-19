<script setup lang="ts">
import { supabase } from "~/utils/supabase";

const isLoginFlag = ref(true);
const signInOrUp = ref("signup");
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const showPassword = ref(false);

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

//使用信箱登入
async function signInWithEmailLink() {
  errorMsg.value = "";
  if (!email.value.trim()) return;

  const { error } = await supabase.auth.signInWithOtp({
    email: email.value.trim(),
  });
  if (error) {
    errorMsg.value = error.message;
  } else {
    email.value = "";
    alert("請檢查你的信箱以取得登入連結");
  }
}

//使用google登入
async function signInWithGoogle() {
  errorMsg.value = "";
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) errorMsg.value = error.message;
}
</script>

<template>
  <div class="flex items-center justify-center mt-10">
    <div class="w-[400px]">
      <h2 class="text-2xl font-bold text-white text-center mb-10">會員中心</h2>
      <div v-if="signInOrUp === 'signin'">
        <div>
          <label for="id" class="text-white">使用者名稱:</label>
          <input
            type="email"
            name="id"
            v-model="email"
            class="bg-white p-3 outline-none rounded w-full"
            placeholder="請輸入電子郵件"
          />
          <button
            class="w-full p-3 mt-3 rounded bg-blue text-white cursor-pointer hover:bg-blue-dark"
            @click="signInWithEmailLink(email)"
          >
            登入
          </button>
        </div>
        <div>
          <div class="flex items-center my-4">
            <div class="flex-grow border-t border-gray"></div>
            <span class="mx-2 text-gray">或</span>
            <div class="flex-grow border-t border-gray"></div>
          </div>
          <button
            @click="signInWithGoogle"
            class="p-3 bg-white w-full mt-3 rounded flex items-center justify-center gap-2 hover:bg-gray cursor-pointer"
          >
            <img src="/logo_google.svg" alt="google" class="w-[20px]" />
            使用Google帳號登入
          </button>
        </div>
        <p
          class="text-white text-center mt-3 cursor-pointer"
          @click="() => (signInOrUp = 'signup')"
        >
          立即註冊 <font-awesome-icon icon="fa-solid fa-arrow-right" />
        </p>
        <p class="text-red-500 text-center p-2">{{ errorMsg }}</p>
      </div>
      <div v-if="signInOrUp === 'signup'">
        <div>
          <label for="id" class="text-white">使用者名稱:</label>
          <input
            type="email"
            name="id"
            v-model="email"
            class="bg-white p-3 outline-none rounded w-full"
            placeholder="請輸入電子郵件"
          />
        </div>
        <div class="mt-3 relative">
          <label for="password" class="text-white">密碼:</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            name="password"
            v-model="password"
            class="bg-white p-3 outline-none rounded w-full pr-10"
            placeholder="請輸入密碼"
          />
          <font-awesome-icon
            v-if="showPassword"
            icon="fa-solid fa-eye"
            class="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            @click="toggleShowPassword"
          />
          <font-awesome-icon
            v-else
            icon="fa-solid fa-eye-slash"
            class="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            @click="toggleShowPassword"
          />
        </div>
        <button
          class="w-full p-3 mt-5 rounded bg-blue text-white cursor-pointer hover:bg-blue-dark"
          @click="signInWithEmailLink(email)"
        >
          註冊
        </button>
        <p
          class="text-white text-center mt-3 cursor-pointer"
          @click="() => (signInOrUp = 'signin')"
        >
          前往登入 <font-awesome-icon icon="fa-solid fa-arrow-right" />
        </p>
      </div>
    </div>
  </div>
  <!-- <button v-if="userId" @click="signOut">登出</button>
  <button v-else @click="signInWithGoogle">使用 Google 登入</button> -->

  <!-- <div class="p-5">
    <div
      v-if="newsStore.favoriteArticles.length === 0"
      class="text-white text-center text-2xl"
    >
      尚未收藏任何新聞
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold text-white my-5">
        我的收藏 ({{ newsStore.favoriteArticles.length }}篇)
      </h1>
      <VNewsList
        :articles="newsStore.favoriteArticles.map((fav: any) => fav.article)"
        :loading="false"
        :error="undefined"
      />
    </div>
  </div> -->
</template>

<style scoped></style>
