<template>
  <modal :active="active" @close="$emit('close')">
    <div class="folderSelector">
      <button @click="switchSorting">Sortuj</button>
      <input v-model="searchValue" type="text" />
      <folder-component
        v-for="(folder, index) in folderList"
        :key="index"
        :folder="folder"
        :move-phots-mode="moveFolder ? 2 : 1"
        :child-folder-id="childFolderId"
        @moved="$emit('close')"
      />
      {{ sortingMode }}
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

// import { exampleFolders } from "@/store/dummyData";

import { folders } from "@/store/folders";

import Modal from "@/modals/Modal.vue";
import FolderComponent from "@/components/FolderComponent.vue";

export default defineComponent({
  components: { Modal, FolderComponent },
  emits: {
    close: null,
  },
  props: {
    /**
     * Czy widoczny
     */
    active: {
      type: Boolean,
      default: false,
    },
    moveFolder: {
      type: Boolean,
      default: false,
    },
    childFolderId: { type: Number, required: false },
  },
  setup(props) {
    const searchValue = ref("");

    const folderList = computed(() =>
      folders.value
        .filter((folder) => folder.id !== props.childFolderId)
        .filter((folder) =>
          folder.name
            .toLocaleLowerCase()
            .includes(searchValue.value.trim().toLocaleLowerCase())
        )
    );

    /**
     * 0 -> (po id)
     * 1 -> (A-Z)
     * 2 -> (Z-A)
     * Warto zamienić na enum
     */
    const sortingMode = ref(0);

    function switchSorting(): void {
      sortingMode.value = (sortingMode.value + 1) % 3;
      if (sortingMode.value === 0) {
        folderList.value.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (sortingMode.value === 1) {
        folderList.value.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
      }
      if (sortingMode.value === 2) {
        folderList.value.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
        );
      }
    }

    return {
      folderList,
      sortingMode,
      searchValue,

      switchSorting,
    };
  },
});
</script>


<style scoped>
.folderSelector {
  background: white;
}
</style>