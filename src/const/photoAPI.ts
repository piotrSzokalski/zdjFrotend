import { APICalls } from '@/enums/apiCalls.enum'

const url = 'https://localhost:7002/api/';

export const APIurl = [
    url + 'Photos',
    url + 'Photos/GetPhoto/',
    url + 'Folders',
    url + 'Folder/Rename',
    url + 'Folder/ChangeParent'
]



const x = APIurl[APICalls.PHOTOS];


const y = [1,2,3];

const tt = y[0];