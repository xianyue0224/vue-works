<template>
  <div
    id="grid_item"
    class="w-25 h-25 grid place-items-center select-none"
    :class="classObj"
    :style="{ '--bgc': bgc }"
    ref="el"
  >
    {{ grid.label }}
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, watch } from 'vue';
import type { Grid } from './types';
import { useMouseInElement, useMousePressed } from '@vueuse/core';
import { use_CP_Store } from './store';
import { getItemByXY } from './utils';

const { grid } = defineProps<{ grid: Grid }>();

const store = use_CP_Store();

const el = ref(null);

const { pressed } = useMousePressed({ target: el });

watch(pressed, newVal => {
  if (newVal) {
    const id = grid.block_id;
    if (id) {
      const block = store.blocks.find(block => block.id === id);
      if (block) {
        block.states = 2;
      }

      store.grids = store.grids.map(grid => {
        if (grid.block_id === id) {
          grid.block_id = undefined;
        }
        return grid;
      });
    } else {
      return;
    }
  }
});

const { isOutside } = useMouseInElement(el);

watchEffect(() => {
  if (!store.blockPicking) return;
  grid.hover = !isOutside.value;
});

const bgc = computed(() => {
  if (grid.block_id) {
    const block = store.blocks.find(block => block.id === grid.block_id);
    if (block) return block.color;
  }
  return '';
});

const classObj = computed(() => {
  const gridId = grid.id;
  const thisGridIdx = store.grids.findIndex(grid => grid.id === gridId);
  const x = Math.floor(thisGridIdx / 8);
  const y = Math.floor(thisGridIdx % 8);

  const leftGrid = getItemByXY(store.grids, 7, 8, x, y - 1);
  const topGrid = getItemByXY(store.grids, 7, 8, x - 1, y);
  const rightGrid = getItemByXY(store.grids, 7, 8, x, y + 1);
  const bottomGrid = getItemByXY(store.grids, 7, 8, x + 1, y);

  function match(g1: Grid, g2: Grid) {
    return g1.block_id === g2.block_id;
  }

  return {
    toPlace: grid.toPlace,
    placed: !!grid.block_id,
    leftnone: leftGrid ? match(leftGrid, grid) : false,
    rightnone: rightGrid ? match(rightGrid, grid) : false,
    topnone: topGrid ? match(topGrid, grid) : false,
    bottomnone: bottomGrid ? match(bottomGrid, grid) : false,
  };
});
</script>

<style scoped lang="scss">
#grid_item {
  background-color: #aabe9e;
}

#grid_item.toPlace {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}
#grid_item.placed {
  background-color: var(--bgc);
  color: transparent;
  border-radius: 1rem;
  &.rightnone {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &.topnone {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
  &.leftnone {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &.bottomnone {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
