import { ref } from "vue";

export const mousePosX = ref('0');
export const mousePosY = ref('0');

document.onmousemove = (event) => {
  mousePosX.value = event.x + 'px';
  mousePosY.value = event.y + 'px';
};

// export function setMousePosNow() {
//     mousePosNowX.value = mousePosX.value;
//     mousePosNowY.value = mousePosY.value;
// }

// export const mousePosNowX = ref('0');
// export const mousePosNowY = ref('0');