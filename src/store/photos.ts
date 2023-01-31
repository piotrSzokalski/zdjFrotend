import { computed, ref, watch } from "vue";

import { Photo } from "@/interfaces/photo";

import { photoService } from "@/services/photoService";

import { currentFolder } from "./folders";


const _photos = ref<Photo[]>([]);

export const photos = computed(() => _photos.value.filter(photo => photo.folder === currentFolder.value));

const _selectedPhotosId = ref<number[]>([]);

const _filteredPhotos = ref(photos.value);

export const filteredPhotos = computed(() => _filteredPhotos.value)

// cos nie tak to trzeba poprawić
watch(() => photos.value, () => _filteredPhotos.value = photos.value);


export const selectedPhotosId = computed(() => _selectedPhotosId.value);

export function togglePhotoSelected(id: number) {
    
    if(_selectedPhotosId.value.includes(id)) {
        _selectedPhotosId.value = selectedPhotosId.value.filter(item => item !== id);
    }
    else {
        _selectedPhotosId.value.push(id);
    }
   
}

export function loadPhotos() {
    return photoService.getPhotos().then(res => _photos.value = res);
}


export function filterPhotos(fromDateString: string, toDateString: string): void {
    const fromDate = new Date(fromDateString || 0).getTime();
    const toDate = new Date(toDateString).getTime() || new Date().getTime();

    _filteredPhotos.value = photos.value.filter((photo) => {
      const photoDate = new Date(photo.date).getTime();
      return photoDate >= fromDate && photoDate <= toDate;
    });
}

export function unFilterPhots(): void {
    _filteredPhotos.value = photos.value;
}

export function setSinglePhotoSelected(id: number) {
    _selectedPhotosId.value = [id];
    console.log(_selectedPhotosId);
}