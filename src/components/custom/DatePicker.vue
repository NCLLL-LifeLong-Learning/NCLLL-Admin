<template>
  <VueDatePicker
    v-model="selectedDate"
    model-type="dd.MM.yyyy"
    :placeholder="placeholder"
    :class="{ 'error-border': hasError }"
  />
  <p v-if="hasError" class="text-red-500 text-sm mt-1">
    {{ errorMessage }}
  </p>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

interface Props {
  modelValue?: Date | string | null;
  initDate?: Date | string | null;
  rules?: Array<(value: any) => boolean | string>;
  placeholder?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  initDate: null,
  rules: () => [],
  placeholder: "Select date",
  class: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
  (e: "onDateChange", value: string | null): void;
}>();

const selectedDate = ref<Date | null>(null);
const hasError = ref(false);
const errorMessage = ref<string | null>(null);

onMounted(() => {
  if (props.modelValue) {
    selectedDate.value = typeof props.modelValue === "string" ? new Date(props.modelValue) : props.modelValue;
  } else if (props.initDate) {
    selectedDate.value = typeof props.initDate === "string" ? new Date(props.initDate) : props.initDate;
  }
});

const validateDate = (date: Date | string | null) => {
  if (!props.rules || props.rules.length === 0) return true;

  for (const rule of props.rules) {
    const result = rule(date);
    if (result !== true) {
      errorMessage.value = typeof result === "string" ? result : "Invalid date";
      return false;
    }
  }

  errorMessage.value = null;
  return true;
};

watch(selectedDate, (newDate) => {
  if (props.rules && props.rules.length > 0) {
    hasError.value = !validateDate(newDate);
  }

  emit("update:modelValue", newDate ? newDate.toISOString() : null);
  emit("onDateChange", newDate ? newDate.toISOString() : null);
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && newValue !== selectedDate.value) {
      selectedDate.value = typeof newValue === "string" ? new Date(newValue) : newValue;
    } else if (newValue === null) {
      selectedDate.value = null;
    }
  }
);

watch(
  () => props.initDate,
  (newValue) => {
    if (newValue && !selectedDate.value) {
      selectedDate.value = typeof newValue === "string" ? new Date(newValue) : newValue;

      if (props.rules && props.rules.length > 0) {
        hasError.value = !validateDate(selectedDate.value);
      }

      emit("update:modelValue", selectedDate.value ? selectedDate.value.toISOString() : null);
      emit("onDateChange", selectedDate.value ? selectedDate.value.toISOString() : null);
    }
  }
);
</script>

<style scoped>
.error-border {
  border: 1px solid red !important;
}
</style>

