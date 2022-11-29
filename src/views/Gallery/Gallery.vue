<template>
  <h1>Galeria</h1>
  <div class="gallery">
    <breadcrumb-list />
    <ActionBar @multiSelect="toggleSelectMode" />
    <div class="pictures">
      <ImageComponent
        v-for="(image, index) in exampleImages"
        :key="index"
        :image="image"
        :select-mode="selectMode"
        @image-clicked="viewImage(image, index)"
      />
    </div>
  </div>

  <ImageViewer
    :active="imageViewerActive"
    :image="activeImage"
    :last="false"
    :first="false"
    @close="imageViewerActive = false"
    @next="nextImage"
    @previous="previousImage"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import ImageComponent from "@/components/ImageComponent.vue";
import BreadcrumbList from "@/components/BreadcrumbList.vue";
import ImageViewer from "@/modals/ImageViewer.vue";
import ActionBar from "@/components/ActionBar.vue";

import { exampleImages } from "@/store/dummyData";
import { Image } from "@/interfaces/image";

/**
 * Galeria ze zdjęciami
 */
export default defineComponent({
  components: {
    ImageComponent,
    BreadcrumbList,
    ImageViewer,
    ActionBar,
  },
  setup() {
    const selectMode = ref(false);

    const imageViewerActive = ref(false);

    const activeImage = ref<Image>();

    const activeImageIndex = ref(-1);

    /**
     * Włącza/Wyłącza podgląd tryb zaznaczania
     */
    function toggleSelectMode(): void {
      selectMode.value = !selectMode.value;
    }

    /**
     * Włącza/Wyłącza podgląd zdjęcia
     */
    function viewImage(image: Image, index: number): void {
      imageViewerActive.value = true;
      activeImage.value = image;
      activeImageIndex.value = index;
    }

    /**
     * Zmienia podglądane zdjęcie na następne
     */
    function nextImage(): void {
      if (activeImageIndex.value + 1 >= exampleImages.value.length) {
        return;
      }
      activeImageIndex.value++;
      activeImage.value = exampleImages.value[activeImageIndex.value];
    }

    /**
     * Zmienia podglądane zdjęcie na poprzednie
     */
    function previousImage(): void {
      if (activeImageIndex.value < 0) {
        return;
      }
      activeImageIndex.value--;
      activeImage.value = exampleImages.value[activeImageIndex.value];
    }

    return {
      exampleImages,
      selectMode,
      imageViewerActive,
      activeImage,
      activeImageIndex,

      toggleSelectMode,
      viewImage,
      nextImage,
      previousImage,
    };
  },
});
</script>

<style >
.gallery {
  padding: 20px;
  border: 5px solid;
  border-radius: 5%;
}
.pictures {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  max-height: 700px;
  overflow: auto;
}
</style>
