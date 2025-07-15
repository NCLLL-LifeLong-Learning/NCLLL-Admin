<template>
    <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
        <div class="flex flex-col justify-center items-center animate-swing">
            <div class="mt-5 font-bold px-5 border-2 border-primary py-3 rounded-lg">
                <RouterLink to="/" class="text-primary">GO BACK HOME</RouterLink>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.animate-swing {
    animation: swing 1.5s ease-in-out infinite alternate;
}

@keyframes swing {
    0% {
        transform: scale(1.05);
    }

    50% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.05);
    }
}
</style>