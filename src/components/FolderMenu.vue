<template>
  <div class="folderMenu">
    {{ folder.id }}
    <button @click="close">Zamknij</button>
    <button @click="folderEditorActive = true">Zmień nazwe</button>
    <button>Przenieś</button>
    <button>Usuń</button>
  </div>

  <folder-editor
    :active="folderEditorActive"
    :folder="folder"
    edit-mode
    @close="folderEditorActive = false"
  />
</template>



<script>
import { defineComponent, PropType, ref, watch } from "vue";

import { Folder } from "@/interfaces/folder";
import { folderService } from "@/services/folderService";
import { currentFolder, loadFolders } from "@/store/folders";

import FolderEditor from "@/modals/FolderEditor.vue";

export default defineComponent({
  components: {
    FolderEditor,
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

    console.log(props.folder);

    watch(
      () => currentFolder.value,
      () => emit("close")
    );

    async function remove() {
      if (props.folder) {
        await folderService.removeFolder(props.folder.id);
        loadFolders();
        close();
      }
    }

    function close() {
      emit("close");
    }

    return {
      folderEditorActive,

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