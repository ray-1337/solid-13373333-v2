import type { MouseEvent } from "react";

export function preventClick(evt: MouseEvent) {
  evt.preventDefault();
  evt.stopPropagation();
  return;
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function getBrightness(hexColor) {
  hexColor = hexColor.replace(/^#/, '');

  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

export function textColorBasedOnBackground(backgroundHexColor) {
  const brightness = getBrightness(backgroundHexColor);

  return brightness > 0.5 ? "black" : "white"; 
};

export function shuffleArray<R>(array: Array<R>) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };

  return array;
};

export function generateString(length?: number) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return [...Array(length || 16)].map(_ => characters[~~(Math.random() * characters.length)]).join('');
};