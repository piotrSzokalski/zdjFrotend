<template>
  <button @click="test">Test</button>
  <h1>Galeria</h1>
  <div class="gallery">
    <breadcrumb-list />
    <ActionBar @multiSelect="toggleSelectMode" @open-photo-filter="photoFilterOpen = true"
      @close-photo-filter="photoFilterOpen = false" />
    <picture-filter :open="photoFilterOpen" @filter="filterPhotos" />
    <sub-folder-list />
    <div class="pictures">
      <ImageComponent v-for="(image, index) in imagesFiltered" :key="index" :image="image" :select-mode="selectMode"
        @image-clicked="viewImage(image, index)" />
    </div>
  </div>

  <ImageViewer :active="imageViewerActive" :image="activeImage" :last="false" :first="false"
    @close="imageViewerActive = false" @next="nextImage" @previous="previousImage" />
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

import { Image } from "@/interfaces/image";
import { getImages } from "@/services/photoService";
import { images, loadImages } from "@/store/imageStore";

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
  },
  setup() {
    console.log(images);

    const selectMode = ref(false);

    const imageViewerActive = ref(false);

    const activeImage = ref<Image>();

    const activeImageIndex = ref(-1);

    const imagesFiltered = ref<Image[]>([]);

    const photoFilterOpen = ref(false);

    onMounted(() => {
      loadImages().then(() => imagesFiltered.value = images.value || []);
    });

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
      if (activeImageIndex.value + 1 >= imagesFiltered.value.length) {
        return;
      }
      activeImageIndex.value++;
      activeImage.value = imagesFiltered.value[activeImageIndex.value];
    }

    /**
     * Zmienia podglądane zdjęcie na poprzednie
     */
    function previousImage(): void {
      if (activeImageIndex.value < 0) {
        return;
      }
      activeImageIndex.value--;
      activeImage.value = imagesFiltered.value[activeImageIndex.value];
    }

    function filterPhotos(fromDateString: string, toDateString: string): void {
      const fromDate = new Date(fromDateString || "1980-01-01");
      const toDate = new Date(toDateString) || new Date();

      console.log("filter photos:", fromDate + "   |    " + toDate);
      console.log(imagesFiltered.value);

      imagesFiltered.value = images.value?.filter(photo => {
        console.log(photo.date + '|' + fromDate + '||||', photo.date >= fromDate);
        console.log(photo.date + '|' + toDate + '||||', photo.date <= toDate);
        return photo.date >= fromDate && photo.date <= toDate;
      }
      ) || [];

      console.log(imagesFiltered.value);
    }

    function test(): void {
      getImages();
    }

    return {
      imagesFiltered,
      selectMode,
      imageViewerActive,
      activeImage,
      activeImageIndex,
      photoFilterOpen,
      images,

      toggleSelectMode,
      viewImage,
      nextImage,
      previousImage,
      filterPhotos,
      test,
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
