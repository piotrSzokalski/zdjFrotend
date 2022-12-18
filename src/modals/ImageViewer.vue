<template>
  <modal
    :active="active"
    :background="'background-color: rgb(0, 0, 0)'"
    @close="$emit('close')"
  >
    <!--
 <action-bar />
    -->
    <div class="image">
      <img :src="image.path" />
    </div>

    <div class="pre">
      <button v-if="!last" @click="$emit('previous')">Poprzedni</button>
    </div>
    <div class="next">
      <button v-if="!first" @click="$emit('next')">Następny</button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

// import { Image } from "@/interfaces/image";
import { Photo } from "@/interfaces/photo";

import Modal from "./Modal.vue";
import ActionBar from "@/components/ActionBar.vue";

/**
 * Podgląd zdjęcia
 */
export default defineComponent({
  components: {
    Modal,
    //ActionBar,
  },
  props: {
    /**
     * Zdjęcie
     */
    image: {
      type: Object as PropType<Photo>,
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

<style scoped>
img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 50%;
  height: 80%;
}

.pre {
  position: absolute;
  left: 1%;
  bottom: 20%;
  /* visibility: hidden; */
}
.pre:hover {
  visibility: visible;
}

.next {
  position: absolute;
  right: 1%;
  bottom: 20%;
  /* visibility: hidden; */
}

.next:hover {
  visibility: visible;
  background-color: red;
}
</style>