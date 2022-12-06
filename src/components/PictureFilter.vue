<template>
  <div v-if="open" class="picFilter">
    Data: Od:
    <input
      v-model="fromDateString"
      type="date"
      @change="$emit('filter', fromDateString, toDateString)"
    />
    Do:
    <input
      v-model="toDateString"
      type="date"
      @change="$emit('filter', fromDateString, toDateString)"
    />
    <button @click="$emit('clearFilter')">Wyczyść filtr</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { exampleImages } from "@/store/dummyData";

export default defineComponent({
  emits: {
    filter: null,
    clearFilter: null,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const fromDateString = ref();
    const toDateString = ref();

    return {
      fromDateString,
      toDateString,
    };
  },
});
</script>

<style scoped>
.picFilter {
  display: block;
}
</style>
