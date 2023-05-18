<template>
  <div class="flex items-baseline" m="l-5 t-4">
    <div text="slate-500 2xl" class="leading-1 font-bold cursor-default">
      <span>{{ 8 - store.history.length }}</span> chances left.
    </div>
    <div
      class="italic cursor-pointer underline"
      hover="text-red"
      v-if="!confirm"
      @click="confirm = true"
    >
      End the game!
    </div>
    <div v-else class="bg-gray-300 font-bold cursor-default italic">
      <span class="cursor-pointer text-red" @click="store.finishGame">Yes</span>
      or
      <span class="cursor-pointer text-green" @click="confirm = false">No</span>
      ?
    </div>
  </div>

  <div class="" m="l-5 t-5">
    <label for="hiddenInput" class="flex gap-5">
      <div
        v-for="({ id, value }, idx) in store.inputValues"
        :key="id"
        class="w-15 h-15 inline-block flex justify-center items-center font-bold transition"
        :class="{ actived: idx === store.numbers.length }"
        text="4xl slate-600"
        border="solid 4px black"
      >
        {{ value }}
      </div>
    </label>
    <span class="inline-block mt-2 cursor-default"
      >Input your numbers here,and you can
      <span class="text-red italic cursor-pointer" @click="store.numbers = ''"
        >clear</span
      >
      them.</span
    >
    <div></div>
    <span class="cursor-default"
      >When you have entered 4 numbers, you can click "Enter" to check.</span
    >
    {{ store.answer }}
  </div>

  <input
    id="hiddenInput"
    type="text"
    class="w-0 h-0 absolute"
    v-model="store.numbers"
    maxlength="4"
    @keypress="validateInput"
  />
</template>

<script setup lang="ts">
import { use_GN_Store } from './store';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import _ from 'lodash';

const store = use_GN_Store();

const confirm = ref(false);

// 限制只能输入4个不重复的数字
function validateInput(e: KeyboardEvent) {
  if (!_.isFinite(Number(e.key))) {
    e.preventDefault();
  }

  if (store.numbers.split('').findIndex(val => val === e.key) !== -1) {
    e.preventDefault();
  }
}

onMounted(() => {
  window.addEventListener('keyup', store.checkInput);
});

onBeforeUnmount(() => {
  window.removeEventListener('keyup', store.checkInput);
});
</script>

<style scoped lang="scss">
.actived {
  box-shadow: 4px 4px 0 0 black;
}
</style>
