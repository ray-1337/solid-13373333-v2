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

import { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { Tooltip, Accordion } from "@mantine/core";

import style from "../css/components/Tools.module.css";
import headingStyle from "../css/Main.module.css";

export default function(props: { active?: boolean }) {
  const [toggle, setToggle] = useState<boolean>(props?.active || false);

  const [deferredToggle] = useDebouncedValue(toggle, 10);
  useEffect(() => setToggle(true), []);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div data-itchi={String(deferredToggle)}>
      {/* heading */}
      <div className={headingStyle.heading_confront} style={{ background: "linear-gradient(90deg, rgba(95,117,223,1) 0%, rgba(84,155,235,1) 100%)" }}>
        <div className={headingStyle.title}> <h1>Tools</h1> </div>
        <div className={headingStyle.sub}> <p>This is a list of my daily basis tools and other things that I choose to learn for.</p> </div>
      </div>

      {
        Object.keys(IconList()).map((type, iconIndex) => {
          const content = IconList()[type];

          return (
            <div key={iconIndex} className={style.tools} style={{ background: "#" + content.bgColor }}>
              <div className={style.info}>
                <h3>{capitalize(type)}</h3>
                <p>{content.description}</p>
              </div>

              <div className={style.list}>
                {
                  content.purified.map((state, purifiedIndex) => {
                    return (
                      <Tooltip label={state.title} color="indigo" withArrow>
                        <span className={style.brand} key={purifiedIndex} onClick={() => window.open(state.url, "_blank")}>
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill={`#${state.hex != "000000" ? state.hex : "FFFFFF"}`} d={state.path} />
                          </svg>
                        </span>
                      </Tooltip>
                    );
                  })
                }
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
          <Accordion variant="contained" sx={{width: "100%"}} styles={{
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
                    <Accordion.Control>{val.question}</Accordion.Control>
                    <Accordion.Panel sx={{paddingTop: "1rem"}}>{val.answer}</Accordion.Panel>
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
  let icon: Record<string, { description: string, list: (typeof siNodedotjs)[], purified: GeneralListType[], bgColor: string }> = {
    language: {
      description: "A programming language (except HTML) that I've mastered for at least more than 5 years.",
      list: [siJavascript, siTypescript, siHtml5, siCss3],
      purified: [],
      bgColor: "121112"
    },

    technology: {
      description: "This is my daily basis tools that I know how to use it, or familiar with.",
      list: [siReact, siNextdotjs, siPnpm, siWebpack, siAbletonlive, siPostgresql, siAmazonaws, siNodedotjs, siTsnode, siNpm, siYarn, siAdobephotoshop, siAdobepremierepro, siRedis, siMongodb, siGithub, siVisualstudio, siVisualstudiocode, siFirebase, siHeroku, siNginx, siTensorflow, siUbuntu, siExpress, siJquery, siMarkdown, siTrello, siGitbook, siSupabase, siReactrouter, siSolid, siVite, siPostgresql, siSequelize, siRoblox, siPostman, siPostcss, siAutoprefixer],
      purified: [],
      bgColor: "242424"
    },

    interested: {
      description: "This is a list of tools or programming language that I want to try in the future.",
      list: [siRust, siVuedotjs, siNuxtdotjs, siRedux, siFastify, siWebassembly, siElectron],
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