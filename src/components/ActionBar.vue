<template>
  <div class="actions">
    <button @click="sortPictures">
      <font-awesome-icon icon="sort" />
      Sortuj: {{ nextSortingName[sortingMode] }}
    </button>

    <button @click="togglePhotoFilterOpenClose">
      <font-awesome-icon icon="filter" />
      Filtruj
    </button>

    <button><font-awesome-icon icon="trash" />Usuń</button>

    <button @click="$emit('multiSelect')">
      <font-awesome-icon icon="mark" />
      Zaznacz
    </button>

    <button @click="folderSelectorActive = true">
      <font-awesome-icon icon="move" />
      Przenieś
    </button>

    <input
      type="file"
      ref="pictureFiles"
      style="display: none"
      @change="addPicture"
    />
    <button @click="$refs.pictureFiles.click()">
      <font-awesome-icon icon="add" />
      Dodaj Zdjęcie
    </button>

    <button v-if="false" @click="test">Test</button>
  </div>

  <folder-selector
    :active="folderSelectorActive"
    @close="folderSelectorActive = false"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FolderSelector from "@/modals/FolderSelector.vue";

import { exampleImages } from "@/store/dummyData";

export default defineComponent({
  components: {
    FolderSelector,
    FontAwesomeIcon,
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
        exampleImages.value.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (sortingMode.value === 1) {
        exampleImages.value.sort((a, b) => (a.date > b.date ? -1 : 1));
      }
      if (sortingMode.value === 2) {
        exampleImages.value.sort((a, b) => (a.date > b.date ? 1 : -1));
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
button:hover {
  background-color: red;
}
</style>
