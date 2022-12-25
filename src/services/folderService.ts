import { APIurl } from "@/const/photoAPI";
import { APICalls } from "@/enums/apiCalls.enum";
import { Folder } from "@/interfaces/folder";




class FolderService {
    getFolders() {
        console.log('here');
        return fetch(APIurl[APICalls.FOLDERS])
        .then(res => res.json())
        .then(data => data as Folder[]);
    }
}

export const folderService = new FolderService();
