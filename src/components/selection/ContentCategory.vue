<template>
  <Select v-model="selectedCategory"  required class="w-full">
    <SelectTrigger>
      <SelectValue class="capitalize" :disabled="isBanner" :rules="[validationRules.required]" required :value="selectedCategory" :placeholder="$t('select_language')" />
    </SelectTrigger>
    <SelectContent class="bg-white">
      <SelectGroup>
        <SelectItem v-for="(category, index) in ContentCategoryList" :key="index" :value="category || ''">
          <span class="uppercase">{{ category }}</span>
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
import { ContentCategory } from "@/scripts/enum/ResourceType.ts";

// Define Props
const props = defineProps({
  initContentCategory: {
    type: String,
    required: false,
  },
});

// Define Variables
const isBanner = ref<boolean>(false);
const ContentCategoryList = Object.values(ContentCategory);
const selectedCategory = ref<string>(props.initContentCategory as string);

// Emit event
const emit = defineEmits(["contentCategoryChange"]);

// Watch for changes in selectedCategory and emit event
watch(selectedCategory, (value: string) => {
  if (value) emit("contentCategoryChange", value);
});

// Watch for changes in initResourceLang and update selectedCategory accordingly
// Define Watch
watch(
  () => [props.initContentCategory],
  () => {
    if (props.initContentCategory) {
      if(props.initContentCategory.toLowerCase() === 'banner') isBanner.value = true
      selectedCategory.value = props.initContentCategory;
    }
  },
  { immediate: true }
);
</script>
