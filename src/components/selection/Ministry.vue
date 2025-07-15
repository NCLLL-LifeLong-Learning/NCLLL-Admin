<template>
    <Select v-model="selectedMinistry" required class="w-full" inert>
      <SelectTrigger>
        <SelectValue :value="selectedMinistry" required :rules="[validationRules.required]"
          :placeholder="$t('select_position')" />
      </SelectTrigger>
      <SelectContent class="bg-white">
        <SelectGroup>
          <SelectItem v-for="(ministry, index) in ministryList" :key="index" :value="ministry._id || ''">
            {{ ministry.en.name }} - {{ ministry.kh.name }}
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
import type MinistryModel from "../../scripts/model/ministry/MinistryModel.ts";

// Define Props
const props = defineProps({
  ministryList: {
    type: Array as () => MinistryModel[],
    required: true,
  },
  initMinistry: {
    type: String,
    required: false,
  },
});

// Define Variables
const selectedMinistry = ref<string>(props.initMinistry as string);

// Emit event
const emit = defineEmits(["ministryChange"]);

// Watch for changes in selectedMinistry and emit event
watch(selectedMinistry, (value: string) => {
    if (value) emit("ministryChange", value);
});

// Watch for changes in initMinistry and update selectedMinistry accordingly
// Define Watch
watch(
  () => [props.initMinistry, props.ministryList],
  () => {
    if (props.initMinistry) {
      selectedMinistry.value = props.initMinistry;
    }
  },
  { immediate: true }
);
</script>
