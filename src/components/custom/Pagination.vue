<template>
    <Pagination :meta="meta" v-slot="{ page }" :items-per-page="meta.items_per_page" :total="meta.total_count"
        :sibling-count="meta.total_pages - 1" show-edges :default-page="meta.current_page">
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationPrev :disabled="meta.current_page === 1" @click="$emit('pageChange', Math.max(1, page - 1))" />

            <template v-for="(item, index) in items">
                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                    <Button @click="$emit('pageChange', item.value)" class="w-10 h-10 p-0"
                        :variant="item.value === page ? 'default' : 'outline'">
                        {{ item.value }}
                    </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext :disabled="page >= meta.total_pages"
                @click="$emit('pageChange', Math.min(meta.total_pages, page + 1))" />
        </PaginationList>
    </Pagination>
</template>


<script setup lang="ts">
import {
    Button,
} from '../ui/button'

import {
    Pagination,
    PaginationEllipsis,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '../ui/pagination'
defineProps<{ meta: any }>();

defineEmits(['pageChange', 'paginationPrev', 'paginationNext'])
</script>
