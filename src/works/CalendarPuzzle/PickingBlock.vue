<template>
  <div
    id="picking_puzzle_block"
    class="absolute -translate-x-50% -translate-y-50% transition cursor-pointer"
    :class="[gridTemplateClass]"
    :block_id="block.id"
    :style="{ top, left, opacity }"
    @mouseup="onmouseup"
  >
    <div
      v-for="grid in block.forms[block.currentForm].layout"
      class="w-100% h-100%"
      :style="{ backgroundColor: block.color, opacity: grid.state }"
      :class="classObj"
      :key="grid.id"
      :picking_block_grid_id="grid.id"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Block } from './types';
import { use_CP_Store } from './store';
import { useMouse, onKeyStroke } from '@vueuse/core';

const { block } = defineProps<{ block: Block }>();
const store = use_CP_Store();

const { x, y } = useMouse();

const top = ref(0 + 'px');

const left = ref(0 + 'px');

const opacity = ref(0);

function onmouseup(e: MouseEvent) {
  if (e.button !== 0) return;

  if (store.gridsWillBePlaced && store.gridsWillBePlaced.length !== 0) {
    return store.place();
  }

  block.states = 1;
}

watch([x, y], ([xVal, yVal]) => {
  if (!store.blockPicking) return;

  if (xVal === 0 && yVal === 0) return;

  opacity.value = 1;

  top.value = yVal + 'px';
  left.value = xVal + 'px';
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

const classObj = computed(() => {
  return {};
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
