import {
  // languages
  siJavascript,
  siTypescript,
  siHtml5,
  siCss3,

  // tools
  siReact,
  siWebpack,
  siNodedotjs,
  siAmazonaws,
  siTsnode,
  siNpm,
  siYarn,
  siAdobephotoshop,
  siAdobepremierepro,
  siRedis,
  siMongodb,
  siGithub,
  siVisualstudio,
  siVisualstudiocode,
  siFirebase,
  siHeroku,
  siNginx,
  siTensorflow,
  siUbuntu,
  siExpress,
  siJquery,
  siMarkdown,
  siTrello,
  siGitbook,
  siSupabase,
  siReactrouter,
  siSolid,
  siVite,
  siSequelize,
  siPostgresql,
  siElectron,
  siPostman,
  siPostcss,
  siAutoprefixer,
  siRoblox,
  siAbletonlive,

  // interested
  siRust,
  siNextdotjs,
  siVuedotjs,
  siNuxtdotjs,
  siRedux,
  siFastify,
  siWebassembly,
} from "simple-icons/icons";

import { Component, For, createSignal, createEffect, Show } from "solid-js";
import { sleep } from "../../../Util";

import style from "./Tools.module.css";
import headingStyle from "../../../css/Main.module.css";

const Personal: Component<{ active?: boolean }> = (props: { active?: boolean }) => {
  const derivedProps = () => props.active;
  const [toggle, setToggle] = createSignal<boolean>(false), [deferToggle, setDeferToggle] = createSignal<boolean>(false);
  createEffect(() => {
    derivedProps() ? setToggle(true) : sleep(750).then(() => setToggle(false));
    toggle() ? setTimeout(() => setDeferToggle(true), 5) : setDeferToggle(false);
  });

  return (
    <Show when={toggle()}>
      <div data-itchi={String(Boolean(deferToggle()))}>
        {/* heading */}
        <div class={headingStyle.heading_confront} style={{ background: "linear-gradient(90deg, rgba(95,117,223,1) 0%, rgba(84,155,235,1) 100%)" }}>
          <div class={headingStyle.title}> <h1>Tools</h1> </div>
          <div class={headingStyle.sub}> <p>This is a list of my daily basis tools and other things that I choose to learn for.</p> </div>
        </div>

        <For each={Object.keys(IconList())}>{
          (type) => {
            const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
            const content = IconList()[type];

            return (
              <div class={style.tools} style={{background: "#" + content.bgColor}}>
                <div class={style.info}>
                  <h3>{capitalize(type)}</h3>
                  <p>{content.description}</p>
                </div>

                <div class={style.list}>
                  <For each={content.purified}>{
                    (state) => {
                      return (
                        <span class={style.brand} onclick={() => window.open(state.url, "_blank")}>
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill={`#${state.hex != "000000" ? state.hex : "FFFFFF"}`} d={state.path} />
                          </svg>
                        </span>
                      );
                    }
                  }</For>
                </div>
              </div>
            );
          }}
        </For>
      </div>
    </Show>
  )
};

export default Personal;

type GeneralListType = { title: string, path: string, hex: string, url: string };

function IconList() {
  let icon: Record<string, { description: string, list: (typeof siNodedotjs)[], purified: GeneralListType[], bgColor: string }> = {
    language: {
      description: "A programming language (except HTML) that I've mastered for at least more than 5 years.",
      list: [siJavascript, siTypescript, siHtml5, siCss3],
      purified: [],
      bgColor: "121112"
    },

    technology: {
      description: "This is my daily basis tools that I know how to use it, or familiar with.",
      list: [siReact, siWebpack, siAbletonlive, siAmazonaws, siNodedotjs, siTsnode, siNpm, siYarn, siAdobephotoshop, siAdobepremierepro, siRedis, siMongodb, siGithub, siVisualstudio, siVisualstudiocode, siFirebase, siHeroku, siNginx, siTensorflow, siUbuntu, siExpress, siJquery, siMarkdown, siTrello, siGitbook, siSupabase, siReactrouter, siSolid, siVite, siPostgresql, siSequelize, siRoblox, siPostman, siPostcss, siAutoprefixer],
      purified: [],
      bgColor: "242424"
    },

    interested: {
      description: "This is a list of tools or programming language that I want to try in the future.",
      list: [siRust, siNextdotjs, siVuedotjs, siNuxtdotjs, siRedux, siPostgresql, siFastify, siWebassembly, siElectron],
      purified: [],
      bgColor: "191119"
    },
  };

  for (const ctx of Object.entries(icon)) {
    for (const siIcon of ctx[1].list) {
      (ctx[1].purified as GeneralListType[]).push({ title: siIcon.title, path: siIcon.path, hex: siIcon.hex, url: siIcon.source });
      // list.push({ title: siIcon.title, path: siIcon.path, hex: siIcon.hex, type: capitalize(ctx[0]) });
    };
  };

  return icon;
};