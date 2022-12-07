import { ref, computed } from 'vue'

import { getImages } from "@/services/photoService";
import { Image } from '@/interfaces/image';

const _images = ref<Image[]>();

export const images = computed(() => _images.value);

export function loadImages() {
    getImages().then(data => _images.value = data)
}