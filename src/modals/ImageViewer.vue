<template>
  <modal
    :active="active"
    :background="'background-color: rgb(0, 0, 0)'"
    @close="$emit('close')"
  >
    <!--
 <action-bar />
    -->
    <div class="content">
      <div class="image">
        <img :src="photoPath" />
      </div>
      <div class="pre">
        <button v-if="!first" @click="$emit('previous')">
          <font-awesome-icon icon="arrow-left" />
        </button>
      </div>
      <div class="next">
        <button v-if="!last" @click="$emit('next')">
          <font-awesome-icon icon="arrow-right" />
        </button>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import { Image } from "@/interfaces/image";
import { Photo } from "@/interfaces/photo";

import { APIurl } from "@/const/photoAPI";
import { APICalls } from "@/enums/apiCalls.enum";

import Modal from "./Modal.vue";
import ActionBar from "@/components/ActionBar.vue";

/**
 * Podgląd zdjęcia
 */
export default defineComponent({
  components: {
    FontAwesomeIcon,
    Modal,
    //ActionBar,
  },
  props: {
    /**
     * Zdjęcie
     */
    image: {
      type: Object as PropType<Photo>,
      required: true,
    },
    /**
     * Czy widoczny
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * Czy zdjęcie jest pierwsze
     */
    first: {
      type: Boolean,
      default: true,
    },
    /**
     * Czy zdjęcie jest ostatnie
     */
    last: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    /**
     * Zamknięcie podglądu zdjęcia
     */
    close: null,
    /**
     * Wciśnięcie przycisku poprzedni
     */
    previous: null,
    /**
     * Wciśnięcie przycisku następny
     */
    next: null,
  },
  setup(props) {
    const photoPath = computed(
      () => APIurl[APICalls.PHOTOS_GET_PHOTO] + props.image.id
    );
    return {
      photoPath,
    };
  },
});
</script>

<style scoped>
.content {
  background-color: rgb(0, 0, 0); /* Fallback color */
}

img {
  border: 1px #ddd;
  border-radius: 5px;
  padding: 5px;
  width: 1400px;
  height: 850px;
}

.pre {
  position: absolute;
  left: 1%;
  bottom: 20%;
  /* visibility: hidden; */
}
.pre:hover {
  visibility: visible;
  background-color: lightblue;
  border-radius: 50px;
}

.next {
  position: absolute;
  right: 1%;
  bottom: 20%;
  /* visibility: hidden; */
}

.next:hover {
  visibility: visible;
  background-color: lightblue;
  border-radius: 50px;
}
button {
  background-color: darkblue;
  width: 50px;
  border: darkblue;
  border-radius: 50px;
}
</style>