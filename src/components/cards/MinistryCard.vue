<template>
    <div class="w-full max-w-sm p-4 rounded-xl shadow-lg bg-white flex flex-col items-center">
        <h1 class="text-center h-10 font-bold text-sm">{{ ministry.en.name }}</h1>
        <div class="mt-3 max-w-[12rem] max-h-[12rem] w-[12rem] h-[12rem] border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
            <img v-if="ministry.en.imageUrl" :src="ministry.en.imageUrl" alt="Ministry Logo"
                class="w-[9rem] h-auto object-cover transition-transform duration-300 hover:scale-105">
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-center gap-2 mt-3 w-full">
            <button @click="emit('updateMinistry', ministry)"
                class="bg-white py-2 px-4 rounded-md text-green-600 flex items-center space-x-1 uppercase border border-green-600 hover:bg-green-100 transition">
                <Icon icon="mdi:square-edit-outline" width="20" height="20" />
                <span>{{ $t('edit') }}</span>
            </button>
            <button @click="emit('removeMinistry', ministry)"
                class="bg-white py-2 px-4 rounded-md text-red-600 flex items-center space-x-1 uppercase border border-red-600 hover:bg-red-100 transition">
                <Icon icon="mdi:delete-outline" width="20" height="20" />
                <span>{{ $t('remove') }}</span>
            </button>
        </div>
    </div>
</template>


<script setup lang="ts">
// import 
import { Icon } from '@iconify/vue'
import { defineEmits, watch } from 'vue'
import { ref } from 'vue'
import type MinistryModel from '../../scripts/model/ministry/MinistryModel.ts'

// Define Emits
const emit = defineEmits(['updateMinistry', 'removeMinistry'])


// Define Props
const props = defineProps({
    ministry: { type: Object, required: true },
})


// Define Variable
const ministry = ref<MinistryModel>({} as MinistryModel)

watch(
    () => props.ministry,
    () => {
        ministry.value = props.ministry as MinistryModel
    },
    { immediate: true, deep: true }
)
</script>