import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import type { Hint } from './types';

function genAnswer(): string {
  const nums: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result: number[] = [];
  for (let i = 0; i < 4; i++) {
    const index = _.random(0, nums.length - 1);
    result.push(...nums.splice(index, 1));
  }
  return result.join('');
}

function genHint(input: string, answer: string): Hint {
  let a = 0,
    b = 0;
  for (let i = 0; i < 4; i++) {
    const idx = answer.indexOf(input.charAt(i));
    if (idx === -1) continue;
    else if (idx === i) a++;
    else b++;
  }
  return {
    id: nanoid(),
    input,
    A: a,
    B: b,
  };
}

export const use_GN_Store = defineStore('guess_numbers', () => {
  const answer = ref('');

  // true - 游戏已开始
  // false - 游戏已结束
  const state = computed(() => answer.value.length !== 0);

  // 玩家输入的数字
  const numbers = ref('');

  // 猜测记录
  const history = ref<Hint[]>([]);

  // v-for 使用的数据
  const inputValues = computed(() => {
    const resultArr = [];
    numbers.value.split('').forEach(num => {
      resultArr.push({
        id: nanoid(),
        value: String(num),
      });
    });

    while (resultArr.length < 4) {
      resultArr.push({
        id: nanoid(),
        value: ' ',
      });
    }

    return resultArr;
  });

  // 赢了
  const won = computed(
    () => history.value.at(-1)?.A === 4 && history.value.length <= 8
  );

  // 输了
  const lost = computed(
    () => history.value.length === 8 && history.value.at(-1)?.A !== 4
  );

  function initAnswer() {
    answer.value = genAnswer();
  }

  function finishGame() {
    answer.value = '';
    history.value = [];
    numbers.value = '';
  }

  function checkInput(e: KeyboardEvent) {
    if (e.key !== 'Enter' || numbers.value.length < 4) return;
    // 生成提示
    history.value.push(genHint(numbers.value, answer.value));
    // 清空
    numbers.value = '';
  }

  return {
    answer,
    state,
    initAnswer,
    numbers,
    inputValues,
    checkInput,
    history,
    won,
    lost,
    finishGame,
  };
});
