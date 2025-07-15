<template>
    <div class="grid grid-cols-5">
        <div class="col-span-1 bg-white p-[1rem] rounded-xl">
            <VueDraggable v-model="headings" :z-index="2000" :animation="150" ghostClass="ghost"
                :group="{ name: 'items', pull: 'clone', put: false }" :clone="clone" :sort="false"
                class="flex justify-center items-center flex-1 flex-wrap">
                <div class="w-1/2 text-center" v-for="heading in headings" :key="heading.id">
                    <button class="icon_border">
                        <Icon :icon="'radix-icons:' + heading.icon" />
                    </button>
                    <p class="text-center">{{ heading.label }}</p>
                </div>

            </VueDraggable>
        </div>
        <div class="col-span-3">
            <div class="relative flex justify-center items-center">
                <!-- iPhone Image -->
                <img src="@/assets/images/IPhone.png" alt="logo" class="w-[50%] z-40" />
                <div class="absolute h-[88%] w-[45%] top-10 left-1/2 transform -translate-x-1/2 z-50 bg-white">
                    <VueDraggable v-model="previewList" :z-index="1999" :animation="150" group="items"
                        ghostClass="ghost" @end="updateIndex"
                        class="flex flex-col gap-2 p-4 w-full max-h-[100%] m-auto bg-white overflow-auto">
                        <div v-for="(item, index) in previewList" :key="index"
                            class="cursor-move bg-gray-200 p-3 rounded-xl">
                            <template v-if="item.type === 'h1'">
                                <h1>{{ item.content || 'New Heading' }}</h1>
                            </template>
                            <template v-else-if="item.type === 'h2'">
                                <h2>{{ item.content || 'New Paragraph' }}</h2>
                            </template>
                            <template v-else-if="item.type === 'h3'">
                                <h3>{{ item.content || 'New List Item' }}</h3>
                            </template>
                            <template v-else-if="item.type === 'h4'">
                                <h4>{{ item.content || 'New List Item' }}</h4>
                            </template>
                            <template v-else-if="item.type === 'h5'">
                                <h5>{{ item.content || 'New List Item' }}</h5>
                            </template>
                            <template v-else-if="item.type === 'h6'">
                                <h6>{{ item.content || 'New List Item' }}</h6>
                            </template>
                            <template v-else-if="item.type === 'image'">
                                <img :src="item.content" :alt="item.content" @click="onClickUpdate(item)"
                                    style="width: 100%;">
                            </template>
                            <template v-else>
                                <p>{{ item.content || 'New List Item' }}</p>
                            </template>
                        </div>
                    </VueDraggable>
                </div>
            </div>
        </div>
        <div class="col-span-1  bg-white p-[1rem]  rounded-xl">
            None
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useAppStore } from '../../stores/useAppConfig'
import { VueDraggable } from 'vue-draggable-plus'

const store = useAppStore();

const headings = ref([
    {
        id: 1, type: "h1", label: "H1", icon: 'lucide lucide-heading-1',
        paths: "",
    },
    {
        id: 2, type: "h2", label: "H2", icon: 'lucide lucide-heading-2',
    },
    {
        id: 3, type: "h3", label: "H3", icon: 'lucide lucide-heading-3',
    },
    {
        id: 4, type: "h4", label: "H4", icon: 'lucide lucide-heading-4',
    },
    {
        id: 5, type: "h5", label: "H5", icon: 'lucide lucide-heading-5',

    },
    {
        id: 6, type: "h6", label: "H6", icon: 'lucide lucide-heading-6',
    },
])

const previewList = ref(
    [
        { id: 1, type: "h1", content: "Breaking News!" },
        {
            id: 2, type: "h2", content: "This is an introductory paragraph."
        },
        { id: 3, type: "image", content: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" },
        {
            id: 4, type: "h3", content: "KeyF"

        },
    ]
)

const clone = (element) => {
    const len = previewList.value.length
    return {
        content: `${element.label}-${len}`,
        id: `${element.id || len} -${len}`,
        type: element.type,
        index: len,
    }
}

const remove = (index) => {
    previewList.value.splice(index, 1)
    updateIndex()
}

const updateIndex = () => {
    previewList.value.forEach((item, index) => {
        item.index = index
    })
}

// Helper function to map tags to input types or components
</script>