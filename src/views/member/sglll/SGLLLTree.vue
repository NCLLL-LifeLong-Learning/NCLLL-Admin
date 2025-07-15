<template>
    <div>
        <div class="flex justify-end items-center rounded-md pb-2 gap-2">
            <button class="bg-green-600 rounded-md px-5 py-2" @click="$router.go(-1)">
                {{ $t('back') }}
            </button>
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateSGLLLTree">
                {{ $t('new') }}
            </button>
        </div>
        <div class="w-full bg-white h-[75vh] overflow-auto">
            <Table class="w-full bg-white">
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[100px]">
                            {{ $t('no') }}
                        </TableHead>
                        <TableHead>{{ $t('term') }}</TableHead>
                        <TableHead>{{ $t('image') }} {{ $t('kh') }}</TableHead>
                        <TableHead>{{ $t('image') }} {{  $t('en') }}</TableHead>
                        <TableHead class="text-right">
                            {{ $t('action') }}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(sglll, index) in sglllTree" :key="index" class="">
                        <TableCell class="font-medium">
                            {{ index + 1 }}
                        </TableCell>
                        <TableCell>{{ sglll.term }} - {{ numberToText(sglll.term) }}</TableCell>
                        <TableCell>
                            <div
                                class="max-w-[12rem] max-h-[6rem] border rounded-md flex justify-center items-center overflow-hidden">
                                <img :src="sglll.image_url_kh" alt="Partner Logo"
                                    class="h-full w-full object-cover bg-cover rounded-md transform transition duration-500 ease-in-out hover:scale-105"
                                    style="object-fit: cover; object-position: center;">
                            </div>
                        </TableCell>
                        <TableCell>
                            <div
                                class="max-w-[12rem] max-h-[6rem] border rounded-md flex justify-center items-center overflow-hidden">
                                <img :src="sglll.image_url_en" alt="Partner Logo"
                                    class="h-full w-full object-cover bg-cover rounded-md transform transition duration-500 ease-in-out hover:scale-105"
                                    style="object-fit: cover; object-position: center;">
                            </div>
                        </TableCell>
                        <TableCell class=" flex items-center justify-end gap-2">
                            <button class="bg-green-600 rounded-md px-5 py-2" @click="onUpdateSGLLLTree(sglll)">
                                {{ $t('update') }}
                            </button>
                            <button class="bg-red-600 rounded-md px-5 py-2" @click="handleRemoveSGLLLTree(sglll)">
                                {{ $t('remove') }}
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
        cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />

        <SGLLLTreeForm v-model:open="showSGLLLForm" :sglllTreeList="sglllTree" :showForm="showSGLLLForm"
            @closeForm="showSGLLLForm = $event" :sglllTree="selectedSGLLL" @updateForm="handleUpdateForm" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject, defineAsyncComponent } from 'vue'
import { retriveSGLLLTreeHandler } from '../../../scripts/handler/member/MemberHandler.ts'
import type { Emitter } from 'mitt';
import { numberToText } from '../../../utils/conversion.ts';
import { removeSGLLLTreeHandler } from '../../../scripts/handler/member/MemberHandler.ts';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../components/ui/table'
import { toast } from '../../../components/ui/toast/use-toast.ts';
// Define Component
const SGLLLTreeForm = defineAsyncComponent({
    loader: () => import('../../../components/form/SGLLLForm.vue'),
})
const ConfirmDialog = defineAsyncComponent({
    loader: () => import('../../../components/custom/ConfirmDialog.vue'),
})

const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const sglllTree = ref([] as any[])
const showSGLLLForm = ref<boolean>(false)
const selectedSGLLL = ref<any>({} as any)
const showConfirmDialog = ref<boolean>(false)

const onLoadSGLLLTree = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { data, statusCode } = await retriveSGLLLTreeHandler()

        if (statusCode == 200) {
            sglllTree.value = data.results
        }
    } catch (error) {
        console.error(error);
    } finally {
        emitter?.emit("stateLoading", false);
    }
}

const handleConfirm = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { statusCode, message } = await removeSGLLLTreeHandler(selectedSGLLL.value as any);
        if (statusCode == 200) {
            sglllTree.value = sglllTree.value.filter(p => p._id !== selectedSGLLL?.value?._id);
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


const onCreateSGLLLTree = () => {
    selectedSGLLL.value = {}
    showSGLLLForm.value = true
}

const handleRemoveSGLLLTree = (member: any) => {
    if (member?._id) {
        selectedSGLLL.value = member;
        showConfirmDialog.value = true;
    }
};

const onUpdateSGLLLTree = (member: any) => {
    selectedSGLLL.value = member as any
    showSGLLLForm.value = true
}

const handleUpdateForm = (member: any) => {
    try {
        if (member && member.status == 'New') {
            sglllTree.value.push(member as any);
        } else {
            const index = sglllTree.value.findIndex(p => p._id === member._id);
            if (index !== -1) {
                sglllTree.value[index] = (member) as any;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

onMounted(async () => {
    await onLoadSGLLLTree()
})
</script>