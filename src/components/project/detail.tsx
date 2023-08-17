import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { projectIndexContext, projectCurrentActive } from ".";
import Projects from "./list";
import mainStyle from "../../../../css/Main.module.css";
import { marked } from "marked";
import style from "./Project.Detail.module.css";

export default function ProjectDetail() {
  const { currentProjectIndex, setCurrentProjectIndex } = useContext(projectIndexContext);
  const { currentProjectActive, setCurrentProjectActive } = useContext(projectCurrentActive);
  const [currentProjectImageShow, setCurrentProjectImageShow] = useState<boolean>(false);

  // https://13373333.one/?projectId=
  const { query: params } = useRouter();
  if (typeof params?.projectId === "string") {
    const currentProjectID = params.projectId.toLowerCase();
    const projectIndexFind = Projects.findIndex(val => val?.projectId === currentProjectID);

    if (projectIndexFind >= 0) {
      setCurrentProjectIndex(projectIndexFind);
      setTimeout(() => setCurrentProjectActive(true), 125);
    };
  };

  const currentProject = Projects[currentProjectIndex()!];

  return (
    <div className={style.project_details} data-show={currentProjectActive()}>
      <div className={mainStyle.close} onClick={() => {
        setCurrentProjectActive(false);
        setParams({ projectId: null });
        setTimeout(() => {
          setCurrentProjectIndex(null);
          setCurrentProjectImageShow(false);
        }, 950);
      }}>
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" /></svg>
      </div>

      <div className={style.project_details_image} data-show={currentProjectImageShow()}>
        <Image fill={true} alt={""} src={currentProject.image} onLoad={() => setCurrentProjectImageShow(true)} />

        <div className={style.project_details_image_title}>
          <h1>{currentProject.title}</h1>
          <p>{currentProject.description}</p>
        </div>
      </div>

      <div className={style.project_details_html} dangerouslySetInnerHTML={{__html: marked.parseInline(currentProject?.html || currentProject.description || "Nothing to show here.", { gfm: true, breaks: true })}}></div>

      <div className={style.project_details_checkout} style={{ display: currentProject?.resigned ? "none" : undefined }} onclick={() => window.open(currentProject.url, "_blank")}>
        <h1>Visit</h1>
      </div>
    </div>
  );
};