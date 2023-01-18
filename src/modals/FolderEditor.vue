<template>
    <modal :active="active" @close="close">
        <div class="folderEditor">
            <p v-if="editMode">Zmień nazwę folderu</p>
            <p v-else>Utwórz nowy folder</p>

            <input v-model="fName" type="text" />
            <br /><br />
            <button @click="save">
                {{ editMode ? "Zmień" : "Utwórz" }}
            </button>

        </div>
        <br /><br />
    </modal>
  <folder-selector
    move-folder
    :active="folderSelectorActive"
    :child-folder-id="folder?.id"
    @close="folderSelectorActive = false"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

import { folderService } from "@/services/folderService";
import { currentFolder, loadFolders } from "@/store/folders";

import FolderSelector from "./FolderSelector.vue";
import Modal from "./Modal.vue";
import { Folder } from "@/interfaces/folder";

export default defineComponent({
  components: {
    Modal,
    FolderSelector,
  },
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
    /**
     * Nazwa folderu
     */
    folder: {
      type: Object as PropType<Folder>,
      required: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const fName = ref(props.folder?.name);

    watch(
      () => props.folder,
      () => (fName.value = props.folder?.name || "")
    );

    const folderSelectorActive = ref(false);

    function save() {
      if (!fName.value) {
        return;
      }
      props.editMode ? edit() : create();
    }

    async function create() {
      const result = await folderService.createFolder(fName.value || "");
      loadFolders();
      close();
    }

    async function edit() {
      if (props.folder && fName.value) {
        await folderService.renameFolder(props.folder.id, fName.value);
        loadFolders();
        close();
      }
    }

    async function remove() {
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
      fName.value = "";
      emit("close");
    }

    return {
      fName,
      folderSelectorActive,

      save,
      remove,
      close,
      moveFolder,
    };
  },
});
</script>

<style scoped>
    .folderEditor {
        display: inline-block;
        border-radius: 8px;
        padding: 30px;
        background: white;
        font-size: 25px;
        font-weight: 400;
    }

</style>