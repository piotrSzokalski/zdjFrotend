<template>
  <modal :active="active" @close="close">
    <img :src="image.path" width="600" height="600" />
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Image } from "@/interfaces/image";

import Modal from "./Modal.vue";

export default defineComponent({
  components: {
    Modal,
  },
  props: {
    image: {
      type: Object as PropType<Image>,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    close: null,
  },
  setup(props, { emit }) {
    function close(): void {
      emit("close");
    }
    return { close };
  },
});
</script>
