<template>
  <div
    class="w-40% h-[43.75rem] flex gap-1 flex-wrap items-start"
    v-auto-animate
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
