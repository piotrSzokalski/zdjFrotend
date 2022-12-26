import { APICalls } from '@/enums/apiCalls.enum'

const url = 'https://localhost:7002/api/';

export const APIurl = [
    url + 'Photos',
    url + 'Photos/GetPhoto/',
    url + 'Folders',
    url + 'Folder/Rename',
    url + 'Folder/ChangeParent'
]
