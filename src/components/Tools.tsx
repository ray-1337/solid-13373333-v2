import {
  // languages
  siJavascript,
  siTypescript,
  siHtml5,
  siCss3,

  // tools
  siReact,
  siWebpack,
  siPnpm,
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

import { useState, useEffect, useRef } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { Tooltip, Accordion, Text } from "@mantine/core";

import style from "../css/components/Tools.module.css";
import headingStyle from "../css/Main.module.css";
import { textColorBasedOnBackground } from "./Utility";

export default function(props: { active?: boolean }) {
  const [toggle, setToggle] = useState<boolean>(props?.active || false);

  const [deferredToggle] = useDebouncedValue(toggle, 500);

  const headingTogetherIconList = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setToggle(true);

    setTimeout(() => {
      const eachContentTimeout: number = 100;

      for (let i = 0; i < headingTogetherIconList.current.length; i++) {
        setTimeout(() => headingTogetherIconList.current[i].classList.add(style.bayleaf), eachContentTimeout * i + 1);
      };
    }, 750);
  }, []);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div data-itchi={String(deferredToggle)}>
      {/* heading */}
      <div className={headingStyle.heading_confront} style={{ background: "linear-gradient(90deg, rgba(95,117,223,1) 0%, rgba(84,155,235,1) 100%)" }}>
        <div className={headingStyle.heading_together}>
          <div className={headingStyle.title}> <h1>Tools</h1> </div>
          <div className={headingStyle.sub}> <p>This is a list of my daily basis tools and other things that I choose to learn for.</p> </div>
        </div>
      </div>

      {
        IconList().map((content, iconIndex) => {
          return (
            <div key={iconIndex} className={style.tools} style={{ background: `#${content.bgColor.toString(16)}` }}>
              <div className={`${headingStyle.heading_together} ${style.heading_together}`} ref={(el) => el ? headingTogetherIconList.current.push(el) : undefined}>
                <div className={style.info}>
                  <h3>{capitalize(content.name)}</h3>
                  <p>{content.description}</p>
                </div>

                <div className={style.list}>
                  {
                    content.purified.map((state, purifiedIndex) => {
                      const purifiedColorHex = `#${state.hex != "000000" ? state.hex : "FFFFFF"}`;

                      return (
                        <Tooltip label={state.title} key={purifiedIndex} color={purifiedColorHex} style={{ color: textColorBasedOnBackground(purifiedColorHex) }} withArrow>
                          <span className={style.brand} key={purifiedIndex} onClick={() => window.open(state.url, "_blank")}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path fill={purifiedColorHex} d={state.path} />
                            </svg>
                          </span>
                        </Tooltip>
                      );
                    })
                  }
                </div>
              </div>
            </div>
          );
        })
      }

      {/* questions */}
      <div className={style.tools} style={{ background: "#0E21A0" }}>
        <div className={style.info}>
          <h3>{"Questions that No One Asked"}</h3>
        </div>

        <div className={style.list}>
          <Accordion variant="contained" style={{width: "100%"}} styles={{
            item: {
              backgroundColor: "#f1f1f1"
            },
            panel: {
              backgroundColor: "#121112",
              color: "white",
            }
          }}>
            {
              QuestionsList().map((val, index) => {
                return (
                  <Accordion.Item key={index} value={val.question}>
                    <Accordion.Control>
                      <Text fw={500}>{val.question}</Text>
                    </Accordion.Control>

                    <Accordion.Panel style={{paddingTop: "1rem"}}>{val.answer}</Accordion.Panel>
                  </Accordion.Item>
                );
              })
            }
          </Accordion>
        </div>
      </div>
    </div>
  )
};

type GeneralListType = { title: string, path: string, hex: string, url: string };

function IconList() {
  type IconListType = Record<"name" | "description", string> & Record<"bgColor", number> & { list: (typeof siNodedotjs)[], purified: GeneralListType[] };

  const list: Array<IconListType> = [
    {
      name: "Language",
      description: `A programming language that I've mastered for at least ${new Date().getFullYear() - new Date("Jul 2017").getFullYear()} years.`,
      list: [siJavascript],
      purified: [],
      bgColor: 0x1c1c1c
    },
    {
      name: "Technology",
      description: "This is my daily basis tools that I know how to use it, or familiar with.",
      list: [siReact, siNextdotjs, siTypescript, siPnpm, siHtml5, siCss3, siWebpack, siAbletonlive, siAmazonaws, siNodedotjs, siTsnode, siNpm, siAdobephotoshop, siAdobepremierepro, siRedis, siMongodb, siGithub, siVisualstudio, siVisualstudiocode, siFirebase, siNginx, siTensorflow, siUbuntu, siExpress, siMarkdown, siTrello, siGitbook, siSupabase, siSolid, siVite, siPostgresql, siSequelize, siRoblox, siPostman, siPostcss, siAutoprefixer],
      purified: [],
      bgColor: 0x242424
    },
    {
      name: "I know, but not anymore.",
      description: "This is a list of tools that I know how to use it, but rather not use it. It might not relevant to any of my projects anymore.",
      list: [siYarn, siJquery, siReactrouter, siHeroku],
      purified: [],
      bgColor: 0x380b13
    },
    {
      name: "Will Look Into It",
      description: "This is a list of tools or programming language that I want to try in the future.",
      list: [siRust, siVuedotjs, siNuxtdotjs, siRedux, siFastify, siWebassembly, siElectron],
      purified: [],
      bgColor: 0x191119
    },
  ];

  for (const ctx of list) {
    for (const icon of ctx.list) {
      ctx.purified.push({
        title: icon.title,
        path: icon.path,
        hex: icon.hex,
        url: icon.source
      });
    };
  };

  return list;
};

function QuestionsList(): Array<Record<"question" | "answer", string>> {
  return [
    {
      question: "Why do you prefer Node.js over PHP?",
      answer: "Consistency, reliable, and good for long-term project."
    },
    {
      question: "What about Python?",
      answer: "I think Python is good and handy when it comes to analyzing data, or making a machine learning. For now, I have no time to learn a new programming language."
    }
  ];
};