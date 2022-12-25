import { Photo } from "@/interfaces/photo";
import { APIurl } from "@/const/photoAPI";

import { selectedPhotosId, togglePhotoSelected } from "@/store/photos";
import { APICalls } from "@/enums/apiCalls.enum";

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
            path:
              "https://localhost:7002/api/Photos/GetPhoto/" +
              data[index].PhotoID,
            date: data[index].PhotoDate,
            folder: data[index].PhotoPath,
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
      formData.append("FolderID", "0");
      formData.append(
        "PhotoDate",
        new Date(photos[index].lastModified)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")
      );
      formData.append("PhotoFile", photos[index]);

      await fetch("https://localhost:7002/api/Photos", {
        method: "POST",
        body: formData,
      }).then((res) => results.push(res));
    }
    return results;
  }

  async removePhotos() {
    const results: Response[] = [];

    for (const id of selectedPhotosId.value) {
      const formData = new FormData();
      //formData.append('id', JSON.stringify(id));
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

