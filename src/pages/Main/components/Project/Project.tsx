import { Component, For, createEffect, createSignal, Show } from "solid-js";
import { preventClick, sleep, shuffleArray } from "../../../../Util";

import style from "./Project.module.css";
import Projects from "./Project.List";

function resignedType(number: number) {
  switch (number) {
    case 0: return null;
    case 1: return "Discontinued";
    case 2: return "Paused";
    case 3: return "Hiatus";
    default: return "";
  };
};

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

  const staycationList = shuffleArray(Projects);

  return (
    <section class="projectItself">
      {/* project list */}
      <div class={style.project} data-itchi={String(Boolean(toggle()))} style={{width: toggle() ? "100%" : "0", height: toggle() ? "auto": 0}}>
        <For each={staycationList}>{(ctx) => {
          return (
            <div class={style.content}>
              <div class={style.prismatics}>
                <img src={ctx.image} onload={(evt) => {
                  evt.currentTarget.classList.add(style.jpuf);
                  if (ctx?.resigned) evt.currentTarget.classList.add(style.archive);
                }} draggable={false} loading={"lazy"} oncontextmenu={(evt) => preventClick(evt)}></img>
              </div>

              <div class={style.imagine}>
                <p class={style.sike}>{ctx?.resigned ? `${ctx.title} (${resignedType(ctx?.resigned)})` : ctx.title}</p>
                {(ctx?.resigned ? <></> : <p class={style.cite} onclick={() => window.open(ctx.url, "_blank")}>Visit</p>)}
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
    </section>
  );
};

export default Project;