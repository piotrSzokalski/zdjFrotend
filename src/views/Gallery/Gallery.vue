<template>
  Abcdefg
  {{ selectedPhotosId }}
  <breadcrumb-list />
  <div class="gallery">
    <ActionBar
      @multiSelect="toggleSelectMode"
      @open-photo-filter="photoFilterOpen = true"
      @close-photo-filter="photoFilterOpen = false"
    />
    <picture-filter :open="photoFilterOpen" @filter="filterPhotos" />
    <sub-folder-list />
    <div class="pictures">
      <ImageComponent
        v-for="(image, index) in photos"
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
import { defineComponent, ref, onMounted } from "vue";

// komponenty
import ImageComponent from "@/components/ImageComponent.vue";
import BreadcrumbList from "@/components/BreadcrumbList.vue";
import ImageViewer from "@/modals/ImageViewer.vue";
import ActionBar from "@/components/ActionBar.vue";
import SubFolderList from "@/components/SubFolderList.vue";
import PictureFilter from "@/components/PictureFilter.vue";

import Modal from "@/modals/Modal.vue";

//import { exampleImages } from "@/store/dummyData";

import { photos, loadPhotos, selectedPhotosId } from "@/store/photos";

import { Photo } from "@/interfaces/photo";

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

    const activeImage = ref<Photo>();

    const activeImageIndex = ref(-1);

    const photosFiltered = ref(photos.value);

    const photoFilterOpen = ref(false);

    onMounted(() => loadPhotos());

    /**
     * Włącza/Wyłącza podgląd tryb zaznaczania
     */
    function toggleSelectMode(): void {
      selectMode.value = !selectMode.value;
    }

    /**
     * Włącza/Wyłącza podgląd zdjęcia
     */
    function viewImage(image: Photo, index: number): void {
      imageViewerActive.value = true;
      activeImage.value = image;
      activeImageIndex.value = index;
    }

    /**
     * Zmienia podglądane zdjęcie na następne
     */
    function nextImage(): void {
      if (activeImageIndex.value + 1 >= photosFiltered.value.length) {
        return;
      }
      activeImageIndex.value++;
      activeImage.value = photosFiltered.value[activeImageIndex.value];
    }

    /**
     * Zmienia podglądane zdjęcie na poprzednie
     */
    function previousImage(): void {
      if (activeImageIndex.value < 0) {
        return;
      }
      activeImageIndex.value--;
      activeImage.value = photosFiltered.value[activeImageIndex.value];
    }

    function filterPhotos(fromDateString: string, toDateString: string): void {
      const fromDate = new Date(fromDateString || "1980-01-01");
      const toDate = new Date(toDateString);

      console.log("filter photos:", fromDate + "   |    " + toDate);
      console.log(photosFiltered.value);

      photosFiltered.value = photos.value.filter(
        (image) =>
          (image.date >= fromDate && image.date <= toDate) || new Date()
      );

      console.log(photosFiltered.value);
    }

    return {
      photosFiltered,
      selectMode,
      imageViewerActive,
      activeImage,
      activeImageIndex,
      photoFilterOpen,

      photos,
      selectedPhotosId,

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
  border: 5px solid;
  border-radius: 5%;
  position: absolute;
}
.pictures {
  gap: 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  max-height: 625px;
  overflow: auto;
}
</style>
