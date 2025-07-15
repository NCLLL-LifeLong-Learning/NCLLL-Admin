<template>
    <div class="h-full w-full overflow-auto">
        <div class="flex justify-between items-center rounded-md pb-2">
            <button class="bg-green-600 text-white rounded-md px-5 py-2" @click="onNavigation">
                {{ $t('sglll') }}
            </button>
            <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateMember">
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
                        <TableHead>{{ $t('name') }}</TableHead>
                        <TableHead>{{ $t('name_kh') }}</TableHead>
                        <TableHead class="text-right">
                            {{ $t('action') }}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(member, index) in memberList" :key="index">
                        <TableCell class="font-medium">
                            {{ index + 1 }}
                        </TableCell>
                        <TableCell>{{ member.en.name }}</TableCell>
                        <TableCell>{{ member.kh.name }}</TableCell>
                        <TableCell class=" flex justify-end gap-2">
                            <button class="bg-green-600 rounded-md px-5 py-2" @click="onUpdateMember(member)">
                                {{ $t('update') }}
                            </button>
                            <button class="bg-red-600 rounded-md px-5 py-2" @click="handleRemoveMember(member)">
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

        <MemberForm v-model:open="showMemberForm" :memberList="memberList" :showForm="showMemberForm"
            @closeForm="showMemberForm = $event" :member="selectedMember" @updateForm="handleUpdateForm" />
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, inject, defineAsyncComponent } from 'vue';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table'

import type MemberModel from '../../scripts/model/member/MemberModel.ts'
import { retriveMemberHandler, removeMemberHandler } from '../../scripts/handler/member/MemberHandler.ts'
import type { Emitter } from 'mitt';
import { useRouter } from 'vue-router';
import { toast } from '../../components/ui/toast/use-toast.ts';

// Define Component
const MemberForm = defineAsyncComponent({
    loader: () => import('../../components/form/MemberForm.vue'),
    loadingComponent: { template: '<div>Loading...</div>' },
    delay: 300,
    timeout: 3000
})
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));

// Define Event
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const router = useRouter();

// Define Varible
const showConfirmDialog = ref(false);
const memberList = ref<MemberModel[]>([] as MemberModel[])
const showMemberForm = ref<boolean>(false)
const selectedMember = ref<MemberModel>({} as MemberModel)


// Define Function
const onNavigation = () => {
    router.push({
        name: 'SGLLL'
    })
}

const onLoadMember = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { data, statusCode } = await retriveMemberHandler()
        
        if (statusCode == 200) {
            memberList.value = data
        }
    } catch (error) {
        console.error(error);
    } finally {
            emitter?.emit("stateLoading", false);
    }
}

const handleRemoveMember = (member: MemberModel) => {
    if (member?._id) {
        selectedMember.value = member;
        showConfirmDialog.value = true;
    }
};

const handleConfirm = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { statusCode, message } = await removeMemberHandler(selectedMember.value as MemberModel);
        if (statusCode == 200) {
            memberList.value = memberList.value.filter(p => p._id !== selectedMember?.value?._id);
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

const onCreateMember = () => {
    selectedMember.value = {} as MemberModel
    showMemberForm.value = true
}

const onUpdateMember = (member: MemberModel) => {
    selectedMember.value = member as MemberModel
    showMemberForm.value = true
}

const handleUpdateForm = (member: any) => {
   try {
       if (member && member.status == 'New') {
           memberList.value.push(member as MemberModel);
       } else {
           const index = memberList.value.findIndex(p => p._id === member._id);
           if (index !== -1) {
               memberList.value[index] = (member) as MemberModel;
           }
       }
   }catch (error) {
       console.error(error);
   }
}

onMounted(async () => {
    await onLoadMember()
})

</script>