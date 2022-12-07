import { ref, computed } from "vue";

import { getImages } from "@/services/photoService";
import { Image } from "@/interfaces/image";

const _images = ref<Image[]>();

export const images = computed(() => _images.value);

export function loadImages() {
  return getImages().then((data) => (_images.value = data));
}

const _markedImageIndexes = ref<number[]>([]);

export const markedImageIndexes = computed(() => _markedImageIndexes.value);

export function toggleImageMarked(id: number): void {
  if (_markedImageIndexes.value.includes(id)) {
    _markedImageIndexes.value = _markedImageIndexes.value.filter(
      (i) => i === id
    );
    return;
  }
  _markedImageIndexes.value.push(id);
  //console.log(_markedImageIndexes.value);
}
