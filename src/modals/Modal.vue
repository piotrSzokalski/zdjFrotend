<template>
  <div v-if="active" class="modal">
    <button @click="close">powrót</button>
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    close: null,
  },
  setup(_, { emit }) {
    function close(): void {
      emit("close");
    }
    return { close };
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