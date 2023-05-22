<template>
  <div
    class="group p-1 rounded w-fit h-fit absolute left-5 bottom-5 cursor-pointer transition-1000"
    hover="bg-slate"
    @click="store.reset"
  >
    <div
      class="i-material-symbols:autorenew-rounded text-2xl text-white transition-1000"
      group-hover="text-slate-800 rotate-360deg"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { use_CP_Store } from './store';

const store = use_CP_Store();
</script>

<style scoped lang="scss"></style>
