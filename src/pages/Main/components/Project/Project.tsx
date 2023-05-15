import { Component, For, createEffect, createSignal, createContext, Show, useContext } from "solid-js";
import { preventClick, sleep } from "../../../../Util";

import style from "./Project.module.css";
import Projects from "./Project.List";

const [currentProjectIndex, setCurrentProjectIndex] = createSignal<number | null>(null);
const [currentProjectActive, setCurrentProjectActive] = createSignal<boolean>(false);
export const projectIndexContext = createContext({currentProjectIndex, setCurrentProjectIndex});
export const projectCurrentActive = createContext({currentProjectActive, setCurrentProjectActive});

function resignedType(number: number) {
  switch (number) {
    case 0: return null;
    case 1: return "Discontinued";
    case 2: return "Paused";
    case 3: return "Hiatus";
    default: return "";
  };
};

const Project: Component<{ active?: boolean }> = (props: { active?: boolean }) => {
  const derivedProps = () => props.active;
  const [toggle, setToggle] = createSignal<boolean>(false);

  const {currentProjectIndex, setCurrentProjectIndex} = useContext(projectIndexContext);
  const {currentProjectActive, setCurrentProjectActive} = useContext(projectCurrentActive);

  createEffect(() => {
    if (derivedProps()) {
      sleep(125).then(() => setToggle(true));
    } else {
      sleep(750).then(() => setToggle(false));
    };
  });

  return (
    <div class={style.project} data-hidewhencurrent={currentProjectIndex() !== null} data-itchi={String(Boolean(toggle()))} style={{ width: toggle() ? "100%" : "0", height: toggle() ? "auto" : 0 }}>
      <For each={Projects}>{(ctx, index) => {
        return (
          <div class={style.content} onclick={() => {
            if (currentProjectIndex() !== null) return;

            setCurrentProjectIndex(index);
            setTimeout(() => setCurrentProjectActive(true), 125);
          }}>
            <div class={style.prismatics}>
              <img src={ctx.image} onload={(evt) => {
                evt.currentTarget.classList.add(style.jpuf);
                if (ctx?.resigned) evt.currentTarget.classList.add(style.archive);
              }} draggable={false} loading={"lazy"} oncontextmenu={(evt) => preventClick(evt)}></img>
            </div>

            <div class={style.imagine}>
              <p class={style.sike}>{ctx?.resigned ? `${ctx.title} (${resignedType(ctx?.resigned)})` : ctx.title}</p>
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