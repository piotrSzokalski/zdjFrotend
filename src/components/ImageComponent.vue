<template>
  {{ image.date }}
  {{ selectMode }}
  <div class="picture" @click="selectMode ? select(image.id) : click()">
    <input v-if="selectMode" v-model="selected" type="checkbox" />
    <img
      :src="image.path"
      alt="tu powinno być zdjęcie"
      height="250"
      width="250"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

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
    const selected = ref(false);

    function click(): void {
      emit("imageClicked");
    }

    function select(id: number) {
      selected.value = !selected.value;
      togglePhotoSelected(id);
    }

    function test() {
      console.log("test");
    }
    return {
      selected,

      click,

      togglePhotoSelected,
      select,
      test,
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
