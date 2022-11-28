<template>
  <div class="breadcrumbs">
    <div v-for="(folder, index) in exampleFolders" :key="index">
      <breadcrumb :folder="folder" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Breadcrumb from "./Breadcrumb.vue";

import { Folder } from "@/interfaces/folder";

import { exampleFolders } from "@/store/dummyData";

export default defineComponent({
  components: {
    Breadcrumb,
  },

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
