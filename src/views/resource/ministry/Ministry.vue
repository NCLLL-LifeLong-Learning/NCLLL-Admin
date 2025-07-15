<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateMinistry">
                {{ $t('new') }}
            </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 p-2 lg:grid-cols-4 gap-3 overflow-x-auto scrollbar-hide">
            <MinistryCard v-for="(ministry, index) in ministries" :key="index" :ministry="ministry" @updateMinistry="handleUpdateMinistry"
                @removeMinistry="handleRemoveMinistry" />
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

        <MinistryForm v-model:open="showMinistryForm" :showForm="showMinistryForm" @closeForm="showMinistryForm = false" :ministry="selectedMinistry"
            @updateForm="handleUpdateForm" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, inject } from 'vue';
import { useToast } from '../../../components/ui/toast/use-toast.ts';
import type MinistryModel from '../../../scripts/model/ministry/MinistryModel.ts';
import type { Emitter } from 'mitt';
import { retriveMinistryHandler, removeMinistryHandler } from '../../../scripts/handler/ministry/MinistryHandler.ts';

const MinistryForm = defineAsyncComponent(() => import('../../../components/form/MinistryForm.vue'));
const ConfirmDialog = defineAsyncComponent(() => import('../../../components/custom/ConfirmDialog.vue'));
const MinistryCard = defineAsyncComponent(() => import('../../../components/cards/MinistryCard.vue'));

const { toast } = useToast();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const ministries = ref<MinistryModel[]>([]);
const showConfirmDialog = ref(false);
const showMinistryForm = ref(false);
const selectedMinistry = ref<MinistryModel>({} as MinistryModel);

const handleUpdateMinistry = (ministry: any) => {
    if (ministry?._id) {
        selectedMinistry.value = ministry;
        showMinistryForm.value = true;
    }
};

const onCreateMinistry = () => {
    selectedMinistry.value = {} as MinistryModel;
    showMinistryForm.value = true;
};

const handleUpdateForm = (ministry: any) => {
    if (ministry && ministry.status == 'New') {
        ministries.value.push(ministry);
    } else {
        const index = ministries.value.findIndex(p => p._id == ministry._id);
        if (index !== -1) {
            ministries.value[index] = (ministry) as MinistryModel;
        }
    }
};

const handleRemoveMinistry = (ministry: MinistryModel) => {
    if (ministry?._id) {
        selectedMinistry.value = ministry;
        showConfirmDialog.value = true;
    }
};

const onLoadMinistries = async () => {
    // Define Function
    try {
        emitter?.emit("stateLoading", true);
        const { data, statusCode } = await retriveMinistryHandler()
        
        if (statusCode == 200) {
            ministries.value = data
        }
    } catch (error) {
        console.error(error);
    } finally {
            emitter?.emit("stateLoading", false);
    }
};

const handleConfirm = async () => {
    try{
        emitter?.emit("stateLoading", true);
        const { statusCode, message } = await removeMinistryHandler(selectedMinistry.value as MinistryModel);
        if (statusCode == 200) {
            ministries.value = ministries.value.filter(p => p._id !== selectedMinistry?.value?._id);
            toast({ title: 'Item Deleted', description: 'The item has been deleted.', variant: 'success' });
        }else{
            toast({ title: 'Something went wrong', description: message, variant: 'warning' });

        }
    }catch(error){
        console.error(error);
    }finally{
            emitter?.emit("stateLoading", false);
    }
};

const handleCancel = () => {
    toast({ title: 'Item Not Deleted', description: 'The item has not been deleted.', variant: 'warning' });
};

onMounted(async () => {
    await onLoadMinistries();
});
</script>
