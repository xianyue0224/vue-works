<template>
  <div class="w-fit h-fit flex flex-col gap-5 items-center">
    <div class="grid grid-rows-3 grid-cols-3 gap-1" v-auto-animate>
      <div
        class="w-30 h-30 grid place-items-center bg-slate select-none cursor-pointer text-xl font-bold rounded transition"
        v-for="grid in store.grids"
        :key="grid.id"
        :style="{ color: grid.clicked ? '#94a3b8' : '#212121' }"
        @click="onclick(grid)"
      >
        {{ grid.num }}
      </div>
    </div>

    <button
      class="transition py-1 px-4 text-2xl border-none rounded-1 cursor-pointer shadow-lg"
      active="scale-95 shadow-sm"
      @click="store.state === 0 ? store.start() : store.finish(false)"
      :style="{ backgroundColor: store.state === 0 ? '#6ee7b7' : '#f87171' }"
    >
      {{ store.state === 0 ? '开始' : '结束' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { use_ST_Store } from './store';
import type { Grid } from './types';

const store = use_ST_Store();

function onclick(grid: Grid) {
  if (store.state === 0) return;
  if (!grid.target) return;
  grid.target = false;
  grid.clicked = true;
  const targetGrid = store.grids.find(
    item => Number(item.num) - Number(grid.num) === 1
  );
  if (targetGrid) {
    targetGrid.target = true;
  }
  if (grid.num === '9') {
    store.finish();
  }
}
</script>

<style scoped lang="scss">
// * {
//   background-color: #94a3b8;
// }
</style>
