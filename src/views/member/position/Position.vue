<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreatePosition">
                {{ $t('new') }}
            </button>
        </div>

        <div class="w-full scrollbar-hide">
            <PositionCard :positions="positions" @updatePosition="handleUpdatePosition"
                @removePosition="handleRemovePosition" />
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

        <PositionForm v-model:open="showPositionForm" :showForm="showPositionForm"
            @closeForm="showPositionForm = false" :position="selectedPosition" @updateForm="handleUpdateForm" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, inject } from 'vue';
import { useToast } from '../../../components/ui/toast/use-toast';
import type PositionModel from '../../../scripts/model/position/PositionModel.ts';
import type { Emitter } from 'mitt';
import { removePositionHandler } from '../../../scripts/handler/position/PositionHandler.ts';

const PositionForm = defineAsyncComponent(() => import('../../../components/form/PositionForm.vue'));
const ConfirmDialog = defineAsyncComponent(() => import('../../../components/custom/ConfirmDialog.vue'));
const PositionCard = defineAsyncComponent(() => import('../../../components/cards/PositionCard.vue'));

const props = defineProps({
    positionList: {
        type: Array<PositionModel>,
        required: true
    }
})
const { toast } = useToast();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const positions = ref<PositionModel[]>(props.positionList as PositionModel[]);
const showConfirmDialog = ref(false);
const showPositionForm = ref(false);
const selectedPosition = ref<PositionModel>({} as PositionModel);

const handleUpdatePosition = (banner: any) => {
    if (banner?._id) {
        selectedPosition.value = banner;
        showPositionForm.value = true;
    }
};

const onCreatePosition = () => {
    selectedPosition.value = {} as PositionModel;
    showPositionForm.value = true;
};


const handleUpdateForm = (banner: any) => {
    if (banner && banner.status == 'New') {
        positions.value.push(banner);
    } else {
        const index = positions.value.findIndex(p => p._id == banner._id);
        if (index !== -1) {
            positions.value[index] = (banner) as PositionModel;
        }
    }
};

const handleRemovePosition = (position: PositionModel) => {
    if (position?._id) {
        selectedPosition.value = position;
        showConfirmDialog.value = true;
    }
};



const handleConfirm = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { statusCode, message } = await removePositionHandler(selectedPosition.value as PositionModel);
        if (statusCode == 200) {
            positions.value = positions.value.filter(p => p._id !== selectedPosition?.value?._id);
            toast({ title: 'Item Deleted', description: 'The item has been deleted.', variant: 'success' });
        }else{
            toast({ title: 'Something went wrong', description: message, variant: 'warning' });

        }
    } catch (error) {
        console.error(error);
    } finally {
            emitter?.emit("stateLoading", false);
    }
};

const handleCancel = () => {
    toast({ title: 'Item Not Deleted', description: 'The item has not been deleted.', variant: 'warning' });
};
</script>
