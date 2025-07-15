<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateSponsor">
                {{ $t('new') }}
            </button>
        </div>

        <div class="w-full scrollbar-hide">
            <SponsorCard :sponsors="sponsors" @updateSponsor="handleUpdateSponsor" @removeSponsor="handleRemoveSponsor" />
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

        <SponsorForm v-model:open="showSponsorForm" :showForm="showSponsorForm" @closeForm="showSponsorForm = false" :sponsor="selectedSponsor"
            @updateForm="handleUpdateForm" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, inject } from 'vue';
import { useToast } from '../../components/ui/toast/use-toast';
import type SponsorModel from '../../scripts/model/sponsor/SponsorModel.ts';
import type { Emitter } from 'mitt';
import { retriveSponsorHandler, removeSponsorHandler } from '../../scripts/handler/sponsor/SponsorHandler.ts';

const SponsorForm = defineAsyncComponent(() => import('../../components/form/SponsorForm.vue'));
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));
const SponsorCard = defineAsyncComponent(() => import('../../components/cards/SponsorCard.vue'));

const { toast } = useToast();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const sponsors = ref<SponsorModel[]>([]);
const showConfirmDialog = ref(false);
const showSponsorForm = ref(false);
const selectedSponsor = ref<SponsorModel>({} as SponsorModel);

const handleUpdateSponsor = (banner: any) => {
    if (banner?._id) {
        selectedSponsor.value = banner;
        showSponsorForm.value = true;
    }
};

const onCreateSponsor = () => {
    selectedSponsor.value = {} as SponsorModel;
    showSponsorForm.value = true;
};

const handleUpdateForm = (banner: any) => {
    if (banner && banner.status == 'New') {
        sponsors.value.push(banner);
    } else {
        const index = sponsors.value.findIndex(p => p._id == banner._id);
        if (index !== -1) {
            sponsors.value[index] = (banner) as SponsorModel;
        }
    }
};

const handleRemoveSponsor = (sponsor: SponsorModel) => {
    if (sponsor?._id) {
        selectedSponsor.value = sponsor;
        showConfirmDialog.value = true;
    }
};

const onLoadSponsors = async () => {
    // Define Function
    try {
        emitter?.emit("stateLoading", true);
        const { data, statusCode } = await retriveSponsorHandler()
        
        if (statusCode == 200) {
            sponsors.value = data
        }
    } catch (error) {
        console.error(error);
    } finally {
            emitter?.emit("stateLoading", false);
    }
};

const handleConfirm = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { statusCode } = await removeSponsorHandler(selectedSponsor.value as SponsorModel);
        if (statusCode == 200) {
            sponsors.value = sponsors.value.filter(p => p._id !== selectedSponsor?.value?._id);
            toast({ title: 'Item Deleted', description: 'The item has been deleted.', variant: 'success' });
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

onMounted(async () => {
    await onLoadSponsors();
});
</script>
