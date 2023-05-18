<template>
  <div
    class="w-100% h-30 transition rounded bg-white grid cursor-default"
    text="4xl slate-600"
    grid="cols-2 flow-row"
    border="solid 2px black"
    hover="shadow-[4px_4px_0_0_black] -translate-x-4px -translate-y-4px"
  >
    <div class="w-100% h-100% grid place-items-center">
      {{ props.hint.input }}
    </div>
    <div class="w-100% h-100% grid place-items-center">
      {{ props.hint.A }}A{{ props.hint.B }}B
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hint } from './types';

const props = defineProps<{
  hint: Hint;
}>();
</script>

<style scoped lang="scss"></style>
