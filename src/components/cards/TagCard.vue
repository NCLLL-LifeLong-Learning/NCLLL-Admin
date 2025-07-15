<template>
    <div class="w-full max-w-sm p-4 rounded-xl shadow-lg bg-white flex flex-col items-center">
        <h1 class="text-center font-bold text-sm">{{ tag.en.name }}</h1>
        <div class="flex flex-col sm:flex-row justify-between items-center gap-2 mt-3 w-full">
            <button @click="emit('updateTag', tag)"
                class="bg-white py-2 px-4 rounded-md text-green-600 flex items-center space-x-1 uppercase border border-green-600 hover:bg-green-100 transition">
                <Icon icon="mdi:square-edit-outline" width="20" height="20" />
            </button>
            <button @click="emit('removeTag', tag)"
                class="bg-white py-2 px-4 rounded-md text-red-600 flex items-center space-x-1 uppercase border border-red-600 hover:bg-red-100 transition">
                <Icon icon="mdi:delete-outline" width="20" height="20" />
            </button>
        </div>
    </div>
</template>


<script setup lang="ts">
// import 
import { Icon } from '@iconify/vue'
import { defineEmits, watch } from 'vue'
import { ref } from 'vue'
import type TagModel from '../../scripts/model/tag/TagModel.ts'

// Define Emits
const emit = defineEmits(['updateTag', 'removeTag'])


// Define Props
const props = defineProps({
    tag: { type: Object, required: true },
})


// Define Variable
const tag = ref<TagModel>({} as TagModel)

watch(
    () => props.tag,
    () => {
        tag.value = props.tag as TagModel
    },
    { immediate: true, deep: true }
)
</script>