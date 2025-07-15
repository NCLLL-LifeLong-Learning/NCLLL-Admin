<template>
  <div v-if="visible" persistent class="loading-overlay">
    <div class="spinner bg-white">
    </div>
    <img hight="160" width="160" class="absolute" src="../assets/images/NCLLL_Logo.png" />
  </div>
</template>
<script setup lang="ts">
defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #16a34a ;
  border-radius: 50%;
  width: 160px;
  height: 160px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
