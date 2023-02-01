import { Photo } from "@/interfaces/photo";
import { APIurl } from "@/const/photoAPI";

import { selectedPhotosId, togglePhotoSelected } from "@/store/photos";
import { APICalls } from "@/enums/apiCalls.enum";

import { currentFolder } from "@/store/folders";

import { unSetSinglePhotoSelected } from '@/store/photos';

class PhotoService {
  getPhotos(): Promise<Photo[]> {
    return fetch(APIurl[APICalls.PHOTOS])
      .then((res) => res.json())
      .then((data) => {
        const phots: Photo[] = [];
        let index = 0;

        while (data[index]) {
          phots.push({
            id: data[index].PhotoID,
            name: data[index].PhotoName,
            date: data[index].PhotoDate,
            folder: data[index].FolderID,
          });
          index++;
        }
        return phots;
      });
  }


  async addPhotos(photos: FileList) {
    const results: Response[] = [];

    for (let index = 0; index < photos.length; index++) {
      if (
        !photos[index].name.includes(".jpg") &&
        !photos[index].name.includes(".png") &&
        !photos[index].name.includes(".bmp") &&
        !photos[index].name.includes(".jfif")
      ) {
        continue;
      }
      
      const formData = new FormData();

      formData.append("PhotoName", photos[index].name);
      
      formData.append("FolderID", JSON.stringify(currentFolder.value));
    
      formData.append(
        "PhotoDate",
        new Date(photos[index].lastModified)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")
      );

      formData.append("PhotoPath", 'e');
      formData.append("PhotoFile", photos[index]);

      await fetch(APIurl[APICalls.PHOTOS], {
        method: "POST",
        body: formData,
      }).then((res) => { results.push(res)});
    }
    
    return results;
  }

  async movePhotos(folderID: number) {
    const results: Response[] = [];

    for (const id of selectedPhotosId.value) {
      const formData = new FormData();
      formData.append('ParentID', JSON.stringify(id));
      formData.append('FolderID', JSON.stringify(folderID));

      const res = await fetch(APIurl[APICalls.PHOTOS_CHANGE_FOLDER] , { method: "POST", body: formData });
      results.push(res);
      if (res.ok) {
        togglePhotoSelected(id);
      }
    }

    unSetSinglePhotoSelected();
    return results;
  }

  async removePhotos() {
    const results: Response[] = [];

    for (const id of selectedPhotosId.value) {
      const res = await fetch(APIurl[APICalls.PHOTOS] + id, {
        method: "DELETE",
      });
      results.push(res);
      if (res.ok) {
        togglePhotoSelected(id);
      }
    }
    return results;
  }

}

export const photoService = new PhotoService();

