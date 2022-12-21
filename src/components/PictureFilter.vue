<template>
  <div v-if="open" class="picFilter">
    <h3>Filter</h3>
    Data: Od:
    <input v-model="fromDateString" type="date" @change="$emit('filter', fromDateString, toDateString)" />
    Do:
    <input v-model="toDateString" type="date" @change="$emit('filter', fromDateString, toDateString)" />
    <button @click="clearFilter">
      <font-awesome-icon icon="trash" />
      Wyczyść filtr
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import { exampleImages } from "@/store/dummyData";

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
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
  setup(_, { emit }) {
    const fromDateString = ref();
    const toDateString = ref();

    function clearFilter() {
      fromDateString.value = '';
      toDateString.value = '';
      emit('clearFilter');
    }

    return {
      fromDateString,
      toDateString,

      clearFilter,
    };
  },
});
</script>

<style scoped>
.picFilter {
  display: block;
  border: 2px solid;
  width: 900px;
}
</style>
