<script setup lang="ts">
const favoriteNewsStore = useFavoriteNewsStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const isLoading = ref(false);

// 取得user資料
async function getUserData() {
  if (favoriteNewsStore.user) return;

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    favoriteNewsStore.setUser(data.user);
  }
}
getUserData();

// 顯示/關閉密碼
const showPassword = ref(false);
function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}
// 切換登入/註冊
const authMode = ref<"login" | "register">("login");
function toggleAuthMode(mode: "login" | "register") {
  email.value = "";
  password.value = "";
  authMode.value = mode;
}
// 註冊
async function register() {
  errorMsg.value = "";
  if (!email.value.trim() || !password.value.trim()) {
    errorMsg.value = "請輸入電子郵件與密碼";
    return;
  }

  isLoading.value = true;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value.trim(),
      password: password.value.trim(),
    });
    console.log("data", data);
    if (error) {
      errorMsg.value = error.message;
    } else {
      alert("註冊成功，請檢查您的信箱以驗證帳號");
      // 切換到登入模式
      authMode.value = "login";
    }
  } catch (err) {
    errorMsg.value = "發生錯誤，請稍後再試";
  } finally {
    isLoading.value = false;
  }
}
// 登入
async function login() {
  errorMsg.value = "";
  if (!email.value.trim() || !password.value.trim()) {
    errorMsg.value = "請輸入電子郵件與密碼";
    return;
  }

  isLoading.value = true;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value.trim(),
    });
    console.log(data);

    if (error) {
      errorMsg.value = error.message;
    } else {
      favoriteNewsStore.setUser(data.user);
      router.push("/");
    }
  } catch (err) {
    console.error(err);
    errorMsg.value = "發生錯誤，請稍後再試";
  } finally {
    isLoading.value = false;
  }
}
// 登出
async function logout() {
  isLoading.value = true;
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      errorMsg.value = error.message;
    } else {
      favoriteNewsStore.clearUser();
    }
  } catch (err) {
    errorMsg.value = "發生錯誤，請稍後再試";
  } finally {
    isLoading.value = false;
  }
}

//使用google登入
// async function signInWithGoogle() {
//   errorMsg.value = "";
//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//   });
//   if (error) errorMsg.value = error.message;
// }
</script>

<template>
  <div class="flex items-center justify-center mt-10">
    <div class="w-[400px]">
      <div v-if="!favoriteNewsStore.user">
        <h2 class="text-2xl font-bold text-white text-center mb-5">
          {{ authMode === "login" ? "登入" : "註冊" }}
        </h2>
        <!-- 錯誤訊息 -->
        <div
          v-show="errorMsg"
          class="flex items-center justify-center mb-3 gap-1"
        >
          <font-awesome-icon
            icon="fa-solid fa-triangle-exclamation"
            class="text-amber-300"
          />
          <p class="text-amber-300 text-center rounded">
            {{ errorMsg }}
          </p>
        </div>
        <!-- 登入 -->
        <form v-if="authMode === 'login'" @submit.prevent="login">
          <div>
            <label for="id" class="text-white">使用者名稱:</label>
            <input
              type="email"
              name="id"
              v-model="email"
              class="bg-white p-3 outline-none rounded w-full"
              autocomplete="off"
              placeholder="請輸入電子郵件"
            />
            <div class="mt-3 relative">
              <label for="password" class="text-white">密碼:</label>
              <input
                :type="showPassword ? 'text' : 'password'"
                name="password"
                v-model="password"
                class="bg-white p-3 outline-none rounded w-full pr-10"
                autocomplete="off"
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
              type="submit"
              class="w-full p-3 mt-5 rounded bg-blue text-white cursor-pointer hover:bg-blue-dark"
            >
              登入
            </button>
          </div>
          <!-- <div>
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
        </div> -->
          <p
            class="text-white text-center mt-3 cursor-pointer"
            @click="toggleAuthMode('register')"
          >
            立即註冊 <font-awesome-icon icon="fa-solid fa-arrow-right" />
          </p>
        </form>
        <!-- 註冊 -->
        <form v-if="authMode === 'register'" @submit.prevent="register">
          <div>
            <label for="id" class="text-white">使用者名稱:</label>
            <input
              type="email"
              name="id"
              v-model="email"
              class="bg-white p-3 outline-none rounded w-full"
              autocomplete="off"
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
              autocomplete="off"
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
            type="submit"
            class="w-full p-3 mt-5 rounded bg-blue text-white cursor-pointer hover:bg-blue-dark"
          >
            註冊
          </button>
          <p
            class="text-white text-center mt-3 cursor-pointer"
            @click="toggleAuthMode('login')"
          >
            前往登入 <font-awesome-icon icon="fa-solid fa-arrow-right" />
          </p>
        </form>
      </div>
      <div v-else>
        <div class="flex items-center justify-center mb-5">
          <div
            class="w-20 h-20 bg-gray p-5 rounded-full flex items-center justify-center"
          >
            <font-awesome-icon
              icon="fa-solid fa-user"
              class="text-4xl text-black-light"
            />
          </div>
        </div>

        <h2
          class="text-lg md:text-xl lg:text-2xl font-bold text-white text-center mb-5"
        >
          {{ favoriteNewsStore.user.email }}，您好 !
        </h2>
        <div
          class="flex flex-col md:flex-row items-center justify-center gap-3"
        >
          <button
            class="w-full p-3 mt-5 rounded bg-blue text-white cursor-pointer hover:bg-blue-dark"
            @click="() => router.push('/myNews')"
          >
            查看所有收藏
          </button>
          <button
            class="w-full p-3 mt-5 rounded border border-blue text-white cursor-pointer hover:bg-blue box-border transform duration-300"
            @click="logout"
          >
            登出
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 載入中 -->
  <div
    v-if="isLoading"
    class="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 pointer-events-auto"
    style="background-color: rgba(0, 0, 0, 0.6)"
  >
    <!-- Spinner -->
    <div
      class="w-16 h-16 border-8 border-t-white border-gray-300 rounded-full animate-spin"
    ></div>
    <!-- Loading 文字 -->
    <p class="mt-4 text-white text-xl">載入中...</p>
  </div>
</template>

<style scoped></style>
