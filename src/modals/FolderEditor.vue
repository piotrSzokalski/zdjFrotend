<template>
  <modal :active="active" @close="$emit('close')">
    <div class="folderEditor">
      {{ folderName }}
      <div v-if="editMode">Utwórz nowy folder folderu</div>

      <div v-else>Zmień nazwę folderu</div>

      <input v-model="fName" type="text" />

      <button>
        {{ editMode ? "Utwurz" : "Zmień" }}
      </button>

      <button v-if="editMode">Usuń</button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

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

    return {
      fName,
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