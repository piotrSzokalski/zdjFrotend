import { computed, ref } from 'vue'

import { Folder } from '@/interfaces/folder'

import { folderService } from '@/services/folderService'

const _folders = ref<Folder[]>([]);

export const folders = computed(() => _folders.value);

export function loadFolders() {
    return folderService.getFolders().then(res => _folders.value = res);
}

const _filePath = ref([0]);

const filePath = computed(() => _filePath.value);

export const currentFolder = computed(() => _filePath.value[_filePath.value.length - 1]);


export function appendPath(id: number) {
    _filePath.value.push(id);
}

export function pathCutOff(id: number)
{   
    if(id == 0 || _filePath.value.length < 2) {
        return;
    }
    const index = _filePath.value.indexOf(id);
    _filePath.value = _filePath.value.splice(0, index + 1);
}