<template>
  <div class="actions">
    <button @click="sortPictures">
      Sortuj: {{ nextSortingName[sortingMode] }}
    </button>

    <button @click="togglePhotoFilterOpenClose">Filtruj</button>

    <button>Usuń</button>

    <button @click="$emit('multiSelect')">Zaznacz</button>

    <button @click="folderSelectorActive = true">Przenieś</button>

    <input
      type="file"
      ref="pictureFiles"
      style="display: none"
      @change="addPicture"
    />
    <button @click="$refs.pictureFiles.click()">Dodaj</button>

    <button v-if="false" @click="test">Test</button>
  </div>

  <folder-selector
    :active="folderSelectorActive"
    @close="folderSelectorActive = false"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import FolderSelector from "@/modals/FolderSelector.vue";
import { exampleImages } from "@/store/dummyData";
import { images } from "@/store/imageStore";

export default defineComponent({
  components: {
    FolderSelector,
  },
  emits: {
    multiSelect: null,
    openPhotoFilter: null,
    closePhotoFilter: null,
  },
  setup(_, { emit }) {
    const pictureFiles = ref<HTMLInputElement>();

    const folderSelectorActive = ref(false);

    function test() {
      console.log(pictureFiles.value?.files);
    }

    function addPicture(): void {
      //console.log(pictureFiles.value?.files);
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
        images.value?.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (sortingMode.value === 1) {
        images.value?.sort((a, b) => (a.date > b.date ? -1 : 1));
      }
      if (sortingMode.value === 2) {
        images.value?.sort((a, b) => (a.date > b.date ? 1 : -1));
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

      sortPictures,
      addPicture,
      test,
      togglePhotoFilterOpenClose,
    };
  },
});
</script>

<style scoped>
.actions {
  display: flex;
  position: sticky;
  border: 3px solid;
  border-radius: 5%;
}
button {
  font-size: 30px;
  border-radius: 10%;
  width: 10%;
  right: 0px;
}
</style>
