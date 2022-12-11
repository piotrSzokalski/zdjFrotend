<template>
  <div class="gallery">
    <breadcrumb-list />
    <ActionBar
      @multiSelect="toggleSelectMode"
      @open-photo-filter="photoFilterOpen = true"
      @close-photo-filter="photoFilterOpen = false"
    />
    <picture-filter :open="photoFilterOpen" @filter="filterPhotos" />
    <sub-folder-list />
    <div class="pictures">
      <ImageComponent
        v-for="(image, index) in exampleImagesFiltered"
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

  <modal :active="false"></modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// komponenty
import ImageComponent from "@/components/ImageComponent.vue";
import BreadcrumbList from "@/components/BreadcrumbList.vue";
import ImageViewer from "@/modals/ImageViewer.vue";
import ActionBar from "@/components/ActionBar.vue";
import SubFolderList from "@/components/SubFolderList.vue";
import PictureFilter from "@/components/PictureFilter.vue";

import Modal from "@/modals/Modal.vue";

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
    SubFolderList,
    PictureFilter,

    Modal,
  },
  setup() {
    const selectMode = ref(false);

    const imageViewerActive = ref(false);

    const activeImage = ref<Image>();

    const activeImageIndex = ref(-1);

    const exampleImagesFiltered = ref(exampleImages.value);

    const photoFilterOpen = ref(false);

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
      if (activeImageIndex.value + 1 >= exampleImagesFiltered.value.length) {
        return;
      }
      activeImageIndex.value++;
      activeImage.value = exampleImagesFiltered.value[activeImageIndex.value];
    }

    /**
     * Zmienia podglądane zdjęcie na poprzednie
     */
    function previousImage(): void {
      if (activeImageIndex.value < 0) {
        return;
      }
      activeImageIndex.value--;
      activeImage.value = exampleImagesFiltered.value[activeImageIndex.value];
    }

    function filterPhotos(fromDateString: string, toDateString: string): void {
      const fromDate = new Date(fromDateString || "1980-01-01");
      const toDate = new Date(toDateString);

      console.log("filter photos:", fromDate + "   |    " + toDate);
      console.log(exampleImagesFiltered.value);

      exampleImagesFiltered.value = exampleImages.value.filter(
        (image) =>
          (image.date >= fromDate && image.date <= toDate) || new Date()
      );

      console.log(exampleImagesFiltered.value);
    }

    return {
      exampleImagesFiltered,
      selectMode,
      imageViewerActive,
      activeImage,
      activeImageIndex,
      photoFilterOpen,

      toggleSelectMode,
      viewImage,
      nextImage,
      previousImage,
      filterPhotos,
    };
  },
});
</script>

<style >
body {
  overflow: hidden;
}

.gallery {
  padding: 20px;
  border: 5px solid;
  border-radius: 5%;
  position: absolute;
  top: 0%;
}
.pictures {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  max-height: 625px;
  overflow: auto;
}
</style>
