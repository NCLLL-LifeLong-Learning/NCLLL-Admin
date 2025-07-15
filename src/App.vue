<template>
  <div>
    <div>
      <RouterView v-slot="{ Component }">
          <component :is="Component" />
      </RouterView>
    </div>
    <Loading :visible="visible" />
    <Toaster :duration="2500" />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, defineAsyncComponent } from 'vue'
import type { Emitter } from 'mitt'
import Toaster from './components/ui/toast/Toaster.vue'

// Define your event bus type
type Events = {
  stateLoading: boolean;
};

// Inject the emitter with the correct type
const emitter = inject<Emitter<Events>>('emitter');

const visible = ref(false);

if (emitter) {
  emitter.on("stateLoading", (state: boolean) => {
    visible.value = state;
  });
}

// Define the async component
const Loading = defineAsyncComponent({
  loader: () => import('@/components/Loading.vue'),
  delay: 200,
  timeout: 3000,
});
</script>

