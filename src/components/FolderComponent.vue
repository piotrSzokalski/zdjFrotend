<template>
  <div class="folder">
    <button @click="openOrMove">
      <font-awesome-icon icon="folder" />

      {{ folder.name }}
    </button>

    <button v-if="editable" @click="$emit('edit', folder)">
      <font-awesome-icon icon="pen" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Folder } from "@/interfaces/folder";

import { changePath } from "@/store/folders";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { photoService } from "@/services/photoService";

import { loadPhotos } from "@/store/photos";

/**
 * Pojedynczy folder w ścieżce
 */
export default defineComponent({
  components: { FontAwesomeIcon },
  emits: {
    edit: null,
    moved: null,
  },
  props: {
    folder: { type: Object as PropType<Folder>, required: true },
    editable: { type: Boolean, default: false },
    movePhotsMode: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    async function openOrMove() {
      if (!props.movePhotsMode) {
        changePath(props.folder.id);
        return;
      }
      await photoService.movePhotos(props.folder.id);
      loadPhotos();
      emit("moved");
    }
    return {
      openOrMove,
    };
  },
});
</script>

<style scoped>
button {
  font-size: 40px;
  font-weight: 400;
  font-size: 15px;
  border-radius: 10px;
  border: 3px thin #293250;
  width: 200px;
}
button:hover {
  background-color: darkslateblue;
}
.folder {
  padding: 10px;
}
</style>