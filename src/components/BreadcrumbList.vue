<template>
  <div class="breadcrumbs">
    <folder-component :folder="rootFolder" />
    <folder-component
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
      :folder="breadcrumb"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { folders, filePath } from "@/store/folders";

import FolderComponent from "./FolderComponent.vue";
import { Folder } from "@/interfaces/folder";

/**
 * Ścieżka folderów
 */
export default defineComponent({
  components: { FolderComponent },

  setup() {
    const breadcrumbs = computed(() =>
      folders.value
        .filter((folder) => filePath.value.includes(folder.id))
        .sort(
          (a, b) => filePath.value.indexOf(a.id) - filePath.value.indexOf(b.id)
        )
    );

    const rootFolder: Folder = {
      id: 0,
      name: "root",
      creationDate: new Date(),
      parentId: -1,
    };

    return {
      filePath,
      breadcrumbs,
      rootFolder,
    };
  },
});
</script>

<style>
.breadcrumbs {
  display: flex;
  border: 1px unset #808080;
  background-color: lavender;
  margin-bottom: 5px;
  margin-left: 10px;
}
</style>
