<template>
  <div class="title">
    Podfoldery

    <button @click="openFolderEditor()">
      <font-awesome-icon icon="folder-plus" />
    </button>
  </div>

  <div>
    <section v-if="subFolders.length" class="subFolders">
      <folder-component
        v-for="(folder, index) in subFolders"
        editable
        :key="index"
        :folder="folder"
        @edit="openFolderMenu(folder)"
      />
    </section>
    <section v-else>
      <h3>Brak podfolderów</h3>
    </section>
  </div>

  <folder-menu
    v-if="folderMenuOpen"
    :folder="selectedFolder"
    @close="folderMenuOpen = false"
  />

  <div class="add"></div>
  <folder-editor
    :active="folderEditorActive"
    :folder="selectedFolder"
    @close="folderEditorActive = false"
  />
</template>
  
<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FolderComponent from "./FolderComponent.vue";
import FolderEditor from "@/modals/FolderEditor.vue";
import FolderMenu from "@/components/FolderMenu.vue";

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
    FolderMenu,
  },

  setup() {
    const folderMenuOpen = ref(false);

    const folderEditorActive = ref(false);

    const selectedFolder = ref<Folder>();

    const subFolders = computed(() =>
      folders.value.filter((folder) => folder.parentId === currentFolder.value)
    );

    function test() {
      folderEditorActive.value = true;
    }

    function openFolderEditor(folder?: Folder) {
      folderEditorActive.value = true;

      if (folder) {
        selectedFolder.value = folder;
      }

      // if (folder) {
      //   selectedFolder.value = folder.name;
      // }
      // folderEditorActive.value = false;
    }

    function openFolderMenu(folder?: Folder) {
      console.log(folder?.id);
      selectedFolder.value = folder;
      folderMenuOpen.value = true;
    }

    return {
      folderEditorActive,
      selectedFolder,
      subFolders,
      folderMenuOpen,

      test,
      openFolderEditor,
      openFolderMenu,
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
  justify-content: flex-start;
  height: 100px;
  border: 0px solid;
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
.title button {
  color: #808080;
  text-align: left;
  border-radius: 3px;
  border: 0px solid;
  font-weight: 400;
  font-size: 20px;
  background-color: #ffffff;
}
.title button :hover {
  border-radius: 8px;
  opacity: 90%;
  transform: scale(1.1);
}
</style>
  