import { marked } from "marked";
import { useState, useEffect, lazy, HTMLAttributes, FC } from "react";

import style from "../css/Main.module.css";

// content
const Wobbly = lazy(() => import("../components/Wobbly"));

// panel
const About = lazy(() => import("../components/About"));
const Project = lazy(() => import("../components/Project"));
const Tools = lazy(() => import("../components/Tools"));
const Social = lazy(() => import("../components/Social"));

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

export default function Main() {
  const [getPanel, setPanel] = useState<string | null>(null);
  const [fourthWall, setFourthWall] = useState<boolean>(true);
  const [bornTime, setBornTime] = useState<string>("");

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = "manual";
    };

    const dummyCheck = setInterval(async () => {
      if (document.readyState == "complete") {
        setFourthWall(false);
        clearInterval(dummyCheck);
      };
    }, 500);

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
      <div className={style.parasympathetic} data-appear={!fourthWall && getPanel === null}>
        <div className={style.menu}>
          {/* upper level */}
          <div className={style.unholy}>
            {/* introduction */}
            <div className={style.perkenalan}>
              <p dangerouslySetInnerHTML={{ __html: Introduction }}></p>
            </div>

            {/* things like panel */}
            <div className={style.things}>
              <ul>
                {
                  Content.map(ctx => {
                    return (<li onClick={() => ctx.redirect ? window.open(ctx.unique, "_blank") : setPanel(ctx.unique)}>{ctx.name}</li>);
                  })
                }
              </ul>
            </div>
          </div>

          {/* lower level */}
          <div className={style.disclosure}>
            {/* footer? */}
            <div className={style.lower}>
              <div className={style.idiot}>
                <p>{bornTime}</p>
              </div>

              <div className={style.quick}>
                {
                  Hiccup.map(ctx => {
                    return (
                      <a href={ctx.url} target="_blank">
                        <span data-riku={ctx.icon}></span>
                      </a>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>

        <Wobbly></Wobbly>
      </div>

      <div className={style.panel} data-appear={getPanel !== null}>
        <>
          {() => {
            {/* close button */ }
            if (getPanel !== null) {
              return (
                <div className={style.close} onClick={() => setPanel(null)}>
                  <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" /></svg>
                </div>
              )
            }
          }}

          <About active={getPanel === "about"}></About>
          <Project active={getPanel === "project"}></Project>
          <Tools active={getPanel === "tools"}></Tools>
          <Social active={getPanel === "social"}></Social> 
        </>
      </div>
    </section>
  );
};