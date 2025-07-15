<template>
  <Select v-model="selectedResourceLang" required class="w-full">
    <SelectTrigger>
      <SelectValue class="capitalize" :rules="[validationRules.required]" required :value="selectedResourceLang" :placeholder="$t('select_language')" />
    </SelectTrigger>
    <SelectContent class="bg-white">
      <SelectGroup>
        <SelectItem v-for="(resource, index) in ResourceLangList" :key="index" :value="resource || ''">
          <span class="uppercase">{{ resource }}</span>
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
import { ResourceLanguage } from "../../scripts/enum/ResourceType.ts";

// Define Props
const props = defineProps({
  initResourceLang: {
    type: String,
    required: false,
  },
});

// Define Variables
const ResourceLangList = Object.values(ResourceLanguage);
const selectedResourceLang = ref<string>(props.initResourceLang as string);

// Emit event
const emit = defineEmits(["resourceLangChange"]);

// Watch for changes in selectedResourceLang and emit event
watch(selectedResourceLang, (value: string) => {
    if (value) emit("resourceLangChange", value);
});

// Watch for changes in initResourceLang and update selectedResourceLang accordingly
// Define Watch
watch(
  () => [props.initResourceLang],
  () => {
    if (props.initResourceLang) {
      selectedResourceLang.value = props.initResourceLang;
    }
  },
  { immediate: true }
);
</script>
