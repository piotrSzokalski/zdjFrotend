<template>
  <div class="breadcrumbs">
    <folder-component :folder="exampleFolders[0]" />
    <h3>BREADCRUMB TODO</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FolderComponent from "./FolderComponent.vue";

import { exampleFolders } from "@/store/dummyData";

/**
 * Ścieżka folderów
 */
export default defineComponent({
  components: { FolderComponent },

  setup() {
    return { exampleFolders };
  },
});
</script>

<style>
.breadcrumbs {
  display: flex;
  border: 1px sold;
  background: rgb(131, 205, 131);
}
</style>
