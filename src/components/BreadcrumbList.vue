<template>
  <div class="breadcrumbs">
    {{ filePath }}
    <folder-component
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
      :folder="breadcrumb"
    />
    <h3>BREADCRUMB</h3>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { folders, filePath, pathCutOff } from "@/store/folders";

import FolderComponent from "./FolderComponent.vue";

/**
 * Ścieżka folderów
 */
export default defineComponent({
  components: { FolderComponent },

  setup() {
    const breadcrumbs = computed(() =>
      folders.value.filter((folder) => filePath.value.includes(folder.id))
    );

    return {
      filePath,
      breadcrumbs,
    };
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
