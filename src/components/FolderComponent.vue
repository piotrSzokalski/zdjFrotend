<template>
  <div class="folder">
    <button @click="openOrMove">
      <font-awesome-icon icon="folder" />

      {{ folder.name }}
    </button>

    <button v-if="editable" @click="$emit('edit', folder)">
      <font-awesome-icon icon="pen" />
    </button>
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
      console.log("here0", props.childFolderId);
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
button {
  font-size: 40px;
  font-weight: 400;
  font-size: 15px;
  border-radius: 10px;
  border: 3px thin #293250;
  width: 200px;
}
button:hover {
  background-color: darkslateblue;
}
.folder {
  padding: 10px;
}
</style>