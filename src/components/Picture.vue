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

export default defineComponent({
  props: {
    image: {
      type: Object as PropType<Image>,
      required: true,
    },
    selectMode: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    imageClicked: null,
  },
  setup(_, { emit }) {
    function click(): void {
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
