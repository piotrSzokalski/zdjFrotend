<template>
  <modal :active="active" @close="$emit('close')">
    <div class="content">
      <div v-if="folderRemoval">
          <br/>
        <h1>Czy na pewno chcesz ten folder</h1>
        <h2>
          Wszystkie zawarte w nim zdjęcia i podfoldery ( również ze zdjęciami
          zostaną stracone)
        </h2>
        <button class="cancel" @click="unSelect">Anuluj</button>
        <button @click="$emit('remove')">Tak</button>
      </div>
      <div v-else>
          <div v-if="canRemove">
              <br />
              Czy na pewno chcesz usunąć te piękne zdjęcia?
              <br /><br />
              <button class="cancel" @click="unSelect">Anuluj</button>
              <button @click="$emit('remove')">Tak</button>
          </div>

        <div v-else>
          <h1>Nie wybrano zdjęć do usunięcia</h1>
        </div>
      </div>
    </div>
    <br /><br />
  </modal>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { selectedPhotosId, togglePhotoSelected } from "@/store/photos";

import Modal from "./Modal.vue";

export default defineComponent({
  components: {
    Modal,
  },
  props: {
    /**
     * Czy widoczny
     */
    active: {
      type: Boolean,
      default: false,
    },
    folderRemoval: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    remove: null,
    close: null,
  },
  setup(_, { emit }) {
    const canRemove = computed(() => selectedPhotosId.value.length > 0);

    function unSelect() {
      selectedPhotosId.value.forEach((id) => togglePhotoSelected(id));
      emit("close");
    }

    return {
      canRemove,

      unSelect,
    };
  },
});
</script>


<style scoped>
.content {
  background: white;
  display: inline-block;
  border-radius: 8px;
  padding: 30px;
  background: white;
  font-size: 25px;
  font-weight: 300;
}
.content button {
  position: relative;
  float: right;
  width: 30%;
}
    .content .cancel {
        background-color: #6665658c;
    }
</style>
