<template>
  <div class="folderMenu">
    {{ folder.name }}
    <button @click="close">Zamknij</button>
    <button @click="folderEditorActive = true">Zmień nazwę</button>
    <button @click="folderSelectorActive = true">Przenieś</button>
    <button @click="removeMaybe">Usuń</button>
  </div>

  <folder-editor
    :active="folderEditorActive"
    :folder="folder"
    edit-mode
    @close="folderEditorActive = false"
  />

  <folder-selector
    move-folder
    :active="folderSelectorActive"
    :child-folder-id="folder?.id"
    @close="folderSelectorActive = false"
  />

  <removal-warning
    folderRemoval
    :active="warningActive"
    @remove="removeFolder"
    @close="warningActive = false"
  />
</template>



<script>
import { defineComponent, PropType, ref, watch } from "vue";

import { Folder } from "@/interfaces/folder";
import { folderService } from "@/services/folderService";
import { currentFolder, loadFolders } from "@/store/folders";

import FolderEditor from "@/modals/FolderEditor.vue";
import FolderSelector from "@/modals/FolderSelector.vue";
import RemovalWarning from "@/modals/RemovalWarning.vue";

export default defineComponent({
  components: {
    FolderEditor,
    FolderSelector,
    RemovalWarning,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    folder: {
      type: Object,
      required: false,
    },
  },
  emits: {
    close: null,
  },
  setup(props, { emit }) {
    const folderEditorActive = ref(false);

    const folderSelectorActive = ref(false);

    const warningActive = ref(false);

    console.log(props.folder);

    watch(
      () => currentFolder.value,
      () => emit("close")
    );

    function removeMaybe() {
      warningActive.value = true;
    }

    async function removeFolder() {
      if (props.folder) {
        await folderService.removeFolder(props.folder.id);
        loadFolders();
        close();
      }
    }

    function moveFolder() {
      folderSelectorActive.value = true;
    }

    function close() {
      emit("close");
    }

    return {
      folderEditorActive,
      folderSelectorActive,
      warningActive,

      removeMaybe,
      removeFolder,
      close,
    };
  },
});
</script>

<style>
.folderMenu {
  border: 1px solid;
  background-color: rgb(239, 230, 178);
  display: inline-block;

  position: absolute;

  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}
</style>