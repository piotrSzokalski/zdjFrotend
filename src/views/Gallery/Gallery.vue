<template>
  <breadcrumb-list />
  <div class="gallery">
    <sub-folder-list />
    <ActionBar
      @multiSelect="toggleSelectMode"
      @open-photo-filter="photoFilterOpen = true"
      @close-photo-filter="photoFilterOpen = false"
    />
    <picture-filter
      :open="photoFilterOpen"
      @filter="filter"
      @clear-filter="clearFilter"
    />

    <div v-if="false" class="selectButtons">
      <button>Zaznacz wszystkie</button>
      <button>Anuluj zaznaczanie</button>
    </div>
    <div v-if="photosFiltered.length" class="pictures">
      <ImageComponent
        v-for="(image, index) in photosFiltered"
        :key="index"
        :image="image"
        :select-mode="selectMode"
        @image-clicked="viewImage(image, index)"
      />
    </div>
    <div v-else>
        <br /><br />
        Brak zdjęć w tym folderze
        <br /><br />
    </div>
  </div>

  <ImageViewer
    :active="imageViewerActive"
    :image="activeImage"
    :last="lastImage"
    :first="firstImage"
    @close="imageViewerActive = false"
    @next="nextImage"
    @previous="previousImage"
  />

  <modal :active="false"></modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";

// komponenty
import ImageComponent from "@/components/ImageComponent.vue";
import BreadcrumbList from "@/components/BreadcrumbList.vue";
import ImageViewer from "@/modals/ImageViewer.vue";
import ActionBar from "@/components/ActionBar.vue";
import SubFolderList from "@/components/SubFolderList.vue";
import PictureFilter from "@/components/PictureFilter.vue";

import Modal from "@/modals/Modal.vue";

//import { exampleImages } from "@/store/dummyData";

import {
  photos,
  filteredPhotos,
  filterPhotos,
  loadPhotos,
  selectedPhotosId,
  unFilterPhots,
} from "@/store/photos";
import { folders, loadFolders, currentFolder } from "@/store/folders";

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

    const photosFiltered = ref<Photo[]>([]);

    const photoFilterOpen = ref(false);

    const lastImage = computed(() => false);

    const firstImage = computed(() => false);

    onMounted(() => {
      loadPhotos();
      loadFolders();
    });

    watch(
      () => filteredPhotos.value,
      () => (photosFiltered.value = filteredPhotos.value || [])
    );

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

    function filter(fromDateString: string, toDateString: string): void {
      filterPhotos(fromDateString, toDateString);
    }

    function clearFilter() {
      unFilterPhots();
    }

    return {
      photosFiltered,
      selectMode,
      imageViewerActive,
      activeImage,
      activeImageIndex,
      photoFilterOpen,
      filteredPhotos,
      selectedPhotosId,
      lastImage,
      firstImage,
      folders,
      currentFolder,

      toggleSelectMode,
      viewImage,
      nextImage,
      previousImage,
      filter,
      clearFilter,
    };
  },
});
</script>

<style >
body {
  overflow: hidden;
  background-color: lavender;
}
.gallery {
  border: 0;
  border-radius: 8px;
  position: relative;
  background-color: white;
  margin-left: 15px;
  margin-right: 15px;
}

.pictures {
  gap: 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  max-height: 600px;
  max-width: 2000px;
  overflow: auto;
}
.gallery button {
  margin: 5px;
}
</style>
