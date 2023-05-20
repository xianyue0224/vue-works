<template>
  <div
    id="picking_puzzle_block"
    class="absolute -translate-x-50% -translate-y-50% transition cursor-pointer"
    :class="[gridTemplateClass]"
    :block_id="block.id"
    :style="{ top, left, opacity }"
  >
    <div
      v-for="grid in block.forms[block.currentForm].layout"
      class="w-100% h-100%"
      :style="{ backgroundColor: block.color, opacity: grid.state }"
      :key="grid.id"
      :picking_block_grid_id="grid.id"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import type { Block } from './types';
import { use_CP_Store } from './store';
import { useMouse, onKeyStroke } from '@vueuse/core';

const { block } = defineProps<{ block: Block }>();
const store = use_CP_Store();

const mouse = useMouse();

const top = ref(0 + 'px');

const left = ref(0 + 'px');

const opacity = ref(0);

watchEffect(() => {
  const x = mouse.x.value;
  const y = mouse.y.value;

  if (!store.blockPicking) return;

  if (x === 0 && y === 0) return;

  opacity.value = 1;

  top.value = y + 'px';
  left.value = x + 'px';
});

onKeyStroke(' ', e => {
  e.preventDefault();
  const idx = block.currentForm;
  if (idx + 1 === block.forms.length) {
    block.currentForm = 0;
  } else {
    block.currentForm = idx + 1;
  }
});

const gridTemplateClass = computed(() => {
  const idx = block.currentForm;
  return `gt${block.forms[idx].size.rows}${block.forms[idx].size.cols}`;
});
</script>

<style scoped lang="scss">
$block_size: 6rem;

#picking_puzzle_block {
  display: grid;
  grid-auto-flow: row;
}

@each $rows, $cols in (1, 4), (2, 2), (2, 3), (2, 4), (3, 2), (3, 3), (4, 1),
  (4, 2)
{
  #picking_puzzle_block.gt#{$rows}#{$cols} {
    width: $block_size * $cols;
    height: $block_size * $rows;
    grid-template-rows: repeat(#{$rows}, minmax(0, 1fr));
    grid-template-columns: repeat(#{$cols}, minmax(0, 1fr));
  }
}
</style>
