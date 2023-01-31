<template>
  <div class="folder">
    <button @click="openOrMove">
      <font-awesome-icon icon="folder" />

      {{ folder.name }}
    </button>
    <div class="editBtn">
      <button v-if="editable" @click="$emit('edit', folder)">
        <font-awesome-icon icon="ellipsis-vertical" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Folder } from "@/interfaces/folder";

import { changePath, loadFolders } from "@/store/folders";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { photoService } from "@/services/photoService";

import { loadPhotos } from "@/store/photos";
import { folderService } from "@/services/folderService";

/**
 * Pojedynczy folder w ścieżce
 */
export default defineComponent({
  components: { FontAwesomeIcon },
  emits: {
    edit: null,
    moved: null,
  },
  props: {
    folder: { type: Object as PropType<Folder>, required: true },
    editable: { type: Boolean, default: false },
    movePhotsMode: { type: Number, default: 0 },
    childFolderId: { type: Number, required: false },
  },
  setup(props, { emit }) {
    async function openOrMove() {
      //  Otwórz folder
      if (!props.movePhotsMode) {
        changePath(props.folder.id);
        return;
      }
      //  Przenieś zdjęcia do folderu
      if (props.movePhotsMode === 1) {
        await photoService.movePhotos(props.folder.id);
        await loadPhotos();
        emit("moved");
        return;
      }
      //  Przenieś folder do folderu
      if (props.childFolderId) {
        console.log("here1");
        await folderService.moveFolder(props.childFolderId, props.folder.id);
        await loadPhotos();
        await loadFolders();
        emit("moved");
      }
    }
    return {
      openOrMove,
    };
  },
});
</script>

<style scoped>
.folder button {
  font-weight: 400;
  border: none;
  font-size: 20px;
  color: #808080;
  background-color: white;
  text-align: left;
}
.folder button:hover {
  border-radius: 5px;
  opacity: 90%;
  transform: scale(1.1);
}

.editBtn button {
  opacity: 0;
}

.editBtn button:hover {
  opacity: 4;
}
.folder {
  padding: 3px;
  border: solid 1px;
  display: flex;
  border-radius: 8px;
  margin-right: 5px;
  margin-left: 15px;
  margin: 5px;
  position: unset;
  background-color: #ffffff;
  color: #808080;
  border: 1px solid;
}
</style>