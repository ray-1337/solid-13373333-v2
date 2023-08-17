import { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { useDebouncedValue } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import { IconBrandGithub, IconAt } from "@tabler/icons-react";

import style from "../css/Main.module.css";

// content
import COLOR from "../components/COLOR";

// panel
import About from "../components/About";
import Tools from "../components/Tools";
import Social from "../components/Social";
import Project from "../components/project/index";

// const ProjectDetails = dynamic(() => import("./components/Project/Project.Detail"));

export default function MainPage() {
  // panel management
  const [getPanel, setPanel] = useState<string | null>(null);
  const [debouncedPanel] = useDebouncedValue(getPanel, 750);

  const [fourthWall, setFourthWall] = useState<boolean>(true);
  const bornTime = useRef<HTMLParagraphElement>(null);

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
    // { name: "File Storage", unique: "https://13373333.one/catbox", redirect: true }
  ];
  
  const Hiccup: { icon: JSX.Element, url: string }[] = [
    { icon: (<IconBrandGithub/>), url: "https://github.com/ray-1337" },
    { icon: (<IconAt/>), url: "mailto:personal@13373333.one" },
  ];

  useEffect(() => {
    const birthdayInterval = setInterval(() => {
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
      
      if (bornTime?.current) {
        bornTime.current.innerText = totale;
      };
    }, 1000);

    if ('scrollRestoration' in history) {
      history.scrollRestoration = "manual";
    };

    const dummyCheck = setInterval(async () => {
      if (document.readyState == "complete") {
        setFourthWall(false);
        clearInterval(dummyCheck);
      };
    }, 500);

    return () => {
      clearInterval(birthdayInterval);
    };
  }, []);

  const deferredPanel = (panelName: string) => {
    return getPanel === null ? debouncedPanel === panelName : getPanel === panelName;
  };

  return (
    <section>
      <div className={style.parasympathetic} data-appear={(!fourthWall && getPanel == null /* && (!router?.query?.projectId|| currentProjectIndex === null) */)}>
        <div className={style.menu}>
          {/* upper level */}
          <div className={style.unholy}>
            {/* introduction */}
            <div className={style.perkenalan}>
              <p dangerouslySetInnerHTML={{__html: Introduction}}></p>
            </div>

            {/* things like panel */}
            <div className={style.things}>
              <ul>
                {
                  Content.map((ctx, index) => {
                    return (
                      <li key={index} onClick={() => ctx.redirect ? window.open(ctx.unique, "_blank") : setPanel(ctx.unique)}>{ctx.name}</li>
                    );
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
                <p ref={bornTime}></p>
              </div>

              <div className={style.quick}>
                {
                  Hiccup.map((ctx, index) => {
                    return (
                      <a href={ctx.url} key={index} target="_blank">{ctx.icon}</a>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>

        {/* funny goofy colors */}
        <COLOR/>
      </div>

      <div className={style.panel} data-appear={getPanel !== null}>
        {/* close button */}
        {
          (getPanel !== null /*&& currentProjectIndex === null*/) && (
            <div className={style.close} onClick={() => setPanel(null)}>
              <Burger opened={true} onClick={() => setPanel(null)} size={"xl"} color={"white"}/>
            </div>
          )
        }

        {deferredPanel("about") && <About active={debouncedPanel === "about"}></About>}

        {deferredPanel("project") && <Project active={debouncedPanel === "project"}></Project>}

        {deferredPanel("tools") && <Tools active={debouncedPanel === "tools"}></Tools>}

        {deferredPanel("social") && <Social active={debouncedPanel === "social"}></Social>}
      </div>

      {/* <ProjectDetails></ProjectDetails> */}
    </section>
  );
};