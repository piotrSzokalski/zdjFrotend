<template>
  <div class="button"></div>
  <slot> </slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.button {
  color: aqua;
  border: 1px solid;
}
</style>