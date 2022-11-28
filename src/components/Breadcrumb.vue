<template>
  <div id="breadcrumb">
    <ButtonSlot>
      <button>{{ folder.name }}</button>
    </ButtonSlot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Folder } from "@/interfaces/folder";

import ButtonSlot from "./ButtonSlot.vue";

export default defineComponent({
  components: { ButtonSlot },
  props: {
    folder: { type: Object as PropType<Folder>, required: true },
  },
});
</script>

<style scoped>
</style>