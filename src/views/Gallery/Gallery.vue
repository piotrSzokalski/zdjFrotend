<template>
  Galeria
  <div class="gallery">
    <breadcrumb-list />

    <div class="actions">
      <button-slot><button>Filtruj</button></button-slot>
      <button-slot><button>Usuń</button></button-slot>
      <button-slot
        ><button @click="toggleSelectMode">Zaznacz</button></button-slot
      >
      <button-slot><button>Dodaj</button></button-slot>
    </div>

    <div class="pictures">
      <Picture
        v-for="(image, index) in exampleImages"
        :key="index"
        :image="image"
        :select-mode="selectMode"
        @image-clicked="viewImage(image)"
      />
    </div>
  </div>

  <ImageViewer
    :active="imageViewerActive"
    :image="activeImage"
    @close="imageViewerActive = false"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Picture from "@/components/Picture.vue";
import BreadcrumbList from "@/components/BreadcrumbList.vue";
import ButtonSlot from "@/components/ButtonSlot.vue";
import Modal from "@/modals/Modal.vue";
import ImageViewer from "@/modals/ImageViewer.vue";

import { exampleImages } from "@/store/dummyData";
import { Image } from "@/interfaces/image";

export default defineComponent({
  components: {
    Picture,
    BreadcrumbList,
    ButtonSlot,

    ImageViewer,
  },
  setup() {
    const selectMode = ref(false);

    const imageViewerActive = ref(false);

    const activeImage = ref();

    function toggleSelectMode(): void {
      selectMode.value = !selectMode.value;
    }

    function viewImage(image: Image): void {
      imageViewerActive.value = true;
      activeImage.value = image;
      console.log("active image:", activeImage.value);
    }

    return {
      exampleImages,
      selectMode,
      imageViewerActive,
      activeImage,

      toggleSelectMode,
      viewImage,
    };
  },
});
</script>

<style >
.gallery {
  padding: 20px;
  border: 5px solid;
  border-radius: 10%;
}
.pictures {
  position: absolute;

  display: flex;
  padding: 10px;
}
.actions {
  display: flex;
}
</style>