<template>
  <div
    id="right_pannel"
    class="w-50rem h-43.75rem bg-[#aabe9e] rounded-[1rem] overflow-hidden"
  >
    <Grid v-for="grid in store.grids" :grid="grid" :key="grid.id" />
    <div
      class="w-100% h-100% bg-[#a79c8e] col-span-5 rounded-[1rem] rounded-bl-none rounded-tr-none overflow-hidden grid place-items-center"
    >
      <h4 class="mx-8 text-center cursor-default">
        把左边的拼图块填入右边的日历中，注意别盖住了今天的日期。抓起拼图块时按下空格可以切换拼图块的方向。
      </h4>
    </div>
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
