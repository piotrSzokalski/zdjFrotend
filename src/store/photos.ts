import { computed, ref } from "vue";

import { Photo } from "@/interfaces/photo";

import { photoService } from "@/services/photoService";

const _photos = ref<Photo[]>([]);

export const photos = computed(() => _photos.value);

const _selectedPhotosId = ref<number[]>([]);

export const selectedPhotosId = computed(() => _selectedPhotosId.value);

export function togglePhotoSelected(id: number) {
    //_selectedPhotosId.value.includes(id) ? _selectedPhotosId.value.filter(item => item != id) : _selectedPhotosId.value.push(id);
    if(_selectedPhotosId.value.includes(id)) {
        _selectedPhotosId.value = selectedPhotosId.value.filter(item => item !== id);
    }
    else {
        _selectedPhotosId.value.push(id);
    }
   

}

export function loadPhotos() {
    console.log('here2');
    photoService.getPhotos().then(res => _photos.value = res);
}