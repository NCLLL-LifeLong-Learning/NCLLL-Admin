<template>
  <Select v-model="selectedResourceType" required class="w-full">
    <SelectTrigger>
      <SelectValue
        required
        class="capitalize"
        :rules="[validationRules.required]"
        :value="selectedResourceType"
        :placeholder="$t('select_type')"
      />
    </SelectTrigger>
    <SelectContent class="bg-white">
      <SelectGroup>
        <SelectItem
          v-for="(resource, index) in ResourceList"
          :key="index"
          :value="resource || ''"
        >
          <span class="capitalize">{{ resource }}</span>
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
import { validationRules } from "@/utils/validationRule.ts";
import { ResourceType } from "../../scripts/enum/ResourceType.ts";

// Define Props
const props = defineProps({
  initResourceType: {
    type: String,
    required: false,
  },
});

// Define Variables
const ResourceList = Object.values(ResourceType);
const selectedResourceType = ref<string>(props.initResourceType as string);

// Emit event
const emit = defineEmits(["resourceTypeChange"]);

// Watch for changes in selectedResourceType and emit event
watch(selectedResourceType, (value: string) => {
  if (value) {
    emit("resourceTypeChange", value);
  }
});

// Watch for changes in initResourceType and update selectedResourceType accordingly
// Define Watch
watch(
  () => [props.initResourceType],
  () => {
    if (props.initResourceType) {
      selectedResourceType.value = props.initResourceType;
    }
  },
  { immediate: true }
);
</script>
