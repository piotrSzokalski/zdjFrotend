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
  width: 90wh;
  height: 90ch;
  z-index: 100;
}
</style>