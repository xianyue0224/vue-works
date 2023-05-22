import { defineStore } from 'pinia';
import { ref } from 'vue';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import type { Grid, HistoryItem } from './types';
import { diffTimes } from '@/utils';

export const use_ST_Store = defineStore('schult_table', () => {
  const grids = ref<Grid[]>(genGrids());

  const level = ref(1);

  const state = ref<0 | 1>(0);

  function genGrids() {
    const nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result: number[] = [];
    for (let i = 0; i < 9; i++) {
      const index = _.random(0, nums.length - 1);
      result.push(...nums.splice(index, 1));
    }
    return result.map(num => {
      return {
        id: nanoid(),
        num: String(num),
        target: num === 1,
        clicked: false,
      };
    });
  }

  const history = ref<HistoryItem[]>([]);

  const start_time = ref<Date>(new Date());

  const displayTime = ref(0);

  let timer: number;

  function start() {
    if (state.value === 1) return;
    grids.value = genGrids();
    start_time.value = new Date();
    timer = setInterval(() => {
      displayTime.value += 20;
    }, 20);
    state.value = 1;
  }

  function finish(addHistory: boolean = true) {
    const end_time = new Date();
    if (timer) {
      clearInterval(timer);
    }
    state.value = 0;
    displayTime.value = 0;
    if (addHistory) {
      history.value.push({
        id: nanoid(),
        level: level.value,
        start_time: start_time.value,
        total_time: diffTimes(start_time.value, end_time),
        end_time,
      });
    }
  }

  return { grids, state, level, start, displayTime, finish, history };
});
