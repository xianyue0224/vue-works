<template>
  <div class="py-5 px-10 flex items-center justify-start gap-3">
    <div
      v-for="item in items"
      :key="item.id"
      @click="$router.push({ name: item.route_name })"
      class="transition"
      p="y-1 x-2"
      border="solid 2 black"
      hover="cursor-pointer shadow-[2px_2px_0_0_black] -translate-x-2px -translate-y-2px"
      active="translate-x-0 translate-y-0 shadow-none"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { nanoid } from 'nanoid';

interface Item {
  id: string;
  route_name: string;
  title: string;
}

const items = ref<Item[]>(
  [
    { route_name: 'guess_numbers', title: '猜数字' },
    { route_name: 'schult_table', title: '舒尔特表格' },
    { route_name: 'calendar_puzzle', title: '日历拼图' },
  ].map(item => {
    //@ts-expect-error
    item.id = nanoid();
    return item as Item;
  })
);
</script>

<style scoped lang="scss"></style>
