import { useState, useEffect } from "react";
import { sleep } from "../Util";
import { marked } from "marked";
import Image from "next/image";

import style from "./About.module.css";

import rayImg from "../../../assets/003.webp";

const ShortBio = marked.parseInline(`
  **Hello.** I'm Ray, and I'm a *full-stack developer*, and my origin is from <u>Indonesia</u>.
  I've been interested in developing server things since <u>I was 11 years old</u>.
  And, I've also mastered in developing website since March and April 2020.
  `, { gfm: true, breaks: true });

export default function About(props: { active?: boolean }) {
  const derivedProps = () => props.active;
  const [toggle, setToggle] = useState<boolean>(false);
  const [deferToggle, setDeferToggle] = useState<boolean>(false);

  useEffect(() => {
    derivedProps() ? setToggle(true) : sleep(750).then(() => setToggle(false));
    toggle ? setTimeout(() => setDeferToggle(true), 5) : setDeferToggle(false);
  });

  return (
    <>
      {toggle && (
        <div className={style.about} data-itchi={String(Boolean(deferToggle))}>
          <div className={style.header}></div>

          <div className={style.overview}>
            <div className={style.selfie}>
              <Image
                src={rayImg} loading={"lazy"} alt={"my selfie pics."}
                onLoad={(evt) => evt.currentTarget.classList.add(style.kuma)}
                draggable={false}
                onContextMenu={(evt) => {
                  evt.preventDefault();
                  evt.stopPropagation();
                  return;
                }}></Image>
            </div>

            <div className={style.fullname}>
              <h1>Hizkia Ray</h1>
            </div>
          </div>

          <div className={style.bullcrap}>
            <div className={style.bullcrap_title}>
              <h1>Short Bio</h1>
              <span></span>
            </div>

            <div className={style.bullcrap_more}>
              <p dangerouslySetInnerHTML={{ __html: ShortBio }}></p>
            </div>
          </div>

        </div>
      )}
    </>
  );
};