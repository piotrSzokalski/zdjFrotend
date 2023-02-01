<template>
  <div v-if="open" class="folderMenu">
    <div class="header">
      <button @click="close">
        <font-awesome-icon icon="xmark" />
      </button>
      {{ folder.name }}
    </div>

    <br /><br />

    <button @click="folderEditorActive = true">
      <font-awesome-icon icon="pen" />
      Zmień nazwę
    </button>

    <br />
    <button @click="folderSelectorActive = true">
      <font-awesome-icon icon="fa-solid fa-share-from-square" />
      Przenieś
    </button>

    <br />
    <button @click="removeMaybe">
      <font-awesome-icon icon="trash" />
      Usuń
    </button>
    <br />
  </div>

  <folder-editor :active="folderEditorActive" :folder="folder" edit-mode @close="folderEditorActive = false" />

  <folder-selector move-folder :active="folderSelectorActive" :child-folder-id="folder?.id"
    @close="closeFolderSelector" />

  <removal-warning folderRemoval :active="warningActive" @remove="removeFolder" @close="warningActive = false" />
</template>



<script>
import { defineComponent, PropType, ref, watch } from "vue";

import { folderService } from "@/services/folderService";
import { currentFolder, loadFolders } from "@/store/folders";
import { mousePosX, mousePosY } from "@/store/mousePos";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import FolderEditor from "@/modals/FolderEditor.vue";
import FolderSelector from "@/modals/FolderSelector.vue";
import RemovalWarning from "@/modals/RemovalWarning.vue";

export default defineComponent({
  components: {
    FolderEditor,
    FolderSelector,
    RemovalWarning,
    FontAwesomeIcon,
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
      warningActive.value = false;
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

    function closeFolderSelector() {
      folderSelectorActive.value = false;
      close();
    }

    const posX = ref(0);
    const posY = ref(0);

    watch([() => props.open, () => props.folder], () => {
      posX.value = mousePosX.value - 200 + "px";
      posY.value = mousePosY.value - 90 + "px";
    });

    return {
      folderEditorActive,
      folderSelectorActive,
      warningActive,
      mousePosX,
      mousePosY,
      posX,
      posY,

      removeMaybe,
      removeFolder,
      close,

      closeFolderSelector,
    };
  },
});
</script>

<style>
.folderMenu {
  border: 1px solid;
  background-color: #eeedf0;
  display: inline-block;
  border-radius: 5px;

  position: absolute;
  top: v-bind(posY);
  left: v-bind(posX);

  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.folderMenu button {
  border: 1px solid;
  border-radius: 5px;
  padding: 8px;
  background-color: #5a28aa;
  color: white;
  width: 130px;
}

.folderMenu .header {
  height: 15px;
}

.folderMenu .header button {
  background: transparent;
  color: black;
  width: 25px;
  float: top;
}
</style>