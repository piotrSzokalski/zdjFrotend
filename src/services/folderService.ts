import { APIurl } from "@/const/photoAPI";
import { APICalls } from "@/enums/apiCalls.enum";
import { Folder } from "@/interfaces/folder";


import { currentFolder } from "@/store/folders";

class FolderService {
    getFolders() {
        console.log('here');
        return fetch(APIurl[APICalls.FOLDERS])
        .then(res => res.json())
        .then(data => data as Folder[]);
    }

    createFolder(name: string) {

        if(!name) {
            return;
        }

        const formData = new FormData();
        formData.append('FolderName', name);
        formData.append('FolderDate', new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "));
        formData.append("ParentID", JSON.stringify(currentFolder.value));

        return fetch(APIurl[APICalls.FOLDERS],{
            method: 'POST',
            body: formData
        })
    }
}

export const folderService = new FolderService();
