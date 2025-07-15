<template>
    <div>
        <div class="w-2/5 float-right flex justify-center items-center gap-2">
            <Select v-model="filterOption" required>
                <SelectTrigger class="capitalize">
                  <SelectValue :value="filterOption" required :placeholder="$t('select_option')" />
                </SelectTrigger>
                <SelectContent class="bg-white max-h-[200px]">
                  <SelectGroup>
                    <SelectItem v-for="(option, index) in optionList" :key="index" :value="option">
                      <p class="capitalize">{{ option }}</p>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
            </Select>
            <div>
                <Button
                    class="bg-green-600 rounded-md px-5 py-2"
                    @click="onLoadRequestPartner(false)"
                >
                    {{ $t('search') }}
                </Button>
            </div>
        </div>
        <div class="w-full bg-white h-[60vh] overflow-auto">
            <Table class="w-full bg-white">
                <TableHeader>
                    <TableRow class="w-full bg-white">
                        <TableHead class="w-[4vw]">{{ $t('no') }}</TableHead>
                        <TableHead class="w-[20vw]">{{ $t('contact') }}</TableHead>
                        <TableHead class="w-[16vw]">{{ $t('reason') }}</TableHead>
                        <TableHead class="w-[16vw]">{{ $t('status') }}</TableHead>
                        <TableHead class="w-[16vw]">{{ $t('request_date') }}</TableHead>
                        <TableHead class="text-right w-[15vw]">{{ $t('action') }}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(request, index) in requestList" :key="index">
                        <TableCell class="font-medium mx-2">
                            <TableCell class="font-medium">
                                {{ paginate.current_page > 1 ? (paginate.current_page - 1) * (paginate.items_per_page) +
                                index + 1 : index + 1 }}
                            </TableCell>
                        </TableCell>
                        <TableCell>{{ request.email }}</TableCell>
                        <TableCell>{{ request.reason }}</TableCell>
                        <TableCell>{{ request.status }}</TableCell>
                        <TableCell>{{ conversionUTCDate(request.created_at || "") }}</TableCell>
                        <TableCell class="flex justify-end gap-2">
                            <Button
                                class="bg-green-600 rounded-md px-5 py-2"
                                :disabled="request.status === 'seen'"
                                @click="confirmMarkRead(request)"
                            >
                                {{ $t('mark_read') }}
                            </Button>
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

        <ConfirmDialog v-model:open="showConfirmDialog" title="Mark Read"
            description="Please Click Confirm to Mark Read" confirm-text="Confirm"
            cancel-text="Cancel" @confirm="onHandleMarkRead" @cancel="handleCancel" />
    </div>
</template>

<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select/index.ts'
import { ref, defineAsyncComponent, inject, onMounted } from 'vue';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Button } from '../../../components/ui/button';
import type PaginationModel from '@/scripts/model/pagination/PaginationModel.ts';
import type RequestModel from '@/scripts/model/partner/RequestModel.ts';
import { retriveRequestPartnerHandler, markReadRequestPartnerHandler } from '@/scripts/handler/partner/PartnerHandler.ts';
import { conversionUTCDate } from '@/utils/conversionDate.ts';
import type { Emitter } from 'mitt';
import { useToast } from '../../../components/ui/toast';


// Define Component
const CustomPagination = defineAsyncComponent({
    loader: () => import('../../../components/custom/Pagination.vue'),
    loadingComponent: { template: '<div>Loading...</div>' },
    delay: 300,
    timeout: 3000
})
const ConfirmDialog = defineAsyncComponent({
    loader: () => import('../../../components/custom/ConfirmDialog.vue'),
})

// Define Varible
const { toast } = useToast();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const requestList = ref<RequestModel[]>([] as RequestModel[])
const paginate = ref<PaginationModel>({} as PaginationModel)
const currentPage = ref<number>(1)
const itemPerPage = ref<number>(4)
const showConfirmDialog = ref<boolean>(false)
const selectRequest = ref<RequestModel>({} as RequestModel)
const filterOption = ref<string>('all')

const optionList = ref<string[]>(['all', 'pending', 'seen'])

// Define Function
const onPaginateChange = async (page: number) => {
    if (!isNaN(page)) {
        currentPage.value = page
        await onLoadRequestPartner(true)
    }
}

const handleCancel = () => {
    toast({ title: 'Item Not Deleted', description: 'The item has not been deleted.', variant: 'warning' });
};

const confirmMarkRead = (request: RequestModel) => {
    showConfirmDialog.value = true
    selectRequest.value = request
}

const onHandleMarkRead = async () => {
    try {
        emitter?.emit("stateLoading", true);
        const { message,data, statusCode } = await markReadRequestPartnerHandler(selectRequest.value._id || '') 
        if (statusCode == 200) {
            const _requestPartner = requestList.value.find(item => item._id === selectRequest.value._id)
            if (_requestPartner) {
                _requestPartner.status = data.status
                toast({ title: 'Mark Read', description: 'Confirm Mark Read', variant: 'success' });
            }else{
                toast({ title: 'Something went wrong', description: message, variant: 'warning' });
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        emitter?.emit("stateLoading", false);
    }
}


const onLoadRequestPartner = async (isPaginate: boolean = false) => {
    try {
        if (!isPaginate || isPaginate != true) {
            currentPage.value = 1
        }
        emitter?.emit("stateLoading", true);
        const { data, statusCode } = await retriveRequestPartnerHandler({
            status: filterOption.value,
            limit: itemPerPage.value,
            page: currentPage.value
        })
        if (statusCode == 200) {
            requestList.value = data.results;
            paginate.value = data.meta as PaginationModel
        }
    } catch (error) {
        console.error(error);
    } finally {
        emitter?.emit("stateLoading", false);
    }
}

onMounted(async () => {
    await onLoadRequestPartner()
})
</script>