import { APIurl } from "@/const/photoAPI";
import { APICalls } from "@/enums/apiCalls.enum";
import { Folder } from "@/interfaces/folder";


import { currentFolder } from "@/store/folders";

class FolderService {
    getFolders() {
        
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

        return fetch(APIurl[APICalls.FOLDERS], { method: 'POST', body: formData })
    }

    removeFolder(id: number) {
        if(id < 1){
            return;
        }
        return fetch(APIurl[APICalls.FOLDERS] + '/' + id ,  { method: 'DELETE' });
    }

    renameFolder(id: number, newName: string) {
        if(id < 1 || !newName) {
            return;
        }
        const formData = new FormData();
        formData.append('FolderID', JSON.stringify(id));
        formData.append('NewName', newName);

        return fetch(APIurl[APICalls.FOLDERS_RENAME], {method: 'POST', body: formData});
    }

    async moveFolder(id: number, newParentID: number) {
        if(id < 1 ) {
            return;
        }
        console.log("here 2");
        const formData = new FormData();
        formData.append('FolderID', JSON.stringify(id));
        formData.append('ParentID', JSON.stringify(newParentID));
        const res = await fetch(APIurl[APICalls.FOLDERS_CHANGE_PARENT], {method: 'POST', body: formData});
        console.log(res);
    }
}

export const folderService = new FolderService();
