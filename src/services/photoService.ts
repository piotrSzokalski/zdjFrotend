import { Photo } from "@/interfaces/photo";

import { selectedPhotosId } from "@/store/photos";

class PhotoService {
    getPhotos(): Promise<Photo[]> {
        return fetch('https://localhost:7002/api/Photos')
        .then(res => res.json())
        .then(data => {
            const phots : Photo[] = [];
            let index = 0;
            while(data[index]) {
                phots.push({
                    id: data[index].PhotoID, 
                    name: data[index].PhotoName,
                    path: 'https://localhost:7002/api/Photos/GetPhoto/' + data[index].PhotoID,
                    date: data[index].PhotoDate,
                    folder: data[index].PhotoPath
                })
                index++;
            }
            return phots;
        })  
    }

    async addPhotos(photos: FileList) {

        console.log(photos[0].lastModified);
        

        const results: Response[] = [];
    
        for(let index = 0; index < photos.length; index++) {
            const formData = new FormData();
    
            formData.append('PhotoName', 'brak');
            formData.append('PhotoFolder', 'brak')
            formData.append('PhotoDate', '2004-12-10');
            formData.append('PhotoFile', photos[index]);
    
            await fetch('https://localhost:7002/api/Photos', { method: 'POST', body: formData} ).then(res => results.push(res));
        }
        return results;
    }
    
    async removePhotos() {
        const results: Response[] = [];

        for(const id of selectedPhotosId.value) {
            const formData = new FormData();
            //formData.append('id', JSON.stringify(id));
            await fetch('https://localhost:7002/api/Photos/' + id, { method: 'DELETE' }).then(res => results.push(res));
        }
     return results;
    }
}

const photoService = new PhotoService();

export { photoService };


