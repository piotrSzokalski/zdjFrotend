<template>
  <div class="actions">
    <ButtonSlot><button>Filtruj</button></ButtonSlot>

    <ButtonSlot><button>Usuń</button></ButtonSlot>

    <ButtonSlot
      ><button @click="$emit('multiSelect')">Zaznacz</button></ButtonSlot
    >
    <ButtonSlot><button>Dodaj</button></ButtonSlot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ButtonSlot from "./ButtonSlot.vue";

export default defineComponent({
  components: {
    ButtonSlot,
  },
  emits: {
    multiSelect: null,
  },
});
</script>

<style scoped>
.actions {
  display: flex;
  position: sticky;
}
</style>
