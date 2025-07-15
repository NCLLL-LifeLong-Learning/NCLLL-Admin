<template>
  <div>
    <Dialog :open="showForm" @update:open="emit('update:open', $event)">
      <DialogContent class="sm:max-w-[625px] bg-white">
        <DialogHeader>
          <DialogTitle>{{ $t("user") }}</DialogTitle>
          <DialogDescription>
            {{ $t("user_form_desc") }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4 py-4">
            <div>
              <!-- Name Field -->
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{
                  $t("name")
                }}</Label>
                <Input v-model="user.name" required class="col-span-3" />
              </div>
              <!-- Name Field -->
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="email" class="text-left mb-1">{{
                  $t("email")
                }}</Label>
                <Input
                  v-model="user.email"
                  type="email"
                  required
                  class="col-span-3"
                />
              </div>
            </div>

            <div>
              <div class="flex flex-col items-start justify-center mb-4" v-if="!isCURRENT">
                <Label for="role" class="text-left mb-1">{{
                  $t("role")
                }}</Label>
                <Select v-model="user.role" required class="w-full">
                  <SelectTrigger>
                    <SelectValue
                      :value="user.role"
                      required
                      :placeholder="$t('select_role')"
                    />
                  </SelectTrigger>
                  <SelectContent class="bg-white max-h-[200px]">
                    <SelectGroup>
                      <SelectItem
                        v-for="(role, index) in userRolesList"
                        :key="index"
                        :value="role._id"
                      >
                        {{ role.name }} - {{ role.code }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col items-start justify-center mb-4" >
                <Label for="password" class="text-left mb-1">{{
                  $t("password")
                }}</Label>
                <Input v-model="user.password" required class="col-span-3" />
              </div>
            </div>
            <div class="flex flex-col items-start justify-center mb-4" v-if="!isCURRENT">
                <Label for="role" class="text-left mb-1">{{
                  $t("status")
                }}</Label>
                <Select required v-model="userStatus" class="w-full capitalize" @onChange="onChangeStatus">
                  <SelectTrigger>
                    <SelectValue
                      :value="userStatus"
                      required
                      :placeholder="$t('select_role')"
                    />
                  </SelectTrigger>
                  <SelectContent class="bg-white max-h-[200px]" >
                    <SelectGroup>
                      <SelectItem value="ACTIVE" class="capitalize">{{ $t('active') }}</SelectItem>
                      <SelectItem value="INACTIVE">{{ $t('inactive') }}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" @click="$emit('closeForm')">
              Cancel
            </Button>
            <Button type="submit" variant="outline">{{ $t("save") }}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, computed } from "vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog/index.ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select/index.ts";
import { Button } from "../ui/button/index.ts";
import { Input } from "../ui/input/index.ts";
import { Label } from "../ui/label/index.ts";
import { useToast } from "../ui/toast/use-toast.ts";
import { useI18n } from "vue-i18n";
import type { Emitter } from "mitt";
import {
  userCreateHandler,
  userUpdateHandler,
} from "../../scripts/handler/auth/AuthHandler.ts";

const props = defineProps({
  userRoles: {
    type: Object,
    required: true,
  },
  isCurrentUser: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  showForm: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emitter = inject<Emitter<{ [event: string]: unknown }>>("emitter");
const { t } = useI18n();
const { toast } = useToast();

interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  role: string;
}

// Define Variable
const isCURRENT = ref<boolean>(false);
const user = ref<User>({} as User);
const showForm = ref<boolean>(false);
const status = ref<string>("New");
const userRolesList = ref<any>([]);

// Define props and emits
const emit = defineEmits(["update:open", "updateForm", "closeForm"]);

// Define methods

const onHandleSummitForm = async () => {
  if (status.value == "New") {
    await onHandleCreateUser();
  } else {
    await onHandleUpdateUser();
  }
  user.value = {} as any;
};

const onChangeStatus = (valueStatus: string) => {
  user.value.is_active = valueStatus === "ACTIVE" ? true : false;
};

const onHandleUpdateUser = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data, message, statusCode } = await userUpdateHandler(
      user.value as any
    );

    if (statusCode == 200) {
      emit("updateForm", {
        ...data,
        status: status.value,
      });
      toast({
        description: t("update_user_success"),
        variant: "success",
        title: t("success"),
      });
      emit("closeForm");
    } else {
      toast({
        title: "Something went wrong",
        description: message,
        variant: "warning",
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    emitter?.emit("stateLoading", false);
  }
};

const onHandleCreateUser = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data, message, statusCode } = await userCreateHandler(
      user.value as User
    );

    if (statusCode == 200 && data) {
      emit("updateForm", {
        ...data,
        status: status.value,
      });
      toast({
        description: t("create_user_success"),
        variant: "success",
        title: t("success"),
      });
      emit("closeForm");
    } else {
      toast({
        title: "Something went wrong",
        description: message,
        variant: "warning",
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    emitter?.emit("stateLoading", false);
  }
};

const userStatus = computed(() => {
  if (user.value.is_active == true) {
    return "ACTIVE";
  } else {
    return "INACTIVE";
  }
})

// Define Watch
watch(
  () => [props.user, props.showForm],
  () => {
    if (props.user && props.user._id && props.user._id) {
      user.value = JSON.parse(JSON.stringify({
        ...props.user,
        id: props.user._id as string,
        role: props.user.role._id as string
      })) as User;
      status.value = "Update";
    } else {
      user.value = {
        name: "",
        email: "",
        password: "",
        is_active: true,
        role: "",
      } as User;
      status.value = "New";
    }
    showForm.value = props.showForm;
  },
  { immediate: true }
);

watch(
  () => props.userRoles,
  () => {
    if (props.userRoles) {
      userRolesList.value = props.userRoles as any;
    }
  },
  { immediate: true }
);

watch(
  () => props.isCurrentUser,
  () => {
    isCURRENT.value = props.isCurrentUser;
  },
  { immediate: true }
);
</script>
