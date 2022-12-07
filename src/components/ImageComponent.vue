<template>
  <div class="picture">
    <input v-if="selectMode" type="checkbox" />
    {{ image.id }}
    <img
      :src="image.path"
      alt="tu powinno być zdjęcie"
      width="300"
      height="300"
      @click="click"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Image } from "@/interfaces/image";

/**
 * Zdjęcie
 */
export default defineComponent({
  props: {
    /**
     * Obraz do wyświetlenia w src
     */
    image: {
      type: Object as PropType<Image>,
      required: true,
    },
    /**
     * Czy w trybie zaznaczania (np. do usuwania wielu zdjęć na raz)
     */
    selectMode: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    /**s
     * Naciśnięcie zdjęcia
     */
    imageClicked: null,
  },
  setup(props, { emit }) {
    function click(): void {
      console.log(props.image);
      emit("imageClicked");
    }
    return { click };
  },
});
</script>

<style>
.picture {
  padding: 10px;
  border: 2px solid;
}
</style>
