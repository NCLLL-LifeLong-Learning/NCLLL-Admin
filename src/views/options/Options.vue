<template>
    <Tabs default-value="tag">
        <TabsList class="grid w-full grid-cols-2 ">
            <TabsTrigger value="tag">
                {{ $t('tag') }}
            </TabsTrigger>
            <TabsTrigger value="position" v-if="['admin'].includes(checkRole)">
                {{ $t('position') }}
            </TabsTrigger>
        </TabsList>
        <TabsContent value="tag">
            <Card class="p-2">
                <Tag :tagList="tags"></Tag>
            </Card>
        </TabsContent>
        <TabsContent value="position" v-if="['admin'].includes(checkRole)">
            <Card class="p-2">
                <Position :positionList="positions"></Position>
            </Card>
        </TabsContent>
    </Tabs>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, inject } from 'vue'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs'
import { retriveTagHandler } from '@/scripts/handler/tag/TagHandler.ts';
import { retrivePositionHandler } from '@/scripts/handler/position/PositionHandler.ts';
import { useMainStore } from '../../stores/useMainStore.ts';
import type { Emitter } from 'mitt';

const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const Tag = defineAsyncComponent(() => import('@/views/tag/Tag.vue'));
const Position = defineAsyncComponent(() => import('@/views/member/position/Position.vue'));
const tags = ref([]);
const positions = ref([]);
const mainStore = useMainStore();
const checkRole = mainStore.$state?.user?.role?.code as string

//Function

const onLoadPosition = async () => {
    // Define Function
    try {
        emitter?.emit("stateLoading", true);
        const {data, statusCode } = await retrivePositionHandler()
        
        if (statusCode == 200) {
            positions.value = data;
        }
    } catch (error) {
        console.error(error);
    } finally {
        emitter?.emit("stateLoading", false);
    }
};

const onLoadTags = async () => {
    // Define Function
    try {
        emitter?.emit("stateLoading", true);
        const { data, statusCode } = await retriveTagHandler()
        
        if (statusCode == 200) {
            tags.value = data
        }
    } catch (error) {
        console.error(error);
    } finally {
        emitter?.emit("stateLoading", false);
    }
};

onMounted(async () => {
    await onLoadTags();
    await onLoadPosition();
});
</script>