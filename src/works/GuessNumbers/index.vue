<template>
  <div
    class="w-[100%] h-[100vh] bg-gray-300 text-gray pattern-dots-md flex items-start font-mono relative overflow-hidden"
  >
    <div class="flex flex-col items-start">
      <Title />
      <Rule />

      <button
        class="bg-white rounded shadow-[2px_2px_0_0_black] cursor-pointer transition"
        active="shadow-none translate-x-2px translate-y-2px"
        border="solid 2px black"
        m="l-5 t-4"
        p="y-1 x-2"
        text="xl"
        @click="startGame"
        v-if="!store.state || store.won || store.lost"
      >
        New Game
      </button>

      <InputBox v-if="store.state && !store.won && !store.lost" />

      <div
        m="l-5 t-5"
        v-if="store.won"
        class="font-bold text-transparent cursor-default flex flex-col"
        text="5xl"
      >
        <h1 class="successTitle">You</h1>
        <h1 class="successTitle">Win</h1>
      </div>
      <div
        m="l-5 t-5"
        v-if="store.lost"
        class="font-bold text-transparent cursor-default flex flex-col"
        text="5xl"
      >
        <h1 class="failTitle">You</h1>
        <h1 class="failTitle">Lost</h1>
      </div>
    </div>
    <div
      class="w-200 grid gap-5"
      m="l-auto r-5 y-auto"
      grid="cols-2 flow-row"
      v-auto-animate
    >
      <HistoryItem v-for="hint in store.history" :key="hint.id" :hint="hint" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from './Title.vue';
import Rule from './Rule.vue';
import InputBox from './InputBox.vue';
import HistoryItem from './HistoryItem.vue';
import { use_GN_Store } from './store';

defineOptions({ name: 'GuessNumbers' });

const store = use_GN_Store();

function startGame() {
  store.finishGame();
  store.initAnswer();
  Promise.resolve().then(() => {
    const el = document.getElementById('hiddenInput');
    el?.focus();
  });
}
</script>

<style scoped lang="scss">
.successTitle {
  display: inline-block;
  background: linear-gradient(to right, #7117ea, #ea6060);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
}
.failTitle {
  display: inline-block;
  background: linear-gradient(to right, #65799b, #5e2563);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
