<template>
    <Select v-model="selectedPosition" required class="w-full" inert>
      <SelectTrigger>
        <SelectValue :value="selectedPosition" required :rules="[validationRules.required]"
          :placeholder="$t('select_position')" />
      </SelectTrigger>
      <SelectContent class="bg-white">
        <SelectGroup>
          <SelectItem v-for="(position, index) in positionList" :key="index" :value="position._id || ''">
            {{ position.en.title }} - {{ position.kh.title }}
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
} from "../ui/select";
import { ref, watch } from "vue";
import { validationRules } from '@/utils/validationRule.ts'
import type Position from "../../scripts/model/position/PositionModel.ts";

// Define Props
const props = defineProps({
  positionList: {
    type: Array as () => Position[],
    required: true,
  },
  initPosition: {
    type: String,
    required: false,
  },
});

// Define Variables
const selectedPosition = ref<string>(props.initPosition as string);

// Emit event
const emit = defineEmits(["positionChange"]);

// Watch for changes in selectedPosition and emit event
watch(selectedPosition, (value: string) => {
    if (value) emit("positionChange", value);
});

// Watch for changes in initPosition and update selectedPosition accordingly
// Define Watch
watch(
  () => [props.initPosition, props.positionList],
  () => {
    if (props.initPosition) {
      selectedPosition.value = props.initPosition;
    }
  },
  { immediate: true }
);
</script>
