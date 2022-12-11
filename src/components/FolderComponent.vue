<template>
  <div class="folder">
    <button>
      <font-awesome-icon icon="folder" />

      {{ folder.name }}
    </button>

    <button @click="$emit('edit')">
      <font-awesome-icon icon="pen" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Folder } from "@/interfaces/folder";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/**
 * Pojedynczy folder w ścieżce
 */
export default defineComponent({
  components: { FontAwesomeIcon },
  emits: {
    edit: null,
  },
  props: {
    folder: { type: Object as PropType<Folder>, required: true },
  },
});
</script>

<style scoped>
button {
  font-size: 24px;
}
button:hover {
  background-color: yellow;
}
.folder {
  padding: 5px;
}
</style>