<template>
  <modal
    :active="active"
    :background="'background-color: rgb(0, 0, 0)'"
    @close="close"
  >
    <div class="actions">
      <button @click="actionsOpen = !actionsOpen">
        <font-awesome-icon icon="ellipsis-vertical" />
      </button>
      <div v-if="actionsOpen" class="actionsDropdown">
        <button @click="removePhoto">Usuń</button>
        <br />
        <button @click="movePhoto">Przenieś</button>
      </div>
    </div>
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
  <folder-selector
    :active="folderSelectorActive"
    @close="folderSelectorActive = false"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { Photo } from "@/interfaces/photo";

import { APIurl } from "@/const/photoAPI";
import { APICalls } from "@/enums/apiCalls.enum";
import { photoService } from "@/services/photoService";
import { setSinglePhotoSelected, loadPhotos } from "@/store/photos";

import Modal from "./Modal.vue";
import FolderSelector from "./FolderSelector.vue";

/**
 * Podgląd zdjęcia
 */
export default defineComponent({
  components: {
    FontAwesomeIcon,
    Modal,
    FolderSelector,
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
  setup(props, { emit }) {
    const photoPath = computed(
      () => APIurl[APICalls.PHOTOS_GET_PHOTO] + props.image.id
    );

    const actionsOpen = ref(false);

    const folderSelectorActive = ref(false);

    function removePhoto() {
      setSinglePhotoSelected(props.image.id);
      photoService.removePhotos();
      close();
    }

    function movePhoto() {
      folderSelectorActive.value = true;
      setSinglePhotoSelected(props.image.id);
      close();
    }

    function close() {
      actionsOpen.value = false;
      loadPhotos();
      emit("close");
    }

    return {
      photoPath,
      actionsOpen,
      folderSelectorActive,

      removePhoto,
      movePhoto,
      close,
    };
  },
});
</script>

<style scoped>
.content {
  background-color: rgb(0, 0, 0); /* Fallback color */
}

.content img {
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
.content button {
  background-color: darkblue;
  min-width: 50px;
  border: darkblue;
  border-radius: 50px;
}

.actions {
  font-size: 14px;
  float: right;
}

.actions button {
  background-color: black;
  min-width: 50px;
  border: rgb(76, 76, 153);
  border-radius: 50px;
}

.actions button:hover {
  background-color: rgb(66, 65, 65);
  min-width: 50px;
  border: rgb(76, 76, 153);
  border-radius: 50px;
}

.actions .actionsDropdown {
  display: block;
}

.actions .actionsDropdown button {
  font-size: 14px;
  columns: white;
  width: fit-content;
}
</style>