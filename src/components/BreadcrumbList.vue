<template>
  <div class="breadcrumbs">
    <folder-component :folder="exampleFolders[0]" />
    <h3>BREADCRUMB</h3>
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
  border: 1px unset #808080;
  background-color: lavender;
}
</style>
