<template>
  <Select v-model="selectedMainCategory" required class="w-full">
    <SelectTrigger>
      <SelectValue class="capitalize" :rules="[validationRules.required]" required :value="selectedMainCategory"  />
    </SelectTrigger>
    <SelectContent class="bg-white">
      <SelectGroup>
        <SelectItem v-for="(userTab, index) in userHomeTab" :key="index" :value="userTab || ''">
          <span class="uppercase">{{ userTab }}</span>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select/index.ts";
import { ref, watch } from "vue";
import { validationRules } from '@/utils/validationRule.ts'
import { UserHomeTab } from "../../scripts/enum/ResourceType.ts";

// Define Props
const props = defineProps({
  initMainCategory: {
    type: String,
    required: false,
  },
});

// Define Variables
const userHomeTab = Object.values(UserHomeTab);
const selectedMainCategory = ref<string>(props.initMainCategory as string);

// Emit event
const emit = defineEmits(["mainCategoryChange"]);

// Watch for changes in selectedMainCategory and emit event
watch(selectedMainCategory, (value: string) => {
  if (value) emit("mainCategoryChange", value);
});

// Watch for changes in initMainCategory and update selectedMainCategory accordingly
// Define Watch
watch(
  () => [props.initMainCategory],
  () => {
    if (props.initMainCategory) {
      selectedMainCategory.value = props.initMainCategory;
    }
  },
  { immediate: true }
);
</script>
