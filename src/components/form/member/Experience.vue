<template>
    <div class="flex flex-col items-start justify-center w-full">
        <div class="w-full relative">
            <!-- Preview -->
            <form @submit.prevent="onHandleSummitForm" class="flex justify-center items-center gap-2">
                <div class="flex items-start justify-center mb-3 ">
                    <Textarea rows="3" v-model="experience.title" :required="experienceList && experienceList.length === 0" />
                </div>
                <div class="flex items-start justify-center mb-3 w-full">
                    <Textarea rows="3" v-model="experience.description"
                        :required="experienceList && experienceList.length === 0" />
                </div>
                <!-- Upload Image -->
                <div class="flex flex-col justify-center items-end mb-3">
                    <div class="flex items-start justify-center mb-1">
                        <Button variant="outline" type="button" @click="cereerForm = true">
                            <Icon icon="radix-icons:file-text" />
                        </Button>
                    </div>
                    <Button variant="outline" type="submit">
                        <Icon icon="radix-icons:plus" />
                    </Button>
                </div>
            </form>
        </div>
        <Dialog v-model:open="cereerForm"
            class="border rounded-md w-3/5 h-[50vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <DialogContent class="sm:max-w-[720px] bg-white">
                <DialogHeader class="flex flex-col">
                    <DialogTitle>{{ $t('experience_status_title') }}</DialogTitle>
                    <DialogDescription>
                        {{ $t('experience_status_description') }}
                    </DialogDescription>
                </DialogHeader>
                <div class="overflow-x-auto scrollbar-hide w-full  h-[40vh]">
                    <Table class="w-full bg-white relative">
                        <TableHeader class="">
                            <TableRow>
                                <TableHead class="w-[10%]">
                                    {{ $t('no') }}
                                </TableHead>
                                <TableHead class="w-[20%]">{{ $t('title') }}</TableHead>
                                <TableHead class="w-[50%]">{{ $t('description') }}</TableHead>
                                <TableHead class="text-right w-[15%]">
                                    {{ $t('action') }}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="(experience, index) in experienceList" :key="index">
                                <TableCell class="font-medium">
                                    {{ index + 1 }}
                                </TableCell>
                                <TableCell>{{ experience.value }}</TableCell>
                                <TableCell>{{ experience.detail }}</TableCell>
                                <TableCell class="text-right flex justify-end items-center gap-2">
                                    <button class="bg-red-600 rounded-md px-5 py-2" @click="removeItem(index)">
                                        {{ $t('remove') }}
                                    </button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from '../../ui/dialog'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../ui/table'
import { Textarea } from '../../ui/textarea'
import { ref, watch } from 'vue'
import { Button } from '../../ui/button'
import { Icon } from '@iconify/vue'
import { useToast } from '../../ui/toast/use-toast'
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
const { toast } = useToast();
const emit = defineEmits(['updateForm', 'closeForm', 'experienceChange'])
// Define Props
const props = defineProps({
    experienceList: {
        type: Array,
        required: true,
    },
    showForm: {
        type: Boolean,
        required: true,
    },
})

const experienceList = ref<any>([]);
const experience = ref({ title: '', description: '' })
const cereerForm = ref(false);

const onHandleSummitForm = () => {
    try {
        if (experience.value.title !== '' && experience.value.description !== '' && Array.isArray(experienceList.value)) {
            experienceList.value.push({
                value: experience.value.title,
                detail: experience.value.description,
            })
            toast({
                description: t('create_experience_success'),
                variant: 'success',
                title: t("success"),
            });
            experience.value = { title: '', description: '' }
            emit('experienceChange', experienceList.value)
        }
    } catch (e) {
        console.log(e)
    }
}

const removeItem = (index: number) => {
    experienceList.value.splice(index, 1);
}

watch(
    () => props.experienceList,
    (newVal) => {
        if (props.showForm && Array.isArray(newVal) && newVal.length > 0) {
            experienceList.value = [...newVal]; 
        }else
        {
            experienceList.value = [];
        }
    },
    { immediate: true, deep: true }
);
</script>