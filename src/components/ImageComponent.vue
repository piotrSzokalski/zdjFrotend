<template>
  <div
    :class="{
      picture: !selectMode,
      pictureSelected: selectMode,
      isSelected: selected && selectMode,
    }"
    @click="selectMode ? select(image.id) : click()"
  >
    <input v-if="selectMode" v-model="selected" type="checkbox" />
    <img
      :src="photoPath"
      alt="tu powinno być zdjęcie"
      height="250"
      width="250"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

// import { Image } from "@/interfaces/image";
import { Photo } from "@/interfaces/photo";

import { togglePhotoSelected, selectedPhotosId } from "@/store/photos";
import { APICalls } from "@/enums/apiCalls.enum";
import { APIurl } from "@/const/photoAPI";

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
  setup(props, { emit }) {
    const selected = computed(() =>
      selectedPhotosId.value.includes(props.image.id)
    );

    const photoPath = computed(
      () => APIurl[APICalls.PHOTOS_GET_PHOTO] + props.image.id
    );

    function click(): void {
      emit("imageClicked");
    }

    function select(id: number) {
      togglePhotoSelected(id);
    }

    function test() {
      console.log("test");
    }
    return {
      selected,
      photoPath,

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
  border: 1px #fff;
  
}

.picture img {
  object-fit: fill;
  vertical-align: bottom;
}

.picture img:hover {
  object-fit: cover;
  vertical-align: bottom;
  border-radius: 20px;
  opacity: 90%;
  transform: scale(1.1);
}

    .pictureSelected {
        border: 8px solid white;
        border-radius: 5px;
    }

.pictureSelected img {
  object-fit: cover;
  vertical-align: text-bottom;

}

.pictureSelected img:hover {
  object-fit: cover;
  vertical-align: bottom;
  border-radius: 20%;
  opacity: 90%;
  transform: scale(1.1);
}

.isSelected {
  border: 5px solid lightblue;
  width: auto;
}

.isSelected img {
  object-fit: cover;
  vertical-align: bottom;
  background-color: lightblue;
}

.isSelected img:hover {
  object-fit: cover;
  vertical-align: bottom;
  border-radius: 5px;
  opacity: 90%;
  transform: scale(1.1);
}
</style>
