<template>
  <div class="picture">
    <input
      v-if="selectMode"
      type="checkbox"
      @change="togglePhotoSelected(image.id)"
    />
    <img
      :src="image.path"
      alt="tu powinno być zdjęcie"
      @click="click"
      height="250"
      width="250"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

// import { Image } from "@/interfaces/image";
import { Photo } from "@/interfaces/photo";

import { togglePhotoSelected } from "@/store/photos";

/**
 * Zdjęcie
 */
export default defineComponent({
  props: {
    /**
     * Obraz do wyświetlenia w src
     */
    image: {
      type: Object as PropType<Photo>,
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
  setup(_, { emit }) {
    function click(): void {
      emit("imageClicked");
    }
    return {
      click,

      togglePhotoSelected,
    };
  },
});
</script>

<style scoped>
.picture {
  border: 2px solid;
}
img {
  object-fit: cover;
  vertical-align: bottom;
}
</style>
