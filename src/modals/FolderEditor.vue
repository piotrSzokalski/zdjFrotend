<template>
  <modal :active="active" @close="$emit('close')"> Folder </modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Modal from "./Modal.vue";

export default defineComponent({
  components: { Modal },
  emits: {
    close: null,
  },
  props: {
    /**
     * Czy widoczny
     */
    active: {
      type: Boolean,
      default: false,
    },
  },
});
</script>