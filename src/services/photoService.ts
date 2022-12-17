import { Photo } from "@/interfaces/photo";

export function getPhotos(): Promise<Photo[]> {
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