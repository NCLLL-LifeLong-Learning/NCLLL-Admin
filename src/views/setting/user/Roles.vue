<template>
  <div>
    <div class="flex justify-end items-center rounded-md">
      <button class="bg-green-600 rounded-md px-5 py-2" @click="showRoleForm = true">
        {{ $t("roles") }}
      </button>
    </div>

    <Dialog
      v-model:open="showRoleForm"
      class="border rounded-md w-3/5 h-[50vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <DialogContent class="sm:max-w-[620px] bg-white">
        <DialogHeader class="flex flex-col">
          <DialogTitle>{{ $t("user_role") }}</DialogTitle>
        </DialogHeader>
        <div class="overflow-x-auto scrollbar-hide w-full h-[40vh]">
          <Table class="w-full bg-white relative">
            <TableHeader>
              <TableRow>
                <TableHead class="w-[10%]">{{ $t("no") }}</TableHead>
                <TableHead class="w-[50%]">{{ $t("title") }}</TableHead>
                <TableHead class="w-[25%]">{{ $t("code") }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(role, index) in userRoles" :key="index">
                <TableCell class="font-medium">{{ index + 1 }}</TableCell>
                <TableCell>{{ role.name }}</TableCell>
                <TableCell>{{ role.code }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog/index.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const props = defineProps({
  initialRoles: {
    type: Array as () => any[],
    default: () => [],
  },
});

// Define Variable
const userRoles = ref<any>([]);
const showRoleForm = ref<boolean>(false);

watch(
  () => props.initialRoles,
  (newVal) => {
    if  (newVal) {
      userRoles.value = newVal as any;
    }
  },
  { immediate: true, deep: true }
);
</script>
