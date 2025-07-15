<template>
  <Select v-model="selectedTag" required class="w-full" inert multiple>
    <SelectTrigger>
      <SelectValue required  :value="selectedTag" 
        :placeholder="$t('select_tag')" />
    </SelectTrigger>
    <SelectContent class="bg-white">
      <SelectGroup>
        <SelectItem v-for="(tag, index) in tagList" :key="index" :value="tag._id || ''">
          {{ tag.en.name }} - {{ tag.kh.name }}
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
import type TagModel from "@/scripts/model/tag/TagModel.ts";

// Define Props
const props = defineProps({
  tagList: {
    type: Array as () => TagModel[],
    required: true,
  },
  initTag: {
    type: Array,
    required: false,
  },
});

// Define Variables
const selectedTag = ref<any>(props.initTag as any);
// Emit event
const emit = defineEmits(["tagsChange"]);

// Watch for changes in selectedTag and emit event
watch(selectedTag, (value: string) => {
  if (value) emit("tagsChange", value);
});

// Watch for changes in initTag and update selectedTag accordingly
// Define Watch
watch(
  () => [props.initTag, props.tagList],
  () => {
    if (props.initTag) {
      selectedTag.value = props.initTag;
    }
  },
  { immediate: true }
);
</script>
