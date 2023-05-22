<template>
  <div class="absolute left-5 bottom-5">
    <div class="text-2xl font-bold">
      本次用时-{{ store.state === 1 ? formattedTime : '00:00' }}
    </div>
    <div v-if="store.history.length !== 0" v-auto-animate>
      <h3>历史记录</h3>
      <div
        v-for="(item, idx) in store.history"
        :key="item.id"
        class="flex gap-1"
      >
        <span>{{ msToSSsss(item.total_time) }}</span>
        <span
          v-if="idx !== 0"
          :style="{
            color:
              item.total_time - store.history[idx - 1].total_time < 0
                ? 'green'
                : 'red',
          }"
        >
          {{
            item.total_time - store.history[idx - 1].total_time < 0
              ? '快'
              : '慢'
          }}
          {{ msToSSsss(item.total_time - store.history[idx - 1].total_time) }}
        </span>
      </div>
      <h4>
        平均
        {{
          msToSSsss(
            store.history.reduce((accumulator, item) => {
              return item.total_time + accumulator;
            }, 0) / store.history.length
          )
        }}
      </h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { use_ST_Store } from './store';
import { computed } from 'vue';

const store = use_ST_Store();

const formattedTime = computed(() => {
  const s = String(Math.floor(store.displayTime / 1000)).padStart(2, '0');
  const ms = (store.displayTime % 1000) / 10;
  return s + ':' + ms;
});

function msToSSsss(value: number) {
  if (value < 0) {
    value = value * -1;
  }
  const s = String(Math.floor(value / 1000)).padStart(2, '0');
  const ms = Math.floor(value % 1000);
  return s + ':' + ms;
}
</script>

<style scoped lang="scss"></style>
