<template>
  <modal :active="active" @close="$emit('close')">
    <div class="content">
      <div v-if="canRemove">
        <h1>Czy na pewno chcesz usunąć te piękne zdjęcia</h1>
        <button @click="unSelect">Anuluj</button>
        <button @click="$emit('remove')">Tak, chcę usunąć wybrane zdjęcia</button>
      </div>

      <div v-else>
        <h1>Nie wybrano zdjęć do usunięcia</h1>
      </div>
    </div>
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
  
}
</style>
