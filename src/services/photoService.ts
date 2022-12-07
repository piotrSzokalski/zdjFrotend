import { Image } from "@/interfaces/image";

export function getImages() {
  return fetch("https://localhost:44355/api/zdjecia")
    .then((res) => res.json())
    .then((data) => {
      let index = 0;
      const images: Image[] = [];
      while (data[index]) {
        if (data[index].sciezka !== "brak") {
          images.push({
            id: data[index].id,
            name: data[index].nazwa,
            path: data[index].sciezka,
            date: data[index].daata,
            folder: 0,
          });
        }

        index++;
      }
      //console.log(images);
      //images.forEach(item => console.log('item:', item));

      return images;
    });
}

export async function remove(pictureIds: number[]) {
  for (let i = 0; i < pictureIds.length; i++) {
    await fetch("https://localhost:44355/api/zdjecia/" + pictureIds[i], {
      method: "DELETE",
    }).then((res) => console.log(res.status));
  }
}
