<template>
  <div class="picture">
    {{ image.date.toString() }}
    <input v-if="selectMode" v-model="marked" type="checkbox" />
    {{ image.id }}
    <img :src="image.path" alt="tu powinno być zdjęcie" width="300" height="300" @click="click" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue";

import { Image } from "@/interfaces/image";
import { toggleImageMarked } from '@/store/imageStore';

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

    const marked = ref(false);

    watch(() => marked.value, () => toggleImageMarked(props.image.id));

    function click(): void {
      console.log(props.image);
      emit("imageClicked");
    }
    return {
      marked,

      click
    };
  },
});
</script>

<style>
.picture {
  padding: 10px;
  border: 2px solid;
}
</style>
