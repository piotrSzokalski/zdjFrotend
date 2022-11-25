<template>
  Galera
  <div class="gallery">
    <breadcrumb-list />

    <div class="actions">
      <button-slot><button>Filtruj</button></button-slot>
      <button-slot><button>Usuń</button></button-slot>
      <button-slot><button>Zaznacz</button></button-slot>
      <button-slot><button>Dodaj</button></button-slot>
    </div>

    <div class="pictures">
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
import ButtonSlot from "@/components/ButtonSlot.vue";

export default defineComponent({
  components: {
    Picture,
    BreadcrumbList,
    ButtonSlot,
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
.actions {
  display: flex;
}
</style>