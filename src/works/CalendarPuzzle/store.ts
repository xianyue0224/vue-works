import { defineStore } from 'pinia';
import { computed, ref, watchEffect } from 'vue';
import { gridsMeta } from './rightPanelGridsMata';
import { blocksMeta } from './blocksMeta';
import type { Block, Grid } from './types';
import { getSubArray } from './utils';
import { useMouse, useDateFormat, useNow } from '@vueuse/core';
import { wonEffect } from '@/utils';
import _ from 'lodash';

export const use_CP_Store = defineStore('calendar_puzzle', () => {
  // 所有拼图块
  const blocks = ref<Block[]>(blocksMeta);

  // 左边盘里备用的拼图块
  const blocksInLeft = computed(() =>
    blocks.value.filter(block => block.states === 1)
  );

  // 抓在手里的拼图块
  const blockPicking = computed(() =>
    blocks.value.find(block => block.states === 2)
  );

  const { x: mouseX, y: mouseY } = useMouse();

  // 右边盘里的格子
  const grids = ref<Grid[]>(gridsMeta());

  // 拼图块落下的位置
  const gridsWillBePlaced = computed(() => {
    if (!blockPicking.value) return;

    const blockRect = document
      .querySelector('#picking_puzzle_block')
      ?.getBoundingClientRect() as DOMRect;

    // 拼图块左上角的坐标
    const cliendX = mouseX.value - blockRect?.width / 2;
    const cliendY = mouseY.value - blockRect.height / 2;

    const { left, right, top, bottom, width, height } = document
      .querySelector('#right_pannel')
      ?.getBoundingClientRect() as DOMRect;

    // 判断拼图块的左上角是否在盘内
    if (cliendX < left || cliendX > right || cliendY < top || cliendY > bottom)
      return;

    // 以盘子左上角为坐标原点的坐标系，拼图块的新坐标
    const trX = cliendX - left;
    const trY = cliendY - top;

    // 拼图块左上角在盘中的坐标
    const row = Math.floor(trY / (height / 7));
    const col = Math.floor(trX / (width / 8));

    if (row === 6 && col >= 3) return;

    const curForm = blockPicking.value.forms[blockPicking.value.currentForm];

    const size = [curForm.size.rows, curForm.size.cols];

    const matchResult = getSubArray(
      grids.value,
      7,
      8,
      row,
      col,
      size as [number, number]
    );

    if (matchResult.length === 0) return;

    const targetGrids: Grid[] = [];
    for (let i = 0; i < curForm.layout.length; i++) {
      if (curForm.layout[i].state === 0) continue;
      const grid = matchResult[i];
      if (grid.block_id) return [];
      else targetGrids.push(grid);
    }

    for (let i = 0; i < targetGrids.length; i++) {
      //@ts-expect-error
      if (targetGrids[i]._is_not_a_grid) return [];
    }

    return targetGrids;
  });

  watchEffect(() => {
    setGridAttr_toPlace(grids.value, false);
    if (!gridsWillBePlaced.value || gridsWillBePlaced.value.length === 0)
      return;

    setGridAttr_toPlace(gridsWillBePlaced.value, true);
  });

  function place() {
    if (
      !blockPicking.value ||
      !gridsWillBePlaced.value ||
      gridsWillBePlaced.value.length === 0
    )
      return;

    // 当前拿着的那个拼图块的id
    const id = blockPicking.value.id;

    // 把将要放置拼图块的格子的block_id字段改为拼图块的id
    gridsWillBePlaced.value.forEach(grid => {
      grid.block_id = id;
    });

    // 从blocks中找到那个拼图块，将它的状态改为3，代表已被放置到日历盘中
    const block = blocks.value.find(block => block.id === id);
    if (block) {
      block.states = 3;
    }
  }

  const date = computed(() => {
    const formatted = useDateFormat(useNow(), 'MM-DD-d');

    const arr = formatted.value.split('-').map(Number);

    const MM = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ];

    const d = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    const result = [MM[arr[0] - 1], String(arr[1]), d[arr[2]]];

    grids.value = grids.value.map(grid => {
      if (result.includes(grid.label)) {
        grid.placeable = false;
      }
      return grid;
    });

    return result;
  });

  function reset() {
    blocks.value = blocks.value.map(block => {
      block.states = 1;
      return block;
    });
    grids.value = grids.value.map(grid => {
      grid.block_id = '';
      grid.hover = false;
      grid.toPlace = false;
      return grid;
    });
  }

  const successEffect = _.once(wonEffect);

  watchEffect(() => {
    if (blocksInLeft.value.length === 0 && !blockPicking.value) {
      let a = 0;
      grids.value.forEach(grids => {
        if (!grids.placeable && !grids.block_id) {
          a++;
        }
      });
      if (a === 3) {
        successEffect();
      }
    }
  });

  return {
    grids,
    blocksInLeft,
    blockPicking,
    gridsWillBePlaced,
    place,
    blocks,
    date,
    reset,
  };
});

// 设置Grid的toPlace属性的值
export function setGridAttr_toPlace(arr: Grid[], value: boolean) {
  arr.forEach(grid => {
    grid.toPlace = value;
  });
}
