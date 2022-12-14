import { Component, For, createEffect, createSignal, Show } from "solid-js";
import { preventClick, sleep } from "../../../Util";

import { siAbletonlive, siTypescript, siSolid, siJavascript, siDiscord, siMongodb, siRedis, siObsstudio, siYoutube, siTensorflow, siExpress, siPostgresql, siSoundcloud } from "simple-icons/icons";

import style from "./Project.module.css";

import _projImg_ire from "../../../assets/proj/ire.webp";
import _projImg_self from "../../../assets/proj/1337.webp";
import _projImg_cdev from "../../../assets/proj/cdev.webp";
import _projImg_blobproj from "../../../assets/proj/blobproj.webp";
import _projImg_gmdibot from "../../../assets/proj/gmdibot.webp";
import _projImg_antinsfw from "../../../assets/proj/antinsfw.webp";
import _projImg_cupcakke from "../../../assets/proj/cupcakke.webp";
import _projImg_catbox from "../../../assets/proj/catbox.webp";
import _projImg_eom from "../../../assets/proj/eom.webp";

const Project: Component<{active?: boolean}> = (props: {active?: boolean}) => {
  const derivedProps = () => props.active;
  const [toggle, setToggle] = createSignal<boolean>(false);
  // createEffect(() => derivedProps() ? setToggle(true) : sleep(750).then(() => setToggle(false)));
  createEffect(() => {
    if (derivedProps()) {
      sleep(125).then(() => setToggle(true));
    } else {
      sleep(750).then(() => setToggle(false));
    };
  });

  return (
    <div class={style.project} data-itchi={String(Boolean(toggle()))} style={{width: toggle() ? "100%" : "0", height: toggle() ? "auto": 0}}>
      <For each={List()}>{(ctx) => {
        return (
          <div class={style.content}>
            <div class={style.prismatics}>
              <img src={ctx.image} draggable={false} loading={"lazy"} oncontextmenu={(evt) => preventClick(evt)}></img>
            </div>

            <div class={style.imagine}>
              <p class={style.sike}>{ctx.title}</p>
              <p class={style.cite} onclick={() => window.open(ctx.url, "_blank")}>Visit</p>
            </div>

            <Show when={ctx?.description?.length >= 1}>
              <div class={style.bleed}>
                <div class={style.cupcakke}>
                  <p>{ctx.description}</p>
                </div>

                <Show when={ctx?.tools?.length}>
                  <div class={style.kickback}>
                    <For each={ctx.tools}>{(ico) => {
                      return (
                        <span class={style.brand}>
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill={`#${ico.hex != "000000" || ico.title == "Ableton Live" ? ico.hex : "FFFFFF"}`} d={ico.path} />
                          </svg>
                        </span>
                      );
                    }}</For>
                  </div>
                </Show>
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
      title: "13373333.one",
      image: _projImg_self,
      url: "https://github.com/ray-1337/solid-13373333-v2",
      description: "An open-source repository of this website.",
      tools: [siTypescript, siExpress]
    },
    {
      title: "CupcakKe",
      image: _projImg_cupcakke,
      url: "https://www.youtube.com/playlist?list=PLGd05QsjGyxUrnRbKBGB9touvcyj51MJW",
      description: "A parodies of CupcakKe, remixed by me.",
      tools: [siYoutube, siAbletonlive, siSoundcloud]
    },
    {
      title: "Catbox",
      image: _projImg_catbox,
      url: "https://13373333.one/catbox",
      description: "A personal/private file storage. Powered by BunnyCDN.",
      tools: [siTypescript, siSolid]
    },
    {
      title: "Community Development",
      image: _projImg_cdev,
      url: "https://cdev.shop",
      description: "My first remotely startup project to advance limitations around Discord and FiveM communities.",
      tools: [siTypescript, siRedis, siMongodb, siDiscord, siPostgresql]
    },
    {
      title: "Erase Our Memories",
      image: _projImg_eom,
      url: "https://github.com/ray-1337/erase-our-memories/",
      description: "A side-project/script to bulk-delete your messages from your exes contact.",
      tools: [siDiscord, siJavascript]
    },
    {
      title: "IRE (03.12.2021)",
      image: _projImg_ire,
      url: "https://soundcloud.com/1337-3333/sets/ire",
      description: "A way to distract me from self-harm, but it didn't help.",
      tools: [siSoundcloud]
    },
    {
      title: "Blob Project",
      image: _projImg_blobproj,
      url: "https://blob-project.com",
      description: "Creating a YouTube programming content with no retakes, and no fillers.",
      tools: [siObsstudio, siDiscord, siYoutube]
    },
    {
      title: "Anti-NSFW",
      image: _projImg_antinsfw,
      url: "https://ray1337.gitbook.io/anti-nsfw-official-documentation/",
      description: "A Discord bot that can detect NSFW content through machine learning.",
      tools: [siTypescript, siRedis, siMongodb, siDiscord, siTensorflow, siExpress]
    },
    {
      title: "GMDI Discord Bot",
      image: _projImg_gmdibot,
      url: "https://github.com/ray-1337/gmdi-private-bot/",
      description: "A Discord bot that is made exclusively for Geometry Dash Indonesia.",
      tools: [siTypescript, siDiscord, siExpress]
    }
  ]
};