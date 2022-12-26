<template>
  <modal :active="active" @close="$emit('close')">
    <div class="folderEditor">
      {{ editMode }}
      {{ folderName }}
      <p v-if="editMode">Zmień nazwę folderu</p>
      <p v-else>Utwórz nowy folder folderu</p>

      <input v-model="fName" type="text" />

      <button @click="save">
        {{ editMode ? "Utwórz" : "Zmień" }}
      </button>

      <button v-if="editMode">Usuń</button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { folderService } from "@/services/folderService";
import { currentFolder } from "@/store/folders";

import Modal from "./Modal.vue";

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
    folderName: {
      type: String,
      required: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const fName = ref(props.folderName);

    function save() {
      if (!fName.value) {
        return;
      }
      props.editMode ? edit() : create();
    }

    function create() {
      folderService
        .createFolder(fName.value || "")
        ?.then((res) => console.log(res));
    }

    function edit() {
      console.log("abc");
    }

    return {
      fName,
      save,
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