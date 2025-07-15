<template>
  <Select v-model="selectedResourceType" required class="w-full">
    <SelectTrigger>
      <SelectValue
        class="capitalize"
        :rules="[validationRules.required]"
        :value="selectedResourceType"
        :placeholder="$t('select_type')"
      />
    </SelectTrigger>
    <SelectContent class="bg-white">
      <SelectGroup>
        <SelectItem
          v-for="(resource, index) in SubTypesAdmin"
          :key="index"
          :value="resource || ''"
        >
          <span class="capitalize">{{ resource.replace(/_/g, ' ') }}</span>
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
import { AdminSubType } from "../../scripts/enum/ResourceType.ts";

// Define Props
const props = defineProps({
  initResourceSubType: {
    type: String,
    required: false,
  },
});

// Define Variables
const SubTypesAdmin = Object.values(AdminSubType);
const selectedResourceType = ref<string>(props.initResourceSubType as string);

// Emit event
const emit = defineEmits(["resourceSubTypeChange"]);

// Watch for changes in selectedResourceType and emit event
watch(selectedResourceType, (value: string) => {
    if (value) {
      emit("resourceSubTypeChange", value);
    }
});

// Watch for changes in initResourceSubType and update selectedResourceType accordingly
// Define Watch
watch(
  () => [props.initResourceSubType],
  () => {
    if (props.initResourceSubType) {
      selectedResourceType.value = props.initResourceSubType;
    }
  },
  { immediate: true }
);
</script>
