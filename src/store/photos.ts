import { computed, ref } from "vue";

import { Photo } from "@/interfaces/photo";

import { getPhotos } from "@/services/photoService";

const _photos = ref<Photo[]>([]);

export const photos = computed(() => _photos.value);

export function loadPhotos() {
    getPhotos().then(res => _photos.value = res);
}