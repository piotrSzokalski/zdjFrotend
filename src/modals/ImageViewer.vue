<template>
  <modal :active="active" @close="close">
    <img :src="image.path" width="600" height="600" />
    <button v-if="!last" @click="$emit('previous')">Poprzedni</button>
    <button v-if="!first" @click="$emit('next')">Następny</button>
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
    first: {
      type: Boolean,
      default: true,
    },
    last: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    close: null,
    previous: null,
    next: null,
  },
  setup(props, { emit }) {
    function close(): void {
      emit("close");
    }
    return { close };
  },
});
</script>
