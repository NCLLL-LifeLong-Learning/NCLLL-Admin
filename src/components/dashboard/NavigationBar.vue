<template>
  <nav class="shadow-sm flex items-center w-full justify-between px-4 fixed z-40 top-0 bg-background/80 backdrop-blur-lg"
    :style="{ width: store.navWidth, height: `${store.navHeight}px`, opacity: store.sidebarExpanded ? 1 : 0 }">
    <div class="flex">
      <h1 class="text-lg font-semibold">{{ route.meta.title }}</h1>
      <!-- <GlobalSearch/> -->
    </div>
    <div class="flex">
      <!-- <DarkMode /> -->
      <DropDownSetting />
    </div>
  </nav>
</template>

<script setup>
import { Icon } from '@iconify/vue'
// import DarkMode from "@/components/DarkMode.vue";
import { useAppStore } from "../../stores/useAppConfig";
// import GlobalSearch from '../GlobalSearch.vue';
// import UserNavigation from '../UserNavigation.vue';
import { ref } from "vue";
import { useRoute } from 'vue-router';

import DropDownSetting from "@/components/custom/DropDownSetting.vue";

// Init store
const store = useAppStore();
const route = useRoute();
</script>
