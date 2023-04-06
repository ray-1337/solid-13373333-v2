import { Component, For, createEffect } from "solid-js";
import styles from "../../css/Wobbly.module.css";

const color: Record<number, string[]> = {
  0: ["#b92b27", "#c31432", "#FF416C", "#ff3131", "#FF4B2B", "#dd3e54", "#ED213A"],
  1: ["#8360c3", "#2ebf91", "#6be585", "#FDC830", "#d43799"],
  2: ["#009FFF", "#0083B0", "#00B4DB", "#363dbd"]
};

const Wobbly: Component = () => {
  let wobbly!: HTMLDivElement;

  createEffect(() => {
    setTimeout(() => wobbly.classList.add(styles.aktif), 1250);
  });

  return (
    <div class={styles.inside} ref={(evt) => wobbly = evt}>
      <For each={Array.from(Array(3).keys())}>{(numb) => {
        return (<span style={{background: color[numb][Math.floor(Math.random() * color[numb].length)]}} data-feelsgood={numb} class={styles.burner}></span>);
      }}</For>
    </div>
  );
};

export default Wobbly;