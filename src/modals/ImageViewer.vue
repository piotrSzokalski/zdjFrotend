<template>
  <modal :active="active" @close="$emit('close')">
    <img :src="image.path" width="600" height="600" />
    <button v-if="!last" @click="$emit('previous')">Poprzedni</button>
    <button v-if="!first" @click="$emit('next')">Następny</button>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Image } from "@/interfaces/image";

import Modal from "./Modal.vue";

/**
 * Podgląd zdjęcia
 */
export default defineComponent({
  components: {
    Modal,
  },
  props: {
    /**
     * Zdjęcie
     */
    image: {
      type: Object as PropType<Image>,
      required: true,
    },
    /**
     * Czy widoczny
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * Czy zdjęcie jest pierwsze
     */
    first: {
      type: Boolean,
      default: true,
    },
    /**
     * Czy zdjęcie jest ostatnie
     */
    last: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    /**
     * Zamknięcie podglądu zdjęcia
     */
    close: null,
    /**
     * Wciśnięcie przycisku poprzedni
     */
    previous: null,
    /**
     * Wciśnięcie przycisku następny
     */
    next: null,
  },
});
</script>
