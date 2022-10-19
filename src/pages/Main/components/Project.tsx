import { Component, For, createEffect, createSignal, Show } from "solid-js";
import { preventClick, sleep } from "../../../Util";

import style from "../../../css/Main.module.css";

import _projImg_ire from "../../../assets/proj/ire.webp";
import _projImg_self from "../../../assets/proj/1337.webp";
import _projImg_cdev from "../../../assets/proj/cdev.webp";
import _projImg_blobproj from "../../../assets/proj/blobproj.webp";
import _projImg_gmdibot from "../../../assets/proj/gmdibot.webp";
import _projImg_antinsfw from "../../../assets/proj/antinsfw.webp";

const Project: Component<{active?: boolean}> = (props: {active?: boolean}) => {
  const derivedProps = () => props.active;
  const [toggle, setToggle] = createSignal<boolean>(false);
  createEffect(() => derivedProps() ? setToggle(true) : sleep(750).then(() => setToggle(false)));

  return (
    <div class={style.project} data-itchi={String(Boolean(toggle()))} style={{display: toggle() ? "block" : "none"}}>
      <For each={List()}>{(ctx) => {
        return (
          <div class={style.content}>
            <div class={style.prismatics}>
              <img src={ctx.image} draggable={false} oncontextmenu={(evt) => preventClick(evt)}></img>
            </div>

            <div class={style.imagine}>
              <p class={style.sike}>{ctx.title}</p>
              <p class={style.cite} onclick={() => window.open(ctx.url, "_blank")}>Visit</p>
            </div>

            <Show when={ctx?.description?.length >= 1}>
              <div class={style.bleed}>
                <p>{ctx.description}</p>
              </div>
            </Show>
          </div>
        );
      }}</For>
    </div>
  );
};

export default Project;

function List() {
  return [
    {
      title: "IRE (03.12.2021)",
      image: _projImg_ire,
      url: "https://soundcloud.com/1337-3333/sets/ire",
      description: "A way to distract me from self-harm, but it didn't help."
    },
    {
      title: "13373333.one",
      image: _projImg_self,
      url: "https://github.com/ray-1337/solid-13373333-v2",
      description: "An open-source repository of this website."
    },
    {
      title: "Community Development",
      image: _projImg_cdev,
      url: "https://cdev.shop",
      description: "My first remotely startup project to advance limitations around Discord and FiveM communities."
    },
    {
      title: "Blob Project",
      image: _projImg_blobproj,
      url: "https://blob-project.com",
      description: "Creating a YouTube programming content with no retakes, no voiceover, and no fillers."
    },
    {
      title: "Anti-NSFW",
      image: _projImg_antinsfw,
      url: "https://ray1337.gitbook.io/anti-nsfw-official-documentation/",
      description: "A Discord bot that can detect NSFW content through machine learning."
    },
    {
      title: "GMDI Discord Bot",
      image: _projImg_gmdibot,
      url: "https://github.com/ray-1337/gmdi-private-bot/",
      description: "A Discord bot that is made exclusively for Geometry Dash Indonesia."
    }
  ]
};