<template>
  <div
    class="w-40% h-179 p-2 bg-gray-300 rounded-5 flex gap-1 flex-wrap items-start"
  >
    <Block v-for="block in store.blocksInLeft" :key="block.id" :block="block" />
  </div>
</template>

<script setup lang="ts">
import { use_CP_Store } from './store';
import Block from './Block.vue';

const store = use_CP_Store();
</script>

<style scoped lang="scss"></style>
