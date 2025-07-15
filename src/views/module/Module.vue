<template>
    <div class="h-full w-full overflow-auto relative">
        <div class="flex justify-between items-center rounded-md pb-2">

            <div class="flex gap-2 w-1/2">

                <!-- <div class="w-full" v-if="subCategoryType === 'Engagement'">
                    <Label for="name" class="text-left mb-1">{{
                        $t("sub_category")
                        }}</Label>
                    <SelectionEngagementCategoryTab :initSubCategory="subCategoryType"
                        :subCategoryList="(EngagementCategory as any)" @subCategoryChange="onEngagementSubCategoryChange" />
                </div> -->
                <div class="w-full" v-if="mainCategoryType == 'Program'">
                    <Label for="name" class="text-left mb-1">{{
                        $t("sub_category")
                        }}</Label>
                    <SelectionSubCategoryTab :initSubCategory="subCategoryType"
                        @subCategoryChange="onSubCategoryChange" />

                </div>
                <div class="w-full">
                    <Label for="name" class="text-left mb-1">{{
                        $t("main_category")
                        }}</Label>
                    <SelectionMainCategoryTab :initMainCategory="mainCategoryType"
                        @mainCategoryChange="onMainCategoryChange" />
                </div>
            </div>
            <div class="flex gap-2">
                <button class="bg-green-600 rounded-md px-5 py-2" @click="onLoadModules">
                    {{ $t('search') }}
                </button>
                <button class="bg-green-600 rounded-md px-5 py-2" @click="onCreateModule">
                    {{ $t('new') }}
                </button>
            </div>
        </div>

        <div class="w-full bg-white h-[75vh] overflow-auto">
            <Table class="w-full bg-white">
                <TableHeader>
                    <TableRow class="w-full">
                        <TableHead class="w-[5%]">{{ $t('no') }}</TableHead>
                        <TableHead class="w-[20%]">{{ $t('cover') }}</TableHead>
                        <TableHead class="w-[20%]">{{ $t('name') }}</TableHead>
                        <TableHead class="w-[20%]">{{ $t('name_kh') }}</TableHead>
                        <TableHead class="w-[30%]">{{ $t('description') }}</TableHead>
                        <TableHead class="w-[15%] text-right">{{ $t('action') }}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(module, index) in modulesList" :key="index">
                        <TableCell class="font-medium">
                            {{ paginate.current_page > 1 ? (paginate.current_page - 1) * (paginate.items_per_page) +
                            index + 1 : index + 1 }}
                        </TableCell>
                        <TableCell>
                            <div class="flex justify-center items-center border rounded-md w-[8rem] h-[4rem]">
                                <img v-if="module.cover" :src="module.cover"
                                    class="w-full h-full object-cover rounded-md" />
                            </div>
                        </TableCell>
                        <TableCell>
                            {{ module?.en?.title ? module?.en?.title.slice(0, 80) + '...' : '' }}
                        </TableCell>
                        <TableCell>
                            {{ module?.kh?.title ? module?.kh?.title.slice(0, 80) + '...' : '' }}
                        </TableCell>
                        <TableCell>
                            {{ module.en.description ? module.en.description.slice(0, 80) + '...' : '' }}
                        </TableCell>
                        <TableCell class=" flex justify-end gap-2">
                            <button class="bg-green-600 rounded-md px-5 py-2" @click="onUpdateModule(module)">
                                {{ $t('update') }}
                            </button>
                            <button class="bg-red-600 rounded-md px-5 py-2" @click="handleRemoveModule(module)">
                                {{ $t('remove') }}
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <div
            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white py-2 shadow-md flex justify-center">
            <CustomPagination v-model:meta="paginate" @pageChange="onPaginateChange">
            </CustomPagination>
        </div>

        <ConfirmDialog v-model:open="showConfirmDialog" title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone." confirm-text="Delete"
            cancel-text="Cancel" @confirm="handleConfirm" @cancel="handleCancel" />
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
import { Label } from "@/components/ui/label";
import { useRouter } from 'vue-router';
import type ModuleModel from '@/scripts/model/module/ModuleModel.ts'
import { retriveModuleHandler, removeModuleHandler } from '@/scripts/handler/module/ModuleHandler.ts'
import type { Emitter } from 'mitt';
import { toast } from '../../components/ui/toast/use-toast.ts';
import type PaginationModel from '@/scripts/model/pagination/PaginationModel.ts';
// import { EngagementCategory } from '@/scripts/enum/ResourceType'

// Define Component
const CustomPagination = defineAsyncComponent({
    loader: () => import('@/components/custom/Pagination.vue'),
    delay: 300,
    timeout: 3000
})
// const SelectionEngagementCategoryTab = defineAsyncComponent({
//     loader: () => import('@/components/selection/EngagementCategoryTab.vue'),
// })
const SelectionSubCategoryTab = defineAsyncComponent({
    loader: () => import('@/components/selection/SubCategoryTab.vue'),
})
const SelectionMainCategoryTab = defineAsyncComponent({
    loader: () => import('@/components/selection/MainCategoryTab.vue'),
})
const ConfirmDialog = defineAsyncComponent(() => import('../../components/custom/ConfirmDialog.vue'));

// Define Event
const router = useRouter();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');

// Define Varible
const paginate = ref<PaginationModel>({} as PaginationModel)
const currentPage = ref<number>(1)
const showConfirmDialog = ref(false);
const modulesList = ref<ModuleModel[]>([] as ModuleModel[])
const selectedModule = ref<ModuleModel>({} as ModuleModel)
const mainCategoryType = ref<string>('Program');
const subCategoryType = ref<string>('');
// const engagementCategoryType = ref<string>('');


// Define Function
const onMainCategoryChange = (value: string) => {
    if (value) {
        mainCategoryType.value = value as string;
        if(value != "Program"){
            subCategoryType.value = 'All';
        }
    }
}

const onSubCategoryChange = (value: string) => {
    if (value) {
        subCategoryType.value = (value as string == 'All') ? '' : (value as string);
    }
}

// const onEngagementSubCategoryChange = (value: string) => {
//     if (value) {
//         engagementCategoryType.value = (value as string == 'All') ? '' : (value as string);
//     }
// }

const onLoadModules = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { data, statusCode } = await retriveModuleHandler(
            {
                mainCategory: mainCategoryType.value,
                subCategory: subCategoryType.value == 'All' ? '' : subCategoryType.value,
                limit: 10,
                page: currentPage.value
            }
        )
        
        if (statusCode == 200) {
            paginate.value = data.meta as PaginationModel;
            modulesList.value = data.results
        }
    } catch (error) {
        console.error(error);
    } finally {
        emitter?.emit("stateLoading", false);
    }
}

const onPaginateChange = async (page: number) => {
    if (!isNaN(page)) {
        currentPage.value = page
        await onLoadModules()
    }
}

const handleRemoveModule = (module: ModuleModel) => {
    if (module?._id) {
        selectedModule.value = module;
        showConfirmDialog.value = true;
    }
};

const handleConfirm = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { statusCode,message } = await removeModuleHandler(selectedModule.value as ModuleModel);
        if (statusCode == 200) {
            modulesList.value = modulesList.value.filter(p => p._id !== selectedModule?.value?._id);
            toast({ title: 'Item Deleted', description: 'The item has been deleted.', variant: 'success' });
        } else {
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

const onCreateModule = () => {
    router.push({
        name: 'ModuleContent',
        query: {
            status: 'new',
            id: "",
            source: "Modules"
        },
    })
}

const onUpdateModule = (module: ModuleModel) => {
    selectedModule.value = module as ModuleModel
    router.push({
        name: 'ModuleContent',
        query: {
            status: 'update',
            id: selectedModule.value._id,
            source: "Modules"
        },
    })
}

onMounted(async () => {
    await onLoadModules()
})

</script>