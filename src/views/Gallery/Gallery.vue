<template>
  Test
  {{ currentFolder }}
  <breadcrumb-list />
  <div class="gallery">
    <ActionBar
      @multiSelect="toggleSelectMode"
      @open-photo-filter="photoFilterOpen = true"
      @close-photo-filter="photoFilterOpen = false"
    />
    <picture-filter
      :open="photoFilterOpen"
      @filter="filterPhotos"
      @clear-filter="clearFilter"
    />
    <sub-folder-list />
    <div class="selectButtons">
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
      <h2>Brak zdjęć w tym folderze</h2>
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

import { photos, loadPhotos, selectedPhotosId } from "@/store/photos";
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
      () => photos.value,
      () => (photosFiltered.value = photos.value || [])
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

    function filterPhotos(fromDateString: string, toDateString: string): void {
      const fromDate = new Date(fromDateString || 0).getTime();
      const toDate = new Date(toDateString).getTime() || new Date().getTime();

      photosFiltered.value = photos.value.filter((photo) => {
        const photoDate = new Date(photo.date).getTime();
        return photoDate >= fromDate && photoDate <= toDate;
      });
    }

    function clearFilter() {
      photosFiltered.value = photos.value;
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
      lastImage,
      firstImage,
      folders,
      currentFolder,

      toggleSelectMode,
      viewImage,
      nextImage,
      previousImage,
      filterPhotos,
      clearFilter,
    };
  },
});
</script>

<style >
body {
  overflow: hidden;
}

.gallery {
  border: 1px solid;
  border-radius: 20px;
  position: relative;
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

button {
  border: 2px solid #2130ae;
  border-radius: 5px;
  font-size: 15px;
  padding: 20px;
}

.selectButtons {
  background-color: aliceblue;
}

.selectButtons button {
  border: 2px solid aliceblue;
  background-color: green;
  border-radius: 10px;
  font-size: 15px;
  padding: 20px;
}
</style>
