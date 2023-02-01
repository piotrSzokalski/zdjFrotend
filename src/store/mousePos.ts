import { ref } from "vue";

export const mousePosX = ref(0);
export const mousePosY = ref(0);

document.onmousemove = (event) => {
  mousePosX.value = event.x;
  mousePosY.value = event.y;
};
