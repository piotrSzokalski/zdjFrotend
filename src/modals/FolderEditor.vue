<template>
  <modal :active="active" @close="$emit('close')">
    <div class="folderEditor">
      Zmień nazwę folderu

      <input v-model="fName" type="text" />
      {{ fName }}
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
      required: true,
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