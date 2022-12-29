<template>
  <modal :active="active" @close="close">
    <div class="folderEditor">
      <p v-if="editMode">Zmień nazwę folderu</p>
      <p v-else>Utwórz nowy folder</p>

      <input v-model="fName" type="text" />

      <button @click="save">
        {{ editMode ? "Zmień" : "Utwórz" }}
      </button>

      <button v-if="editMode" @click="remove">Usuń</button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

import { folderService } from "@/services/folderService";
import { currentFolder, loadFolders } from "@/store/folders";

import Modal from "./Modal.vue";
import { Folder } from "@/interfaces/folder";

export default defineComponent({
  components: { Modal },
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

    function close() {
      fName.value = "";
      emit("close");
    }

    return {
      fName,
      save,
      remove,
      close,
    };
  },
});
</script>

<style scoped>
.folderEditor {
  display: block;
  padding: 10px;
  background: white;
}
</style>