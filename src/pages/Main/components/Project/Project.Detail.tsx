import { Show, useContext, createSignal } from "solid-js";
import { projectIndexContext, projectCurrentActive } from "./Project";
import Projects from "./Project.List";
import mainStyle from "../../../../css/Main.module.css";
import { marked } from "marked";
import { useSearchParams } from "@solidjs/router";
import style from "./Project.Detail.module.css";

export default function ProjectDetail() {
  const {currentProjectIndex, setCurrentProjectIndex} = useContext(projectIndexContext);
  const {currentProjectActive, setCurrentProjectActive} = useContext(projectCurrentActive);
  const [currentProjectImageShow, setCurrentProjectImageShow] = createSignal<boolean>(false);

   // https://13373333.one/?projectId=
   const [params, setParams] = useSearchParams();
   if (params?.projectId) {
     const projectIndexFind = Projects.findIndex(val => val?.projectId === params.projectId.toLowerCase());
     if (projectIndexFind >= 0) {
       setCurrentProjectIndex(projectIndexFind);
       setTimeout(() => setCurrentProjectActive(true), 125);
     };
   };

  return (
    <Show when={currentProjectIndex() !== null}>{() => {
      const currentProject = Projects[currentProjectIndex()!];

      return (
        <div class={style.project_details} data-show={currentProjectActive()}>
          <div class={mainStyle.close} onclick={() => {
            setCurrentProjectActive(false);
            setParams({projectId: null});
            setTimeout(() => {
              setCurrentProjectIndex(null);
              setCurrentProjectImageShow(false);
            }, 950);
          }}>
            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" /></svg>
          </div>

          <div class={style.project_details_image} data-show={currentProjectImageShow()}>
            <img src={currentProject.image} onload={() => setCurrentProjectImageShow(true)}/>

            <div class={style.project_details_image_title}>
              <h1>{currentProject.title}</h1>
            </div>
          </div>

          <div class={style.project_details_html} innerHTML={marked.parseInline(currentProject?.html || currentProject.description || "Nothing to show here.", { gfm: true, breaks: true })}></div>

          <div class={style.project_details_checkout} onclick={() => window.open(currentProject.url, "_blank")}>
            <h1>Visit</h1>
          </div>
        </div>
      );
    }}</Show>
  );
};