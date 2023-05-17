<template>
  <div
    class="flex items-center gap-1 cursor-pointer transition ml-5"
    hover="text-white"
    @click="isShowRules = true"
  >
    <div class="i-material-symbols:contact-support-rounded" text="2xl"></div>
    <span class="leading-[100%] font-bold">Game Rules</span>
  </div>

  <!-- 展示规则的对话框 -->
  <div
    class="w-100vw h-100vh absolute flex justify-center items-center bg-gray/50"
    v-if="isShowRules"
  >
    <div
      class="w-[50%] h-[70%] bg-white rounded shadow-[4px_4px_0_0_black]"
      border="solid black 2px"
      ref="dialog"
    >
      <h1 class="text-center">Game Rules</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const dialog = ref(null);

onClickOutside(dialog, () => {
  isShowRules.value = false;
});

const isShowRules = ref(false);
</script>

<style scoped lang="scss"></style>
