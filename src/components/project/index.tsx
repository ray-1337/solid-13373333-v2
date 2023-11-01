import { useDisclosure, useClickOutside } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { preventClick, sleep, shuffleArray } from "../Utility";
import ImageLoader from "../Loader";
import Image from "next/image";
import { Burger } from "@mantine/core";
import style from "../../css/components/project/Project.module.css";
import Projects from "./list";
import { IntermittentType } from "./typing";

Projects.forEach((val) => val.projects = shuffleArray(val.projects));

const shuffledProjects = shuffleArray(Projects);

export default function(props: { active?: boolean }) {
  const derivedProps = () => props.active;
  const [toggle, setToggle] = useState<boolean>(false);
  const [filter, setFilter] = useState<string[]>([]);
  const [isFilterOpen, { open: openFilter, close: closeFilter }] = useDisclosure(false);

  useEffect(() => {
    if (derivedProps()) {
      sleep(125).then(() => setToggle(true));
    } else {
      sleep(750).then(() => setToggle(false));
    };
  });

  const outsideFilterRef = useClickOutside(() => closeFilter());

  const openURLThroughWindow = (url: string) => {
    return window.open(url, "_blank");
  };

  return (
    <section>
      {/* filter work */}
      <section className={style.project_filter_work} data-state={isFilterOpen}>
        <section className={style.project_filter_work_inner} ref={outsideFilterRef}>
          {/* filtering tab */}
          <div className={style.project_filter_work_classification}>
            <h3>Filter</h3>

            <div className={style.project_filter_work_classification_list}>
              {
                Projects.map((val, index) => {
                  return (
                    <div className={style.project_filter_work_classification_individual} data-state={filter.includes(val.name)} key={index}
                    onClick={() => setFilter((prev) => prev.includes(val.name) ? prev.filter(i => i !== val.name) : [...prev, val.name])}>
                      <div className={style.project_filter_work_classification_individual_name}>
                        <p>{val.name}</p>
                      </div>

                      <div className={style.project_filter_work_classification_individual_total}>
                        <p>{val.projects.length}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          {/* close button */}
          <div className={style.project_filter_work_close} data-state={isFilterOpen} onClick={() => closeFilter()}>
            <Burger size="xl" opened={true} color={"black"} className={style.project_filter_work_close_burger}/>
          </div>
        </section>
      </section>

      {/* project list */}
      <div className={style.project} data-itchi={String(toggle)} style={{
        width: toggle ? "100%" : 0,
        height: toggle ? "100%" : 0,
        overflowY: isFilterOpen ? "hidden" : "auto",
        position: "absolute"
      }}>
        {
          shuffledProjects.filter(val => filter?.length ? filter.includes(val.name) : true).map((rootProject) => {
            const subProject = rootProject.projects;

            return subProject.map((ctx, subProjectIndex) => {
              return (
                <div key={subProjectIndex} className={style.content}>

                  <div className={style.prismatics}>
                    <Image className={ctx?.intermittentType ? style.archive : undefined} draggable={false} loading={"lazy"} onContextMenu={(evt) => preventClick(evt)} crossOrigin={"anonymous"} loader={ImageLoader} alt={ctx.description} fill={true} src={ctx.image} onLoad={(evt) => {
                      evt.currentTarget.classList.add(style.jpuf);
                    }} />
                  </div>

                  <div className={style.imagine}>
                    <div className={style.project_content_info}>
                      <p>{rootProject.name}</p>
                      <h4 className={style.sike}>{ctx?.intermittentType ? `${ctx.title} (${IntermittentType[ctx?.intermittentType]})` : ctx.title}</h4>
                    </div>

                    {(!ctx?.intermittentType || ctx?.intermittentType <= 0) && (
                      <div className={style.cite} onClick={() => openURLThroughWindow(ctx.url as string)}>
                        <span></span>
                        <p>Visit</p>
                      </div>
                    )}
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
                                        <path fill={`#${ico.hex != "000000" || ico.title == "Ableton Live" || ico.title == "Express" ? ico.hex : "FFFFFF"}`} d={ico.path} />
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
            });
          })
        }
      </div>

      {/* filter work */}
      <section className={style.project_filter_work_button} data-state={toggle && isFilterOpen} onClick={() => openFilter()}>
        <h2>Filter Work</h2>
      </section>
    </section>
  );
};