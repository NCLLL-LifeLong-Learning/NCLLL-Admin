<template>
    <div>
        <button @click="switchLocale">
            <Icon v-show="locale == 'en'" icon="flag:kh-4x3" width="30" height="30" />
            <Icon v-show="locale == 'kh'" icon="flag:um-4x3" width="30" height="30" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const switchLocale = () => {
    locale.value = locale.value === 'en' ? 'kh' : 'en';
}
</script>
