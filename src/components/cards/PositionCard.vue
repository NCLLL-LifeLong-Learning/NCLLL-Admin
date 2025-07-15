<template>
    <div class="overflow-x-auto scrollbar-hide rounded-se-md rounded-ss-md">
        <Table class="w-full bg-white">
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[50px]">
                        {{ $t('no') }}
                    </TableHead>
                    <TableHead class="w-[20%]">{{ $t('title') }}</TableHead>
                    <TableHead class="w-[20%]">{{ $t('title_kh') }}</TableHead>
                    <TableHead class="w-[20%]">{{ $t('level') }}</TableHead>
                    <TableHead class="text-right">
                        {{ $t('action') }}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(position, index) in positionList" :key="index">
                    <TableCell class="font-medium">
                        {{ index + 1 }}
                    </TableCell>
                    <TableCell>{{ position.en.title }}</TableCell>
                    <TableCell>{{ position.kh.title }}</TableCell>
                    <TableCell>
                        {{ position.en.level }}
                    </TableCell>
                    <TableCell class="flex gap-2 justify-end">
                        <button @click="emit('updatePosition', position)"
                            class="bg-white py-2 px-4 rounded-md text-green-600 flex items-center space-x-1 uppercase border border-green-600 hover:bg-green-100 transition">
                            <Icon icon="mdi:square-edit-outline" width="20" height="20" />
                            <span>{{ $t('edit') }}</span>
                        </button>
                        <button @click="emit('removePosition', position)"
                            class="bg-white py-2 px-4 rounded-md text-red-600 flex items-center space-x-1 uppercase border border-red-600 hover:bg-red-100 transition">
                            <Icon icon="mdi:delete-outline" width="20" height="20" />
                            <span>{{ $t('remove') }}</span>
                        </button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>


<script setup lang="ts">
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table/index.ts'
import { Icon } from '@iconify/vue'
import { defineEmits, watch } from 'vue'
import { ref } from 'vue'
import type PositionModel from '../../scripts/model/position/PositionModel.ts'

// Define Emits
const emit = defineEmits(['updatePosition', 'removePosition'])


// Define Props
const props = defineProps({
    positions: { type: Object, required: true },
})


// Define Variable
const positionList = ref<PositionModel[]>([] as PositionModel[])

watch(
    () => props.positions,
    () => {
        if(props.positions){
            positionList.value = props.positions as PositionModel[];
        }
    },
    { immediate: true, deep: true }
)
</script>