import { useEffect, useState } from "react";
import { preventClick, sleep } from "../../Util";
import Image from "next/image";

import style from "../../css/components/project/Project.module.css";
import Projects from "./list";

export default function(props: { active?: boolean }) {
  const derivedProps = () => props.active;
  const [toggle, setToggle] = useState<boolean>(false);

  // const [currentProjectIndex, setCurrentProjectIndex] = createSignal<number | null>(null);
  // const [currentProjectActive, setCurrentProjectActive] = createSignal<boolean>(false);

  const resignedType = (number: number) => {
    switch (number) {
      case 0: return null;
      case 1: return "Discontinued";
      case 2: return "Paused";
      case 3: return "Hiatus";
      default: return "";
    };
  };

  useEffect(() => {
    if (derivedProps()) {
      sleep(125).then(() => setToggle(true));
    } else {
      sleep(750).then(() => setToggle(false));
    };
  });

  return (
    <div className={style.project} /*data-hidewhencurrent={currentProjectIndex() !== null}*/ data-itchi={String(toggle)} style={{
      width: toggle ? "100%" : "0", height: toggle ? "auto" : 0
    }}>
      {
        Projects.map((ctx, index) => {
          return (
            <div key={index} className={style.content} onClick={() => {
              // if (currentProjectIndex() !== null) return;

              // setCurrentProjectIndex(index);
              // setTimeout(() => setCurrentProjectActive(true), 125);
            }}>

              <div className={style.prismatics}>
                <Image alt={ctx.description} layout={"fill"} src={ctx.image} onLoad={(evt) => {
                  evt.currentTarget.classList.add(style.jpuf);
                  if (ctx?.resigned) evt.currentTarget.classList.add(style.archive);
                }} draggable={false} loading={"lazy"} onContextMenu={(evt) => preventClick(evt)}/>
              </div>

              <div className={style.imagine}>
                <p className={style.sike}>{ctx?.resigned ? `${ctx.title} (${resignedType(ctx?.resigned)})` : ctx.title}</p>
              </div>

              {
                ctx?.description?.length >= 1 && (
                  <div className={style.bleed}>
                    <div className={style.cupcakke}>
                      <p>{ctx.description}</p>
                    </div>

                    {
                      ctx?.tools?.length && (
                        <div className={style.kickback}>
                          {
                            ctx.tools.map((ico, icoIndex) => {
                              return (
                                <span key={icoIndex} className={style.brand}>
                                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fill={`#${ico.hex != "000000" || ico.title == "Ableton Live" ? ico.hex : "FFFFFF"}`} d={ico.path} />
                                  </svg>
                                </span>
                              );
                            })
                          }
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
          );
        })
      }
    </div>
  );
};