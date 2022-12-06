<template>
  <div class="title">Podfoldery</div>

  <div class="subFolders">
    <folder-component
      v-for="(folder, index) in exampleFolders"
      :key="index"
      :folder="folder"
    />
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";

import FolderComponent from "./FolderComponent.vue";

import { exampleFolders } from "@/store/dummyData";

/**
 * Podfoldery
 */
export default defineComponent({
  components: {
    FolderComponent,
  },

  setup() {
    return { exampleFolders };
  },
});
</script>
  
  <style scoped>
.title {
  background: rgb(33, 205, 131);
}
.subFolders {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px sold;
  background: rgb(33, 205, 131);
}
</style>
  