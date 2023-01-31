import { computed, ref } from 'vue'

import { Folder } from '@/interfaces/folder'

import { folderService } from '@/services/folderService'

const _folders = ref<Folder[]>([]);

export const folders = computed(() => _folders.value);

export function loadFolders() {
    return folderService.getFolders().then(res => _folders.value = res);
}

const _filePath = ref([0]);
 
export const filePath = computed(() => _filePath.value);

/**
 * Id obecnego folderu
 */
export const currentFolder = computed(() => _filePath.value[_filePath.value.length - 1]);


export function changePath(id: number) {
    if(_filePath.value[_filePath.value.length - 1] === id) {
        return;
    }
    if(id == 0 ) {
        _filePath.value = [0];
        return;
    }
    // usuwanie ze ścieżki
    if(_filePath.value.includes(id)) {
        
        const index = _filePath.value.indexOf(id);
        _filePath.value = _filePath.value.splice(0, index + 1);
        return;
    }
    _filePath.value.push(id);
}

