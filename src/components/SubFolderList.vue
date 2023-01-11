<template>
  <div class="title">
    Podfoldery
    <button @click="openFolderEditor()">
      <font-awesome-icon icon="folder-plus" />Dodaj Folder
    </button>
  </div>

  <div>
    <section v-if="subFolders.length" class="subFolders">
      <folder-component
        v-for="(folder, index) in subFolders"
        editable
        :key="index"
        :folder="folder"
        @edit="openFolderEditor(folder)"
      />
    </section>
    <section v-else>
      <h3>Brak podfolderów</h3>
    </section>
  </div>

  <div class="add"></div>
  <folder-editor
    :active="folderEditorActive"
    :folder="selectedFolder"
    :edit-mode="folderEditorEditMode"
    @close="folderEditorActive = false"
  />
</template>
  
<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FolderComponent from "./FolderComponent.vue";
import FolderEditor from "@/modals/FolderEditor.vue";

//import { exampleFolders } from "@/store/dummyData";
import { currentFolder, folders } from "@/store/folders";
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

    const selectedFolder = ref<Folder>();

    const folderEditorEditMode = ref(false);

    const subFolders = computed(() =>
      folders.value.filter((folder) => folder.parentId === currentFolder.value)
    );

    function test() {
      folderEditorActive.value = true;
    }

    function openFolderEditor(folder?: Folder) {
      console.log("hwere");
      folderEditorActive.value = true;

      folderEditorEditMode.value = folder ? true : false;
      if (folder) {
        selectedFolder.value = folder;
        console.log("folder present");
      }

      // if (folder) {
      //   selectedFolder.value = folder.name;
      // }
      // folderEditorActive.value = false;
    }

    return {
      folderEditorActive,
      selectedFolder,
      folderEditorEditMode,
      subFolders,

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
  margin-left: 20px;
}

.subFolders {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100px;
  background: rgb(236, 186, 186);
  border: 1px solid;
  overflow: auto;
}

.add {
  font-size: 24px;
}

.arrowR {
  background-color: darkblue;
  width: 50px;
  border: darkblue;
  border-radius: 50px;
  position: absolute;
  left: 95%;
}
.arrowL {
  background-color: darkblue;
  width: 50px;
  border: darkblue;
  border-radius: 50px;
  position: absolute;
  right: 95%;
}
</style>
  