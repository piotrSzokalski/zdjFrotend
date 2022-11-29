<template>
  <div v-if="active" class="modal">
    <button @click="$emit('close')">powrót</button>
    <slot> </slot>
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
});
</script>

<style >
.modal {
  position: absolute;
  background-color: gray;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 10%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>