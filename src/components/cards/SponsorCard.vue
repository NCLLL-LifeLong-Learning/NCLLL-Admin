<template>
    <div class="overflow-x-auto scrollbar-hide rounded-se-md rounded-ss-md">
        <Table class="w-full bg-white">
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[50px]">
                        {{ $t('no') }}
                    </TableHead>
                    <TableHead class="w-[15%]">{{ $t('name') }}</TableHead>
                    <TableHead class="w-[15%]">{{ $t('name_kh') }}</TableHead>
                    <TableHead class="w-[50%]">{{ $t('description') }}</TableHead>
                    <TableHead class="text-right">
                        {{ $t('action') }}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(sponsor, index) in sponsorList" :key="index">
                    <TableCell class="font-medium">
                        {{ index + 1 }}
                    </TableCell>
                    <TableCell>{{ sponsor.en.name }}</TableCell>
                    <TableCell>{{ sponsor.kh.name }}</TableCell>
                    <TableCell>
                        {{ sponsor.en.description }}
                        <br>
                        {{ sponsor.kh.description }}
                    </TableCell>
                    <TableCell class="flex gap-2">
                        <button @click="emit('updateSponsor', sponsor)"
                            class="bg-white py-2 px-4 rounded-md text-green-600 flex items-center space-x-1 uppercase border border-green-600 hover:bg-green-100 transition">
                            <Icon icon="mdi:square-edit-outline" width="20" height="20" />
                            <span>{{ $t('edit') }}</span>
                        </button>
                        <button @click="emit('removeSponsor', sponsor)"
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
} from '../ui/table'
import { Icon } from '@iconify/vue'
import { defineEmits, watch } from 'vue'
import { ref } from 'vue'
import type SponsorModel from '../../scripts/model/sponsor/SponsorModel.ts'

// Define Emits
const emit = defineEmits(['updateSponsor', 'removeSponsor'])


// Define Props
const props = defineProps({
    sponsors: { type: Object, required: true },
})


// Define Variable
const sponsorList = ref<SponsorModel[]>([] as SponsorModel[])

watch(
    () => props.sponsors,
    () => {
        if(props.sponsors){
            sponsorList.value = props.sponsors as SponsorModel[];
        }
    },
    { immediate: true, deep: true }
)
</script>