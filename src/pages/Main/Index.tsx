import { Component, For, createSignal, lazy, Show, onMount, createEffect } from "solid-js";
import { marked } from "marked";

import style from "../../css/Main.module.css";

// content
const Wobbly = lazy(() => import("./Wobbly"));

// panel
const About = lazy(() => import("./components/About"));
const Project = lazy(() => import("./components/Project"));
const Tools = lazy(() => import("./components/Tools"));
const Social = lazy(() => import("./components/Social"));

const Introduction = marked.parseInline(
  `**Hello.** I'm Ray, and I'm a *full-stack developer*.
  I love to <u>expand my creativity</u> and <u>skills</u> through this website.
  Feel free to explore. *Ciao.*
  `, { gfm: true, breaks: true });

const Content: { name: string, unique: string }[] = [
  { name: "Biography", unique: "about" },
  { name: "Projects", unique: "project" },
  { name: "Production Tools", unique: "tools" },
  { name: "Social Media", unique: "social" }
];

const Hiccup: { icon: string, url: string }[] = [
  { icon: "gh", /*'f09b',*/ url: "https://github.com/ray-1337" },
  { icon: "ev", /*'f0e0',*/ url: "mailto:personal@13373333.one" },
];

const Main: Component = () => {
  const [getPanel, setPanel] = createSignal<string | null>(null);
  const [fourthWall, setFourthWall] = createSignal<boolean>(true);
  const [bornTime, setBornTime] = createSignal<string>("");

  onMount(async () => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = "manual";
    };

    const dummyCheck = setInterval(async () => {
      if (document.readyState == "complete") {
        setFourthWall(false);
        clearInterval(dummyCheck);
      };
    }, 500);
  });

  createEffect(() => {
    let interval = setInterval(() => {
      let date = new Date("Jul 24 2023 00:00:00 GMT+0800").getTime() - Date.now();
      let hour = Math.floor(date / (36e5));
      let min = Math.floor((date % (36e5)) / (60e3));
      let sec = Math.floor((date % (60e3)) / 1e3);
      let zeroFront = (n: number, c?: number) => ('0' + String(n)).slice(c ? -c : -2);
      let totale = `${zeroFront(hour, hour.toString().length < 2 ? 2 : hour.toString().length)}:${zeroFront(min)}:${zeroFront(sec)}`;

      if (date < 0) {
        clearInterval(interval);
        return setBornTime("00:00:00");
      } else {
        return setBornTime(totale);
      };
    }, 1000);
  })

  return (
    <section>
      <div class={style.parasympathetic} data-appear={!fourthWall() && getPanel() == null}>
        <div class={style.menu}>
          {/* upper level */}
          <div class={style.unholy}>
            {/* introduction */}
            <div class={style.perkenalan}>
              <p innerHTML={Introduction}></p>
            </div>

            {/* things like panel */}
            <div class={style.things}>
              <ul>
                <For each={Content}>{(ctx) => {
                  return (<li onclick={() => setPanel(ctx.unique)}>{ctx.name}</li>);
                }}</For>
              </ul>
            </div>
          </div>
          
          {/* lower level */}
          <div class={style.disclosure}>
            {/* footer? */}
            <div class={style.lower}>
              <div class={style.idiot}>
                <p>{bornTime()}</p>
              </div>

              <div class={style.quick}>
                <For each={Hiccup}>{(ctx) => {
                  return (
                    <a href={ctx.url} target="_blank">
                      <span data-riku={ctx.icon}></span>
                    </a>
                  );
                }}</For>
              </div>
            </div>
          </div>
        </div>

        <Wobbly></Wobbly>
      </div>

      <div class={style.panel} data-appear={getPanel() !== null}>
        {/* close button */}
        <Show when={getPanel() !== null}>
          <div class={style.close} onclick={() => setPanel(null)}>
            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" /></svg>
          </div>
        </Show>

        <About active={getPanel() == "about"}></About>

        <Project active={getPanel() == "project"}></Project>

        <Tools active={getPanel() == "tools"}></Tools>

        <Social active={getPanel() == "social"}></Social>
      </div>
    </section>
  );
};

export default Main;