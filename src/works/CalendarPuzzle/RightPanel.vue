<template>
  <div
    id="right_pannel"
    class="w-max h-max p-2 bg-gray-300 rounded-5"
    grid_id="test"
  >
    <Grid v-for="grid in store.gridsInRight" :grid="grid" :key="grid.id" />
  </div>
</template>

<script setup lang="ts">
import Grid from './Grid.vue';
import { use_CP_Store } from './store';

const store = use_CP_Store();
</script>

<style scoped lang="scss">
#right_pannel {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(7, minmax(0, 1fr));
}
</style>
