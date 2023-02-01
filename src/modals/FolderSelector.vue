<template>
  <modal :active="active" @close="$emit('close')">
    <div class="folderSelector">
      <h2>Do jakiego folderu przenieść ?</h2>
      <label>Wyszukaj folder</label>
      <br />
      <input v-model="searchValue" type="text" />
      <br /><br />
      <button @click="switchSorting">Sortuj</button>
      <br /><br />

      <div class="foldersToSelect">
        <folder-component
          v-for="(folder, index) in filteredFolderList"
          :key="index"
          :folder="folder"
          :move-phots-mode="moveFolder ? 2 : 1"
          :child-folder-id="childFolderId"
          @moved="$emit('close')"
        />
      </div>
    </div>
    <br /><br />
  </modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";

import { folders, currentFolder } from "@/store/folders";

import Modal from "@/modals/Modal.vue";
import FolderComponent from "@/components/FolderComponent.vue";
import { Folder } from "@/interfaces/folder";

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

    const folderList = ref<Folder[]>([...folders.value]);

    watch(
      () => folders.value,
      () => (folderList.value = folders.value)
    );

    const filteredFolderList = computed(() =>
      folderList.value
        .filter((folder) => folder.id != currentFolder.value)
        .filter((folder) =>
          folder.name
            .toLocaleLowerCase()
            .includes(searchValue.value.trim().toLowerCase())
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
        const x = folderList.value.sort((a, b) => (a.id > b.id ? 1 : -1));
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
      filteredFolderList,

      switchSorting,
    };
  },
});
</script>


<style scoped>
.folderSelector {
  background: white;
  display: inline-block;
  border-radius: 8px;
  padding: 15px;
  font-size: 25px;
  font-weight: 400;
}
.folderSelector button {
  position: relative;
  float: left;
  cursor: pointer;
  width: 30%;
}
.folderSelector input {
  width: 350px;
  text-align: left;
  position: relative;
  float: left;
  margin-left: 5px;
}
.folderSelector label {
  position: relative;
  float: left;
  margin-left: 5px;
}

.foldersToSelect {
  overflow: auto;
  height: 550px;
  width:72%;
}
</style>