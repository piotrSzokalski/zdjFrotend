<template>
  Galera
  <div class="gallery">
    <BreadcrumbList />

    <div class="pictures">
      <Picture />

      <Picture />

      <Picture />

      <Picture />

      <Picture />

      <Picture />

      <Picture />

      <Picture />

      <Picture />

      <Picture />

      <Picture />

      <Picture />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Picture from "@/components/Picture.vue";
import BreadcrumbList from "@/components/BreadcrumbList.vue";

export default defineComponent({
  components: {
    Picture,
    BreadcrumbList,
  },
  setup() {
    console.log("gallery");
  },
});
</script>

<style >
.gallery {
  padding: 20px;
  border: 5px solid;
  border-radius: 10%;
}
.pictures {
  position: absolute;

  display: flex;
  padding: 10px;
}
</style>