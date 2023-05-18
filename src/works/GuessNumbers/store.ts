import { ref, computed, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import type { Hint } from './types';
import confetti from 'canvas-confetti';
import { useRoute } from 'vue-router';

// 生成答案
function genAnswer(): string {
  const nums: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result: number[] = [];
  for (let i = 0; i < 4; i++) {
    const index = _.random(0, nums.length - 1);
    result.push(...nums.splice(index, 1));
  }
  return result.join('');
}

// 生成提示
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

// 胜利时庆祝的礼花效果
function wonEffect() {
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const timer = setInterval(() => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(100, 200),
      origin: { y: 0.6 },
    });
  }, 800);

  setTimeout(() => {
    clearInterval(timer);
  }, 3000);
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

  watchEffect(() => {
    if (won.value) {
      wonEffect();
    }
  });

  function initAnswer() {
    const defineAnswer = window.history.state.current
      .split('?')[1]
      ?.split('=')[1];
    if (defineAnswer) {
      answer.value = atob(defineAnswer);
    } else {
      answer.value = genAnswer();
    }

    console.log(answer.value);
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
