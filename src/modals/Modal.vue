<template>
  <div v-if="active" class="modal">
    <!--

    -->
      <button class="exitModalButton" @click="$emit('close')">
          <font-awesome-icon icon="xmark" />
      </button>
    <slot :style="background"> </slot>
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent } from "vue";

/**
 * Generalny modal
 */
    export default defineComponent({
  components: {      
     FontAwesomeIcon
            },
  props: {
    /**
     * Czy widoczny
     */
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    /**
     * Zamknięcie modala
     */
    close: null,
  },
  background: {
    type: String,
    default: "rgba(0, 0, 0, 0.4)",
  },
});
</script>

<style >
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 90%; /* Full height */
  overflow: hidden; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0, 0.9); /* Fallback color */

  /* background-color: rgba(0, 0, 0, 0.4); Black w/ opacity */
}

.modal input {
  width: 300px;
  background-color: #efefef;
  color: #666;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px;
}

.modal button {
  font-size: 14px;
  font-weight: 400;
  width: 50%;
  color: white;
  text-align: center;
  border-radius: 8px;
  border: 1px solid;
  background-color: #5a28aa;
  cursor: pointer;
  padding: 10px;
}

.modal .exitModalButton {
  position: absolute;
  float: right;
  width: 50px;
  color:black;
  background-color: white;
  margin: 15px;
  padding:7px;
  border:0;
  font-size:20px;
  

}
</style>