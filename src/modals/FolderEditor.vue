<template>
  <modal :active="active" @close="$emit('close')">
    <div class="folderEditor">
      {{ editMode }}
      {{ folder?.name }}
      <p v-if="editMode">Zmień nazwę folderu</p>
      <p v-else>Utwórz nowy folder folderu</p>

      <input v-model="fName" type="text" />

      <button @click="save">
        {{ editMode ? "Utwórz" : "Zmień" }}
      </button>

      <button v-if="editMode" @click="remove">Usuń</button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

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

    function save() {
      if (!fName.value) {
        return;
      }
      props.editMode ? edit() : create();
    }

    async function create() {
      const result = await folderService.createFolder(fName.value || "");
      loadFolders();
      emit("close");
    }

    function edit() {
      console.log("abc");
    }

    async function remove() {
      console.log("r");
      if (props.folder) {
        console.log("here");
        await folderService.removeFolder(props.folder.id);
        loadFolders();
        emit("close");
      }
    }

    return {
      fName,
      save,
      remove,
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