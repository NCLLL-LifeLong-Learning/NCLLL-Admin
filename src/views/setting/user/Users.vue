<template>
  <div class="h-full w-full overflow-auto">
    <div class="flex justify-between items-center rounded-md pb-2 gap-2">
      <button class="bg-green-600 rounded-md px-5 py-2" @click="$router.go(-1)">
        {{ $t("back") }}
      </button>
      <div class="flex justify-center items-center gap-2">
        <UserRole :initialRoles="userRolesList" />
        <button
          class="bg-green-600 rounded-md px-5 py-2"
          @click="onSelectUser('NEW', null)"
        >
          {{ $t("new") }}
        </button>
      </div>
    </div>

    <div class="w-full bg-white h-[75vh] overflow-auto">
      <Table class="w-full bg-white">
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">
              {{ $t("no") }}
            </TableHead>
            <TableHead>{{ $t("name") }}</TableHead>
            <TableHead>{{ $t("role") }}</TableHead>
            <TableHead>{{ $t("email") }}</TableHead>
            <TableHead>{{ $t("status") }}</TableHead>
            <TableHead class="text-right">
              {{ $t("action") }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(user, index) in usersList" :key="index">
            <TableCell class="font-medium">
              {{
                paginate.current_page > 1
                  ? (paginate.current_page - 1) * paginate.items_per_page +
                    index +
                    1
                  : index + 1
              }}
            </TableCell>
            <TableCell :class="{ 'font-bold': isCurrentUser(user) }">{{ user.name }} {{ isCurrentUser(user) ? "(You)" : "" }}</TableCell>
            <TableCell>{{ user.role.code }}</TableCell>
            <TableCell>{{ user.email }}</TableCell>
            <TableCell>{{ user.is_active ? "Active" : "Inactive" }}</TableCell>
            <TableCell class="flex justify-end gap-2">
              <button
              v-if="user.role.code !== 'admin'"
                class="bg-green-600 rounded-md px-5 py-2"
                @click="onSelectUser('UPDATE', user)"
              >
                {{ $t("update") }}
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white py-2 shadow-md flex justify-center"
    >
      <CustomPagination v-model:meta="paginate" @pageChange="onPaginateChange">
      </CustomPagination>
    </div>

    <UserForm
      v-model:open="showUserForm"
      :userRoles="userRolesList"
      :isCurrentUser="isCheckUser"
      :showForm="showUserForm"
      @closeForm="showUserForm = $event"
      :user="initUser"
      @updateForm="handleUpdateForm"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent, computed } from "vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  userListHandler,
  userRoleHandler,
} from "../../../scripts/handler/auth/AuthHandler.ts";
import type PaginationModel from "@/scripts/model/pagination/PaginationModel.ts";
import { useMainStore } from "../../../stores/useMainStore.ts";

// DEFINE COMPONENT
const CustomPagination = defineAsyncComponent({
  loader: () => import("@/components/custom/Pagination.vue"),
  delay: 300,
  timeout: 3000,
});

const UserForm = defineAsyncComponent({
  loader: () => import("@/components/form/UserForm.vue"),
  delay: 300,
  timeout: 3000,
});

const UserRole = defineAsyncComponent({
  loader: () => import("./Roles.vue"),
  delay: 300,
  timeout: 3000,
});

// DEFINE VARIABLE
const mainStore = useMainStore();
const showUserForm = ref<boolean>(false);
const initUser = ref<any>({});

const usersList = ref<any>([]);
const userRolesList = ref<any>([]);
const paginate = ref<PaginationModel>({} as PaginationModel);
const currentPage = ref<number>(1);
const isCheckUser = ref<boolean>(false);

// DEFINE FUNCTION
const onSelectUser = (option: string, user: any) => {
  if (option == "UPDATE") {
    initUser.value = user;
    isCheckUser.value = isCurrentUser(user);
  } else {
    initUser.value = {} as any;
    isCheckUser.value = false;
  }
  showUserForm.value = true;
};

const onLoadUserList = async () => {
  try {
    const { data, statusCode } = await userListHandler({
      limit: 10,
      page: currentPage.value,
    });

    if (statusCode == 200) {
      paginate.value = data.meta as PaginationModel;
      if((currentUser.value && currentUser.value.role && currentUser.value.role.code == "admin")){
        usersList.value = data.results;
      }else{
        usersList.value = data.results.filter(
        (p: any) => p.role.code !== "admin"
      ) as any;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const handleUpdateForm = (user: any) => {
  if (user.status == "New") {
    usersList.value.push({
      ...user,
      password: null,
    });
  } else {
    const index = usersList.value.findIndex(
      (item: any) => item._id == user._id
    );
    usersList.value[index] = {
      ...user,
      password: null,
    };
  }
};

const onLoadUserRoleList = async () => {
  try {
    const { data, statusCode } = await userRoleHandler();

    if (statusCode == 200) {
      userRolesList.value = data as any;
    }
  } catch (error) {
    console.error(error);
  }
};

const onPaginateChange = async (page: number) => {
  if (!isNaN(page)) {
    currentPage.value = page;
    await onLoadUserList();
  }
};

const isCurrentUser = (user: any) => {
  if (user.email == currentUser.value.email && user.name == currentUser.value.name) {
    return true;
  } else {
    return false;
  }
};


// COMPUTE
const currentUser = computed(() => mainStore.$state?.user);

onMounted(async () => {
  await onLoadUserList();
  await onLoadUserRoleList();
});
</script>
