<template>
  <div class="breadcrumbs">
    <div v-for="(folder, index) in path" :key="index">
      <Breadcrumb :folder="folder" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Breadcrumb from "./Breadcrumb.vue";
import { Folder } from "@/models/folder";

export default defineComponent({
  components: {
    Breadcrumb,
  },

  setup() {
    const path = [
      new Folder(1, "folder1"),
      new Folder(2, "folder2"),
      new Folder(3, "folder3"),
      new Folder(4, "folder4"),
    ];

    return { path };
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
