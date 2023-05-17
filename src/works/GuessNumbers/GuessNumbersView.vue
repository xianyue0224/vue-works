<template>
  <div
    class="w-[100%] h-[100vh] bg-gray-300 text-gray pattern-dots-md flex flex-col items-start font-mono relative overflow-hidden"
  >
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
      v-if="!store.state"
    >
      New Game
    </button>

    <InputBox v-if="store.state" />
  </div>
</template>

<script setup lang="ts">
import Title from './Title.vue';
import Rule from './Rule.vue';
import InputBox from './InputBox.vue';
import { use_GN_Store } from './store';

const store = use_GN_Store();

function startGame() {
  store.initAnswer();
  Promise.resolve().then(() => {
    const el = document.getElementById('hiddenInput');
    el?.focus();
  });
}
</script>

<style scoped lang="scss"></style>
