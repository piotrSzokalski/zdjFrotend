<template>
  <div class="actions">
    <button @click="sortPictures">
      <font-awesome-icon icon="sort" />
      Sortuj: {{ nextSortingName[sortingMode] }}
    </button>

    <button @click="togglePhotoFilterOpenClose">
      <font-awesome-icon icon="images" />
      Filtruj
    </button>

    <button @click="removalWarningActive = true">
      <font-awesome-icon icon="trash" />
      Usuń
    </button>

    <button @click="$emit('multiSelect')">
      <font-awesome-icon icon="fa-solid fa-circle-check" />
      Zaznacz
    </button>

    <button @click="folderSelectorActive = true">
      <font-awesome-icon icon="fa-solid fa-share-from-square" />
      Przenieś
    </button>

    <input
      type="file"
      ref="pictureFiles"
      style="display: none"
      @change="addPictures"
      multiple
    />
    <button @click="$refs.pictureFiles.click()">
      <font-awesome-icon icon="add" />
      Dodaj Zdjęcia
    </button>

    <button v-if="false" @click="test">Test</button>
  </div>

  <folder-selector
    :active="folderSelectorActive"
    @close="folderSelectorActive = false"
  />
  <removal-warning
    :active="removalWarningActive"
    @close="removalWarningActive = false"
    @remove="removePhotos"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FolderSelector from "@/modals/FolderSelector.vue";

import RemovalWarning from "@/modals/RemovalWarning.vue";

//import { exampleImages } from "@/store/dummyData";

import { photoService } from "@/services/photoService";
import { loadPhotos } from "@/store/photos";
import { photos } from "@/store/photos";

export default defineComponent({
  components: {
    FolderSelector,
    FontAwesomeIcon,
    RemovalWarning,
  },
  emits: {
    multiSelect: null,
    openPhotoFilter: null,
    closePhotoFilter: null,
  },
  setup(_, { emit }) {
    const pictureFiles = ref<HTMLInputElement>();

    const folderSelectorActive = ref(false);

    const removalWarningActive = ref(false);

    function test() {
      console.log(test);
      console.log(pictureFiles.value?.files);
    }

    async function addPictures() {
      if (pictureFiles.value?.files) {
        const results = await photoService.addPhotos(pictureFiles.value.files);
        // do wyextraktoania
        for (const res of results) {
          if (res.ok) {
            loadPhotos();
            return;
          }
        }
      }
    }

    async function removePhotos() {
      removalWarningActive.value = false;

      const results = await photoService.removePhotos();
      // do wyextraktoania
      for (const res of results) {
        if (res.ok) {
          loadPhotos();
          return;
        }
      }
    }

    /**
     * 0 -> (po id)
     * 1 -> (Najnowsze)
     * 2 -> (Najstarsze)
     * Warto zamienić na enum
     */
    const sortingMode = ref(0);

    const nextSortingName = ["Najnowsze", "Najstarsze", "Brak"];

    function sortPictures(): void {
      console.log("sort");
      sortingMode.value = (sortingMode.value + 1) % 3;
      if (sortingMode.value === 0) {
        photos.value.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (sortingMode.value === 1) {
        photos.value.sort((a, b) => (a.date > b.date ? -1 : 1));
      }
      if (sortingMode.value === 2) {
        photos.value.sort((a, b) => (a.date > b.date ? 1 : -1));
      }
    }

    const photoFilterOpen = ref(false);

    function togglePhotoFilterOpenClose(): void {
      photoFilterOpen.value = !photoFilterOpen.value;
      photoFilterOpen.value
        ? emit("closePhotoFilter")
        : emit("openPhotoFilter");
    }

    return {
      pictureFiles,
      folderSelectorActive,
      sortingMode,
      nextSortingName,
      photoFilterOpen,
      removalWarningActive,

      removePhotos,
      sortPictures,
      addPictures,
      test,
      togglePhotoFilterOpenClose,
    };
  },
});
</script>

<style scoped>
.actions {
  padding: 10px;
  display: flex;
  position: sticky;
  border-radius: 5%;
  position: relative;
}

button {
  font-size: 20px;
  font-weight: 400;
  border-radius: 50px;
  width: 8%;
  right: 0px;
  padding: 10px;
  background-color: #ffffff;
  color: #808080;
}
</style>
