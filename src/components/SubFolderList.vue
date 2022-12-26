<template>
  <div class="title">Podfoldery</div>

  <div class="subFolders">
    <button class="arrows"><font-awesome-icon icon="arrow-left" /></button>

    <folder-component
      v-for="(folder, index) in folders"
      :key="index"
      :folder="folder"
      @edit="openFolderEditor(folder)"
    />
    <button class="arrows"><font-awesome-icon icon="arrow-right" /></button>
  </div>
  <div class="add">
    <button @click="openFolderEditor()">
      <font-awesome-icon icon="folder-plus" />Dodaj Folder
    </button>
  </div>
  <folder-editor
    :active="folderEditorActive"
    :folder-name="selectedFolder"
    :edit-mode="folderEditorEditMode"
    @close="folderEditorActive = false"
  />
</template>
  
<script lang="ts">
import { defineComponent, ref } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FolderComponent from "./FolderComponent.vue";
import FolderEditor from "@/modals/FolderEditor.vue";

//import { exampleFolders } from "@/store/dummyData";
import { folders } from "@/store/folders";
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

    const folderEditorEditMode = ref(false);

    function test() {
      folderEditorActive.value = true;
    }

    function openFolderEditor(folder?: Folder) {
      console.log("hwere");
      folderEditorActive.value = true;
      // ? TODO

      folderEditorEditMode.value = folder ? true : false;
      if (folder) {
        console.log("folder present");
      }

      // if (folder) {
      //   selectedFolder.value = folder.name;
      // }
      // folderEditorActive.value = false;
    }

    return {
      folders,
      folderEditorActive,
      selectedFolder,
      folderEditorEditMode,

      test,
      openFolderEditor,
    };
  },
});
</script>
  
<style scoped>
.title {
  font-size: 25px;
  text-align: left;
  position: relative;
}

.subFolders {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.add {
  font-size: 24px;
  position: relative;
  right: 43.9%;
}

.arrows button {
  background-color: blue;
  width: 10px;
}

button {
  border: 2px solid #2130ae;
  border-radius: 5px;
  font-size: 15px;
  padding: 20px;
}
</style>
  