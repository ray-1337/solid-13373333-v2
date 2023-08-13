import type { MouseEvent } from "react";

export function preventClick(evt: MouseEvent) {
  evt.preventDefault();
  evt.stopPropagation();
  return;
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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