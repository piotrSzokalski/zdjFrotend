import { Photo } from "@/interfaces/photo";
import { APIurl } from "@/const/photoAPI";

import { selectedPhotosId, togglePhotoSelected } from "@/store/photos";
import { APICalls } from "@/enums/apiCalls.enum";

import { currentFolder } from "@/store/folders";

class PhotoService {
  getPhotos(): Promise<Photo[]> {
    return fetch(APIurl[APICalls.PHOTOS])
      .then((res) => res.json())
      .then((data) => {
      //   for(const i of data) {
      //     console.log(i);
      // }w
        
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
      console.log('here 1');
      formData.append("FolderID", JSON.stringify(currentFolder.value));
      console.log('here 2');
      formData.append(
        "PhotoDate",
        new Date(photos[index].lastModified)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")
      );

      console.log('here 1');
      formData.append("PhotoPath", 'e');

      console.log('here 4');
      formData.append("PhotoFile", photos[index]);
      console.log('here 5');
      await fetch("https://localhost:7002/api/Photos", {
        method: "POST",
        body: formData,
      }).then((res) => { console.log(res);results.push(res)});
    }
    console.log(results);
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
    return results;
  }

  async removePhotos() {
    const results: Response[] = [];

    for (const id of selectedPhotosId.value) {
      const res = await fetch("https://localhost:7002/api/Photos/" + id, {
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

