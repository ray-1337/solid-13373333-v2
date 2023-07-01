import { Component, For, createSignal, lazy, Show, onMount, createEffect, useContext } from "solid-js";
import { marked } from "marked";
import { projectIndexContext } from "./components/Project/Project";
import { useSearchParams } from "@solidjs/router";

import style from "../../css/Main.module.css";

// content
const Wobbly = lazy(() => import("./Wobbly"));

// panel
const About = lazy(() => import("./components/About"));
const Tools = lazy(() => import("./components/Tools"));
const Social = lazy(() => import("./components/Social"));

// project (special)
const Project = lazy(() => import("./components/Project/Project"));
const ProjectDetails = lazy(() => import("./components/Project/Project.Detail"));

const Introduction = marked.parseInline(
  `**Hello.** I'm Ray, and I'm a *full-stack developer*.
  I love to <u>expand my creativity</u> and <u>skills</u> through this website.
  Feel free to explore. *Ciao.*
  `, { gfm: true, breaks: true });

const Content: { name: string, unique: string, redirect?: boolean }[] = [
  { name: "Biography", unique: "about" },
  { name: "Projects", unique: "project" },
  { name: "Production Tools", unique: "tools" },
  { name: "Social Media", unique: "social" },
  { name: "File Storage", unique: "https://13373333.one/catbox", redirect: true }
];

const Hiccup: { icon: string, url: string }[] = [
  { icon: "gh", /*'f09b',*/ url: "https://github.com/ray-1337" },
  { icon: "ev", /*'f0e0',*/ url: "mailto:personal@13373333.one" },
];

const Main: Component = () => {
  const [getPanel, setPanel] = createSignal<string | null>(null);
  const [fourthWall, setFourthWall] = createSignal<boolean>(true);
  const [bornTime, setBornTime] = createSignal<string>("");
  const {currentProjectIndex} = useContext(projectIndexContext);
  const [params] = useSearchParams();

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
    setInterval(() => {
      let date = new Date(`Jul 24 ${new Date().getFullYear()} 00:00:00 GMT+0800`);
      if ((date.getTime() - Date.now()) <= 0) {
        date.setFullYear(date.getFullYear() + 1);
      };

      let annotatedDate = date.getTime() - Date.now();

      let hour = Math.floor(annotatedDate / (36e5));
      let min = Math.floor((annotatedDate % (36e5)) / (60e3));
      let sec = Math.floor((annotatedDate % (60e3)) / 1e3);
      let zeroFront = (n: number, c?: number) => ('0' + String(n)).slice(c ? -c : -2);
      let totale = `${zeroFront(hour, hour.toString().length < 2 ? 2 : hour.toString().length)}:${zeroFront(min)}:${zeroFront(sec)}`;

      document.title = totale;
      return setBornTime(totale);
    }, 1000);
  })

  return (
    <section>
      <div class={style.parasympathetic} data-appear={(!fourthWall() && getPanel() == null && (!params?.projectId || currentProjectIndex() === null))}>
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
                  return (<li onclick={() => {
                    if (ctx.redirect) {
                      window.open(ctx.unique, "_blank");
                    } else {
                      setPanel(ctx.unique);
                    };
                  }}>{ctx.name}</li>);
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
        <Show when={getPanel() !== null && currentProjectIndex() === null}>
          <div class={style.close} onclick={() => setPanel(null)}>
            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" /></svg>
          </div>
        </Show>

        <About active={getPanel() == "about"}></About>

        <Project active={getPanel() == "project"}></Project>

        <Tools active={getPanel() == "tools"}></Tools>

        <Social active={getPanel() == "social"}></Social>
      </div>

      <ProjectDetails></ProjectDetails>
    </section>
  );
};

export default Main;