<template>
  <modal :active="active" @close="close">
    <div class="folderEditor">
      <br />
      <p v-if="editMode">Zmień nazwę folderu</p>
      <p v-else>Utwórz nowy folder</p>

      <input v-model="fName" type="text" />

      <button @click="save">
        {{ editMode ? "Zmień" : "Utwórz" }}
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

import { folderService } from "@/services/folderService";
import { loadFolders } from "@/store/folders";

import Modal from "./Modal.vue";
import { Folder } from "@/interfaces/folder";

export default defineComponent({
  components: {
    Modal,
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
      type: Object as PropType<Folder> | null,
      required: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const fName = ref(props.editMode ? props.folder?.name : "");

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

    function close() {
      fName.value = "";
      emit("close");
    }

    return {
      fName,

      save,
      close,
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
  text-align: left;
}
.folderEditor button {
  position: relative;
  float: right;
  cursor: pointer;
  width: 35%;
}
.folderEditor input {
  width: 380px;
}
</style>