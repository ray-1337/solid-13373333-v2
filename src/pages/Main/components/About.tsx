import { Component, createSignal, Show, createEffect } from "solid-js";
import { sleep, preventClick } from "../../../Util";
import { marked } from "marked";
import Vibrant from "node-vibrant";

import style from "./About.module.css";

import rayImg from "../../../assets/pfp/legosi.webp";
const contextImg = "https://twitter.com/Garmr_914/status/1674430803261149184";

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

  const [pfpColorProm, setPfpColorProm] = createSignal<string | null>(null);

  return (
    <Show when={toggle()}>
      <div class={style.about} data-itchi={String(Boolean(deferToggle()))}>
        <div class={style.header} style={{"background-color": pfpColorProm() || undefined}}></div>

        <div class={style.overview}>
          <div class={style.selfie} onClick={() => contextImg ? window.open(contextImg, "_blank") : null}>
            <img src={rayImg}
              loading={"lazy"}
              draggable={false}
              oncontextmenu={(evt) => preventClick(evt)}
              onLoad={async (evt) => {
                evt.currentTarget.classList.add(style.kuma);

                if (!pfpColorProm()) {
                  const getPalette = await Vibrant.from(evt.currentTarget).getPalette();
                  if (getPalette.DarkVibrant?.hex) {
                    setPfpColorProm(getPalette.DarkVibrant?.hex);
                  } else {
                    setPfpColorProm("#121112");
                  };
                };
              }}
            ></img>
          </div>

          <div class={style.fullname}>
            <h1 style={{color: pfpColorProm() || undefined}}>Hizkia Ray</h1>
          </div>
        </div>

        <div class={style.bullcrap}>
          <div class={style.bullcrap_title}>
            <h1>Short Bio</h1>
            <span></span>
          </div>
          
          <div class={style.bullcrap_more}>
            <p innerHTML={ShortBio}></p>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default About;