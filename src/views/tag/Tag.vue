<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-end items-center rounded-md pb-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateTag">
                {{ $t('new') }}
            </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 p-2 gap-3 overflow-x-auto scrollbar-hide">
            <TagCard v-for="(tag, index) in tags" :key="index" :tag="tag" @updateTag="handleUpdateTag"
                @removeTag="handleRemoveTag" />
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

        <TagForm v-model:open="showTagForm" :showForm="showTagForm" @closeForm="showTagForm = false" :tag="selectedTag"
            @updateForm="handleUpdateForm" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, inject, watch } from 'vue';
import { useToast } from '../../components/ui/toast/use-toast.ts';
import type TagModel from '../../scripts/model/tag/TagModel.ts';
import type { Emitter } from 'mitt';
import { removeTagHandler } from '../../scripts/handler/tag/TagHandler.ts';

const TagForm = defineAsyncComponent(() => import('../../components/form/TagForm.vue'));
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));
const TagCard = defineAsyncComponent(() => import('../../components/cards/TagCard.vue'));

const props = defineProps({
    tagList: {
        type: Array as () => TagModel[],
        required: true,
    },
});

const { toast } = useToast();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const tags = ref<TagModel[]>(props.tagList as TagModel[]);
const showConfirmDialog = ref(false);
const showTagForm = ref(false);
const selectedTag = ref<TagModel>({} as TagModel);

const handleUpdateTag = (tag: any) => {
    if (tag?._id) {
        selectedTag.value = tag;
        showTagForm.value = true;
    }
};

const onCreateTag = () => {
    selectedTag.value = {} as TagModel;
    showTagForm.value = true;
};

const handleUpdateForm = (tag: any) => {
    if (tag && tag.status == 'New') {
        tags.value.push(tag);
    } else {
        const index = tags.value.findIndex(p => p._id == tag._id);
        if (index !== -1) {
            tags.value[index] = (tag) as TagModel;
        }
    }
};

const handleRemoveTag = (tag: TagModel) => {
    if (tag?._id) {
        selectedTag.value = tag;
        showConfirmDialog.value = true;
    }
};

const handleConfirm = async () => {
    try{
        emitter?.emit("stateLoading", true);
        const { statusCode, message } = await removeTagHandler(selectedTag.value as TagModel);
        if (statusCode == 200) {
            tags.value = tags.value.filter(p => p._id !== selectedTag?.value?._id);
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

watch(
    () => props.tagList,
    () => {
        tags.value = props.tagList as TagModel[];
    },
    { immediate: true }
);
</script>
