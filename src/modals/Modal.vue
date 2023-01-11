<template>
  <div v-if="active" class="modal">
    <slot :style="background"> </slot>

    <button @click="$emit('close')">Powrót</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**
 * Generalny modal
 */
export default defineComponent({
  props: {
    /**
     * Czy widoczny
     */
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    /**
     * Zamknięcie modala
     */
    close: null,
  },
  background: {
    type: String,
    default: "rgba(0, 0, 0, 0.4)",
  },
});
</script>

<style >
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0, 0.9); /* Fallback color */

  /* background-color: rgba(0, 0, 0, 0.4); Black w/ opacity */
}

.modal input {
  width: 300px;
  background-color: #efefef;
  color: #666;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px;
}

.modal button {
  width: 325px;
  color: white;
  background-color: cornflowerblue;
  border: 2px solid #808080;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
}
</style>