<template>
  <div class="flex flex-col items-center justify-center h-screen border-2">
    <div class="clamp(min(35%, 90%) shadow-lg rounded-3xl">
      <div class="flex justify-center items-center">
        <img src="@/assets/images/NCLLL_Logo.png" alt="logo" class="w-1/3  rounded-t-3xl" />
      </div>
      <form @submit.prevent="handleLogin" class="relative rounded-b-3xl flex flex-col bg-white p-10">
        <h1 class="text-2xl font-bold mb-5">{{ $t("login") }}</h1>
        <div class="mb-5 w-full">
          <label for="username" class="block">{{ $t("username") }}</label>
          <input type="text" v-model="loginForm.username" required
            class="font-sans w-full bg-gray-50 px-4 py-2 border rounded-md" />
        </div>
        <div class="w-full mb-5">
          <label for="password" class="block">{{ $t("password") }}</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" autocomplete="off" v-model="loginForm.password" required
              class="font-sans w-full bg-gray-50 px-4 py-2 border rounded-md" />
            <button type="button" @click="toggleShowPassword" class="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Icon :icon="showPassword ? 'mdi:eye' : 'mdi:eye-off'" />
            </button>
          </div>
        </div>
        
        <div class="mt-5">
          <button type="submit"
            class=" w-full bg-green-600 text-black font-bold py-2 px-4 rounded-md">
            {{ $t("login") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Swal from 'sweetalert2'
import { Icon } from "@iconify/vue";
import type LoginModel from "../../scripts/model/auth/AuthModel.ts";
import { userLoginHandler } from "../../scripts/handler/auth/AuthHandler.ts";
import { useI18n } from "vue-i18n";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import type { Emitter } from 'mitt';
import { useToast } from '../../components/ui/toast/use-toast';

const { t } = useI18n();
const router = useRouter();
const { toast } = useToast();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const loginForm = ref<LoginModel>({} as LoginModel);
const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async (e: { preventDefault: () => void }) => {
  try {
    e.preventDefault();
    emitter?.emit("stateLoading", true);
    const { message, data, statusCode } = await userLoginHandler(loginForm.value);
      emitter?.emit("stateLoading", false);
      if (statusCode !== 200 || data && data == null) {
        toast({
          title: t("error"),
          variant: "destructive",
          description: message as string,
        });
      } else {
        toast({
          variant: "success",
          title: t("success"),
          description: message as string,
        });
        setTimeout(() => {
          router.push({ name: "Dashboard" });
        }, 500);
      }
  } catch (error) {
    console.log(error);
  }
};
</script>