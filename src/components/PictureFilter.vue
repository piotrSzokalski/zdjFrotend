<template>
  <div v-if="open" class="picFilter">
    <h3>Filtuj</h3>
    Od:
    <input v-model="fromDateString" type="date" @change="$emit('filter', fromDateString, toDateString)" />
    Do:
    <input v-model="toDateString" type="date" @change="$emit('filter', fromDateString, toDateString)" />
      <br /><br />
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
        padding-left:15px;
        padding-bottom: 15px;
        font-size: 15px;
        text-align: left;
        color: #42026b;
        display: block;
        border: 1px solid #e5e2e7;
        width: 500px;
        border-radius: 5px;
        position: relative;
        left: 0.7%;
        right: 25%;
        background-color: #d3f4f31a;
    }
    .picFilter input{
        border-radius: 5px;
        border:1px solid;
        padding:5px;
        margin: 5px;
    }
        .picFilter button {
            font-size: 14px;
            font-weight: 400;
            border-radius: 5px;
            padding: 10px;
            background-color: #5a28aa;
            color: white;
            border: 1px solid;
            cursor: pointer;
            position: relative;
            left: 74%;
        }

</style>
