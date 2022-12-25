import { computed, ref } from 'vue'

import { Folder } from '@/interfaces/folder'

import { folderService } from '@/services/folderService'

const _folders = ref<Folder[]>([]);

export const folders = computed(() => _folders.value);

export function loadFolders() {
    return folderService.getFolders().then(res => _folders.value = res);
} 