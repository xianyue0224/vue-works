<template>
  <div class="w-100% h-100% relative grid place-items-center overflow-hidden">
    <Level1 v-if="store.level === 1" />
    <InfoPanel />
  </div>
</template>

<script setup lang="ts">
import Level1 from './Level1.vue';
import InfoPanel from './InfoPanel.vue';
import { use_ST_Store } from './store';

const store = use_ST_Store();
defineOptions({ name: 'SchultTable' });
</script>

<style scoped lang="scss"></style>
