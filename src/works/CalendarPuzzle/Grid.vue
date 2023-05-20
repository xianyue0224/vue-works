<template>
  <div
    class="w-25 h-25 grid place-items-center select-none"
    border="solid 1px black"
    :style="{ backgroundColor: grid.toPlace ? 'red' : 'transparent' }"
    :grid_id="grid.id"
    ref="el"
  >
    {{ grid.label }}
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { Grid } from './types';
import { useMouseInElement } from '@vueuse/core';
import { use_CP_Store } from './store';

const { grid } = defineProps<{ grid: Grid }>();

const store = use_CP_Store();

const el = ref(null);

const { isOutside } = useMouseInElement(el);

watchEffect(() => {
  if (!store.blockPicking) return;
  grid.hover = !isOutside.value;
});
</script>

<style scoped lang="scss"></style>
