import { Photo } from "@/interfaces/photo";

import { selectedPhotosId, togglePhotoSelected } from "@/store/photos";

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

        console.log(photos[0]);
        console.log(new Date(photos[0].lastModified));

        const results: Response[] = [];
    
        for(let index = 0; index < photos.length; index++) {

             if(! photos[index].name.includes('.jpg') && ! photos[index].name.includes('.png') && ! photos[index].name.includes('.bmp')) {
                 continue;
             }

            const formData = new FormData();
    
            formData.append('PhotoName', 'brak');
            formData.append('PhotoFolder', 'brak')
            formData.append('PhotoDate', new Date(photos[index].lastModified).toISOString().slice(0, 19).replace('T', ' '));
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
            const res = await fetch('https://localhost:7002/api/Photos/' + id, { method: 'DELETE' });
            results.push(res);
            if(res.ok) {
                togglePhotoSelected(id);
            }
        }
     return results;
    }
}

const photoService = new PhotoService();

export { photoService };


