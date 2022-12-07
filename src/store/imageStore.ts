import { ref, computed } from 'vue'

import { loadImages } from "@/services/photoService";

const _images = computed(() => loadImages().then(res => res));

export const images = computed(() => _images.value);

