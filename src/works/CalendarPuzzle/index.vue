<template>
  <div
    class="relative w-100% h-100% pattern-grid-lg flex gap-5 items-center bg-[#27374D] justify-center overflow-hidden"
  >
    <LeftPanel />
    <RightPanel />

    <PickingBlock v-if="store.blockPicking" :block="store.blockPicking" />
    <ResetButton />
  </div>
</template>

<script setup lang="ts">
import RightPanel from './RightPanel.vue';
import LeftPanel from './LeftPanel.vue';
import PickingBlock from './PickingBlock.vue';
import ResetButton from './ResetButton.vue';
import { use_CP_Store } from './store';

const store = use_CP_Store();

defineOptions({ name: 'CalendarPuzzle' });
</script>

<style scoped lang="scss"></style>
