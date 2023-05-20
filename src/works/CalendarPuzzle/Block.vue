<template>
  <div
    id="puzzle_block"
    :class="[gridTemplateClass]"
    :block_id="block.id"
    v-if="block.states === 1"
    ref="el"
  >
    <div
      v-for="grid in block.forms[block.currentForm].layout"
      class="w-100% h-100%"
      :style="{ backgroundColor: block.color, opacity: grid.state }"
      :key="grid.id"
      @click="switchForm"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import type { Block } from './types';
import { useMousePressed } from '@vueuse/core';

const { block } = defineProps<{ block: Block }>();

const el = ref(null);

const { pressed } = useMousePressed({ target: el });

watchEffect(() => {
  if (pressed.value) {
    block.states = 2;
  } else {
    if (block.states !== 3) {
      block.states = 1;
    }
  }
});

const gridTemplateClass = computed(() => {
  const idx = block.currentForm;
  return `gt${block.forms[idx].size.rows}${block.forms[idx].size.cols}`;
});

function switchForm() {
  const idx = block.currentForm;
  if (idx + 1 === block.forms.length) {
    block.currentForm = 0;
  } else {
    block.currentForm = idx + 1;
  }
}
</script>

<style scoped lang="scss">
$block_size: 3.3rem;
$picking_block_size: 6.25rem;

#puzzle_block {
  display: grid;
  grid-auto-flow: row;
}

@each $rows, $cols in (1, 4), (2, 2), (2, 3), (2, 4), (3, 2), (3, 3), (4, 1),
  (4, 2)
{
  #puzzle_block.gt#{$rows}#{$cols} {
    width: $block_size * $cols;
    height: $block_size * $rows;
    grid-template-rows: repeat(#{$rows}, minmax(0, 1fr));
    grid-template-columns: repeat(#{$cols}, minmax(0, 1fr));
  }
}

@each $rows, $cols in (1, 4), (2, 2), (2, 3), (2, 4), (3, 2), (3, 3), (4, 1),
  (4, 2)
{
  #puzzle_block.picking.gt#{$rows}#{$cols} {
    width: $picking_block_size * $cols;
    height: $picking_block_size * $rows;
    grid-template-rows: repeat(#{$rows}, minmax(0, 1fr));
    grid-template-columns: repeat(#{$cols}, minmax(0, 1fr));
  }
}
</style>
