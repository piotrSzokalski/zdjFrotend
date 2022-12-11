<template>
  <div class="title">Podfoldery</div>

  <div class="subFolders">
    <button class="arrows"><font-awesome-icon icon="arrow-left" /></button>

    <folder-component
      v-for="(folder, index) in exampleFolders"
      :key="index"
      :folder="folder"
      @edit="folderEditorActive = true"
    />
    <button class="arrows"><font-awesome-icon icon="arrow-right" /></button>
  </div>
  <div class="add">
    <button><font-awesome-icon icon="folder-plus" />Dodaj Folder</button>
  </div>
  <folder-editor
    :active="folderEditorActive"
    @close="folderEditorActive = false"
  />
</template>
  
  <script lang="ts">
import { defineComponent, ref } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FolderComponent from "./FolderComponent.vue";
import FolderEditor from "@/modals/FolderEditor.vue";

import { exampleFolders } from "@/store/dummyData";

/**
 * Podfoldery
 */
export default defineComponent({
  components: {
    FolderComponent,
    FontAwesomeIcon,
    FolderEditor,
  },

  setup() {
    const folderEditorActive = ref(false);

    function test() {
      console.log("hwere");
      folderEditorActive.value = true;
    }

    return {
      exampleFolders,
      folderEditorActive,

      test,
    };
  },
});
</script>
  
  <style scoped>
.title {
  background: rgb(33, 205, 131);
  font-size: 24;
}
.subFolders {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px sold;
  background: rgb(33, 205, 131);
}
.add {
  font-size: 24;
}

.arrows button {
  background-color: blue;
}
</style>
  