<template>
  <div class="h-[88vh]">
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{{ $t("maintenance") }}</CardTitle>
        </CardHeader>
        <CardContent>
          <table class="w-full">
            <tbody>
              <tr class="flex justify-between">
                <td class="">
                  <Label for="maintenance">{{ $t("maintenance_mode") }}</Label>
                </td>
                <td>
                  <Switch
                    class="text-[#34C759]"
                    v-model="maintenance_mode"
                    @update:model-value="showConfirmation = true"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
      <ConfirmDialog
        v-model:open="showConfirmation"
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirm-text="Delete"
        cancel-text="Cancel"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </div>
    <div class="mt-2">
      <Card>
        <CardHeader>
          <CardTitle>{{ $t("user") }}</CardTitle>
        </CardHeader>
        <CardContent>
          <table class="w-full">
            <tbody>
              <tr class="flex justify-between">
                <td>
                  <Label for="maintenance">{{ $t("user_management") }}</Label>
                </td>
                <td>
                  <Button variant="outline" @click="$router.push('/users')">
                    {{ $t("manage") }}
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ConfirmDialog from "@/components/custom/ConfirmDialog.vue";
import {
  retriveSettingHandler,
  updateSettingHandler,
} from "@/scripts/handler/auth/AuthHandler.ts";
import { ref, onMounted } from "vue";
import { useToast } from "../../components/ui/toast/use-toast.ts";

const showConfirmation = ref<boolean>(false);
const { toast } = useToast();
const maintenance_mode = ref<boolean>(false);


const handleConfirm = async () => {
  showConfirmation.value = false;
  try {
    const { statusCode, message } = await updateSettingHandler({
      maintenanceMode: maintenance_mode.value,
    });
    if (statusCode == 200) {
      toast({
        title: "Maintenance Mode",
        description: "The Maintenance Mode has been Updated.",
        variant: "success",
      });
    } else {
      toast({
        title: "Something went wrong",
        description: message,
        variant: "warning",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const handleCancel = () => {
  maintenance_mode.value = !maintenance_mode.value;
};

const onLoadSetting = async () => {
  try {
    const { data, statusCode } = await retriveSettingHandler();

    if (statusCode == 200) {
      maintenance_mode.value = data.maintenanceMode;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await onLoadSetting();
});
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

table tr {
  padding: 20px 20px;
  border-bottom: 1px solid #ddd;
}
</style>
