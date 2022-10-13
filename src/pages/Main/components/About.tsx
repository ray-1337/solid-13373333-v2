import { Component, createSignal, Show, createEffect } from "solid-js";
import { sleep, preventClick } from "../../../Util";
import { marked } from "marked";

import style from "../../../css/Main.module.css";

import rayImg from "../../../assets/003.webp";

const ShortBio = marked.parseInline(`
  **Hello.** I'm Ray, and I'm a *full-stack developer*, and my origin is from <u>Indonesia</u>.
  I've been interested in developing server things since <u>I was 11 years old</u>.
  And, I've also mastered in developing website since March and April 2020.
  `, { gfm: true, breaks: true });

const About: Component<{ active?: boolean }> = (props: { active?: boolean }) => {
  const derivedProps = () => props.active;
  const [toggle, setToggle] = createSignal<boolean>(false), [deferToggle, setDeferToggle] = createSignal<boolean>(false);
  createEffect(() => {
    derivedProps() ? setToggle(true) : sleep(750).then(() => setToggle(false));
    toggle() ? setTimeout(() => setDeferToggle(true), 5) : setDeferToggle(false);
  });

  return (
    <Show when={toggle()}>
      <div class={style.about} data-itchi={String(Boolean(deferToggle()))}>
        <div class={style.header}></div>

        <div class={style.overview}>
          <div class={style.image}>
            <img src={rayImg} loading={"lazy"} onload={(evt) => evt.currentTarget.classList.add(style.kuma)} draggable={false} oncontextmenu={(evt) => preventClick(evt)}></img>
          </div>

          <div class={style.title}>
            <h1>Hizkia Ray</h1>
          </div>
        </div>

        <div class={style.bullcrap}>
          <div class={style.title}>
            <h1>Short Bio</h1>
            <span></span>
          </div>
          
          <div class={style.sub}>
            <p innerHTML={ShortBio}></p>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default About;