import { defineStore } from 'pinia';
import { computed, ref, watchEffect } from 'vue';
import { gridsMeta } from './rightPanelGridsMata';
import { blocksMeta } from './blocksMeta';
import type { Block, Grid } from './types';
import { getNeighborhood, getOverlapPercentage } from './utils';

export const use_CP_Store = defineStore('calendar_puzzle', () => {
  // 左边盘里备用的拼图块
  const blocksInLeft = ref<Block[]>(blocksMeta);

  // 抓在手里的拼图块
  const blockPicking = computed(() => {
    return blocksInLeft.value.find(block => {
      return block.states === 2;
    });
  });

  // 右边盘里的格子
  const gridsInRight = ref<Grid[]>(gridsMeta());

  // 以鼠标悬停的格子为中心的5*5范围内的格子
  const grids55 = computed(() => {
    const centerGridIdx = gridsInRight.value.findIndex(grid => grid.hover);
    if (centerGridIdx === -1) return;

    const result = getNeighborhood(gridsInRight.value, centerGridIdx, 7, 8);
    return result;
  });

  // 被覆盖的格子
  const coverGrids = computed(() => {
    if (!grids55.value || !blockPicking.value) return;
    const result: {
      pickingBlockGridId: string;
      overwrittenGrid: Grid | undefined;
    }[] = [];
    const currentForm =
      blockPicking.value.forms[blockPicking.value.currentForm];
    for (let i = 0; i < currentForm.layout.length; i++) {
      if (currentForm.layout[i].state === 0) return;
      const id = currentForm.layout[i].id;
      const el1 = document.querySelector(`div[picking_block_grid_id='${id}']`);

      let maxoverlapPercentage = 0;
      let gridResult: Grid | undefined = undefined;
      // 从5*5范围内找出覆盖率最高的那个格子记录在gridResult中
      for (let j = 0; j < grids55.value.length; j++) {
        const grid = grids55.value[j];
        const el2 = document.querySelector(`div[grid_id='${grid.id}']`);
        const overlapPercentage = getOverlapPercentage(
          el1 as HTMLElement,
          el2 as HTMLElement
        );
        if (overlapPercentage > maxoverlapPercentage) {
          maxoverlapPercentage = overlapPercentage;
          gridResult = grid;
        }
      }
      // 循环结束后，把覆盖率最高的那个格子加入结果数组中
      if (maxoverlapPercentage !== 0 && gridResult) {
        result.push({ pickingBlockGridId: id, overwrittenGrid: gridResult });
      } else {
        result.push({ pickingBlockGridId: id, overwrittenGrid: undefined });
      }
    }
    return result;
  });

  watchEffect(() => {
    if (coverGrids.value) {
      for (let i = 0; i < coverGrids.value.length; i++) {
        const overwrittenGrid = coverGrids.value[i].overwrittenGrid;
        if (overwrittenGrid) {
          overwrittenGrid.toPlace = true;
        }
      }
    }
  });

  return { gridsInRight, blocksInLeft, blockPicking, grids55, coverGrids };
});
