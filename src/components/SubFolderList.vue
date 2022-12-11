<template>
  <div class="title">Podfoldery</div>

  <div class="subFolders">
    <button class="arrows"><font-awesome-icon icon="arrow-left" /></button>

    <folder-component
      v-for="(folder, index) in exampleFolders"
      :key="index"
      :folder="folder"
      @edit="openFolderEditor"
    />
    <button class="arrows"><font-awesome-icon icon="arrow-right" /></button>
  </div>
  <div class="add">
    <button><font-awesome-icon icon="folder-plus" />Dodaj Folder</button>
  </div>
  <folder-editor
    :active="folderEditorActive"
    :folder-name="selectedFolder"
    @close="folderEditorActive = false"
  />
</template>
  
  <script lang="ts">
import { defineComponent, ref } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FolderComponent from "./FolderComponent.vue";
import FolderEditor from "@/modals/FolderEditor.vue";

import { exampleFolders } from "@/store/dummyData";
import { Folder } from "@/interfaces/folder";

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

    const selectedFolder = ref("brak");

    function test() {
      console.log("hwere");
      folderEditorActive.value = true;
    }

    function openFolderEditor(folder: Folder) {
      console.log(folder);
      selectedFolder.value = folder.name;

      folderEditorActive.value = true;
    }

    return {
      exampleFolders,
      folderEditorActive,
      selectedFolder,

      test,
      openFolderEditor,
    };
  },
});
</script>
  
  <style scoped>
.title {
  font-size: 24;
}
.subFolders {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px sold;
}
.add {
  font-size: 24;
}

.arrows button {
  background-color: blue;
}
</style>
  